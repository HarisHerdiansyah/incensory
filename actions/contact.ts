'use server';

import nodemailer from 'nodemailer';

type ContactFormState = { success: boolean | null; message: string };

const mailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_KEY,
  },
});

export async function sendContactEmail(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const fields = ['name', 'email', 'subject', 'message'] as const;
  const values = Object.fromEntries(
    fields.map((f) => [f, formData.get(f) as string])
  );

  if (Object.values(values).some((v) => !v)) {
    return { success: false, message: 'Semua field harus diisi.' };
  }

  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: values.subject,
      text: values.message,
      replyTo: values.email,
    };

    const response = await mailTransporter.sendMail(mailOptions);
    console.log('Message sent:', response.messageId);
    return { success: true, message: 'Email berhasil dikirim.' };
  } catch (error) {
    console.error('Error sending email (contact):', error);
    return { success: false, message: 'Gagal mengirim email.' };
  }
}
