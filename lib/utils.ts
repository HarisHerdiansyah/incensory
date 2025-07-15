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
  initial: Record<string, unknown>,
  updated: Record<string, unknown>
) {
  const keys = Object.keys(initial);
  const result = {} as Record<string, unknown>;
  keys.forEach((key) => {
    if (initial[key] !== updated[key]) {
      result[key] = updated[key];
    }
  });
  return result;
}

export function emailHtmlContent(username: string, verificationLink: string) {
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="id">
  <head>
    <meta charset="UTF-8" />
    <title>Verifikasi Akun</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body { font-family: 'Segoe UI', sans-serif; margin: 0; padding: 0; background-color: #f4fafa; }
      .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
      .header { background-color: #23717B; color: #ffffff; padding: 24px; text-align: center; }
      .header h1 { margin: 0; font-size: 24px; }
      .content { padding: 32px 24px; color: #333333; }
      .content h2 { font-size: 20px; margin-top: 0; color: #23717B; }
      .content p { font-size: 16px; line-height: 1.6; }
      .button { display: inline-block; margin-top: 24px; background-color: #12B2C1; color: #ffffff !important; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; }
      .footer { text-align: center; font-size: 13px; color: #888888; padding: 24px; background-color: #f0fafa; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Verifikasi Akun Anda</h1>
      </div>
      <div class="content">
        <h2>Hai, ${username}</h2>
        <p>
          Terima kasih telah mendaftar. Untuk menyelesaikan proses pendaftaran,
          silakan klik tombol di bawah ini untuk memverifikasi alamat email Anda.
        </p>
        <a href="${verificationLink}" class="button">Verifikasi Sekarang</a>
        <p>
          Jika Anda tidak merasa mendaftar dengan email ini, abaikan saja pesan ini.
        </p>
      </div>
      <div class="footer">
        &copy; 2025 Incensory. Semua hak dilindungi.
      </div>
    </div>
  </body>
  </html>`;
  return htmlContent;
}
