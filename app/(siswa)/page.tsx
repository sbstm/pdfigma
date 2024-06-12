import React from 'react'
import { Inter as FontSans } from 'next/font/google'
import { Button } from '@/components/ui/button'
import Inputform from '@/components/Inputform'

const Home = () => {
  return (
    <div className=" flex flex-row items-center ">
      <Inputform />
    </div>
  )
}

export default Home
