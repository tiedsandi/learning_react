# Custom React Hooks

## 📌 Rules of Hooks

Sebelum membuat custom hooks, penting untuk memahami aturan dasar Hooks di React:

1.  **Hanya panggil hooks di tingkat atas**

    - Jangan gunakan hooks di dalam loop, kondisi, atau fungsi bersarang.

    ```jsx
    function App(){
     const [val,setVal] = useState(0)
    }

    // salah
    function App(){
      if(someCondition)
         const [val,setVal] = useState(0)
    }
    ```

2.  **Hanya panggil hooks dari fungsi React**

    - Hooks hanya boleh dipanggil di dalam komponen fungsi atau di dalam custom hooks
      lainnya.

    ```jsx
    function App() {
      const [val, setVal] = useState(0);
    }

    // salah
    const [val,setVal] = useState(0)

    function App(){...}
    ```

> ⚠️ Melanggar aturan ini dapat menyebabkan bug yang sulit dilacak!

---

## 🤔 Mengapa Custom Hook?

Custom hooks memungkinkan kita untuk:

- **Mengurangi duplikasi kode** dengan mengekstrak logika yang dapat digunakan
  kembali.
- **Meningkatkan keterbacaan** dan **pemeliharaan kode**.
- **Memisahkan logika bisnis dari komponen UI**, sehingga komponen menjadi lebih
  bersih dan modular.

Misalnya, jika kita memiliki beberapa komponen yang perlu menggunakan `useState` dan
`useEffect` untuk mengambil data dari API, kita bisa membungkus logika tersebut dalam
custom hook.

---

## 🔨 Membuat Custom Hook

Custom hooks pada dasarnya adalah fungsi JavaScript yang menggunakan hooks React.

- Konvensi penamaan: Gunakan prefix **`use`** (misalnya, `useFetch`, `useAuth`,
  `useLocalStorage`).
- Custom hook bisa menggunakan hooks lain seperti `useState`, `useEffect`,
  `useContext`, dll.

Contoh custom hook sederhana untuk mengambil data dari API:

```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
```

---

## 🚀 Menggunakan Custom Hook

Setelah membuat custom hook, kita bisa menggunakannya di dalam komponen seperti
menggunakan hooks bawaan React.

```jsx
import React from 'react';
import useFetch from './useFetch';

function UserList() {
  const { data, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;
```

---

## 🎯 Kesimpulan

- Hooks adalah fitur penting di React untuk mengelola state dan efek samping.
- Custom hooks memungkinkan kita menulis kode yang lebih modular dan dapat digunakan
  kembali.
- Dengan memahami aturan hooks dan cara membuat custom hooks, kita bisa meningkatkan
  efisiensi pengembangan aplikasi React.

# Catatan

### cara buat customHooks

1. buat dengan function dan penamaan dimulai dari **use**

```jsx
function useFetch() {}
```

### fetching and returning value

```jsx
import { useEffect, useState } from 'react';

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchData, setFetchData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return { isFetching, error, fetchData };
}
```

```jsx
// App.jsx
function App() {
  // some code...
  const { isFetching, error, fetchData: userPlaces } = useFetch(fetchUserPlaces, []);
  // rest code...
}
```
