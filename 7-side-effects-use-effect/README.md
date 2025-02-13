# Panduan Lengkap tentang useEffect dan Side Effects di React

## Apa itu Side Effect?

Dalam React, **side effect** adalah segala sesuatu yang terjadi di luar siklus render
komponen. Contoh side effect meliputi:

- Mengambil data dari API
- Mengubah data di localStorage
- Mengatur event listener
- Manipulasi langsung terhadap DOM

React bersifat deklaratif, sehingga kita harus menangani side effect secara eksplisit
menggunakan `useEffect`.

## Apa itu useEffect?

`useEffect` adalah Hook bawaan React yang digunakan untuk menangani side effect dalam
komponen fungsi. Hook ini memungkinkan kita untuk menjalankan kode tertentu setelah
komponen dirender.

### Sintaks Dasar `useEffect`

```javascript
useEffect(() => {
  // kode yang akan dijalankan sebagai efek samping
});
```

Namun, jika ditulis seperti ini tanpa **dependency array**, efek samping akan
berjalan setiap kali komponen dirender ulang. Oleh karena itu, kita harus memahami
cara mengontrol kapan `useEffect` dijalankan.

---

## Cara Menggunakan useEffect dengan Benar

### 1. useEffect tanpa Dependency Array

Jika `useEffect` ditulis tanpa array dependensi, maka ia akan berjalan setiap kali
komponen dirender ulang.

```javascript
useEffect(() => {
  console.log('Komponen dirender!');
});
```

➡ **Masalah:** Ini bisa menyebabkan infinite loop jika di dalamnya kita mengubah
state yang memicu render ulang.

### 2. useEffect dengan Dependency Array Kosong `[]`

Jika `useEffect` memiliki array dependensi kosong `[]`, maka efek samping hanya akan
berjalan sekali setelah komponen pertama kali dirender.

```javascript
useEffect(() => {
  console.log('Komponen pertama kali dirender!');
}, []);
```

➡ **Contoh Penggunaan:** Mengambil data dari API atau membaca data dari localStorage
saat komponen pertama kali dimuat.

#### Contoh Mengambil Data dari LocalStorage dengan useEffect

```javascript
useEffect(() => {
  const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
  const storedPlaces = storedIds.map((id) =>
    AVAILABLE_PLACES.find((place) => place.id === id)
  );

  setPickedPlaces(storedPlaces);
}, []);
```

---

### 3. useEffect dengan Dependency Array

Jika kita ingin efek samping dijalankan saat nilai tertentu berubah, kita bisa
menambahkannya ke dalam dependency array.

```javascript
useEffect(() => {
  console.log(`Nilai count sekarang: ${count}`);
}, [count]);
```

➡ **Penjelasan:** `useEffect` hanya akan berjalan saat `count` berubah.

#### Contoh Penggunaan: Memantau Perubahan State

```javascript
const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
  console.log(`Mencari: ${searchTerm}`);
}, [searchTerm]);
```

---

## Contoh Penggunaan useEffect dengan setTimeout dan setInterval

### 1. Menggunakan `setTimeout` dalam useEffect

```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    console.log('Waktu habis!');
  }, 3000);

  return () => {
    clearTimeout(timer);
  };
}, []);
```

➡ **Contoh nyata:** Digunakan dalam komponen `DeleteConfirmation.jsx`, di mana
`setTimeout` digunakan untuk menghapus data setelah waktu tertentu berlalu.

### 2. Menggunakan `setInterval` dalam useEffect

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    console.log('Interval berjalan...');
  }, 1000);

  return () => {
    clearInterval(interval);
  };
}, []);
```

➡ **Contoh nyata:** Digunakan dalam komponen `ProgressBar.jsx` untuk memperbarui
waktu yang tersisa secara berkala.

---

## Hindari Penggunaan useEffect yang Tidak Perlu

Terkadang, kita tidak memerlukan `useEffect` untuk menyinkronkan state dengan prop
atau state lain. Misalnya:

**Kesalahan umum:**

```javascript
useEffect(() => {
  setFilteredList(items.filter((item) => item.active));
}, [items]);
```

➡ **Solusi lebih baik:**

```javascript
const filteredList = items.filter((item) => item.active);
```

➡ **Alasan:** Kita bisa langsung menghitung nilai `filteredList` dari `items` tanpa
perlu menggunakan `useEffect`.

---

## useEffect dan Fungsi sebagai Dependency

Jika kita menggunakan fungsi dalam dependency array, kita harus hati-hati karena
fungsi baru akan dibuat di setiap render, yang menyebabkan `useEffect` terus
berjalan.

```javascript
function Hello1() {
  console.log('hello');
}

function Hello2() {
  console.log('hello');
}

// Hello1 === Hello2 akan menghasilkan false
```

Karena itu, solusi terbaik adalah menggunakan `useCallback` untuk menjaga agar fungsi
tetap stabil:

```javascript
const fetchData = useCallback(() => {
  console.log('Fetching data...');
}, []);

useEffect(() => {
  fetchData();
}, [fetchData]);
```

---

## Hal yang Perlu Diketahui tentang useEffect

### 1. Kapan Harus Menggunakan useEffect?

✅ Mengambil data dari API atau localStorage ✅ Memasang event listener atau
melakukan pembersihan ✅ Menyinkronkan state dengan sesuatu di luar React ✅
Menjalankan timer dengan `setTimeout` atau `setInterval`

### 2. Kapan **Tidak** Harus Menggunakan useEffect?

❌ Saat hanya memproses data yang bisa dilakukan langsung dalam render ❌ Saat bisa
menggunakan `useMemo` atau `useCallback`

Dengan memahami `useEffect` dengan baik, kita bisa menghindari bug yang tidak perlu
dan membuat aplikasi React lebih efisien! 🚀
