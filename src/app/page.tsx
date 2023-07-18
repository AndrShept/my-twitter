import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { authOptions } from './api/auth/[...nextauth]/route';
import { signIn } from 'next-auth/react';
import { Button } from '../components/Button';
import { Feed } from '@/components/Feed';

export default async function Home() {
  return (
    <div>
      <Feed />
    </div>
  );
}
