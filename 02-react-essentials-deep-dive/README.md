# React Essentials Deep Dive

## 1. Behind the Scenes of JSX

JSX (JavaScript XML) adalah sintaks yang digunakan dalam React untuk menulis elemen
UI dengan cara yang mirip dengan HTML. JSX bukanlah string atau HTML biasa, tetapi
dikompilasi menjadi `React.createElement()` oleh Babel sebelum dieksekusi oleh
browser.

**Contoh JSX dan hasil kompilenya:**

```jsx
const element = <h1>Hello, World!</h1>;
// Dikompilasi menjadi:
const element = React.createElement('h1', null, 'Hello, World!');
```

## 2. Structuring Components and State

Dalam React, aplikasi dibangun menggunakan komponen yang dapat memiliki state untuk
menyimpan data yang berubah.

**Contoh komponen dengan state:**

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## 3. Advanced State Usage

### Best Practices: Updating State

Saat memperbarui state yang bergantung pada nilai sebelumnya, gunakan fungsi updater
untuk menghindari masalah race condition.

**Contoh penggunaan fungsi updater:**

```jsx
setCount((prevCount) => prevCount + 1);
```

### Two-Way Binding

Two-way binding memungkinkan data diinput oleh pengguna dan langsung tersimpan dalam
state.

**Contoh two-way binding dengan input:**

```jsx
function InputField() {
  const [text, setText] = useState('');
  return (
    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
  );
}
```

### Lifting State Up

Ketika dua atau lebih komponen perlu berbagi state, state dipindahkan ke komponen
induk dan diberikan sebagai prop ke anak-anaknya.

**Contoh lifting state up:**

```jsx
function Parent() {
  const [message, setMessage] = useState('Hello');

  return <Child message={message} setMessage={setMessage} />;
}

function Child({ message, setMessage }) {
  return (
    <div>
      <p>{message}</p>
      <button onClick={() => setMessage('Updated Message')}>Update</button>
    </div>
  );
}
```

Dengan memahami konsep ini, Anda dapat membangun aplikasi React yang lebih
terstruktur dan efisien!
