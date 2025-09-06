'use client';

import { ColumnDef } from '@tanstack/react-table';
import { clsx } from 'clsx';
import { Copy } from 'lucide-react';
import { toast } from 'react-toastify';

export type AccessCodeResponse = {
  no: string | number;
  id: string;
  code: string;
  is_used: boolean;
  username: string;
  email: string;
  phone_number: string;
};

const columns: ColumnDef<AccessCodeResponse>[] = [
  {
    accessorKey: 'no',
    header: 'No.',
  },
  {
    accessorKey: 'code',
    header: 'Kode',
  },
  {
    accessorKey: 'is_used',
    header: 'Status',
    cell: ({ row }) => (
      <div
        className={clsx('font-semibold w-min px-1.5 py-0.5 rounded-lg', {
          'bg-amber-400 text-black': row.original.is_used,
          'bg-green-600 text-white': !row.original.is_used,
        })}
      >
        {row.original.is_used ? 'Terpakai' : 'Tersedia'}
      </div>
    ),
  },
  {
    accessorKey: 'username',
    header: 'Nama Customer',
  },
  {
    accessorKey: 'email',
    header: 'Email Customer',
  },
  {
    accessorKey: 'phone_number',
    header: 'Telp. Customer',
  },
  {
    header: 'Aksi',
    cell: ({ row }) => {
      const onCopy = async () => {
        await navigator.clipboard.writeText(row.original.code);
        toast.success('Berhasil disalin');
      };

      return (
        <Copy strokeWidth={2.5} className='cursor-pointer' onClick={onCopy} />
      );
    },
  },
];

export default columns;
