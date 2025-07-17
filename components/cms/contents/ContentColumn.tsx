'use client';

import { ColumnDef } from '@tanstack/react-table';
import { VRCategory } from '@prisma/client';
import ContentActionBtn from './ContentActionBtn';

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
      return content.isVisible ? 'Publik' : 'Privat';
    },
  },
  {
    header: 'Aksi',
    cell: ({ row }) => <ContentActionBtn row={row} />,
  },
];

export default columns;
