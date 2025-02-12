# Uderstanding & Optimizing React

### Bagaimana React Bekerja?

React membuat sebuah pohon komponen (component tree), yang merupakan representasi
virtual dari antarmuka pengguna. Pohon ini disebut sebagai Virtual DOM. Saat terjadi
perubahan pada data atau state, React akan membandingkan Virtual DOM baru dengan yang
lama menggunakan Reconciliation Algorithm dan hanya memperbarui bagian yang mengalami
perubahan pada Real DOM. Hal ini membuat React sangat efisien dibandingkan manipulasi
DOM secara langsung.

### Gunakan memo dari React

memo() digunakan untuk membuat komponent tidak di render lagi

contoh pada app.jsx, ada komponent Counter.jsx:

```jsx
//app.jsx

function App() {
  const [enteredNumber, setEnteredNumber] = useState(0);

  return (
    <main>
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <Counter initialCount={chosenCount} />
    </main>
  );
}
```

jika Counter.jsx tidak menggunakan memo() maka akan dirender ulang jika diinputkan
suatu nilai yang ada pada app.jsx, untuk mengatasinya menggunakan memo()

```jsx
//Counter.jsx

import { memo } from 'react';

const Counter = memo(function Counter({ initialCount }) {
  return (
    //...rest code
    );
});

export default Counter;
```

#### Perlu diperhatikan!!!

Jangan terlalu sering menggunakan memo()

- gunakan pada komponent tree teratas jika memungkinkan </br> => menggunakan memo
  akan berpengaruh ke dalam komponent dalam bawaannya

- lihat props dengan memo() biaya performannya </br> => jangan membungkus memo()
  disemua komponent yang ada, itu akan menambah pekerjaan untuk mengecek yang tidak
  perlu

- jangan gunakan memo() pada komponent yang <b><i>props</i></b> yang sering berubah
  </br> memo() akan menjadi tidak berguna pada contoh kasus tersebut yang
  mengorbankan performanya
