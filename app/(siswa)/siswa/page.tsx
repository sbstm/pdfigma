import Datasiswa from '@/components/Datasiswa'
import React from 'react'

import { getLoggedInUser } from '@/lib/actions/user.action'

const page = async () => {
  const loggedIn = await getLoggedInUser()
  return (
    <div className="flex flex-col w-full">
      <Datasiswa user={loggedIn}/>
    </div>
  )
}

export default page
