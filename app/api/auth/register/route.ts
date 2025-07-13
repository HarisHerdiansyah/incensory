import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: 'ADMIN',
        verification: true,
      },
    });
    return new Response(
      JSON.stringify({
        success: true,
        message: 'User registered successfully.',
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to register user.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
