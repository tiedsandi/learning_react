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

## useEffect dan Fungsi sebagai Dependency (useCallback())

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

# Panduan Lengkap `useCallback` di React

## Apa itu `useCallback`?

`useCallback` adalah hook bawaan React yang digunakan untuk **memosisikan (memoize)**
sebuah fungsi agar tidak dibuat ulang setiap kali komponen dirender ulang. Ini sangat
berguna dalam **dependency array** `useEffect` atau saat kita meneruskan fungsi
sebagai **prop ke komponen anak**.

---

## 📌 Mengapa Menggunakan `useCallback`?

Di React, setiap kali komponen dirender ulang, fungsi yang ada dalam komponen akan
dibuat ulang. Hal ini bisa menyebabkan masalah dalam situasi tertentu:

1. **Menghindari Eksekusi useEffect yang Tidak Perlu**  
   Jika fungsi digunakan dalam **dependency array** `useEffect`, setiap kali fungsi
   tersebut berubah, `useEffect` akan dipicu ulang, meskipun logikanya tidak berubah.

2. **Mengoptimalkan Kinerja dalam Komponen Anak**  
   Jika kita meneruskan fungsi sebagai **prop** ke komponen anak, komponen tersebut
   akan dirender ulang setiap kali fungsi dianggap "berbeda", meskipun isinya tetap
   sama.

---

## 📌 Sintaks Dasar `useCallback`

```javascript
const memoizedFunction = useCallback(() => {
  // kode fungsi
}, [dependencies]);
```

- **Tanpa dependency (`[]`)**: Fungsi hanya dibuat sekali saat pertama kali komponen
  dirender.
- **Dengan dependency (`[dependencies]`)**: Fungsi hanya dibuat ulang ketika salah
  satu nilai di dependency array berubah.

---

## 📌 Contoh Penggunaan `useCallback`

### **1️⃣ Menghindari Eksekusi `useEffect` yang Tidak Perlu**

Tanpa `useCallback`, setiap kali komponen dirender ulang, fungsi `fetchData` akan
dibuat ulang, yang menyebabkan `useEffect` berjalan berulang kali.

**Tanpa `useCallback` (Bermasalah 🚨)**

```javascript
const fetchData = () => {
  console.log('Fetching data...');
};

useEffect(() => {
  fetchData();
}, [fetchData]); // useEffect akan terus berjalan ulang di setiap render
```

**Dengan `useCallback` (Lebih Baik ✅)**

```javascript
const fetchData = useCallback(() => {
  console.log('Fetching data...');
}, []);

useEffect(() => {
  fetchData();
}, [fetchData]); // useEffect hanya berjalan sekali
```

---

### **2️⃣ Mengoptimalkan Kinerja dengan Komponen Anak**

Jika kita meneruskan fungsi sebagai **prop** ke komponen anak tanpa `useCallback`,
komponen anak akan dirender ulang setiap kali komponen induk dirender.

**Tanpa `useCallback` (Bermasalah 🚨)**

```javascript
const Parent = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return <Child onClick={handleClick} />;
};

const Child = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click me</button>;
});
```

- `Child` akan selalu dirender ulang karena `handleClick` adalah fungsi baru di
  setiap render.
- Meskipun `Child` dibungkus dengan `React.memo`, fungsi yang berubah tetap
  membuatnya dirender ulang.

**Dengan `useCallback` (Lebih Optimal ✅)**

```javascript
const Parent = () => {
  const handleClick = useCallback(() => {
    console.log('Button clicked!');
  }, []);

  return <Child onClick={handleClick} />;
};

const Child = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click me</button>;
});
```

- `handleClick` tidak akan berubah di setiap render.
- `Child` tidak akan dirender ulang kecuali `onClick` benar-benar berubah.

---

### **3️⃣ Menggunakan `useCallback` dengan `useState`**

Kadang kita butuh fungsi yang **mengubah state**, tapi tetap ingin fungsi tersebut
tidak berubah di setiap render.

```javascript
const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Tambah</button>
    </div>
  );
};
```

- `increment` tetap sama di setiap render, sehingga komponen tidak mengalami render
  ulang yang tidak perlu.

---

## 📌 Kesimpulan: Kapan Harus Menggunakan `useCallback`?

✅ **Gunakan `useCallback` jika:**

- Fungsi digunakan dalam **dependency array** `useEffect` dan tidak ingin memicu
  render ulang.
- Fungsi diteruskan ke **komponen anak** agar tidak menyebabkan re-render.
- Fungsi digunakan dalam **event handler** yang tidak boleh dibuat ulang setiap saat.

❌ **Jangan gunakan `useCallback` jika:**

- Fungsi tidak menyebabkan masalah re-render.
- Fungsi sederhana dan hanya digunakan sekali dalam komponen.

Menggunakan `useCallback` secara berlebihan justru bisa membuat kode lebih sulit
dibaca tanpa manfaat nyata! 🚀

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
