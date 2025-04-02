import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request) {
  try {
    const lessons = await prisma.lesson.findMany({
      include: {
        module: true,
      },
      orderBy: [
        {
          module: {
            order: 'asc',
          },
        },
        {
          order: 'asc',
        },
      ],
    });

    return NextResponse.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lessons' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, videoUrl, moduleId, order } = body;

    const lesson = await prisma.lesson.create({
      data: {
        title,
        description,
        videoUrl,
        moduleId,
        order,
      },
      include: {
        module: true,
      },
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error('Error creating lesson:', error);
    return NextResponse.json(
      { error: 'Failed to create lesson' },
      { status: 500 }
    );
  }
} 