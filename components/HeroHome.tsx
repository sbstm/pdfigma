import React from 'react'
import { Card } from './ui/card'
import { getLoggedInUser } from '@/lib/actions/user.action'

const HeroHome = async () => {

  const data =  await getLoggedInUser()
  return (
    <div className="p-4">
    <Card className="p-4 ">
    Selamat Datang {data.name} di sistem Aplikasi PDFigma
    Sistem ini adalah satu satunya layanan akademik untuk mahasiswa UPI yang memuat seluruh aktifitas utama administrasi akademik yang antara lain berisi fitur-fitur manajemen DIM (Data Induk Mahasiswa), pengajuan IRS dan PRS, informasi Kalender Akademik, informasi Jadwal Kuliah, riwayat status akademis, riwayat capaian nilai dan transkip nilai sementara, termasuk didalamnya berita akademik.
    
    Sistem ini menggunakan Single Sign On UPI sebagai fitur otentifikasi, dan dikembangkan dengan insfrastruktur internet sehingga dapat diakses di mana saja sesuai dengan kondisi dan kebutuhan. Data yang dimunculkan merupakan replikasi dari data pada SIAK Utama UPI, jika terdapat perbedaan, maka data pada SIAK Utama sebagai rujukan yang dianggap benar.
    
    Terima kasih.
    </Card>
  </div>
  )
}

export default HeroHome