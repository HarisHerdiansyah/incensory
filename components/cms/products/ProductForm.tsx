'use client';

import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ProductFormFields from './ProductFormFields';
import { ProductFormState, ProductFormProps } from './types';
import {
  cancelProductMutation,
  createProduct,
  updateProduct,
} from '@/actions/products';
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
  const [uploading, setUploading] = useState<boolean>(false);
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

  const handleCancel = async () => {
    setUploading(true);
    const response = await cancelProductMutation([
      ...formState.uploadedImages,
      ...formState.deletedImages,
    ]);

    if (!response.success) {
      setUploading(false);
      toast.error(response.message);
      return;
    }

    setUploading(false);
    router.back();
  };

  return (
    <>
      {(isPending || uploading) && <Loader />}
      <div className='space-y-6'>
        <ProductFormFields
          uploading={uploading}
          setUploading={setUploading}
          values={formState}
          onChange={handleChange}
        />
        <div className='flex justify-between'>
          <Button
            variant='outline'
            className='cursor-pointer'
            onClick={handleCancel}
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
