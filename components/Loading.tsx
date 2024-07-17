import React from 'react'
import { Skeleton } from './ui/skeleton'

const Loading = () => {
  return (
    <div className="flex items-center space-x-4 w-full h-full">
        <Skeleton className="h-100 w-20 rounded-full" />
        <div className="space-y-2">
      <Skeleton className="h-50 w-full" />
      <Skeleton className="h-50 w-full" />
    </div>
    </div>
  )
}

export default Loading