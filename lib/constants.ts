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

export const routes = {
  public: ['/', '/login', '/register', '/reset-password'],
  customer: ['/home', '/profile'],
  admin: ['/cms'],
};
