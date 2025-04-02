import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const modules = [
    {
      title: "Basic Trading",
      description: "Learn the fundamentals of trading",
      estimatedHours: 4,
      topics: ["Market basics", "Trading terminology", "Basic chart analysis"],
      slug: "basic",
      lessonsCount: 5,
    },
    {
      title: "Advanced Trading",
      description: "Master advanced trading concepts",
      estimatedHours: 6,
      topics: ["Technical analysis", "Risk management", "Trading strategies"],
      slug: "advanced",
      lessonsCount: 8,
    },
    {
      title: "Professional Trading",
      description: "Expert-level trading techniques",
      estimatedHours: 8,
      topics: ["Portfolio management", "Advanced strategies", "Market psychology"],
      slug: "professional",
      lessonsCount: 10,
    },
  ]

  console.log('Start seeding modules...')
  
  for (const module of modules) {
    const existingModule = await prisma.module.findUnique({
      where: { slug: module.slug },
    })

    if (!existingModule) {
      await prisma.module.create({
        data: module,
      })
      console.log(`Created module: ${module.title}`)
    } else {
      console.log(`Module already exists: ${module.title}`)
    }
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 