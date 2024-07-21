import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const HeroActivity = () => {
  return (
    <div>
        <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Activity</h1>
        <Link href={'https://www.figma.com/community/file/1105526080544578177/project-status-report'}>
            <Button >
            Create Figma Template
            </Button>
        </Link>
        </div>

    </div>
  )
}

export default HeroActivity