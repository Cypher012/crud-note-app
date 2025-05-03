// app/api/notes/route.ts
import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse, HTTP_STATUS } from '../utils';

export async function GET() {
  const notes = await prisma.note.findMany();
  return successResponse(notes, HTTP_STATUS.OK);
}

export async function POST(request: Request) {
  const body = await request.json();
  const title = body.title;
  const notes = await prisma.note.findUnique({
    where: { title: title },
  });
  if (notes) {
    return errorResponse('Note already exists', HTTP_STATUS.BAD_REQUEST);
  }
  const note = await prisma.note.create({
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return successResponse(note, HTTP_STATUS.CREATED);
}
