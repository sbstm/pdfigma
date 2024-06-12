import AuthForm from '@/components/Authform'
import React from 'react'

const page = () => {
  return (
    <div className="flex min-h-screen w-full justify-center pt-[100px] font-inter">
      <AuthForm type="sign-up" />
    </div>
  )
}

export default page
