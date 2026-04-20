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
  if (payload.output_text) return payload.output_text;

  const outputText = payload.output
    ?.flatMap((item) => item.content ?? [])
    .find((item) => item.type === "output_text" && item.text)?.text;

  if (outputText) return outputText;

  return payload.content || payload.blog || payload.result || "";
};

// ✅ Generate image (stable + safe)
const generateImages = async (topic: string) => {
  const apiKey = process.env.OPENAI_API_KEY;

  const prompts = [
    `${topic} hero banner, modern, high quality`,
    `${topic} concept illustration, detailed`,
    `${topic} workflow or process diagram`,
    `${topic} real world example visual`,
  ];

  const results: string[] = [];

  for (const p of prompts) {
    try {
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-image-1",
          prompt: p,
          size: "1024x1024",
        }),
      });

      const data = await res.json();
      const base64 = data?.data?.[0]?.b64_json;

      if (base64) {
        results.push(`data:image/png;base64,${base64}`);
      }
    } catch (err) {
      console.error("Image failed:", err);
    }
  }

  return results;
};
// ✅ Replace placeholders with real images
const injectImages = (html: string, images: string[]) => {
  let i = 0;
  return html.replace(/IMAGE_\d+/g, () => images[i++ % images.length]);
};

export async function POST(request: Request) {
  try {
    const { prompt } = (await request.json()) as { prompt?: string };

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured." },
        { status: 500 }
      );
    }

    //  "IMPORTANT: For images, use ONLY this URL format: https://loremflickr.com/800/400/{keyword}",
    const generationPrompt = [
      "Generate a complete, production-ready blog page as valid HTML.",
      "Output must be raw HTML only (no markdown, no code fences).",
      "Use inline or <style> CSS for polished styling.",
      "Do not include any JavaScript.",
      "Replace {keyword} with a relevant term for the image (e.g., 'coding', 'nature').",
      "Ensure every <img> tag has a descriptive 'alt' attribute.",
      "",
      `User topic: ${prompt}`,
    ].join("\n");

    // 🔹 Step 1: Generate blog HTML
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
      return NextResponse.json(
        { error: errorText || "OpenAI request failed." },
        { status: response.status }
      );
    }

    const data = (await response.json()) as OpenAIResponsePayload;
    let content = extractContent(data).trim();

    if (!content) {
      return NextResponse.json(
        { error: "Empty content returned." },
        { status: 502 }
      );
    }

    // 🔹 Step 2: Generate image
    const images = await generateImages(prompt);

    // 🔹 Step 3: Inject OR fallback
    if (images.length) {
      content = injectImages(content, images);
    } else {
      console.warn("Using fallback image");
      content = content.replace(
        /IMAGE_\d+/g,
        "https://via.placeholder.com/800x400?text=Blog+Image"
      );
    }

    return NextResponse.json({ content });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error occurred.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
