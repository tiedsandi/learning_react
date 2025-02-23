# Form Actions Lanjutan di React 19+

## 1. Contoh Form Action dengan Async

Dalam beberapa kasus, aksi formulir perlu menangani operasi asinkron seperti
memanggil API atau melakukan operasi basis data. Berikut contoh penggunaan Form
Actions dengan async:

```jsx
'use server';
export async function submitForm(formData) {
  const email = formData.get('email');
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulasi delay
  return { message: `Email ${email} berhasil didaftarkan!` };
}

export default function AsyncForm() {
  return (
    <form action={submitForm}>
      <label>Email:</label>
      <input type="email" name="email" required />
      <button type="submit">Kirim</button>
    </form>
  );
}
```

---

## 2. Cara Loading State dengan `useActionState()` atau `useFormStatus()`

Ketika menggunakan aksi asinkron, kita mungkin ingin menampilkan status loading. Ada
dua cara untuk mengelolanya:

### a. Menggunakan `useActionState()`

```jsx
'use client';
import { useActionState } from 'react';

async function signupAction(prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { success: 'Pendaftaran berhasil!' };
}

export default function SignupForm() {
  const [state, formAction] = useActionState(signupAction, {});

  return (
    <form action={formAction}>
      <input type="email" name="email" required />
      <button type="submit">Kirim</button>
      {state?.success && <p>{state.success}</p>}
    </form>
  );
}
```

### b. Menggunakan `useFormStatus()`

```jsx
'use client';
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Mengirim...' : 'Kirim'}
    </button>
  );
}

export default function FormWithLoading() {
  return (
    <form action={signupAction}>
      <input type="email" name="email" required />
      <SubmitButton />
    </form>
  );
}
```

---

## 3. Registering Multiple Form Actions

Form dapat memiliki beberapa aksi berbeda untuk setiap tombol menggunakan
`formAction`.

### Contoh Implementasi:

```jsx
export default function Opinion() {
  function upVoteAction() {
    console.log('Upvoted!');
  }

  function downVoteAction() {
    console.log('Downvoted!');
  }

  return (
    <form className="votes">
      <button formAction={upVoteAction}>UpVote</button>
      <button formAction={downVoteAction}>DownVote</button>
    </form>
  );
}
```

---

## 4. Selain Pending, Gunakan `useOptimistic()` untuk Better Experience

`useOptimistic()` memungkinkan UI diperbarui sebelum respons server diterima,
memberikan pengalaman pengguna yang lebih baik.

### Contoh Implementasi:

```jsx
'use client';
import { useState, useOptimistic } from 'react';

export default function LikeButton() {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    0,
    (state) => state + 1
  );

  async function likeAction() {
    addOptimisticLike();
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return (
    <form action={likeAction}>
      <button type="submit">Like ({optimisticLikes})</button>
    </form>
  );
}
```

Dengan `useOptimistic()`, UI akan langsung diperbarui sementara permintaan ke server
masih diproses.

---

## Kesimpulan

Form Actions di React 19+ semakin fleksibel dengan dukungan async, multiple actions,
dan UI optimis. Menggunakan `useActionState()`, `useFormStatus()`, dan
`useOptimistic()` memungkinkan pengalaman pengguna yang lebih responsif dan
interaktif. 🚀

<!-- # Form Actions Lanjutan

## contoh form action dengan async

## cara loading state dengan useActionState() atau useFormStatus()

## Registering Multiper FormActions

//berikan penjelasan disini

```jsx
export default function Opinion() {
  function upVoteAction() {
    console.log('upVoteAction');
  }

  function downVoteAction() {
    console.log('downVoteAction');
  }

  return (
    <form className="votes">
      <button formAction={upVoteAction}>UpVote</button>
      <button formAction={downVoteAction}>DownVote</button>
    </form>
  );
}
```

## Selain Pending gunakan useOptimistic() untuk better Experience -->
