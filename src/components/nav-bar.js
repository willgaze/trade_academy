'use client'

import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { LogOut } from "lucide-react"

export default function NavBar() {
  const { data: session, status } = useSession()

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/auth/signin' })
  }

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Trade Academy
        </Link>

        <div className="flex items-center gap-4">
          {status === 'authenticated' && session?.user ? (
            <>
              <span className="text-sm text-muted-foreground">
                {session.user.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : status === 'loading' ? (
            <span className="text-sm text-muted-foreground">Loading...</span>
          ) : (
            <Button asChild size="sm">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
} 