import { Admin, Partner, User } from '@prisma/client';
import { compare } from 'bcryptjs';
import NextAuth, { AuthOptions, User as AuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '../../../config/db';
import {
  LoginCredentials,
  LoginCredentials__Schema,
} from '../../../model/auth/credential-provider-model';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // @ts-ignore
      authorize: async (credentials) => {
        // Parse login credentials
        let loginCredentials: LoginCredentials;
        try {
          loginCredentials = LoginCredentials__Schema.parse(credentials);
        } catch (error) {
          throw new Error('Грешно потребителско име или парола');
        }

        // Get user from DB
        let user:
          | (User & {
              Admin: Admin | null;
              Partner: Partner | null;
            })
          | null;
        try {
          user = await prisma.user.findUnique({
            include: { Admin: true, Partner: true },
            where: {
              primaryEmail: loginCredentials.email,
            },
          });
        } catch (error) {
          throw new Error('Грешка в сървъъра.');
        }

        // Check if user exists
        if (!user) {
          throw new Error('Грешно потребителско име или парола');
        }

        // Check password match
        const isValid = compare(loginCredentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error('Грешно потребителско име или парола');
        }

        return {
          email: user.primaryEmail,
          image: !!user.Admin?.authorityLevel ? 'admin' : '',
          isAdmin: !!user.Admin?.authorityLevel,
          id: user.id,
          adminId: user.Admin?.id,
          partnerId: user.Partner?.id,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const isAdmin =
        // @ts-ignore
        user?.isAdmin === undefined ? token?.isAdmin : user?.isAdmin;

      // @ts-ignore
      const id = user?.id === undefined ? token?.id : user?.id;

      const adminId =
        // @ts-ignore
        user?.adminId === undefined ? token?.adminId : user?.adminId;

      const partnerId =
        // @ts-ignore
        user?.partnerId === undefined ? token?.partnerId : user?.partnerId;

      return {
        ...token,
        isAdmin,
        id,
        adminId,
        partnerId,
      };
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          isAdmin: (token as any)?.isAdmin,
          id: (token as any)?.id,
          adminId: (token as any)?.adminId,
          partnerId: (token as any)?.partnerId,
        },
      };
    },
  },
};
export default NextAuth(authOptions);
