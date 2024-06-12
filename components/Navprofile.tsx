import { Avatar } from '@radix-ui/react-avatar'
import React from 'react'
import { AvatarFallback, AvatarImage } from './ui/avatar'

const Navprofile = ({ user, size }: { user: UserProps; size: boolean }) => {
  const name = user.firstName + ' ' + user.lastName
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-center  gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={user.Link_foto} />
          <AvatarFallback className="text-xs font-serif">
            {user.firstName[0] + user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        {size === true ? (
          <div className="">
            <p className="text-lg font-bold">{name}</p>
            <p>{user.email}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Navprofile
