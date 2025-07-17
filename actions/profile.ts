'use server';

import bcyrpt from 'bcrypt';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';
import { serverUploadUtils } from '@/lib/utils';
import { authOptions } from '@/lib/authOptions';

export type IdentityPayload = {
  username?: string;
  email?: string;
  phone_number?: string;
};

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

export async function updateIdentity(payload: IdentityPayload) {
  if (Object.entries(payload).length === 0) {
    return { success: false, message: 'Tidak ada field yang berubah!' };
  }

  try {
    const session = await getServerSession(authOptions);
    await db.user.update({
      where: { email: session?.user.email },
      data: payload,
    });
    return { success: true, message: 'Berhasil memperbahrui profil.' };
  } catch (error) {
    console.error('[UPDATE_IDENTITY]', error);
    return { success: false, message: 'Gagal memperbaharui profil.' };
  }
}

export async function updatePassword(password: string) {
  try {
    const session = await getServerSession(authOptions);
    const hashedPassword = await bcyrpt.hash(password, 10);
    await db.user.update({
      where: { email: session?.user.email },
      data: { password: hashedPassword },
    });
    return { success: true, message: 'Berhasil memperbaharui kata sandi.' };
  } catch (error) {
    console.error('[UPDATE_PASSWORD]', error);
    return { success: false, message: 'Gagal memperbaharui kata sandi.' };
  }
}
