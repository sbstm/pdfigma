import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import '../globals.css'
import { cn } from '@/lib/utils'
import Navtop from '@/components/Navtop'
import Sidebar from '@/components/Sidebar'
import Road from '@/components/Road'
import { getLoggedInUser } from '@/lib/actions/user.action'
import { redirect } from 'next/navigation'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const loggedIn = await getLoggedInUser()

  if (!loggedIn) redirect('/sign-in')
  return (
    <div
      className={cn(
        'w-full bg-background font-sans antialiased',
        fontSans.variable
      )}
    >
      <div className=" flex flex-row">
        <div className="border-r-2 sticky left-0 top-0 flex h-screen w-auto flex-col  justify-between p-4 ">
          <Sidebar user={loggedIn} />
        </div>

        <div className="flex flex-col w-full h-full items-start justify-between p-6">
          <Navtop />
          <Road />
          {children}
        </div>
      </div>
    </div>
  )
}
