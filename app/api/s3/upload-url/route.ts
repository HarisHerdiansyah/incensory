import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = process.env.S3_BUCKET!;

export async function POST(req: NextRequest) {
  const { filename, fileType, fileDirectory } = await req.json();

  const fileExt = filename.split('.').pop();
  const key = `${fileDirectory}/${uuidv4()}.${fileExt}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  return NextResponse.json({ url, key });
}
