'use client';

import Link from 'next/link';
import { toast } from 'react-toastify';
import { ColumnDef } from '@tanstack/react-table';
import { deleteContent } from '@/actions/contents';
import { Button } from '@/components/ui/button';
import { VRCategory } from '@prisma/client';

export type Content = {
  id: string;
  title: string;
  category: VRCategory;
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
    header: 'Aksi',
    cell: ({ row }) => {
      const content = row.original;

      const handleDelete = async () => {
        const response = await deleteContent(content.id);
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
            onClick={handleDelete}
            className='bg-red-600 hover:bg-red-700 cursor-pointer'
            size='sm'
          >
            Hapus
          </Button>
        </div>
      );
    },
  },
];

export default columns;
