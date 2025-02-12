# Understanding & Optimizing React

## Bagaimana React Bekerja?

React membangun sebuah pohon komponen (_component tree_), yang merupakan representasi
virtual dari antarmuka pengguna. Representasi ini disebut sebagai _Virtual DOM_.
Ketika terjadi perubahan pada _state_ atau data, React akan membandingkan _Virtual
DOM_ yang baru dengan versi sebelumnya menggunakan _Reconciliation Algorithm_. Hanya
bagian yang mengalami perubahan yang akan diperbarui ke _Real DOM_. Pendekatan ini
membuat React lebih efisien dibandingkan manipulasi _DOM_ secara langsung.

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

//react ^18 bisa langsung tanpa disimpan ke variable baru
export default  memo(function Counter({ initialCount }) {
  return <div>Count: {initialCount}</div>;
});

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
