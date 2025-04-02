'use client'

import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { toast } from "react-hot-toast"

export function NavBar() {
  const { data: session, status } = useSession()

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/auth/signin' })
      toast.success('Signed out successfully')
    } catch (error) {
      toast.error('Error signing out')
    }
  }

  return (
    <nav className="border-b bg-background">
      <div className="container flex h-16 items-center px-4 mx-auto">
        <Link href="/" className="font-bold text-xl">
          Trade Academy
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          {status === 'loading' ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : session?.user ? (
            <>
              <p className="text-sm text-muted-foreground">
                {session.user.email}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </>
          ) : (
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
} 