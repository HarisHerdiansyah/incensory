import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { authOptions } from '@/lib/authOptions';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new Error('User is not validated');
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json(
        { success: false, message: '' },
        { status: 404 }
      );
    }

    const userAccessCode = await db.accessCode.findFirst({
      where: { user_id: user.id },
      select: { code: true },
    });
    if (!userAccessCode) {
      return NextResponse.json(
        { success: false, message: '' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        email: session.user.email,
        code: userAccessCode.code,
        category: body.category,
      },
      process.env.VR_SECRET_KEY as string,
      {
        expiresIn: '15m',
      }
    );

    return NextResponse.json(
      { success: true, message: '', data: { token } },
      { status: 200 }
    );
  } catch (error) {
    console.log('[VR_CREATE_TOKEN]', error);
    return NextResponse.json({ success: false, message: '' }, { status: 500 });
  }
}
