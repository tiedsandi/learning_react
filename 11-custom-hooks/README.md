# Custom React Hooks

## 📌 Rules of Hooks

Sebelum membuat custom hooks, penting untuk memahami aturan dasar Hooks di React:

1. **Hanya panggil hooks di tingkat atas**
   - Jangan gunakan hooks di dalam loop, kondisi, atau fungsi bersarang.
2. **Hanya panggil hooks dari fungsi React**
   - Hooks hanya boleh dipanggil di dalam komponen fungsi atau di dalam custom hooks
     lainnya.

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

### Cara Buat Custom Hooks

1. Buat dengan function dan penamaan dimulai dari **use**

```jsx
function useFetch() {}
```

### Fetching and Returning Value

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

  return { isFetching, error, fetchData, setFetchData };
}
```

### Contoh Custom Hook Lainnya

Custom hook untuk menyimpan dan mengambil data dari local storage:

```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error accessing localStorage', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error setting localStorage', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
```

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
// App.jsx
function App() {
  // some code...
  const {
    isFetching,
    error,
    fetchData: userPlaces,
    setFetchData: setUserPlaces,
  } = useFetch(fetchUserPlaces, []);
  // rest code...
}
```

### Jika Ingin Menggunakan Custom Hook di Tempat Lain dan Mengolah Data Terlebih Dahulu

Kita bisa membuat function yang mengolah data terlebih dahulu sebelum menggunakannya
dalam custom hook.

```jsx
async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(sortedPlaces);
    });
  });
}

function AvailablePlaces() {
  const {
    isFetching,
    error,
    fetchData: availablePlaces,
  } = useFetch(fetchSortedPlaces, []);
  // rest code...
}
```

Pada kode di atas, kita membuat function baru yang mengolah data terlebih dahulu
sebelum mengembalikannya. Menggunakan `Promise` diperlukan karena custom hook yang
kita buat menggunakan `await`, sehingga kita perlu mengembalikan `Promise` agar
proses asynchronous berjalan dengan baik.

---

## 🎯 Kesimpulan

- Hooks adalah fitur penting di React untuk mengelola state dan efek samping.
- Custom hooks memungkinkan kita menulis kode yang lebih modular dan dapat digunakan
  kembali.
- Dengan memahami aturan hooks dan cara membuat custom hooks, kita bisa meningkatkan
  efisiensi pengembangan aplikasi React.

> ---
>
> ---
>
> ---
>
> ---
>
> ---

# 📖 Custom React Hooks

## 🚀 Pendahuluan

React Hooks adalah fitur yang memungkinkan kita menggunakan state dan lifecycle
methods dalam functional components. Namun, sering kali kita menemukan kode yang
berulang di beberapa komponen. **Custom hooks** memungkinkan kita mengekstrak dan
mengemas logika ini agar lebih modular dan reusable.

> 🎯 **Tujuan dari Custom Hook:**
>
> - Mengurangi **duplikasi kode** dan meningkatkan **reusability**.
> - Memisahkan **logika bisnis dari UI**, sehingga komponen lebih bersih.
> - Mempermudah **pengelolaan state dan efek samping** dalam React.

---

## 📌 Aturan Dasar Hooks

Sebelum membuat custom hooks, penting untuk memahami aturan dasar Hooks di React:

1. **Hanya panggil hooks di tingkat atas**
   - Jangan gunakan hooks di dalam loop, kondisi, atau fungsi bersarang.
2. **Hanya panggil hooks dari fungsi React**
   - Hooks hanya boleh dipanggil di dalam komponen fungsi atau di dalam custom hooks
     lainnya.

> ⚠️ **Melanggar aturan ini dapat menyebabkan bug yang sulit dilacak!**

---

## 🛠️ Cara Membuat Custom Hook

Custom hooks pada dasarnya adalah fungsi JavaScript yang menggunakan hooks React.

✅ **Konvensi penamaan:** Awali nama dengan `use` (misalnya, `useFetch`, `useAuth`,
`useLocalStorage`).

### 1️⃣ Membuat Custom Hook Dasar

```jsx
function useFetch() {}
```

### 2️⃣ Fetching Data dengan Custom Hook

```jsx
import { useEffect, useState } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

💡 **Kelebihan:** Dengan `useFetch`, kita tidak perlu menulis ulang kode fetching API
di setiap komponen.

---

## 📂 Contoh Custom Hook Lainnya

### **1️⃣ Custom Hook untuk Local Storage**

```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error accessing localStorage', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error setting localStorage', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
```

💡 **Kapan Digunakan?**

- Menyimpan preferensi user seperti tema (dark/light mode).
- Cache data form agar tidak hilang saat reload.

---

## 🔥 Implementasi Custom Hook di Komponen

Setelah membuat custom hook, kita bisa menggunakannya dalam komponen React seperti
hooks bawaan.

```jsx
import useFetch from './useFetch';

function App() {
  const { data, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/posts'
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Data dari API</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

✅ **Keuntungan:**

- Memisahkan logika fetching dari UI.
- Kode lebih bersih dan terstruktur.

---

## 🎯 Studi Kasus: Sorting Data dengan Custom Hook

Terkadang kita ingin mengolah data terlebih dahulu sebelum digunakan di komponen.
Misalnya, kita ingin mengurutkan tempat berdasarkan jarak pengguna saat ini.

```jsx
async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(sortedPlaces);
    });
  });
}

function AvailablePlaces() {
  const {
    isFetching,
    error,
    fetchData: availablePlaces,
  } = useFetch(fetchSortedPlaces, []);
}
```

💡 **Keuntungan:** Kita bisa mengurutkan data sebelum menggunakannya dalam komponen
UI, tanpa mencampur logika sorting dalam komponen utama.

---

## ✅ Kesimpulan

- **Custom hooks** memungkinkan kita membuat kode yang lebih modular dan reusable.
- Dengan memahami aturan hooks dan menerapkan best practice, kita bisa meningkatkan
  efisiensi pengembangan aplikasi React.
- Contoh seperti `useFetch` dan `useLocalStorage` membantu kita memahami manfaat
  praktis dari custom hooks dalam pengelolaan state dan efek samping.

🔥 **Dengan menerapkan custom hooks, kode React kita menjadi lebih bersih, mudah
dipelihara, dan scalable!**
