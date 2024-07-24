'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarLinks } from '@/constants/SidebarLinks'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [breadcrumbLinks, setBreadcrumbLinks] = useState<BreadcrumbLinkData[]>([])

  useEffect(() => {
    const getBreadcrumbLinks = (): BreadcrumbLinkData[] => {
      const pathSegments = currentPath.split('/').filter(Boolean)
      return pathSegments.map((segment, index) => ({
        href: `/${pathSegments.slice(0, index + 1).join('/')}`,
        label: decodeURIComponent(segment.replace(/%20/g, ' ')), // Decoding URL and replacing %20 with space
      }))
    }

    setBreadcrumbLinks(getBreadcrumbLinks())
  }, [currentPath])

  return (
    <div className="py-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbSeparator />
          {breadcrumbLinks.map((link, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <Link href={link.href} legacyBehavior passHref>
                  <BreadcrumbLink>{link.label}</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>

              {index < breadcrumbLinks.length - 1 && (
                <BreadcrumbSeparator />
              )}
            </React.Fragment>
          ))}

          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {SidebarLinks.map((item: any) => (
                  <Link key={item.label} href={item.route} legacyBehavior passHref>
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
