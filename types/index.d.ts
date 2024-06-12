import { RelationshipType } from 'node-appwrite'

declare interface ActivityProps {
  id: string
  nilai: number
  status: 'pending' | 'on going' | 'selesai' | 'belum'
  jenis: 'tugas' | 'materi' | 'Quiz' | 'proyek'
  grub: string
  link: string
  email: string
}

declare interface UserProps {
  userId: string
  email: string
  firstName: string
  kelas: string
  lastName: string
  name: string
  role: 'student' | 'teacher'
  photoURL: string
  activity: RelationshipType[]
  grub: RelationshipType[]
}

declare interface signInProps {
  email: string
  password: string
}

declare interface getUserInfoProps {
  userId: string
}

declare interface MataPelajaran {
  id: string
  nama: string
  subTema: SubTema[] // Array of SubTema objects
}

declare interface SubTema {
  id: string
  content: string
  completed: boolean
}

declare interface signUpProps {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string
  address: string
  kelas: string
}

declare interface ColumnProps {
  id: string
  title: string
  taskIds: string[]
}

declare interface TaskProps {
  id: string // Unique identifier (UUID or similar)
  title: string
  date: Date // Date the task is due/scheduled for
  description: string // Optional description
}
