import { UserRole } from '@prisma/client';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      profileImage?: string;
      phone: string;
      role: UserRole;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    profileImage?: string;
    phone: string;
    role: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    email: string;
    name: string;
    profileImage?: string;
    phone: string;
    role: UserRole;
  }
}
