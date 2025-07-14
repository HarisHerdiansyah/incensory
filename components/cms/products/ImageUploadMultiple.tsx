// TODO: KALO OBJECT GAK JADI ADD ATAU UPDATE, ITEM YANG UDAH UPLOAD DI DELETE LAGI

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { uploadToS3 } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

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
    <>
      <div id='formControl'>
        <Label className='mb-2'>Gambar Produk</Label>
        <Input
          type='file'
          multiple
          accept='image/*'
          onChange={handleUpload}
          disabled={uploading}
        />
      </div>
      <div className=''>
        <Label className='mb-2'>Preview Produk</Label>
        <div className='w-full h-52 flex items-center justify-center overflow-x-scroll space-x-2'>
          {currentImages.length === 0 ? (
            <span className='text-gray-400'>
              -- preview gambar produk di sini --
            </span>
          ) : (
            currentImages.map((key, idx) => (
              <div className='relative h-full border' key={key}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}/${key}`}
                  alt={`Preview ${idx + 1}`}
                  className='h-full'
                  width={180}
                  height={180}
                />
                <Button
                  type='button'
                  onClick={() => handleDelete(key)}
                  className='absolute top-1 right-1'
                  variant='destructive'
                  size='icon'
                >
                  <Trash />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
