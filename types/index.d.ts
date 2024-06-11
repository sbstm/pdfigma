declare interface SiderbarProps {
  user: User
}

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
  id: string
  email: string
  firstName: string
  kelas: string
  lastName: string
  name: string
  role: 'student' | 'teacher'
  photoURL: string
  activity: string[]
  grub: string[]
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
