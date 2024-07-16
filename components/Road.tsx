'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarLinks } from '@/constants/SidebarLinks'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbEllipsis,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDownIcon } from '@radix-ui/react-icons'

interface BreadcrumbLinkData {
  href: string
  label: string
}

const Road: React.FC = () => {
  const currentPath = usePathname()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)  

  const getBreadcrumbLinks = (): BreadcrumbLinkData[] => {
    const pathSegments = currentPath.split('/').filter(Boolean)

    return pathSegments.map((segment, index) => ({
      href: `/${pathSegments.slice(0, index + 1).join('/')}`,
      label: decodeURIComponent(segment),
    }))
  }
  return (
    <div className="py-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbSeparator />
          {getBreadcrumbLinks().map((link, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <Link href={link.href} legacyBehavior passHref>
                  <BreadcrumbLink>{link.label}</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>

              {index < getBreadcrumbLinks().length - 1 && (
                <BreadcrumbSeparator>
                  <BreadcrumbSeparator />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}

          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
               <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
              {SidebarLinks.map((item : any) => (
                <Link
                  key={item.label}
                  href={item.route}
                  >

                <DropdownMenuItem>{item.label}</DropdownMenuItem>
                  </Link>
              
              ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default Road
