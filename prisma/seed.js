const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')
const { modules } = require('./curriculum')

const prisma = new PrismaClient()

// Seeding is idempotent: running it twice must not duplicate anything, and
// must not clobber edits made in the app. Modules are matched on title and
// lessons on (moduleId, title), because neither has a natural unique key in
// the schema.
//
// Content lives in curriculum.js. This file only knows how to put it in.
async function main() {
  const hashedPassword = await hash('password123', 12)

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  })

  let modulesSeeded = 0
  let lessonsSeeded = 0

  for (const m of modules) {
    const { lessons, ...moduleFields } = m

    const existingModule = await prisma.module.findFirst({
      where: { title: m.title },
    })

    const savedModule = existingModule
      ? await prisma.module.update({
          where: { id: existingModule.id },
          data: moduleFields,
        })
      : await prisma.module.create({ data: moduleFields })

    modulesSeeded++

    for (const l of lessons) {
      const existingLesson = await prisma.lesson.findFirst({
        where: { moduleId: savedModule.id, title: l.title },
      })

      if (existingLesson) {
        await prisma.lesson.update({
          where: { id: existingLesson.id },
          data: l,
        })
      } else {
        await prisma.lesson.create({
          data: { ...l, moduleId: savedModule.id },
        })
      }

      lessonsSeeded++
    }
  }

  const published = await prisma.module.count({ where: { published: true } })

  console.log(`user            ${user.email}`)
  console.log(`modules seeded  ${modulesSeeded}`)
  console.log(`lessons seeded  ${lessonsSeeded}`)
  console.log(`published       ${published} module(s) visible in the app`)

  if (published === 0) {
    console.log(
      '\nNothing is published yet, so the modules page will be empty.\n' +
        'That is deliberate — the curriculum is a draft awaiting review.\n' +
        'Publish a module once its content has been checked.'
    )
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
