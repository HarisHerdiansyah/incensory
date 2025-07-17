'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { archiveProduct } from '@/actions/products';
import { Button } from '@/components/ui/button';
import { ProductResponse } from './types';
import Loader from '@/components/Loader';

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
    accessorKey: 'isVisible',
    header: 'Tampilan',
    cell: ({ row }) => {
      const product = row.original;
      return product.isVisible ? 'Publik' : 'Privat';
    },
  },
  {
    header: 'Aksi',
    cell: ({ row }) => {
      const [isLoading, setIsLoading] = useState(false);
      const product = row.original;

      const handleArchive = async () => {
        setIsLoading(true);
        const response = await archiveProduct(product.id, !product.isVisible);
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
        setIsLoading(false);
      };

      return (
        <>
          {isLoading && <Loader />}
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
              className={clsx('cursor-pointer', {
                'bg-red-600 hover:bg-red-700': product.isVisible,
                'bg-accent': !product.isVisible,
              })}
              size='sm'
              onClick={handleArchive}
            >
              {product.isVisible ? 'Arsipkan' : 'Tampilkan'}
            </Button>
          </div>
        </>
      );
    },
  },
];

export default columns;
