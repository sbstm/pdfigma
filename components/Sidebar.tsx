'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants'
import Navprofile from './Navprofile'

const Sidebar = ({ user }: SiderbarProps) => {
  const [opensidebar, setOpensidebar] = useState(true)
  const pathname = usePathname()

  const handleopensidebar = () => {
    setOpensidebar(!opensidebar)
  }

  return (
    <div className=" flex flex-col items-start justify-between h-full w-full ">
      <div className="w-full">

      <div className=" flex flex-row w-full">
        <Image
          src="/icons/arrow-right.svg"
          alt="dqa"
          className={cn('items-center', { 'items-center  rotate-180': opensidebar })}
          width={35}
          height={35}
          onClick={handleopensidebar}
          />
      </div>
      {sidebarLinks.map((item) => {
        const isActive =
        pathname === item.route || pathname.startsWith(`${item.route}/`)
        
        return (
          <Link
          href={item.route}
          key={item.label}
          className={cn('flex flex-row items-start justify-start w-full my-2 gap-2 p-3  rounded-xl border bg-card text-card-foreground shadow', {
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
              className={cn('sidebar-label text-current ', {
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
      <Navprofile size={opensidebar} user={user} />
    </div>
  )
}

export default Sidebar
