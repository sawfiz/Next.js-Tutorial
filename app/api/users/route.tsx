// app/api/users/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import schema from './schema';
import prisma from '@/prisma/client';

// GET all objects
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// POST to create an object
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Use zod to validate POST data
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Check if users already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (existingUser)
    return NextResponse.json(
      { error: 'Email already in use.' },
      { status: 400 }
    );

  // Create user and return
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json({ user }, { status: 201 });
}
