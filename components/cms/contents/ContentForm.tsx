'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import ContentFormFields from './ContentFormFields';
import { insertContent, updateContent } from '@/actions/contents';
import { diffing } from '@/lib/utils';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);

    setIsSubmitting(true);

    if (mode === 'add') {
      const result = await insertContent(formData);
      if (result.success) {
        toast.success(result.message);
        router.back();
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
      {isSubmitting && <Loader />}
      <form ref={formRef} onSubmit={handleSubmit} className='space-y-6 mt-6'>
        <ContentFormFields defaultValues={initialData} />
        <div className='flex justify-between'>
          <Button
            variant='outline'
            type='button'
            className='cursor-pointer'
            onClick={() => router.back()}
          >
            Kembali
          </Button>
          <Button variant='secondary' type='submit' className='cursor-pointer'>
            {mode === 'add' ? 'Tambah Konten' : 'Simpan Perubahan'}
          </Button>
        </div>
      </form>
    </>
  );
}
