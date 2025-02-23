# Form Actions di React 19+: Mengelola Pengiriman Formulir dengan React

## 1. Pendahuluan

Form actions dalam React 19+ adalah fitur baru yang memungkinkan pengelolaan
pengiriman formulir secara deklaratif. Dengan menggunakan form actions, pengiriman
data dapat langsung ditangani tanpa perlu event handler eksplisit seperti `onSubmit`.
Ini sangat berguna dalam lingkungan React Server Components.

---

## 2. Apa Itu Form Actions?

Form actions adalah fitur di React 19+ yang memungkinkan pengelolaan pengiriman
formulir tanpa event handler manual.

Contoh penggunaan dasar:

```jsx
export default function Signup() {
  function signupAction(formData) {
    const email = formData.get('email');
    console.log(email);
  }

  return (
    <form action={signupAction}>
      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>
      <button type="submit">Daftar</button>
    </form>
  );
}
```

> **Catatan:** Input harus memiliki atribut `name` agar nilainya dapat diambil dari
> `formData`.

---

## 3. useActionState dari 'react'

### **Apa itu useActionState?**

`useActionState` adalah hook baru di React 19+ yang memungkinkan kita untuk menangani
state hasil dari form action secara langsung di komponen klien. Ini sangat berguna
untuk menangani respons dari pengiriman formulir tanpa perlu menggunakan state
tambahan.

### **Menggunakan useActionState dengan dan tanpa initial state**

1. **Dengan initial state**

   ```jsx
   const [formState, formAction] = useActionState(signupAction, { errors: null });
   ```

   - `errors: null` digunakan sebagai nilai awal untuk menangani error pada form.
   - Jika ada kesalahan saat pengisian, state akan diperbarui tanpa mereset form.

2. **Tanpa initial state**
   ```jsx
   const [formState, formAction] = useActionState(signupAction, null);
   ```
   - Digunakan ketika tidak ada nilai awal yang perlu disimpan atau ditampilkan
     kembali.
   - Data form akan dikosongkan setelah dikirim.

### **Langkah-langkah penggunaan `useActionState`**

1. **Buat function action untuk menangani pengiriman formulir**
2. **Gunakan `useActionState` untuk mengelola state hasil action**
3. **Tampilkan hasil pada UI**

### Contoh Implementasi dengan Berbagai Input

#### 1. Input Teks

```jsx
'use client';
import { useActionState } from 'react';

function signupAction(prevState, formData) {
  const email = formData.get('email');
  return { success: `Email: ${email} berhasil didaftarkan!` };
}

export default function SignupForm() {
  const [state, formAction] = useActionState(signupAction, {});

  return (
    <form action={formAction}>
      <label>Email</label>
      <input type="email" name="email" required />
      <button type="submit">Daftar</button>
      {state?.success && <p style={{ color: 'green' }}>{state.success}</p>}
    </form>
  );
}
```

#### 2. Input Password & Konfirmasi Password

```jsx
function signupAction(prevState, formData) {
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  if (password !== confirmPassword) {
    return { error: 'Password tidak cocok' };
  }
  return { success: 'Pendaftaran berhasil!' };
}
```

#### 3. Select (Dropdown)

```jsx
function signupAction(prevState, formData) {
  const country = formData.get('country');
  return { success: `Negara terpilih: ${country}` };
}
```

#### 4. Checkbox

```jsx
function signupAction(prevState, formData) {
  const subscribe = formData.get('subscribe') === 'on';
  return {
    success: subscribe ? 'Berlangganan diaktifkan' : 'Berlangganan tidak diaktifkan',
  };
}
```

#### 5. Slider (Input Range)

```jsx
function signupAction(prevState, formData) {
  const volume = formData.get('volume');
  return { success: `Volume disetel ke ${volume}` };
}
```

---

## 4. Kesimpulan

React 19+ memperkenalkan Form Actions dan `useActionState`, yang memungkinkan
pengiriman formulir secara deklaratif tanpa perlu event handler eksplisit. Dengan
menggunakan fitur ini, pengelolaan formulir menjadi lebih sederhana dan lebih
terintegrasi dengan ekosistem React Server Components. Beberapa hal yang telah kita
pelajari:

- **Form Actions** memungkinkan pengiriman data langsung tanpa `onSubmit`.
- **useActionState** mempermudah pengelolaan state formulir secara langsung dalam
  komponen.
- **Dengan initial state**, data tidak hilang saat terjadi error.
- **Tanpa initial state**, form akan dikosongkan setelah dikirim.
- Berbagai jenis input seperti **text, password, select, checkbox** dapat digunakan
  dengan Form Actions.

Dengan memahami konsep-konsep ini, kita dapat membangun formulir yang lebih efisien
dan mudah dipelihara di React 19+.

<!-- ## useActionState from 'react' -->

<!-- berikan penejlasan apa itu useActionState -->
<!-- berikan contoh beserta langkah pembuatannya(dari import, buat action)-->
<!-- untuk contoh ada input, confirmation password, select, dropdown, checkbox, dan slider -->

<!-- berikan 2 contoh yaitu yang formAction tanpa async yang kedua dengan async -->
<!-- untuk memberikan loading ada 2 cara yaitu menggunakan pedding di useActionState atau formStatus()-->
