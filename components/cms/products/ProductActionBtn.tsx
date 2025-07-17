import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { Row } from '@tanstack/react-table';
import { archiveProduct } from '@/actions/products';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import { ProductResponse } from './types';

export default function ProductActionBtn({
  row,
}: {
  row: Row<ProductResponse>;
}) {
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
}
