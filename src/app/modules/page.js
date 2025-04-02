import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, BookOpen, CheckCircle, LogIn } from "lucide-react"
import Link from "next/link"
import { getModules } from "@/lib/db/modules"
import { auth } from "@/lib/auth"

export default async function ModulesPage() {
  const session = await auth()
  const modules = await getModules(session?.user?.id || '')

  if (!session) {
    return (
      <div className="container py-10">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <h1 className="text-3xl font-bold">Trading Modules</h1>
          <p className="text-muted-foreground">Please sign in to access the trading modules</p>
          <Button asChild>
            <Link href="/auth/signin">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Trading Modules</h1>
            <p className="text-muted-foreground mt-2">Master trading with our comprehensive learning modules</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">Welcome, {session.user.email}</p>
            <Button asChild>
              <Link href="/lessons">Go to Lessons</Link>
            </Button>
          </div>
        </div>
        
        {modules.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">No modules available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Card key={module.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{module.title}</CardTitle>
                    {module.progress === 100 && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{module.estimatedHours}h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{module.lessonsCount} lessons</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">Topics covered:</p>
                      <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                        {module.topics.map((topic, i) => (
                          <li key={i}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full group-hover:bg-primary/90">
                    <Link href={`/lessons?module=${module.slug}`}>
                      {module.progress > 0 ? "Continue Learning" : "Start Learning"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 