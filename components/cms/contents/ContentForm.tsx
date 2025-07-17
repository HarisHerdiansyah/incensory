'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Loader from '@/components/Loader';
import ContentFormFields from './ContentFormFields';
import { insertContent, updateContent } from '@/actions/contents';
import { uploadToS3, diffing } from '@/lib/utils';
import { VRCategory } from '@prisma/client';

type Mode = 'add' | 'edit';

type Props = {
  mode: Mode;
  contentId?: string;
  initialData?: {
    title: string;
    description: string;
    source: string;
    category: VRCategory;
  };
};

export default function VRContentForm({ mode, contentId, initialData }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideoFile(file);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      toast.error('Silakan pilih file terlebih dahulu');
      return;
    }

    setIsUploading(true);
    try {
      const key = await uploadToS3(videoFile, 'contents');
      window.sessionStorage.setItem('videoKey', key);
      toast.success('File berhasil diunggah');
      setIsVideoUploaded(true);
    } catch (err) {
      console.error('Upload error', err);
      toast.error('Gagal mengunggah file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    formData.set('source', window.sessionStorage.getItem('videoKey') as string);

    setIsSubmitting(true);

    if (mode === 'add') {
      const result = await insertContent(formData);
      if (result.success) {
        toast.success(result.message);
        router.back();
        setVideoFile(null);
      } else {
        toast.error(result.message);
      }
    }

    if (mode === 'edit' && contentId && initialData) {
      const updatedContent = diffing(
        initialData,
        Object.fromEntries(formData.entries())
      );
      formData.append('updatedContent', JSON.stringify(updatedContent));
      const result = await updateContent(contentId, formData);
      if (result.success) {
        toast.success(result.message);
        router.back();
      } else {
        toast.error(result.message);
      }
    }

    formRef.current?.reset();
    setIsSubmitting(false);
  };

  return (
    <>
      {(isUploading || isSubmitting) && <Loader />}
      <div className='grid gap-2 mt-6'>
        <Label htmlFor='video'>Unggah Konten (Video)</Label>
        <Input type='file' accept='video/*' onChange={handleFileChange} />
        <Button
          className='cursor-pointer'
          variant='secondary'
          type='button'
          onClick={handleUpload}
          disabled={isUploading || !videoFile}
        >
          {isUploading ? 'Mengunggah...' : 'Unggah Video'}
        </Button>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className='space-y-6 mt-6'>
        <ContentFormFields
          mode={mode}
          defaultValues={initialData}
          isVideoUploaded={isVideoUploaded}
        />
        <div className='flex justify-between'>
          <Button
            variant='outline'
            type='button'
            className='cursor-pointer'
            onClick={() => router.back()}
          >
            Kembali
          </Button>
          <Button
            variant='secondary'
            type='submit'
            className='cursor-pointer'
            disabled={mode === 'add' && !isVideoUploaded}
          >
            {mode === 'add' ? 'Tambah Konten' : 'Simpan Perubahan'}
          </Button>
        </div>
      </form>
    </>
  );
}
