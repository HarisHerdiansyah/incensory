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
          name: username,
          profileImage: profile_image ?? '',
          phone: phone_number,
          role,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === 'update') {
        if (session.email) token.email = session.email;
        if (session.name) token.name = session.name;
        if (session.profileImage) token.profileImage = session.profileImage;
        if (session.phone) token.phone = session.phone;
      }

      if (user) {
        token.email = user.email || '';
        token.name = user.name || '';
        token.profileImage = user.profileImage;
        token.phone = user.phone;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.profileImage = token.profileImage;
        session.user.phone = token.phone;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
