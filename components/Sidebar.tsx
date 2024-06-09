'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants'

const Sidebar = ({ user }: SiderbarProps) => {
  const [opensidebar, setOpensidebar] = useState(true)
  const pathname = usePathname()

  const handleopensidebar = () => {
    setOpensidebar(!opensidebar)
  }

  return (
    <div className=" flex flex-col items-start justify-items-start h-96 w-full">
      <div className=" flex flex-row w-full">
        <Image
          src="/icons/arrow-right.svg"
          alt="dqa"
          className={cn('', { 'items-end  rotate-180': opensidebar })}
          width={35}
          height={35}
          onClick={handleopensidebar}
        />
      </div>
      <div className="h-2"></div>

      {sidebarLinks.map((item) => {
        const isActive =
          pathname === item.route || pathname.startsWith(`${item.route}/`)

        return (
          <Link
            href={item.route}
            key={item.label}
            className={cn('flex flex-row m-2 p-2 rounded-xl gap-3', {
              'bg-[#f9802d]': isActive,
            })}
          >
            <div className="relative size-6">
              <Image
                src={item.imgURL}
                alt={item.label}
                width={50}
                height={50}
                className={cn(
                  {
                    'brightness-[3] invert-0': isActive,
                  },
                  { 'justify-items-center-center': !opensidebar }
                )}
              />
            </div>
            <p
              className={cn('sidebar-label', {
                '!text-white': isActive,
                hidden: !opensidebar,
              })}
            >
              {item.label}
            </p>
          </Link>
        )
      })}
    </div>
  )
}

export default Sidebar
