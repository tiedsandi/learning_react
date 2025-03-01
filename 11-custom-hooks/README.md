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
