import Activity from '@/components/Activity'
import React from 'react'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Activity',
  description: 'Activity page',
}

const page = () => {
  return (
    <div className='p-3'>
      <Activity/></div>
  )
}

export default page