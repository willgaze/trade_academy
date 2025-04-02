import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, BookOpen } from "lucide-react"
import Link from "next/link"

export default async function ModulesPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/auth/signin')
  }

  const modules = await prisma.module.findMany({
    where: {
      published: true
    },
    orderBy: {
      order: 'asc'
    },
    include: {
      lessons: {
        where: {
          published: true
        }
      }
    }
  })

  if (modules.length === 0) {
    return (
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Your Learning Modules</h1>
        <Card>
          <CardHeader>
            <CardTitle>No Modules Available</CardTitle>
            <CardDescription>
              There are no learning modules available at the moment. Please check back later.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Your Learning Modules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Link key={module.id} href={`/modules/${module.id}`}>
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{module.estimatedHours}h</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>{module.lessons.length} lessons</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
} 