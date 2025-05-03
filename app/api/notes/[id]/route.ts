import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse, HTTP_STATUS } from '../../utils';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const note = await prisma.note.findUnique({
      where: { id: context.params.id },
    });
    if (!note) return errorResponse('Note not found', HTTP_STATUS.NOT_FOUND);
    return successResponse(note, HTTP_STATUS.OK);
  } catch (error: unknown) {
    console.error('Error fetching note:', error);
    return errorResponse(
      'Error fetching note',
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await prisma.note.delete({
      where: { id: context.params.id },
    });
    return successResponse(null, HTTP_STATUS.NO_CONTENT);
  } catch (error: unknown) {
    console.error('Error deleting note:', error);
    return errorResponse(
      'Error deleting note',
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const note = await prisma.note.update({
      where: { id: context.params.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return successResponse(note, HTTP_STATUS.OK);
  } catch (error: unknown) {
    console.error('Error updating note:', error);
    return errorResponse(
      'Error updating note',
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
}
