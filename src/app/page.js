import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, BookOpen, Brain, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="space-y-4">
          <CardTitle className="text-4xl text-center">Welcome to Trade Academy</CardTitle>
          <CardDescription className="text-center text-xl">
            Your journey to becoming a successful trader starts here
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">
              Trade Academy is your comprehensive platform for learning trading strategies, market analysis, 
              and practical trading skills. Powered by AI, our platform offers personalized learning paths 
              and real-time market insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2 text-center">
              <div className="mx-auto w-fit p-3 rounded-full bg-primary/10">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Comprehensive Learning</h3>
              <p className="text-sm text-muted-foreground">
                Access structured modules covering everything from basics to advanced trading strategies
              </p>
            </div>
            <div className="space-y-2 text-center">
              <div className="mx-auto w-fit p-3 rounded-full bg-primary/10">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">AI-Powered Insights</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized recommendations and market analysis powered by advanced AI
              </p>
            </div>
            <div className="space-y-2 text-center">
              <div className="mx-auto w-fit p-3 rounded-full bg-primary/10">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Practical Experience</h3>
              <p className="text-sm text-muted-foreground">
                Practice with real market data and simulated trading environments
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4 pt-4">
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
            <Link href="/modules" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Browse available modules →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
