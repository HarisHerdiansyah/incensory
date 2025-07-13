import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/DataTable';
import { ProductColumn } from '@/components/cms/products';
import { db } from '@/lib/db';
import { toRupiah } from '@/lib/utils';

export default async function Products() {
  const q = await db.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
    },
  });
  const products = q.map((data) => ({
    ...data,
    price: toRupiah(Number(data.price)),
  }));

  return (
    <>
      <h1 className='text-2xl font-semibold'>Daftar Produk</h1>
      <div className='flex justify-end'>
        <Link href='/cms/products/new'>
          <Button className='bg-secondary cursor-pointer'>
            <Plus />
            Tambah Produk
          </Button>
        </Link>
      </div>
      <DataTable columns={ProductColumn} data={products} />
    </>
  );
}
