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
