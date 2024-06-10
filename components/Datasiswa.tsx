import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const data: UserProps[] = [
  {
    id: '1',
    email: '',
    firstName: 'Shad',
    lastName: 'Chen',
    kelas: '12',
    name: 'Shad Chen',
    role: 'student',
    photoURL: '',
    activity: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    grub: [],
  },
]

const Datasiswa = () => {
  const fallback = data[0].firstName[0] + data[0].lastName[0]
  return (
    <div className=" flex flex-col w-full">
      <div className="flex flex-row justify-center w-full p-10 ">
        <Avatar className="w-40 h-40 mr-[-100px] z-20">
          <AvatarImage src={data[0].photoURL} />
          <AvatarFallback className="text-5xl">{fallback}</AvatarFallback>
        </Avatar>
        <Avatar className="w-40 h-40 hover:z-30">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-center">
        <h1 className="text-2xl">
          {data[0].firstName + ' ' + data[0].lastName}
        </h1>
        <p>{data[0].role + ' ' + data[0].kelas}</p>
      </div>
      <div className="">
        <div className=" pt-10 items-center ">
          <h1 className="text-xl text-center m-4">Activity</h1>
          <Carousel className="w-full max-w-[80%] m-auto">
            <CarouselContent>
              {data[0].activity.map((item) => {
                return (
                  <CarouselItem
                    key={item}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-4xl font-semibold">{item}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className=" pt-10 items-center ">
        <h1 className="text-xl text-center m-4">Activity</h1>
        <Carousel className="w-full max-w-[80%] m-auto">
          <CarouselContent>
            {data[0].activity.map((item) => {
              return (
                <CarouselItem key={item} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">{item}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default Datasiswa
