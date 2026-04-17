import { NextResponse } from 'next/server';

/**
 * Custom validation helper for blog data.
 * Returns a NextResponse with a 400 error if validation fails, 
 * otherwise returns null.
 */
export function validateBlogData(body: any, isUpdate: boolean = false) {
  const errors: string[] = [];

  // If it's not an update, content is strictly required.
  // For updates, we allow updating only title or only content.
  if (!isUpdate && (!body.content || typeof body.content !== 'string' || body.content.trim() === '')) {
    errors.push('Content is required and must be a non-empty string.');
  }

  // If title is provided, it must be a string and not just whitespace
  if (body.title !== undefined) {
    if (typeof body.title !== 'string' || body.title.trim() === '') {
      errors.push('Title must be a non-empty string if provided.');
    }
  }

  // If both are missing on an update, that's an error
  if (isUpdate && body.title === undefined && body.content === undefined) {
    errors.push('At least one field (title or content) must be provided for an update.');
  }

  if (errors.length > 0) {
    return NextResponse.json(
      { error: 'Validation Failed', details: errors },
      { status: 400 }
    );
  }

  return null;
}
