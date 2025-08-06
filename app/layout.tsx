import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { UserProfileProvider } from './components/user-profile-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BlogSpace - Share Your Stories',
  description: 'A modern blogging platform where you can write, share, and discover amazing stories from writers around the world.',
  keywords: ['blog', 'writing', 'stories', 'community', 'publishing'],
  authors: [{ name: 'BlogSpace Team' }],
  openGraph: {
    title: 'BlogSpace - Share Your Stories',
    description: 'A modern blogging platform where you can write, share, and discover amazing stories.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlogSpace - Share Your Stories',
    description: 'A modern blogging platform where you can write, share, and discover amazing stories.',
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={false}
          themes={['light', 'dark', 'minimal', 'system']}
          storageKey="blogspace-theme"
        >
          <UserProfileProvider>
            {children}
          </UserProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
