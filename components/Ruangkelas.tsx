'use client'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BellIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { Progress } from './ui/progress'

const data: MataPelajaran[] = [
  {
    id: '1',
    nama: 'Matematika',
    subTema: [
      {
        id: '1',
        content: 'Pengenalan Bilangan Bulat',
        completed: true,
      },
      {
        id: '2',
        content: 'Operasi Bilangan asd asjdkljalkwjiskadj asksajldBulat',
        completed: true,
      },
    ],
  },
  {
    id: '5',
    nama: 'Matematika',
    subTema: [
      {
        id: '1',
        content: 'Pengenalan Bilangan Bulat',
        completed: true,
      },
      {
        id: '2',
        content: 'Operasi Bilangan asd asjdkljalkwjiskadj asksajldBulat',
        completed: false,
      },
    ],
  },
  {
    id: '9',
    nama: 'Matematika',
    subTema: [
      {
        id: '1',
        content: 'Pengenalan Bilangan Bulat',
        completed: true,
      },
      {
        id: '2',
        content: 'Operasi Bilangan asd asjdkljalkwjiskadj asksajldBulat',
        completed: false,
      },
    ],
  },
  {
    id: '2',
    nama: 'Bahasa Indonesia',
    subTema: [
      {
        id: '1',
        content: 'Pengenalan Kata',
        completed: true,
      },
      {
        id: '3',
        content: 'Pengenalan PARAGRAF',
        completed: false,
      },
      {
        id: '2',
        content: 'Pengenalan Kalimat',
        completed: false,
      },
    ],
  },
]

const Ruangkelas = () => {
  const [activeSubTema, setActiveSubTema] = useState<Record<string, boolean>>(
    {}
  )
  const [percentagePerSubject, setPercentagePerSubject] = useState<
    Record<string, number>
  >({})
  const [percentageComplete, setPercentageComplete] = useState<number>(0)
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState<
    Record<string, boolean>
  >(data.reduce((acc, item) => ({ ...acc, [item.id]: false }), {}))
  const [subTemaCompleted, setSubTemaCompleted] = useState<
    Record<string, boolean>
  >(
    data.reduce((acc, item) => {
      item.subTema.forEach((sub) => {
        acc[`${item.id}-${sub.id}`] = sub.completed
      })
      return acc
    }, {} as Record<string, boolean>)
  )

  const toggleSubTema = (mataPelajaranId: string, subTemaId: string) => {
    setActiveSubTema((prev) => ({
      ...prev,
      [`${Number(mataPelajaranId)}-${Number(subTemaId)}`]:
        !prev[`${Number(mataPelajaranId)}-${Number(subTemaId)}`],
    }))
  }

  const toggleSubTemaCompleted = (
    mataPelajaranId: string,
    subTemaId: string
  ) => {
    setSubTemaCompleted((prev) => ({
      ...prev,
      [`${mataPelajaranId}-${subTemaId}`]:
        !prev[`${mataPelajaranId}-${subTemaId}`],
    }))
  }
  useEffect(() => {
    const calculatePercentages = () => {
      const newPercentages: Record<string, number> = {}
      data.forEach((item) => {
        const completedForSubject = item.subTema.filter(
          (sub) => subTemaCompleted[`${item.id}-${sub.id}`]
        ).length
        const totalForSubject = item.subTema.length
        newPercentages[item.id] = (completedForSubject / totalForSubject) * 100
      })
      setPercentagePerSubject(newPercentages)
    }

    calculatePercentages()
  }, [subTemaCompleted])

  useEffect(() => {
    const calculatePercentage = () => {
      const completedCount =
        Object.values(subTemaCompleted).filter(Boolean).length
      const totalCount = Object.values(subTemaCompleted).length
      const percentage = (completedCount / totalCount) * 100

      // Update state or perform other actions with the calculated percentage
      setPercentageComplete(percentage) // Example: setting state for display
    }

    calculatePercentage() // Initial calculation
  }, [subTemaCompleted]) // Dependency array

  return (
    <section>
      <div className="w-full">
        <Card className={cn('w-full')}>
          <CardHeader>
            <CardTitle>Mata Pelajaran</CardTitle>
            <CardDescription>haha aja dulu</CardDescription>
          </CardHeader>
          <CardContent className=" gap-4">
            <div className=" grid grid-cols-2 gap-4 ">
              {data.map((item) => (
                <Card className={cn('p-4 h-min')}>
                  <div key={item.id} className="p-4 rounded-md">
                    <Collapsible
                      open={isCollapsibleOpen[item.id]}
                      onOpenChange={(open) =>
                        setIsCollapsibleOpen((prev) => ({
                          ...prev,
                          [item.id]: open,
                        }))
                      }
                      className="w-full space-y-2"
                    >
                      <div className="flex items-center justify-between space-x-4 px-4 ">
                        <h2 className="text-xl font-semibold">{item.nama}</h2>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <CaretSortIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="space-y-2">
                        <div className="list-disc list-inside">
                          {item.subTema.map((sub) => (
                            <Card className={cn('w-full p-2 my-3')}>
                              <div key={sub.id} className="">
                                <div className=" flex flex-row justify-between">
                                  <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() =>
                                      toggleSubTema(item.id, sub.id)
                                    }
                                  >
                                    {sub.content}
                                  </button>
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      id="compilete"
                                      checked={
                                        subTemaCompleted[`${item.id}-${sub.id}`]
                                      }
                                      onCheckedChange={() =>
                                        toggleSubTemaCompleted(item.id, sub.id)
                                      }
                                    />
                                    <Label>{sub.completed ? '👍🏻' : '👎🏾'}</Label>
                                  </div>
                                </div>
                                {activeSubTema[`${item.id}-${sub.id}`] && (
                                  <div className="ml-4 mt-2">
                                    {/* Konten materi pembelajaran di sini */}
                                    <p>{sub.content}</p>
                                  </div>
                                )}
                              </div>
                            </Card>
                          ))}
                          <Progress
                            value={
                              percentagePerSubject.hasOwnProperty(item.id)
                                ? percentagePerSubject[item.id]
                                : 0
                            }
                            className="w-2/3"
                          />
                          <p className="ml-2 text-sm text-gray-500">
                            {(percentagePerSubject[item.id] || 0).toFixed(1)}%
                          </p>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter className="w-full justify-around">
            <Progress value={percentageComplete} className="w-4/5" />
            <p className="w-auto">{`${percentageComplete.toFixed(1)} %`}</p>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

export default Ruangkelas
