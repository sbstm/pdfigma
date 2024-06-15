declare interface UserParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  tanggal_lahir: Date;
  jk: boolean;
  address: string!;
  photoURL: string!;
  tanggal_lahir: string;
  nis: string!;
  kelas: string!;
  matapelajaran: string!;
}

declare interface ActivityParams {
  name: string; // Required, String
  materi: string; // Required, String
  tipe: boolean; // Boolean
  jenis: Jenis; // Enum
  dateline: Date; // Required, Datetime
  subMapel?: SubMapel; // Relationship with subMapel
  grub?: Grub; // Relationship with grub
}

declare interface MapelParams {
  name: string;
  subMapel: SubMapel[];
  deskripsi: string;
  kelas: string;
  image_url: string;
  user?: user2;
}

declare interface SubMapelParams {
  nama: string;
  matapelajaran: string;
  user?: user2;
  selesai: boolean;
  link_buku: string;
  link_figma: string;
  embed_code: string;
}

declare interface GrubParams {
  matapelajaran: string;
  userid: string[];
  nama: string;
  user?: User;
  nilai?: Nilai;
  activity?: Activity;
}

declare interface NilaiParams {
  nilai: number;
  user?: User;
  matapelajaran: Matapelajaran;
  grub?: Grub;
}

declare interface signInProps {
  email: string;
  password: string;
}

declare interface SiderbarProps {
  user: any;
}

declare interface getUserInfoProps {
  userId: string;
}

declare interface signUpProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  tanggal_lahir: Date;
  jk: string;
}

// Enum definition for jenis
enum Jenis {
  // Define your enum values here
  "figma",
  "quiz",
  "form",
}

// Define subMapel and grub relationships
declare interface User {
  // Define properties of user here
}

declare interface Activity {
  // Define properties of activity here
}
declare interface Matapelajaran {
  // Define properties of matapelajaran here
}

declare interface SubMapel {
  // Define properties of subMapel here
}
declare interface User2 {
  // Define properties of user here
}

declare interface Grub {
  // Define properties of grub here
}

declare interface Nilai {
  // Define properties of nilai here
}
// Main data interface
// declare interface ColumnProps {
//   id: string
//   title: string
//   taskIds: string[]
// }

// declare interface TaskProps {
//   id: string // Unique identifier (UUID or similar)
//   title: string
//   date: Date // Date the task is due/scheduled for
//   description: string // Optional description
// }
