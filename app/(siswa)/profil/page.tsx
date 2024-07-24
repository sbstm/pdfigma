import Profile from '@/components/Profile'
import React from 'react'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Profil',
  description: 'Profil page',
  
}


const page = () => {
  return (
    <div><Profile/>
      </div>
  )
}

export default page