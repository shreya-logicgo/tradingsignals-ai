import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

/**
 * Saves a file to the public/uploads directory
 * @param file The file to save
 * @returns The public URL of the saved file
 */
export async function saveUpload(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = join(process.cwd(), 'public', 'uploads');
  
  // Ensure directory exists
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  // Create a unique filename to avoid collisions
  const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const path = join(uploadDir, uniqueName);
  
  await writeFile(path, buffer);
  
  // Return the public URL
  return `/uploads/${uniqueName}`;
}
