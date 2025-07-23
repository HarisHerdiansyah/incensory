import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';
import { origins } from '@/lib/constants';

export async function OPTIONS(req: Request) {
  const origin = req.headers.get('origin') || '';
  if (!origins.includes(origin)) {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

export async function GET(req: Request) {
  const origin = req.headers.get('origin') || '';
  try {
    const auth = req.headers.get('Authorization');
    if (!auth?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: '' },
        {
          status: 401,
          headers: {
            'Access-Control-Allow-Origin': origin,
          },
        }
      );
    }

    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, process.env.VR_SECRET_KEY as string) as {
      email: string;
      code: string;
      category: string;
    };

    const user = await db.user.findUnique({
      where: { email: payload.email },
      select: { id: true, verification: true },
    });
    if (!user || !user.verification) {
      return NextResponse.json(
        { success: false, message: '' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': origin,
          },
        }
      );
    }

    const isCodeValid = await db.accessCode.findFirst({
      where: { user_id: user.id },
      select: { code: true },
    });
    if (!isCodeValid) {
      return NextResponse.json(
        { success: false, message: '' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': origin,
          },
        }
      );
    }

    return NextResponse.json(
      { success: true, message: '', data: { category: payload.category } },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': origin,
        },
      }
    );
  } catch (error) {
    console.error('[VR_VERIFY_TOKEN]', error);
    return NextResponse.json(
      { success: false, message: '' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': origin,
        },
      }
    );
  }
}
