import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import { validateBlogData } from '@/lib/validation_middleware/validate';

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
    const body = await request.json();
    
    // Validation Middleware
    const validationError = validateBlogData(body);
    if (validationError) return validationError;

    await dbConnect();

    // Smartly extract the title from the first <h1> tag in the raw HTML if no explicit title is provided
    let extractedTitle = body.title;
    if (!extractedTitle) {
      const h1Match = body.content.match(/<h1[^>]*>(.*?)<\/h1>/i);
      extractedTitle = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : "Untitled Generated Blog";
    }

    const newBlog = await Blog.create({
      title: extractedTitle,
      content: body.content,
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
  }
}
