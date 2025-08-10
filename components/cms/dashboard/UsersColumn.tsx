'use client';

import { ColumnDef } from '@tanstack/react-table';

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
  },
  {
    accessorKey: 'phone_number',
    header: 'No. Telepon',
  },
  {
    accessorKey: 'created_at',
    header: 'Tanggal Bergabung',
  },
];

export default columns;
