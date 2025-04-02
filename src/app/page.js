import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Hero Section */}
      <div className="relative flex place-items-center">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold tracking-tight">
            Trade
            <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent"> Academy</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Free, interactive plumbing training platform. Built for apprentices, by professionals.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <a
              href="/modules"
              className="rounded-lg px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Start Learning
            </a>
            <a
              href="/about"
              className="rounded-lg px-6 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left mt-24">
        <div className="group rounded-lg border border-border px-5 py-4 transition-colors">
          <h2 className="mb-3 text-2xl font-semibold">
            Interactive Learning{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-muted-foreground">
            Learn through videos and hands-on quizzes. Track your progress as you go.
          </p>
        </div>

        <div className="group rounded-lg border border-border px-5 py-4 transition-colors">
          <h2 className="mb-3 text-2xl font-semibold">
            City & Guilds Aligned{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-muted-foreground">
            Content structured around official City & Guilds curriculum.
          </p>
        </div>

        <div className="group rounded-lg border border-border px-5 py-4 transition-colors">
          <h2 className="mb-3 text-2xl font-semibold">
            Always Free{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-muted-foreground">
            Open to all. No subscription needed. Start learning today.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center items-center gap-8 mt-16 text-sm text-muted-foreground">
        <a href="/privacy" className="hover:text-foreground transition-colors">
          Privacy Policy
        </a>
        <a href="/terms" className="hover:text-foreground transition-colors">
          Terms of Use
        </a>
        <a href="/contact" className="hover:text-foreground transition-colors">
          Contact
        </a>
      </div>
    </main>
  )
}
