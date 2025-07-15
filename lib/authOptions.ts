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

        const { email, username, profile_image, role } = user;

        return {
          id: '',
          email,
          name: username,
          profileImage: profile_image ?? '',
          role,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.email || '';
        token.name = user.name || '';
        token.profileImage = user.profileImage;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.profileImage = token.profileImage;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
