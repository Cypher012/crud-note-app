import { NextResponse } from 'next/server';

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NO_CONTENT: 204,
} as const;

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status });
}

export { errorResponse, successResponse, HTTP_STATUS };
