import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { S3Client, DeleteObjectsCommand } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.S3_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_KEY as string,
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function uploadToS3(file: File): Promise<string> {
  const res = await fetch('/api/s3/upload-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: file.name,
      fileType: file.type,
    }),
  });

  if (!res.ok) {
    throw new Error('Gagal mendapatkan URL upload');
  }

  const { url, key } = await res.json();

  const upload = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!upload.ok) {
    throw new Error('Upload ke S3 gagal');
  }

  return key;
}

export async function deleteFilesFromS3(fileKeys: string[]) {
  const objectsToDelete = fileKeys.map((key) => ({ Key: key }));
  const command = new DeleteObjectsCommand({
    Bucket: process.env.S3_BUCKET as string,
    Delete: { Objects: objectsToDelete },
  });
  const response = await s3Client.send(command);
  return response;
}

export function parseJsonSafe<T>(value: FormDataEntryValue | null): T | null {
  try {
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
    return null;
  } catch {
    return null;
  }
}

export function toRupiah(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(price);
}

export function diffing(
  initial: Record<string, any>,
  updated: Record<string, any>
) {
  const keys = Object.keys(initial);
  const result = {} as Record<string, any>;
  keys.forEach((key) => {
    if (initial[key] !== updated[key]) {
      result[key] = updated[key];
    }
  });
  return result;
}
