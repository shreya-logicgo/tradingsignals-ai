import { NextResponse } from "next/server";

type OpenAIResponsePayload = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
  content?: string;
  blog?: string;
  result?: string;
};

const extractContent = (payload: OpenAIResponsePayload) => {
  if (payload.output_text) {
    return payload.output_text;
  }

  const outputText = payload.output
    ?.flatMap((item) => item.content ?? [])
    .find((item) => item.type === "output_text" && item.text)
    ?.text;

  if (outputText) {
    return outputText;
  }

  return payload.content || payload.blog || payload.result || "";
};

export async function POST(request: Request) {
  try {
    const { prompt } = (await request.json()) as { prompt?: string };

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OPENAI_API_KEY is not configured." }, { status: 500 });
    }

    const generationPrompt = [
      "Generate a complete, production-ready blog page as valid HTML.",
      "Output must be raw HTML only (no markdown, no code fences).",
      "Use inline or <style> CSS for polished styling.",
      "Do not include any JavaScript (<script> tags or JS code).",
      "Use semantic tags like article, section, h1-h3, p, ul/ol, figure, img where relevant.",
      "Replace placeholders with real topic-specific content.",
      "",
      `User topic: ${prompt}`,
    ].join("\n");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: generationPrompt,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText || "OpenAI request failed." }, { status: response.status });
    }

    const data = (await response.json()) as OpenAIResponsePayload;
    const content = extractContent(data).trim();

    if (!content) {
      return NextResponse.json({ error: "Empty content returned from API. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ content });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error while generating blog.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
