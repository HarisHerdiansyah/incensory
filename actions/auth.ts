'use server';

import bcrypt from 'bcrypt';
import { db } from '@/lib/db';

type RegisterState = { success: boolean | null; message: string };

export async function registerUser(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const fields = [
    'username',
    'email',
    'password',
    'confirmPassword',
    'phoneNumber',
    'accessCode',
  ] as const;
  const values = Object.fromEntries(
    fields.map((f) => [f, formData.get(f) as string])
  );

  if (Object.values(values).some((v) => !v)) {
    return { success: false, message: 'Semua field harus diisi.' };
  }

  if (values.password !== values.confirmPassword) {
    return { success: false, message: 'Kata sandi tidak cocok.' };
  }

  const existingUser = await db.user.findUnique({
    where: { email: values.email },
  });
  if (existingUser) {
    return { success: false, message: 'Akun sudah terdaftar.' };
  }

  const accessCode = await db.accessCode.findUnique({
    where: { code: values.accessCode },
  });
  if (!accessCode || accessCode.is_used) {
    return {
      success: false,
      message: 'Kode akses sudah digunakan atau tidak valid.',
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(values.password, 10);

    await db.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          username: values.username,
          email: values.email,
          password: hashedPassword,
          phone_number: values.phoneNumber,
        },
      });

      await tx.accessCode.update({
        where: { code: values.accessCode },
        data: { is_used: true, user_id: newUser.id },
      });
    });

    return { success: true, message: 'Berhasil mendaftar.' };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, message: 'Gagal mendaftarkan akun. Coba lagi.' };
  }
}
