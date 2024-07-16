import Navigation from "@/components/Navigation"


export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {
    return (
        <div>
            <div>

            {children}
            </div>
        </div>
    )
  }
  