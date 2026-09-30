import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireSession } from '@/lib/api-auth';

export async function POST(request) {
  try {
    const denied = await requireSession()
    if (denied) return denied

    const body = await request.json();
    const { userId, lessonId, score } = body;

    const progress = await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        score,
        completed: true,
      },
      create: {
        userId,
        lessonId,
        score,
        completed: true,
      },
      include: {
        lesson: true,
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const denied = await requireSession()
    if (denied) return denied

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const progress = await prisma.progress.findMany({
      where: {
        userId,
      },
      include: {
        lesson: {
          include: {
            module: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
} 