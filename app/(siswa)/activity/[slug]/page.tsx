'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="w-full flex flex-col ">
      <h1>Activity: {params.slug}</h1>
      <div className=" w-full= border-2 p-5 rounded-2xl">
        <iframe
          className="w-full h-[50vh] rounded-2xl"
          width="800"
          height="450"
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fboard%2FLJ1enH013mmOkYqroNWxa7%2FUntitled%3Fnode-id%3D0-1%26t%3DpV952PzNsJ1K1oHp-1"
        ></iframe>
        <h1 className="text-center my-3 text-2xl">sub materi</h1>
        <div className="flex flex-row justify-between">
          <div className="">kanan</div>
          <div className="">kiri</div>
        </div>
      </div>
    </div>
  )
}
