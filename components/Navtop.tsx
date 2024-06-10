'use client'
import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'

const Navtop = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
      setIsDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setIsDarkMode(false)
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    }
  }

  return (
    <div className="flex flex-row w-full  justify-between p-5 filter:drop-shadow-md">
      <div className=" flex gap-2">
        <Image src="/icons/arrow-right.svg" alt="dqa" width={20} height={50} />
        <h1 className="">pdfigma</h1>
      </div>
      <div className=" flex gap-3 items-center ">
        <Switch id="dark-mode" onClick={toggleDarkMode} />
        <Label htmlFor="dark-mode">{!isDarkMode ? '☀️' : '🌙'}</Label>
      </div>
    </div>
  )
}

export default Navtop
