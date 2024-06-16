'use client'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { readMatapelajaran } from '@/lib/actions/matapelajaran.actions'

const Tabeluser = () => {
  const [data, setData] = useState<MapelParams[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const matapelajaranData = await readMatapelajaran()
      setData(matapelajaranData)
    }
    fetchData()
  }, [])

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent data.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.deskripsi}</TableCell>
              <TableCell>{item.kelas}</TableCell>
              <TableCell className="text-right">{item.$id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export default Tabeluser
