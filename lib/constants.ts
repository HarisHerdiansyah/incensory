import {
  AcroIllust,
  ClaustroIllust,
  Jero,
  NyctoIllust,
  Peteng,
  Timbo,
} from '@/assets';
import {
  Leaf,
  Droplet,
  Headphones,
  BriefcaseBusiness,
  Globe,
  HandCoins,
  MapPin,
  Mail,
  Phone,
  Clock,
} from 'lucide-react';

export const registerForm = [
  [
    {
      id: 'username',
      label: 'Nama Pengguna:',
      type: 'text',
    },
    {
      id: 'email',
      label: 'Email:',
      type: 'email',
    },
  ],
  [
    {
      id: 'password',
      label: 'Kata Sandi:',
      type: 'password',
    },
    {
      id: 'confirmPassword',
      label: 'Konfirmasi Kata Sandi:',
      type: 'password',
    },
  ],
  [
    {
      id: 'phoneNumber',
      label: 'No. Telepon/WhatsApp Aktif:',
      type: 'tel',
    },
    {
      id: 'accessCode',
      label: 'Kode Unik Produk:',
      type: 'text',
    },
  ],
];

export const loginForm = [registerForm[0][1], registerForm[1][0]];
export const forgotPasswordForm = [registerForm[0][1], ...registerForm[1]];
export const verificationForm = [...loginForm, registerForm[2][1]];

export const contactForm = [
  {
    id: 'name',
    label: 'Nama:',
    type: 'text',
  },
  {
    id: 'email',
    label: 'Email:',
    type: 'email',
  },
  {
    id: 'subject',
    label: 'Subjek:',
    type: 'text',
  },
];

export const routes = {
  public: ['/', '/login', '/register', '/reset-password', '/verify'],
  customer: ['/home', '/profile'],
  admin: ['/cms'],
};

export const navigation = [
  {
    href: '#about',
    label: 'Tentang',
  },
  {
    href: '#product',
    label: 'Produk',
  },
  {
    href: '#ourTeam',
    label: 'Tim Kami',
  },
  {
    href: '#contact',
    label: 'Kontak',
  },
  {
    href: '/login',
    label: 'Masuk',
  },
];

export const contentLists = [
  {
    title: 'Akrofobia',
    image: AcroIllust,
    target: '/timbo/index.html',
  },
  {
    title: 'Klaustrofobia',
    image: ClaustroIllust,
    target: '/jero/index.html',
  },
  {
    title: 'Niktofobia',
    image: NyctoIllust,
    target: '/peteng/index.html',
  },
];

export const teams = [
  {
    name: 'Vira Kusuma Dewi, SP., M.Sc, Ph.D.',
    role: 'Dosen Pendamping',
    major: 'Universitas Padjadjaran',
  },
  {
    name: 'Jeremia Luis Fernando Silitonga',
    role: 'Chief Executive Officer',
    major: 'Bisnis Internasional',
  },
  {
    name: 'Farhan Ardia Nashwan',
    role: 'Chief Production Officer',
    major: 'Pendidikan Dokter',
  },
  {
    name: 'Salma Salamah',
    role: 'Chief Marketing Officer',
    major: 'Ilmu Peternakan',
  },
  {
    name: 'Nadia Ratu Aini Alamsyah',
    role: 'Chief Financial Officer',
    major: 'Akuntansi',
  },
  {
    name: 'Haris Herdiansyah',
    role: 'Chief Technology Officer',
    major: 'Teknik Informatika',
  },
];

export const service = [
  {
    icon: Leaf,
    title: 'Multisensory Therapy',
    description:
      'Aroma kemenyan, melati, dan vanili untuk efek relaksasi menyeluruh.',
  },
  {
    icon: Droplet,
    title: 'Fobia-Specific Fragrance',
    description:
      'Setiap jenis fobia memiliki parfum yang disesuaikan untuk pengalaman yang lebih personal.',
  },
  {
    icon: Headphones,
    title: 'Built-in Audio',
    description:
      'Simulasi suara langsung dari perangkat untuk efek emosional lebih kuat.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Portable & Simple',
    description: 'Mudah dibawa dan digunakan hanya dengan smartphone.',
  },
  {
    icon: Globe,
    title: 'Online Therapy',
    description:
      'Tersedia melalui sistem langganan, akses kapan saja dan di mana saja.',
  },
  {
    icon: HandCoins,
    title: 'Cost-Effective',
    description: 'Alternatif terapi yang terjangkau dan tetap berbasis riset.',
  },
];

export const products = [
  {
    image: Jero,
    name: 'Jero',
    price: 180000,
  },
  {
    image: Peteng,
    name: 'Peteng',
    price: 180000,
  },
  {
    image: Timbo,
    name: 'Timbo',
    price: 180000,
  },
];

export const contactDetails = [
  {
    icon: MapPin,
    title: 'Alamat:',
    description:
      'Jl. Raya Bandung Sumedang KM 21, Hegarmanah, Kec. Jatinangor, Kab. Sumedang, Jawa Barat 45363',
  },
  {
    icon: Mail,
    title: 'Email:',
    description: 'incensorypimnas38@gmail.com',
  },
  {
    icon: Phone,
    title: 'Telepon:',
    description: '+62 8953 7049 3300',
  },
  {
    icon: Clock,
    title: 'Jam Operasional:',
    description: 'Senin - Jumat, 09:00 - 17:00',
  },
];

export const faqs = [
  {
    title: 'Apa itu Incensory?',
    content:
      'Incensory adalah produk inovatif yang menggabungkan aroma kemenyan, melati, dan vanili dengan teknologi audio untuk membantu mengatasi berbagai jenis fobia.',
  },
  {
    title: 'Bagaimana cara kerja Incensory?',
    content:
      'Incensory bekerja dengan memberikan stimulasi multisensori melalui aroma dan suara, yang dirancang khusus untuk membantu mengurangi kecemasan dan ketakutan yang terkait dengan fobia tertentu.',
  },
  {
    title: 'Apakah Incensory aman digunakan?',
    content:
      'Incensory dirancang dengan mempertimbangkan keselamatan pengguna. Semua bahan yang digunakan telah melalui pengujian dan memenuhi standar keselamatan yang ketat.',
  },
];

export const origins = [
  'http://localhost:5173',
  'https://vr.incensory.id',
  'https://main.d31ian07nf514l.amplifyapp.com',
];
