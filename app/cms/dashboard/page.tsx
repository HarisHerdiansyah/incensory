import { DateTime } from 'luxon';
import { db } from '@/lib/db';
import DataTable from '@/components/DataTable';
import { UsersColumn } from '@/components/cms/dashboard';

export default async function page() {
  const q = await db.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      phone_number: true,
      created_at: true,
    },
    where: { role: 'CUSTOMER' },
  });

  const users = q.map((data) => ({
    ...data,
    created_at: DateTime.fromJSDate(data.created_at).toFormat('yyyy-MM-dd'),
  }));

  return (
    <>
      <h1 className='text-2xl font-semibold'>Daftar Pengguna</h1>
      <DataTable columns={UsersColumn} data={users} />
    </>
  );
}
