'use client';

import Link from 'next/link';
import { toast } from 'react-toastify';
import { ColumnDef } from '@tanstack/react-table';
import { deleteProduct } from '@/actions/products';
import { Button } from '@/components/ui/button';
import { ProductResponse } from './types';

const columns: ColumnDef<ProductResponse>[] = [
  {
    accessorKey: 'name',
    header: 'Nama Produk',
  },
  {
    accessorKey: 'price',
    header: 'Harga',
  },
  {
    header: 'Aksi',
    cell: ({ row }) => {
      const product = row.original;

      const handleDelete = async () => {
        const response = await deleteProduct(product.id);
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      };

      return (
        <div className='flex gap-2'>
          <Link href={`/cms/products/${product.id}/edit`}>
            <Button
              className='text-black bg-amber-400 hover:bg-amber-500 cursor-pointer'
              size='sm'
            >
              Edit
            </Button>
          </Link>
          <Button
            className='bg-red-600 hover:bg-red-700 cursor-pointer'
            size='sm'
            onClick={handleDelete}
          >
            Hapus
          </Button>
        </div>
      );
    },
  },
];

export default columns;
