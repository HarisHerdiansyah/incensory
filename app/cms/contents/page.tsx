import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/DataTable';
import { ContentColumn } from '@/components/cms/contents';
import { db } from '@/lib/db';

export default async function Products() {
  const contents = await db.vRContent.findMany({
    select: {
      id: true,
      title: true,
      category: true,
      isVisible: true,
    },
  });

  return (
    <>
      <h1 className='text-2xl font-semibold'>Daftar Konten</h1>
      <div className='flex justify-end'>
        <Link href='/cms/contents/new'>
          <Button className='bg-secondary cursor-pointer'>
            <Plus />
            Tambah Konten
          </Button>
        </Link>
      </div>
      <DataTable columns={ContentColumn} data={contents} />
    </>
  );
}
