'use server';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { db } from '@/lib/db';
import { emailHtmlContent } from '@/lib/utils';

type RegisterState = { success: boolean | null; message: string };

const mailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_KEY,
  },
});

export async function sendEmailVerification(payload: {
  userId: string;
  username: string;
  email: string;
  code: string;
}) {
  try {
    const token = jwt.sign(
      {
        id: payload.userId,
        email: payload.email,
        type: 'VERIFICATION',
        code: payload.code,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      }
    );

    const verificationLink = `${process.env.BASE_URL}/verify?token=${token}`;

    const response = await mailTransporter.sendMail({
      from: process.env.SMTP_SENDER,
      to: payload.email,
      subject: 'Verifikasi Akun',
      html: emailHtmlContent(payload.username, verificationLink),
    });

    console.log('Message sent:', response.messageId);
  } catch (error) {
    console.error('Failed to sent email', error);
  }
}

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

    const newUser = await db.user.create({
      data: {
        username: values.username,
        email: values.email,
        password: hashedPassword,
        phone_number: values.phoneNumber,
      },
    });

    await sendEmailVerification({
      userId: newUser.id,
      username: newUser.username,
      email: newUser.email,
      code: values.accessCode,
    });

    return {
      success: true,
      message: 'Akun berhasil didaftarkan. Periksa email untuk verifikasi.',
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, message: 'Gagal mendaftarkan akun. Coba lagi.' };
  }
}
