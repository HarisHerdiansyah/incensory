'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export type UsersResponse = {
  id: string;
  username: string;
  email: string;
  phone_number: string;
  created_at: string;
};

const columns: ColumnDef<UsersResponse>[] = [
  {
    accessorKey: 'username',
    header: 'Nama Pengguna',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      return (
        <Link
          href={`mailto:${row.original.email}`}
          target='_blank'
          className='hover:underline'
        >
          {row.original.email}
        </Link>
      );
    },
  },
  {
    accessorKey: 'phone_number',
    header: 'No. Telepon',
    cell: ({ row }) => {
      return (
        <Link
          href={`https://wa.me/${row.original.phone_number}`}
          target='_blank'
          className='hover:underline'
        >
          {row.original.phone_number}
        </Link>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Tanggal Bergabung',
  },
];

export default columns;
