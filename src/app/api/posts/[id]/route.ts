import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const post = await prisma.post.delete({
      where: {
        id: params.id,
      },
    });
    revalidatePath('/');
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new NextResponse('Database ERROR', { status: 500 });
  }
};

// export const PUT = async (
//   req: Request,
//   { params }: { params: { id: string } }
// ) => {
//   try {
//     const authorId = await req.json();

//     console.log(authorId ,'authorId' )
//     console.log(params.id ,'params' )
    
//     const like = await prisma.post.update({
//       where: { id: params.id },
//       data: { Like: {connect: {id: authorId}}}
      
//     });
//     return new NextResponse(JSON.stringify(like), { status: 201 });
//   } catch (error) {
//     return new NextResponse('Database ERROR', { status: 500 });
//   }
// };
