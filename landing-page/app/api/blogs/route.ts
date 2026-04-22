import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import { validateBlogData } from '@/lib/validation_middleware/validate';
import { saveUpload } from '@/lib/upload';
import { urlToBase64 } from '@/lib/imageUtils';

// GET: Retrieve all blogs from MongoDB
export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST: Save a new blog to MongoDB
export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let body: any = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries());

      // Special handling for file uploads
      const coverImageFile = formData.get("coverImage");
      if (coverImageFile instanceof File) {
        body.coverImage = await saveUpload(coverImageFile);
      }
    } else {
      body = await request.json().catch(() => {
        throw new Error("Invalid JSON format in request body. Use application/json or multipart/form-data.");
      });
    }
    
    // Validation Middleware
    const validationError = validateBlogData(body);
    if (validationError) return validationError;

    // Persist remote images (from OpenAI) as Base64 strings
    if (body.coverImage && body.coverImage.startsWith("http")) {
      try {
        body.coverImage = await urlToBase64(body.coverImage);
      } catch (error) {
        console.error("Failed to persist remote image:", error);
        // Fallback or handle error (keep as URL maybe, or set to empty)
      }
    }

    await dbConnect();
    
    // Smartly extract the title from the first <h1> tag in the raw HTML if no explicit title is provided
    let extractedTitle = body.title;
    if (!extractedTitle) {
      const h1Match = body.content.match(/<h1[^>]*>(.*?)<\/h1>/i);
      extractedTitle = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : "Untitled Generated Blog";
    }
    
    // Generate a unique slug from title
    let baseSlug = extractedTitle
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters but keep letters/numbers (basic)
      .replace(/[\s_-]+/g, '-') // Replace spaces/underscores/multiple dashes with single dash
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
    
    // Fallback for non-latin titles (if baseSlug is empty after cleaning)
    if (!baseSlug) {
      baseSlug = "post-" + Math.random().toString(36).substring(2, 7);
    }
    
    let slug = baseSlug;
    let exists = await Blog.findOne({ slug });
    if (exists) {
      const randomSuffix = Math.random().toString(36).substring(2, 6);
      slug = `${baseSlug}-${randomSuffix}`;
    }

    const newBlog = await Blog.create({
      title: extractedTitle,
      content: body.content,
      coverImage: body.coverImage,
      slug: slug
    });

    revalidatePath('/blogs');
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error saving blog:", error);
    const message = error instanceof Error ? error.message : "Failed to save blog";
    const status = message.includes("JSON") ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
