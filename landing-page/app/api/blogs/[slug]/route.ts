import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import { validateBlogData } from '@/lib/validation_middleware/validate';
import { saveUpload } from '@/lib/upload';
import { urlToBase64 } from '@/lib/imageUtils';
import mongoose from 'mongoose';

// GET: Retrieve a single blog by ID or Slug from MongoDB
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    
    let blog;
    // 1. Try to find by ID if it's a valid MongoDB ID
    if (mongoose.Types.ObjectId.isValid(slug)) {
      blog = await Blog.findById(slug);
    }
    
    // 2. If not found by ID, try finding by Slug
    if (!blog) {
      blog = await Blog.findOne({ slug });
    }
    
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// PUT: Edit a specific blog by ID or Slug in MongoDB
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: identifier } = await params;
    const contentType = request.headers.get("content-type") || "";
    let body: any = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries());

      // Special handling for file uploads
      const coverImageFile = formData.get("coverImage");
      if (coverImageFile instanceof File && coverImageFile.size > 0) {
        body.coverImage = await saveUpload(coverImageFile);
      }
    } else {
      body = await request.json().catch(() => {
        throw new Error("Invalid JSON format in request body. Use application/json or multipart/form-data.");
      });
    }

    // Validation Middleware
    const validationError = validateBlogData(body, true);
    if (validationError) return validationError;

    // Persist remote images (from OpenAI) as Base64 strings
    if (body.coverImage && body.coverImage.startsWith("http")) {
      try {
        body.coverImage = await urlToBase64(body.coverImage);
      } catch (error) {
        console.error("Failed to persist remote image during update:", error);
      }
    }

    await dbConnect();
    
    let query = {};
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      query = { _id: identifier };
    } else {
      query = { slug: identifier };
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      query,
      {
        ...(body.title && { title: body.title }),
        ...(body.content && { content: body.content }),
        ...(body.coverImage && { coverImage: body.coverImage })
      },
      { new: true } // Return the updated document
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    revalidatePath('/blogs');
    revalidatePath(`/blogs/${updatedBlog.slug}`);
    
    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE: Remove a blog by ID or Slug from MongoDB
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug: identifier } = await params;

    let query = {};
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      query = { _id: identifier };
    } else {
      query = { slug: identifier };
    }

    const deletedBlog = await Blog.findOneAndDelete(query);
    
    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    revalidatePath('/blogs');
    revalidatePath(`/blogs/${identifier}`);

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
