"use client";
import { readMatapelajaran } from '@/lib/actions/matapelajaran.actions'
import { set } from 'date-fns'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const ReadMapel = () => {
    const [data, setData] = useState([
        {
            id: 1,
            name: '',
            deskripsi: '',
            image_url: '',
        }
    ])
    useEffect(() => {
        const fetchData = async () => {
            const response = await readMatapelajaran()
            setData(response)
        }
        fetchData()
    }, [])
    console.log(data)
  return (
    <div>ReadMapel

    {data.map((data) => (
        <Card key={data.id} className="w-full">
            <CardHeader>
                <CardTitle>{data.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{data.deskripsi}</CardDescription>
            </CardContent>
            <CardFooter>
                <Button  >Lihat</Button>
            </CardFooter>
        </Card>
    ))}
</div>
  )
}

export default ReadMapel