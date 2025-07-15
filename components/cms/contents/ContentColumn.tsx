'use client';

import Link from 'next/link';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { archiveContent } from '@/actions/contents';
import { Button } from '@/components/ui/button';
import { VRCategory } from '@prisma/client';

export type Content = {
  id: string;
  title: string;
  category: VRCategory;
  isVisible: boolean;
};

const columns: ColumnDef<Content>[] = [
  {
    accessorKey: 'title',
    header: 'Judul Konten',
  },
  {
    accessorKey: 'category',
    header: 'Kategori',
  },
  {
    accessorKey: 'isVisible',
    header: 'Tampilan',
    cell: ({ row }) => {
      const content = row.original;
      return content.isVisible ? 'Publik' : 'Diarsipkan';
    },
  },
  {
    header: 'Aksi',
    cell: ({ row }) => {
      const content = row.original;

      const handleArchive = async () => {
        const response = await archiveContent(content.id, !content.isVisible);
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      };

      return (
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
      );
    },
  },
];

export default columns;
