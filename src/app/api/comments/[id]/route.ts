import { prisma } from '@/lib/db/prisma';
import { stat } from 'fs';
import { NextResponse } from 'next/server';

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const comment = await prisma.comment.delete({
      where: { id: params.id },
    });
    return new NextResponse('comment success delete', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('DATABASE-ERROR ', { status: 500 });
  }
};

const getCurrentDateTime = () => {
  const now = new Date();
  return now.toISOString(); // Повертаємо дату та час у форматі ISO, наприклад: "2023-07-18T12:34:56.789Z"
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();

try {
  const comment = await prisma.comment.update({
    where: { id: params.id },
    data: { content: body },
  });
  return new NextResponse(JSON.stringify(comment), {status: 201})
} catch (error) {
  console.log(error)
  return new NextResponse('DATABASE-ERROR ', {status: 500})
}
};
