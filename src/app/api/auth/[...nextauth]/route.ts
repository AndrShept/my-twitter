import { env } from './../../../../lib/env';
import  { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from 'next-auth/adapters';
import { prisma } from '@/lib/db/prisma';
import NextAuth from 'next-auth/next';
import { PrismaClient } from '@prisma/client';



export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID ,
      clientSecret: env.GOOGLE_CLIENT_SECRET ,
    }),
  ],
  callbacks: {
    session({session,user}){
      session.user.id = user.id
      session.user.username = session.user.name!.split(' ').join('').toLocaleLowerCase();
      return session
    },

  },

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}