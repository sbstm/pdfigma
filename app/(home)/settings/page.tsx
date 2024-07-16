'use client';
import Setting from '@/components/Setting'
import { getLoggedInUser } from '@/lib/actions/user.action';
import React from 'react'

const page = async () => {

  return (
    <div>
      <Setting/>
    </div>
  )
}

export default page