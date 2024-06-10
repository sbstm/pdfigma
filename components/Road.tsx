'use client'
import React from 'react'
import { ChevronDownIcon, SlashIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
import { SearchBar } from '@rneui/themed'

interface BreadcrumbLinkData {
  href: string
  label: string
}

const Road: React.FC = () => {
  const currentPath = usePathname()

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
              <DropdownMenuTrigger className="flex items-center gap-1">
                <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default Road
