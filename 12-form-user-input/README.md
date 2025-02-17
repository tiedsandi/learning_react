# Form User Input

Mempelajari form dalam React bisa lebih rumit daripada yang terlihat. Form dalam
React memerlukan penanganan khusus karena React tidak secara otomatis mengelola state
seperti pada form HTML biasa. Dalam dokumen ini, kita akan membahas beberapa
tantangan dalam menangani form serta bagaimana mengatasinya.

## Tantangan dalam Form

1. **Handling Form Submission & Validasi Input**  
   Saat pengguna mengisi form, kita perlu menangani pengiriman data serta memastikan
   input yang dimasukkan sesuai dengan yang diharapkan. Ini mencakup validasi seperti
   memastikan email valid, password cukup kuat, atau input tidak kosong.

2. **Menggunakan Fitur Bawaan Form**  
   HTML memiliki fitur bawaan seperti validasi input (`required`, `pattern`,
   `minLength`, dll.) yang bisa digunakan sebelum membuat solusi kustom.

3. **Membangun Solusi Kustom**  
   Terkadang, fitur bawaan HTML tidak cukup, sehingga kita perlu membangun solusi
   sendiri menggunakan state dan event handler dalam React.

## Cara Mengatasi Tantangan

### 1. Menggunakan State untuk Mengelola Form

React menggunakan state untuk mengelola nilai input form:

```jsx
import { useState } from 'react';

function FormExample() {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Nama yang dimasukkan: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nama:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <button type="submit">Kirim</button>
    </form>
  );
}

export default FormExample;
```

### 2. Validasi Input

Kita bisa menambahkan validasi sederhana sebelum pengiriman:

```jsx
const handleSubmit = (event) => {
  event.preventDefault();
  if (name.trim() === '') {
    alert('Nama tidak boleh kosong');
    return;
  }
  alert(`Nama yang dimasukkan: ${name}`);
};
```

### 3. Menggunakan Library Form

Alih-alih mengelola state sendiri, kita bisa menggunakan library seperti **React Hook
Form** untuk menyederhanakan proses.

```bash
npm install react-hook-form
```

Contoh penggunaan:

```jsx
import { useForm } from 'react-hook-form';

function FormWithLibrary() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: 'Nama wajib diisi' })} />
      {errors.name && <p>{errors.name.message}</p>}
      <button type="submit">Kirim</button>
    </form>
  );
}
```

## Kesimpulan

Form dalam React memerlukan pendekatan berbeda dibandingkan HTML murni. Kita bisa
memilih antara mengelola state secara manual atau menggunakan library seperti React
Hook Form untuk menangani form dengan lebih efisien. Dengan pemahaman yang baik, kita
dapat membuat form yang lebih interaktif dan mudah digunakan.
