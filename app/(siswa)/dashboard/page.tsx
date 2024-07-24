
import TabelNilai from '@/components/TabelNilai'
import React from 'react'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page',
}

const page = () => {
  return (
    <div>
      <div className="">
       <TabelNilai/>
        </div>      
    </div>
  )
}

export default page