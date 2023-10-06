import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { BackArrow } from '@/components/BackArrow';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import React from 'react';
import { EditForm } from './EditForm';
import { Metadata } from 'next';


export const  metadata:Metadata = {
title: 'Edit Profile'
}

const page = async ({ params }: { params: { id: string } }) => {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }
  if (!user) {
    return;
  }

  return (
    <section className='border border-border min-h-full  '>
      <EditForm user={user} />
    </section>
  );
};

export default page;
