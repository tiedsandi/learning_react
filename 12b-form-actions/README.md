# Form Actions di React 19+: Mengelola Pengiriman Formulir dengan React

## 1. Pendahuluan

Form actions dalam React memberikan cara yang terstruktur untuk menangani pengiriman
formulir, memanfaatkan manajemen state React dan fitur bawaan. Alih-alih menangani
event secara manual dengan `onSubmit`, React dapat menangani pengiriman formulir
secara deklaratif.

---

## 2. Form Actions vs Penanganan Pengiriman Kustom

### **Form Actions (Pendekatan Deklaratif)**

- Menggunakan mekanisme pengiriman formulir bawaan React.
- Terintegrasi lebih baik dengan komponen server (React Server Actions).
- Menyederhanakan manajemen state dengan mengandalkan mekanisme React.

### **Penanganan Pengiriman Kustom (Pendekatan Imperatif)**

- Menggunakan `onSubmit` dengan event listener.
- Memerlukan penanganan event, validasi, dan pembaruan state secara manual.
- Lebih fleksibel tetapi bisa menjadi kompleks dalam aplikasi besar.

Contoh:

```jsx
// Penanganan Kustom
const handleSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  console.log(Object.fromEntries(formData));
};

<form onSubmit={handleSubmit}>
  <input name="username" type="text" />
  <button type="submit">Kirim</button>
</form>;
```

Menggunakan Form Actions:

```jsx
'use server';
export async function action(formData) {
  console.log(Object.fromEntries(formData));
}

<form action={action}>
  <input name="username" type="text" />
  <button type="submit">Kirim</button>
</form>;
```

---

## 3. Mengekstrak Nilai & Mengelola State Formulir

React menyediakan berbagai cara untuk mengelola state formulir:

- **Formulir Tidak Terkontrol (menggunakan FormData)**:

  ```jsx
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData.get('username'));
  };
  ```

- **Formulir Terkontrol (menggunakan useState)**:

  ```jsx
  const [value, setValue] = useState('');
  <input value={value} onChange={(e) => setValue(e.target.value)} />;
  ```

- **Menggunakan Form Actions (tanpa useState)**:
  ```jsx
  'use server';
  export async function action(formData) {
    console.log(formData.get('username'));
  }
  ```

---

## 4. Tindakan Sinkron & Asinkron

### **Tindakan Sinkron**

Tindakan sinkron dieksekusi secara langsung:

```jsx
'use server';
export function action(formData) {
  console.log(formData.get('username'));
}
```

### **Tindakan Asinkron**

Tindakan asinkron memungkinkan penanganan permintaan API atau logika sisi server:

```jsx
'use server';
export async function action(formData) {
  await fetch('/api', { method: 'POST', body: formData });
}
```

---

## 5. Optimistic UI Updating

Optimistic UI meningkatkan pengalaman pengguna dengan memperbarui UI sebelum menerima
respons dari server.

```jsx
const [message, setMessage] = useState('');

const handleSubmit = async (event) => {
  event.preventDefault();
  setMessage('Mengirim...');
  await fetch('/api', { method: 'POST' });
  setMessage('Terkirim!');
};
```

Dengan React Form Actions:

```jsx
'use server';
export async function action(formData) {
  return { message: 'Terkirim!' };
}
```

React menangani pembaruan UI secara otomatis tanpa memerlukan manajemen state
tambahan.

---

## 6. Kesimpulan

Menggunakan form actions di React 19+ menyederhanakan penanganan pengiriman formulir,
mengurangi kode boilerplate, dan terintegrasi dengan baik dengan komponen server.
Memahami kapan harus menggunakan tindakan sinkron, asinkron, dan pembaruan UI optimis
akan meningkatkan pengalaman pengguna secara keseluruhan.

# FORM actions

## Apa itu form actions

adalah fitur yang ada di versi 19

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
    </form>
  );
}
```

> input harus ada attribute **name**

## useActionState from 'react'

<!-- berikan penejlasan apa itu useActionState -->
<!-- berikan contoh beserta langkah pembuatannya(dari import, buat action)-->
<!-- untuk contoh ada input, confirmation password, select, dropdown, checkbox, dan slider -->

<!-- berikan 2 contoh yaitu yang formAction tanpa async yang kedua dengan async -->
<!-- untuk memberikan loading ada 2 cara yaitu menggunakan pedding di useActionState atau formStatus()-->
