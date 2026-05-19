import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDriveDirectLink(url: string, type: 'image' | 'video' = 'image') {
  if (!url || !url.includes('drive.google.com')) return url;
  
  const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const id = idMatch ? idMatch[1] : null;
  
  if (!id) return url;

  if (type === 'image') {
    // Use the thumbnail service for images which is much more reliable and skips virus warnings
    return `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
  }
  
  // For videos, we still use the uc?id format, but Cloudinary is recommended for large files
  return `https://drive.google.com/uc?export=download&id=${id}`;
}
