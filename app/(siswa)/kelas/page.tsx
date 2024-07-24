import RuangKelas from '@/components/RuangKelas'
import React from 'react'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Kelas',
  description: 'Kelas page',
}


const page = () => {
  return (
    <div> <RuangKelas/></div>
  )
}

export default page