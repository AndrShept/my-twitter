
import  { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from 'next-auth/adapters';
import { prisma } from '@/lib/db/prisma';
import NextAuth from 'next-auth/next';
import { PrismaClient } from '@prisma/client';
import { env } from '@/lib/env';



export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({session,user}){
      session.user.id = user.id
      session.user.username = '@'+session.user.name!.split(' ').join('').toLocaleLowerCase();
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }

  },

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}