import { Plus } from 'lucide-react';
import { createAccessCode } from '@/actions/accessCode';
import { db } from '@/lib/db';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { AccessCodeColumn } from '@/components/cms/access-code';
import { Input } from '@/components/ui/input';

export default async function AccessCode() {
  const accessCodeResponse = await db.accessCode.findMany({
    select: {
      id: true,
      code: true,
      is_used: true,
      user: {
        select: {
          username: true,
          email: true,
          phone_number: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  const accessCode = accessCodeResponse.map((ac, i) => ({
    ...ac,
    no: i + 1,
    username: ac.user.username.toLowerCase().includes('incensory')
      ? '-'
      : ac.user.username,
    email: ac.user.email.toLowerCase().includes('incensory')
      ? '-'
      : ac.user.email,
    phone_number: ac.user.phone_number || '-',
  }));

  return (
    <>
      <h1 className='text-2xl font-semibold'>Kode Akses (Kode Unik Produk)</h1>
      <div className='flex justify-end'>
        <Popover>
          <PopoverTrigger>
            {/* <Button className='bg-secondary cursor-pointer'>
              <Plus />
              Tambah Kode
            </Button> */}
            Tambah Kode
          </PopoverTrigger>
          <PopoverContent align='end' className='bg-white'>
            <form action={createAccessCode}>
              <div id='formControl' className='flex items-center gap-x-1.5'>
                <Input
                  id='number'
                  name='number'
                  type='number'
                  placeholder='Jumlah Kode ....'
                />
                <Button className='bg-secondary'>Tambah</Button>
              </div>
            </form>
          </PopoverContent>
        </Popover>
      </div>
      <DataTable columns={AccessCodeColumn} data={accessCode} />
    </>
  );
}
