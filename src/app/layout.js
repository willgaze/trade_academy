import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/components/providers/session-provider'
import ToasterProvider from '@/components/providers/toaster-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Trade Academy',
  description: 'Free online training platform for plumbing apprentices',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
          <ToasterProvider />
        </AuthProvider>
      </body>
    </html>
  )
}
