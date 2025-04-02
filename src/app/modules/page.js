import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
    }
  })

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
                <div className="text-sm text-muted-foreground">
                  {module.lessons} lessons
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
} 