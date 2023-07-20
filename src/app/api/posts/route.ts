import { prisma } from '@/lib/db/prisma'
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
    try {
      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });
     
  
  
      return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (error) {
      console.error('Database error:', error);
      return new NextResponse('Database ERROR', { status: 500 });
    }
  };

export const POST = async (req: Request) => {
    try {
      const { content, image, authorId, authorName,authorUserName, authorImage } =
        await req.json();
  
      await prisma.post.create({
        data: { content, image, authorId, authorName,authorUserName, authorImage },
      });
      revalidatePath('/')
    } catch (error) {
      throw new Error('error create post');
    }
  
    return new NextResponse('Post created success', { status: 201 });
  };
  