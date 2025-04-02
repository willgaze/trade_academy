import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getModules(userId) {
  try {
    const modules = await prisma.module.findMany({
      include: {
        userProgress: {
          where: {
            userId: userId,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return modules.map(module => ({
      ...module,
      progress: module.userProgress[0]?.progress || 0,
    }))
  } catch (error) {
    console.error('Error fetching modules:', error)
    return []
  }
}

export async function updateModuleProgress(userId, moduleId, progress) {
  try {
    return await prisma.userProgress.upsert({
      where: {
        userId_moduleId: {
          userId,
          moduleId,
        },
      },
      update: {
        progress,
      },
      create: {
        userId,
        moduleId,
        progress,
      },
    })
  } catch (error) {
    console.error('Error updating module progress:', error)
    throw error
  }
} 