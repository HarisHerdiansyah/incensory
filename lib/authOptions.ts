import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Kata Sandi', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email dan kata sandi harus diisi.');
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error('Akun tidak terdaftar.');
        }

        if (!user.verification) {
          throw new Error('Akun belum diverifikasi.');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Kata sandi salah.');
        }

        const { email, username, profile_image, role, phone_number } = user;

        return {
          id: '',
          email,
          username,
          profile_image: profile_image ?? '',
          phone_number,
          role,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === 'update') {
        if (session.email) token.email = session.email;
        if (session.username) token.username = session.username;
        if (session.profile_image) token.profile_image = session.profile_image;
        if (session.phone_number) token.phone_number = session.phone_number;
      }

      if (user) {
        token.email = user.email || '';
        token.username = user.username || '';
        token.profile_image = user.profile_image;
        token.phone_number = user.phone_number;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.profile_image = token.profile_image;
        session.user.phone_number = token.phone_number;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
