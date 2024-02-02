import type {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connect from '@/app/utils/connection';
import {User} from '@/app/models/user';
import bcrypt from 'bcrypt';
import {NextResponse} from 'next/server';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email:', type: 'email', placeholder: 'Email'},
        password: {label: 'Password:', type: 'password'},
      },
      async authorize(credentials) {
        await connect();
        const user = await User.findOne({email: credentials?.email});
        if (user) {
          if (!credentials?.password) {
            return new NextResponse('Password incorrect', {status: 401});
          }
          const passwordCorrect = await bcrypt.compare(
            credentials?.password,
            user.passwordHash
          );
          if (!passwordCorrect) {
            return new NextResponse('Password incorrect', {status: 401});
          }
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/credentials',
  },
  secret: process.env.SECRET,
};
