import { compare } from "bcryptjs"
import prisma from "@/lib/prisma"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// NextAuth v5 (Auth.js). The config is handed to NextAuth() here and the
// results exported, rather than v4's pattern of exporting a bare `authOptions`
// object and calling getServerSession(authOptions) at each use site.
//
//   handlers - route handlers for /api/auth/[...nextauth]
//   auth     - server-side session lookup, replaces getServerSession
//   signIn   - server-side sign-in, also used by the middleware
//   signOut  - server-side sign-out
//
// `auth` keeps the same name and return shape the rest of the app already
// called, so no page or component needed changing.
export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          select: {
            id: true,
            email: true,
            password: true,
          }
        })

        if (!user || !(await compare(credentials.password, user.password))) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub
      }
      return session
    }
  }
}) 