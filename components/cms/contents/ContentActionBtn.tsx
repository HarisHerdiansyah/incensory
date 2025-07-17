import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { Row } from '@tanstack/react-table';
import { archiveContent } from '@/actions/contents';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import { Content } from './ContentColumn';

export default function ContentActionBtn({ row }: { row: Row<Content> }) {
  const [isLoading, setIsLoading] = useState(false);
  const content = row.original;

  const handleArchive = async () => {
    setIsLoading(true);
    const response = await archiveContent(content.id, !content.isVisible);
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
        <Link href={`/cms/contents/${content.id}/edit`}>
          <Button
            className='text-black bg-amber-400 hover:bg-amber-500 cursor-pointer'
            size='sm'
          >
            Edit
          </Button>
        </Link>
        <Button
          className={clsx('cursor-pointer', {
            'bg-red-600 hover:bg-red-700': content.isVisible,
            'bg-accent': !content.isVisible,
          })}
          size='sm'
          onClick={handleArchive}
        >
          {content.isVisible ? 'Arsipkan' : 'Tampilkan'}
        </Button>
      </div>
    </>
  );
}
