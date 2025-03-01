# Refs & Portals dalam React

## Apa Itu Refs?

Refs (references) di React digunakan untuk mengakses elemen DOM secara langsung,
menyimpan nilai di luar alur rendering normal, serta mengelola API komponen tertentu.

### 1. Mengakses Elemen DOM dengan Refs

Refs memungkinkan kita untuk mendapatkan referensi langsung ke elemen DOM tanpa
menggunakan state.

#### Contoh:

```jsx
import { useRef } from 'react';

export default function FocusInput() {
  const inputRef = useRef();

  function handleClick() {
    inputRef.current.focus(); // Memfokuskan input secara langsung
  }

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type something..." />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

### 2. Mengelola Nilai dengan Refs

Refs bisa digunakan untuk menyimpan nilai tanpa menyebabkan re-render, berbeda dengan
`useState` yang akan memicu render ulang saat nilainya berubah.

#### Contoh:

```jsx
import { useRef, useState } from 'react';

export default function Timer() {
  const countRef = useRef(0);
  const [count, setCount] = useState(0);

  function handleClick() {
    countRef.current += 1;
    console.log('Ref Value:', countRef.current);
    setCount((prev) => prev + 1);
  }

  return (
    <div>
      <p>State Count: {count}</p>
      <p>Ref Count: {countRef.current}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

> **Catatan:** Perubahan pada `countRef` tidak menyebabkan komponen re-render,
> sementara perubahan `count` dengan `useState` akan menyebabkan re-render.

### 3. Mengekspos API Fungsi dari Komponen (Buat method sendiri)

Refs juga dapat digunakan untuk mengekspos metode dari komponen agar bisa diakses
oleh komponen lain.

#### Contoh:

```jsx
import { useImperativeHandle, useRef } from 'react';

function CustomInput(props, ref) {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => (inputRef.current.value = ''),
  }));

  return <input ref={inputRef} type="text" placeholder="Type here..." />;
}

export default function Parent() {
  const inputRef = useRef();

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
      <button onClick={() => inputRef.current.clear()}>Clear</button>
    </div>
  );
}
```

> **Catatan:** `useImperativeHandle` digunakan untuk mengekspos fungsi `focus` dan
> `clear` dari `CustomInput` ke komponen `Parent`.

> untuk versi react <19 tidak bisa langsung mengirim ref melalui prop tapi
> menggunakan forwardRef()

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

const CustomInput = forwardRef(function CustomInput({ text, ...props }, ref) {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => (inputRef.current.value = ''),
  }));

  return <input ref={inputRef} type="text" placeholder="Type here..." />;
});
```

---

## Apa Itu Portals?

Portals memungkinkan kita merender elemen ke dalam DOM di luar hierarki komponen
utama.

### 4. Memisahkan Render DOM dari Struktur JSX dengan Portals

Portals berguna untuk membuat modal, tooltips, dan dropdown yang tetap berada di luar
hierarki elemen utama.

#### Contoh:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ children }) {
  return ReactDOM.createPortal(<div className="modal">{children}</div>, modalRoot);
}
```

Komponen `Modal` ini akan dirender di luar hierarki utama meskipun dipanggil dari
dalam JSX.

#### Contoh Penggunaan Modal:

```jsx
import { useState } from 'react';
import Modal from './Modal';

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Show Modal</button>
      {showModal && (
        <Modal>
          <div className="modal-content">
            <h2>Modal Window</h2>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
```

> **Catatan:** Elemen `Modal` akan dirender ke dalam `#modal-root`, yang harus ada di
> `index.html`:

```html
<div id="modal-root"></div>
```

---

## Perbedaan `useRef` dan `useState`

| Fitur             | useRef                                    | useState                       |
| ----------------- | ----------------------------------------- | ------------------------------ |
| Penyimpanan Nilai | Menyimpan tanpa menyebabkan re-render     | Menyimpan dan memicu re-render |
| Akses DOM         | Bisa digunakan untuk mengakses elemen DOM | Tidak bisa                     |
| Perubahan Nilai   | Tidak menyebabkan re-render               | Menyebabkan re-render          |

---

## Kesimpulan

- `useRef` berguna untuk mengakses elemen DOM dan menyimpan nilai tanpa re-render.
- `useImperativeHandle` memungkinkan kita mengekspos metode API dari komponen.
- Portals memungkinkan kita merender elemen di luar hierarki JSX utama.

Dengan memahami Refs & Portals, kita bisa mengelola DOM lebih efisien dan menciptakan
UI yang lebih fleksibel!
