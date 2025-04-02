import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayCircle, Clock, BookOpen } from "lucide-react"
import Link from "next/link"

export default async function ModuleDetailsPage({ params }) {
  const session = await auth()
  
  if (!session) {
    redirect('/auth/signin')
  }

  const module = await prisma.module.findUnique({
    where: {
      id: params.id,
      published: true
    },
    include: {
      lessons: {
        where: {
          published: true
        },
        orderBy: {
          order: 'asc'
        }
      }
    }
  })

  if (!module) {
    redirect('/modules')
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{module.title}</h1>
        <p className="text-lg text-muted-foreground">{module.description}</p>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <span>{module.estimatedHours} hours</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-5 w-5" />
            <span>{module.lessons.length} lessons</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {module.lessons.map((lesson, index) => (
          <Card key={lesson.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lesson {index + 1}: {lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </div>
                <Button asChild>
                  <Link href={`/modules/${module.id}/lessons/${lesson.id}`}>
                    <PlayCircle className="h-5 w-5 mr-2" />
                    Start Lesson
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Duration: {lesson.duration} minutes
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 