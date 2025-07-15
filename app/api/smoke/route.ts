import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log('✅ SMTP ENV CHECK');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('SMTP_KEY is defined:', process.env.SMTP_KEY);
  console.log('SMTP_SENDER:', process.env.SMTP_SENDER);

  return NextResponse.json({ msg: 'ok' }, { status: 200 });
}
