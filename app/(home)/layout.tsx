import Navigation from "@/components/Navigation"
import { getLoggedInUser } from "@/lib/actions/user.action"
import { cn } from "@/lib/utils"
import { redirect } from "next/navigation"


export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {
    const loggedIn = await getLoggedInUser()
    if (!loggedIn) redirect('/login')
    return (
        <div >
            <Navigation user={loggedIn}/>
            <div className={cn("ml-14")}>

            {children}
            </div>
        </div>
    )
  }
  