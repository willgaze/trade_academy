# Trade Academy

A modern, open-source learning platform for plumbing apprentices. Built with Next.js, Prisma, and OpenAI.

## Features

- 🎥 YouTube video integration with automatic quiz generation
- 📱 Mobile-first, responsive dark theme design
- 📊 Progress tracking for apprentices
- 🤖 AI-powered quiz generation from video content
- 🔒 User authentication and role management
- 📚 Structured learning modules based on City & Guilds

## Tech Stack

- **Frontend:** Next.js 14, TailwindCSS, React Hot Toast
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (Neon)
- **AI:** OpenAI GPT-3.5 for quiz generation
- **Authentication:** NextAuth.js (coming soon)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/willgaze/trade_academy.git
cd trade_academy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with:
```
DATABASE_URL="your-neon-db-url"
NEXTAUTH_SECRET="your-secret-key"
OPENAI_API_KEY="your-openai-api-key"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── lib/             # Utility functions
└── styles/          # Global styles
prisma/
└── schema.prisma    # Database schema
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-source and available under the MIT License.
