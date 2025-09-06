'use server';

import { db } from '@/lib/db';
import { generateNAccessCode } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function createAccessCode(formData: FormData) {
  const codes = generateNAccessCode(Number(formData.get('number')));
  const master = await db.user.findUnique({
    where: { email: 'incensorypimnas38@gmail.com' },
    select: { id: true },
  });

  const payload = codes.map((code) => ({
    code,
    user_id: master?.id,
  }));

  await db.accessCode.createMany({
    data: payload as { code: string; user_id: string }[],
  });

  revalidatePath('/cms/access-code');
}
