// app/api/users/[id]/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import schema from '../schema';
import prisma from '@/prisma/client';

// GET a single object
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Fetch data from db
  const user = await prisma.user.findUnique({
    where: {
      // params.id is a string, parse it to a number
      id: parseInt(params.id),
    },
  });

  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ user }, { status: 201 });
}

// PUT to update an object (replacing an object)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Validate the request body
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Find the user to update
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 400 });

  // Check if email is unique
  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (existingUser)
    return NextResponse.json(
      { error: 'Email already in use.' },
      { status: 400 }
    );

  // Update the user and return the updated user
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(params.id) },
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return NextResponse.json({ updatedUser }, { status: 203 });
}

// PATCH to updating 1 or more properties of an object

// DELETE to delete a user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Find if the user exists
  const user = prisma.user.findUnique({ where: { id: parseInt(params.id) } });
  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  // Delete the user and return response
  const result = prisma.user.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ result });
}
