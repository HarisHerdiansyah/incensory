import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  PutObjectCommand,
  S3Client,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

export const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_SECRET_KEY as string,
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function uploadToS3(file: File, dir: string) {
  const key = `${dir}/${uuidv4()}-${file.name}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
    ContentType: file.type,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

export async function deleteFilesFromS3(fileKeys: string[]) {
  const objectsToDelete = fileKeys.map((key) => ({ Key: key }));
  const command = new DeleteObjectsCommand({
    Bucket: process.env.R2_BUCKET as string,
    Delete: { Objects: objectsToDelete },
  });
  const response = await s3Client.send(command);
  console.log('Files deleted successfully:', response);
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
