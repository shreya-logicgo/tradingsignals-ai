import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = (await request.json()) as { prompt?: string };

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: "Prompt is required to generate an image." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {blob 
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured." },
        { status: 500 }
      );
    }

    // Call OpenAI DALL-E API
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `A natural, candid photograph for a blog cover about: ${prompt}.

The image should look like a real, everyday photo taken by a human:
slightly imperfect composition
natural lighting (not cinematic or dramatic)
realistic environment (home office, workplace, desk setup)
minor clutter, irregular details, lived-in feel

Include:
a real person or realistic workspace
normal objects (laptop, coffee mug, notebook, monitors)

Camera style:
shot on a phone or DSLR (35mm or 50mm)
slight grain, natural shadows, no dramatic effects

Avoid completely:
anything futuristic or sci-fi
perfect symmetry or overly clean setups
glowing lights, neon effects
ultra sharp HDR, over-processed look
CGI, 3D render, digital art, concept art
“AI aesthetic” (too polished, too perfect)

Style reference:
looks like a casual Unsplash or candid LinkedIn photo

Output:
realistic, slightly imperfect, human feel
16:9 aspect ratio`,
        n: 1,
        size: "1024x1024",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error?.message || "Image generation failed." },
        { status: response.status }
      );
    }

    const data = await response.json();
    const imageUrl = data.data?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image was generated. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Image generation error:", error);
    const message =
      error instanceof Error ? error.message : "Unexpected error while generating image.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
