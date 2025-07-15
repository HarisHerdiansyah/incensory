'use server';

import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

export async function submitRating(rating: number, message: string) {
  const session = await getServerSession();
  try {
    const user = await db.user.findUnique({
      where: { email: session?.user.email || '' },
    });

    await db.userRatings.create({
      data: {
        rating,
        message,
        user_id: user?.id as string,
      },
    });
    return { success: true, message: 'Penilaian berhasil dikirim.' };
  } catch (error) {
    console.error('Error submitting rating:', error);
    return { success: false, message: 'Gagal memberikan penilaian.' };
  }
}
