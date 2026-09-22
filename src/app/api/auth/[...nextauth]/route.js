// v5 exposes ready-made handlers from the NextAuth() call in src/lib/auth.js.
// v4 built a single handler here with NextAuth(authOptions) and aliased it to
// both verbs.
import { handlers } from "@/lib/auth"

export const { GET, POST } = handlers
