# Understanding & Optimizing React

## Bagaimana React Bekerja?

React membangun sebuah pohon komponen (_component tree_), yang merupakan representasi
virtual dari antarmuka pengguna. Representasi ini disebut sebagai _Virtual DOM_.
Ketika terjadi perubahan pada _state_ atau data, React akan membandingkan _Virtual
DOM_ yang baru dengan versi sebelumnya menggunakan _Reconciliation Algorithm_. Hanya
bagian yang mengalami perubahan yang akan diperbarui ke _Real DOM_. Pendekatan ini
membuat React lebih efisien dibandingkan manipulasi _DOM_ secara langsung.

### State Batching dalam React

React melakukan _state batching_, yang berarti bahwa beberapa pembaruan state yang
dipicu dalam satu fungsi yang sama akan digabungkan (_batching_) dan hanya
menyebabkan satu kali re-render. Contoh:

```jsx
function handleSetCount(newCount) {
  setChosenCount(newCount);
  setChosenCount((prevChosenCount) => prevChosenCount + 1);
}
```

Pada kode di atas, meskipun ada dua pemanggilan `setChosenCount`, React hanya akan
melakukan satu kali render karena kedua pembaruan terjadi dalam satu event loop yang
sama.

## Menggunakan memo dari React

`memo()` digunakan untuk mencegah komponen mengalami _re-render_ yang tidak perlu,
sehingga meningkatkan performa aplikasi React.

Contoh pada `App.jsx` yang memiliki komponen `Counter.jsx`:

```jsx
// App.jsx
import { useState } from 'react';
import Counter from './Counter';

function App() {
  const [enteredNumber, setEnteredNumber] = useState(0);

  const handleChange = (event) => {
    setEnteredNumber(event.target.value);
  };

  return (
    <main>
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <Counter initialCount={enteredNumber} />
    </main>
  );
}

export default App;
```

Jika `Counter.jsx` tidak menggunakan `memo()`, maka setiap perubahan di
`enteredNumber` akan menyebabkan komponen `Counter` di-_render_ ulang. Untuk
mengoptimalkan ini, kita bisa menggunakan `memo()`:

```jsx
// Counter.jsx
import { memo } from 'react';

const Counter = memo(function Counter({ initialCount }) {
  return <div>Count: {initialCount}</div>;
});

export default Counter;
```

Dengan `memo()`, komponen `Counter` hanya akan di-_render_ ulang jika `initialCount`
berubah, bukan karena perubahan pada komponen induknya yang tidak relevan dengan
komponen tersebut.

### Perhatian dalam Penggunaan memo()

Meskipun `memo()` dapat meningkatkan performa, penggunaannya harus diperhatikan
dengan baik agar tidak menimbulkan overhead yang tidak perlu:

1. **Gunakan pada komponen di level atas jika memungkinkan**

   - _Memoization_ akan mempengaruhi komponen turunannya, jadi lebih baik diterapkan
     pada komponen yang memiliki banyak turunannya.

2. **Perhatikan biaya performa dalam penggunaan `memo()`**

   - Jangan membungkus semua komponen dengan `memo()` karena dapat meningkatkan
     pekerjaan React dalam memeriksa perubahan yang sebenarnya tidak perlu.

3. **Hindari `memo()` pada komponen dengan _props_ yang sering berubah**
   - Jika _props_ komponen sering berubah, `memo()` menjadi tidak efektif dan justru
     mengorbankan performa.

## Selain menggunakan memo()

> Kita bisa membuat komposisi komponen yang cerdas dalam aplikasi, dengan memisahkan
> antar state tertentu agar state lainnya tidak dirender.

## useCallback()

`useCallback()` digunakan untuk menghindari pembuatan ulang fungsi yang tidak perlu,
sehingga dapat mencegah _re-render_ berlebih pada komponen yang menggunakan fungsi
tersebut.

```jsx
import { useCallback } from 'react';

const handleDecrement = useCallback(function handleDecrement() {
  setCounter((prevCounter) => prevCounter - 1);
}, []);

<IconButton icon={MinusIcon} onClick={handleDecrement}>
  Decrement
</IconButton>;
```

> Contoh di atas memastikan `IconButton` tidak perlu di-_render_ ulang setiap kali
> komponen induk diperbarui.

## useMemo()

Gunakan `useMemo()` untuk menghindari perhitungan ulang fungsi yang kompleks atau
mahal secara performa.

```jsx
import { useMemo } from 'react';

const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);
```

## Kenapa Key Sangat Penting Saat Mengelola State di React

> **Catatan:** Key dapat ditambahkan ke komponen mana saja.

Key sangat berguna dalam React untuk mengidentifikasi elemen dengan unik, terutama
saat bekerja dengan daftar. Menggunakan `id` daripada `index` sebagai key adalah
praktik yang lebih baik karena:

- **Memastikan state tidak melompat-lompat** saat daftar diperbarui.
- **Membantu React mengoptimalkan rendering list** dengan hanya menambahkan atau
  menghapus elemen yang berubah, bukan merender ulang seluruh daftar.

Contoh penggunaan key yang kurang optimal:

```jsx
{
  history.map((count, index) => <HistoryItem key={index} count={count} />);
}
```

Rekomendasi penggunaan key yang lebih baik:

```jsx
{
  history.map((count) => <HistoryItem key={count.id} count={count.value} />);
}
```

### Key vs. useEffect dalam Pengelolaan State

Selain untuk daftar, key juga dapat digunakan untuk memicu re-render ulang komponen.
Jika key berubah, React akan **menghapus komponen lama (unmount) dan membuat ulang
yang baru (remount)**, mirip dengan efek dependency dalam `useEffect`.

Contoh penggunaan `useEffect` untuk mengatur ulang state saat `initialCount` berubah:

```jsx
// Counter.jsx
useEffect(() => {
  setCounterChanges([{ value: initialCount, id: Math.random() * 1000 }]);
}, [initialCount]);
```

Alternatifnya, kita bisa menggunakan key:

```jsx
<Counter key={chosenCount} initialCount={chosenCount} />
```

### Kesimpulan

- **Di dalam list**, key membantu React mengidentifikasi elemen yang tetap dan yang
  perlu diperbarui tanpa merender ulang seluruh daftar.
- **Di level komponen**, perubahan key menyebabkan React membuang komponen lama dan
  membuat ulang yang baru, berguna untuk menginisialisasi ulang state tanpa
  `useEffect`.

## Menggunakan package Million.js untuk Optimasi

Million.js memungkinkan optimasi performa dengan pendekatan _virtualization_.

### Langkah Instalasi

```sh
npx million@latest
```

> **Referensi:** [Dokumentasi Million.js](https://million.dev/docs)
