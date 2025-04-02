import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/components/providers/auth-provider'
import { NavBar } from '@/components/nav-bar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Trade Academy',
  description: 'Learn trading with AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <NavBar />
            <main className="flex-1">{children}</main>
            <Toaster 
              position="bottom-right"
              toastOptions={{
                className: 'bg-background border border-border',
                style: {
                  background: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--border))',
                },
              }}
            />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
