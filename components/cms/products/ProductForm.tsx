'use client';

import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ProductFormFields from './ProductFormFields';
import { ProductFormState, ProductFormProps } from './types';
import { createProduct, updateProduct } from '@/actions/products';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';

const initialFormState: ProductFormState = {
  name: '',
  description: '',
  price: 0,
  links: {},
  existingImages: [],
  uploadedImages: [],
  deletedImages: [],
};

export default function ProductForm({
  mode,
  defaultValues,
  productId,
}: ProductFormProps) {
  const [formState, setFormState] = useState<ProductFormState>(
    defaultValues || initialFormState
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = <K extends keyof ProductFormState>(
    field: K,
    value: ProductFormState[K]
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // Basic data
    formData.append('name', formState.name);
    formData.append('description', formState.description);
    formData.append('price', String(formState.price));

    // Links
    formData.append('links', JSON.stringify(formState.links));

    // Images
    formData.append('uploadedImages', JSON.stringify(formState.uploadedImages));
    formData.append('deletedImages', JSON.stringify(formState.deletedImages));

    // Mode specific
    if (mode === 'edit' && productId) {
      formData.append('productId', productId);
      formData.append(
        'updatedProduct',
        JSON.stringify({
          name: formState.name,
          description: formState.description,
          price: formState.price,
        })
      );
    }

    startTransition(async () => {
      try {
        const result =
          mode === 'add'
            ? await createProduct(formData)
            : await updateProduct(formData);

        if (result?.success) {
          toast.success(result.message || 'Berhasil!');
          router.back();
        } else {
          toast.error(result?.message || 'Gagal memproses produk');
        }
      } catch (err) {
        console.error(err);
        toast.error('Terjadi kesalahan saat menyimpan produk');
      }
    });
  };

  return (
    <>
      {isPending && <Loader />}
      <div className='space-y-6'>
        <ProductFormFields values={formState} onChange={handleChange} />
        <div className='flex justify-between'>
          <Button
            variant='outline'
            className='cursor-pointer'
            onClick={() => router.back()}
          >
            Kembali
          </Button>
          <Button
            variant='secondary'
            className='cursor-pointer'
            onClick={handleSubmit}
            disabled={isPending}
          >
            {mode === 'add' ? 'Tambah Produk' : 'Simpan Perubahan'}
          </Button>
        </div>
      </div>
    </>
  );
}
