'use client'
import { Avatar } from '@radix-ui/react-avatar'
import React from 'react'
import { AvatarFallback, AvatarImage } from './ui/avatar'
import { signOut } from '@/lib/actions/user.action';
import { useRouter } from 'next/navigation';
import { Card } from './ui/card';

const Navprofile = ({ user, size }: { user: UserParams; size: boolean }) => {

  const router = useRouter()
  const handlelogout = async () => {
    // await signOut()
    // router.push('/')
  }
  
  return (
    <div className="flex flex-col w-full">
      
      <Card className="flex flex-row items-center justify-center w-full  gap-2 p-2 rounded-xl">
        <Avatar className="w-10 h-10" onClick={handlelogout}>
          <AvatarImage src={user.photoURL} />
          <AvatarFallback className="text-xs font-serif w-10 h-10">
            {user.firstName[0] + user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        {size === true ? (
          <div className="w-full">
            <p className="w-auto  text-sm">{user.name}</p>
            <p className='text-xs'>{user.email}</p>
          </div>
        ) : null}
      </Card>
    </div>
  )
}

export default Navprofile
