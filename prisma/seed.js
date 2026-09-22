const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await hash('password123', 12)
  
  // Create test user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  })

  // Create test module. Idempotent: re-running the seed must not duplicate
  // rows. `create` did, which is how the modules page ended up listing
  // "Introduction to Plumbing" twice.
  const existing = await prisma.module.findFirst({
    where: { title: 'Introduction to Plumbing' },
  })

  const module = existing
    ? await prisma.module.update({
        where: { id: existing.id },
        data: {
          description:
            'Learn the basics of plumbing, including tools, materials, and safety procedures.',
          estimatedHours: 2,
          order: 1,
        },
      })
    : await prisma.module.create({
        data: {
          title: 'Introduction to Plumbing',
          description:
            'Learn the basics of plumbing, including tools, materials, and safety procedures.',
          estimatedHours: 2,
          order: 1,
          lessons: {
            create: [
              {
                title: 'Basic Tools',
                description: 'Learn about the essential tools used in plumbing.',
                content:
                  'In this lesson, we will cover the basic tools that every plumber needs...',
                duration: 30,
                order: 1,
              },
              {
                title: 'Safety First',
                description: 'Understanding safety procedures and precautions.',
                content: 'Safety is paramount in plumbing. In this lesson...',
                duration: 45,
                order: 2,
              },
            ],
          },
        },
      })

  console.log({ user, module })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 