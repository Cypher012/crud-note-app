import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse, HTTP_STATUS } from '../../utils';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const note = await prisma.note.findUnique({
    where: { id: params.id },
  });
  if (!note) return errorResponse('Note not found', HTTP_STATUS.NOT_FOUND);
  return successResponse(note, HTTP_STATUS.OK);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  //   check if note exist
  const note = await prisma.note.findUnique({
    where: { id: params.id },
  });
  if (!note) return errorResponse('Note not found', HTTP_STATUS.NOT_FOUND);
  await prisma.note.delete({
    where: { id: params.id },
  });
  return successResponse(
    { message: 'Note deleted successfully' },
    HTTP_STATUS.NO_CONTENT
  );
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { title, content } = await request.json();
  // const
  const note = await prisma.note.findUnique({
    where: { id: params.id },
  });
  if (!note) return errorResponse('Note not found', HTTP_STATUS.NOT_FOUND);
  const updatedNote = await prisma.note.update({
    where: { id: params.id },
    data: { title, content },
  });
  return successResponse(updatedNote, HTTP_STATUS.OK);
}
