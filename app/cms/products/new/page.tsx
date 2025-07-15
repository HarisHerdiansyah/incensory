import { ProductForm } from '@/components/cms/products';

export default function NewProductPage() {
  return (
    <div className='px-8'>
      <h1 className='text-2xl font-semibold mb-4'>Tambah Produk Baru</h1>
      <ProductForm mode='add' />
    </div>
  );
}
