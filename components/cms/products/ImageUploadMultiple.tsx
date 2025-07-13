'use client';

import { useState } from 'react';
import { uploadToS3 } from '@/lib/utils';

interface Props {
  initialImages?: string[];
  onChange: (existing: string[], uploaded: string[], deleted: string[]) => void;
}

export function ImageUploadMultiple({ initialImages = [], onChange }: Props) {
  const [currentImages, setCurrentImages] = useState<string[]>(initialImages);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const newKeys: string[] = [];

    for (const file of Array.from(files)) {
      try {
        const key = await uploadToS3(file);
        newKeys.push(key);
      } catch (err) {
        console.error('Upload gagal:', err);
      }
    }

    const newImages = [...uploadedImages, ...newKeys];
    setUploadedImages(newImages);
    onChange(currentImages, newImages, deletedImages);
    setUploading(false);
  };

  const handleDelete = (key: string) => {
    const updated = currentImages.filter((img) => img !== key);
    const markedDeleted = [...deletedImages, key];
    setCurrentImages(updated);
    setDeletedImages(markedDeleted);
    onChange(updated, uploadedImages, markedDeleted);
  };

  return (
    <div className='space-y-2'>
      <input
        type='file'
        multiple
        accept='image/*'
        onChange={handleUpload}
        disabled={uploading}
      />
      <div className='grid grid-cols-3 gap-2 mt-2'>
        {currentImages.map((key) => (
          <div key={key} className='relative'>
            <img
              src={`${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}/${key}`}
              className='rounded-lg object-cover h-24 w-full'
              alt=''
            />
            <button
              type='button'
              onClick={() => handleDelete(key)}
              className='absolute top-1 right-1 text-xs bg-red-600 text-white px-1 rounded'
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
