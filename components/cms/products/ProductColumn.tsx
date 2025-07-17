'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ProductResponse } from './types';
import ProductActionBtn from './ProductActionBtn';


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
    cell: ({ row }) => <ProductActionBtn row={row} />,
  },
];

export default columns;
