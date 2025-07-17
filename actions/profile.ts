'use server';

import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';
import { serverUploadUtils } from '@/lib/utils';
import { authOptions } from '@/lib/authOptions';

export async function updateProfileImage(image: File) {
  try {
    const session = await getServerSession(authOptions);
    const key = await serverUploadUtils(image, 'profile');

    if (key === '') throw new Error('Gagal mengunggah foto profil');

    await db.user.update({
      where: { email: session?.user.email },
      data: { profile_image: key },
    });

    return {
      success: true,
      message: 'Berhasil memperbaharui foto profil.',
      data: key,
    };
  } catch (error) {
    console.error('[UPDATE_PROFILE_IMAGE]', error);
    return {
      success: false,
      message: 'Gagal memperbaharui foto profil. Coba lagi.',
    };
  }
}
