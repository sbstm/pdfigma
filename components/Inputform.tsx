'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { createMatapelajaran } from '@/lib/actions/matapelajaran.actions'

const Inputform = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nama: '',
    describe: '',
    link: '',
    date: new Date().toISOString(),
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      console.log('Data Submitted: ', formData)
      const response = await createMatapelajaran(formData)
      console.log('Response from API: ', response)
      // Redirect atau lakukan sesuatu setelah berhasil
      router.push('/success') // Misalnya, arahkan ke halaman sukses
    } catch (error) {
      setError('Failed to create Matapelajaran.')
      console.error('Error Submitting Data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nama">Nama Mata Pelajaran</Label>
        <Input
          type="text"
          id="nama"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="describe">Deskripsi</Label>
        <Textarea
          id="describe"
          name="describe"
          value={formData.describe}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="link">Link</Label>
        <Input
          type="text"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="date">Tanggal</Label>
        <Input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Membuat...' : 'Buat Mata Pelajaran'}
      </Button>
    </form>
  )
}

export default Inputform
