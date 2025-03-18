# Advanced State Management (React Context)

## 1. Prop Drilling & Context API

Ketika state perlu digunakan oleh banyak komponen, **prop drilling** bisa membuat
kode sulit dikelola. Solusinya adalah **Context API**.

### a. Membuat dan Menyediakan Context

```jsx
// store/CartContext.jsx
import { createContext } from 'react';
export const CartContext = createContext({ items: [] });
```

Gunakan `CartContext.Provider` di level tertinggi aplikasi:

```jsx
<CartContext.Provider value={{ items: [] }}>
  {/* Komponen lainnya */}
</CartContext.Provider>
```

### b. Menggunakan Context

```jsx
import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

const cartCtx = useContext(CartContext);
console.log(cartCtx.items);
```

Atau dengan `Context.Consumer`:

```jsx
<CartContext.Consumer>
  {({ items }) => <div>Total Items: {items.length}</div>}
</CartContext.Consumer>
```

## 2. Menggunakan Context dengan State

### a. Membuat Context dengan `useState`

```jsx
import { createContext, useState } from 'react';
export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item) => setCart((prev) => [...prev, item]);

  return (
    <CartContext.Provider value={{ cart, addItem }}>{children}</CartContext.Provider>
  );
}
```

### b. Menggunakan `useContext`

```jsx
import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

const { cart, addItem } = useContext(CartContext);
addItem({ id: 1, name: 'Product' });
```

## 3. Mengelola State Kompleks dengan `useReducer`

Ketika state semakin kompleks, gunakan **useReducer** untuk pengelolaan yang lebih
terstruktur.

### a. Membuat Reducer

```jsx
import { createContext, useReducer } from 'react';
export const CartContext = createContext();

const initialState = { items: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { items: state.items.filter((item) => item.id !== action.payload) };
    default:
      return state;
  }
}

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
```

### b. Menggunakan Reducer

```jsx
import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

const { state, dispatch } = useContext(CartContext);
dispatch({ type: 'ADD_ITEM', payload: { id: 1, name: 'Product' } });
```

## 4. Kesimpulan

- **Context API** menghindari **prop drilling**.
- **useState** cocok untuk state sederhana.
- **useReducer** cocok untuk state kompleks dengan banyak perubahan.

---

---

---

# Advanced State Management (React Context)

## 📌 Overview

Dokumen ini menjelaskan bagaimana menggunakan **React Context API** untuk mengelola
state global tanpa prop drilling. Kita akan belajar cara:

- Membuat dan menyediakan Context
- Menggunakan Context dengan `useState`
- Mengelola state kompleks dengan `useReducer`
- Menempatkan Context Provider di aplikasi
- Menggunakan Context dalam komponen
- Menangani error umum

---

## 📂 Struktur Folder

Pastikan struktur proyek Anda seperti ini:

```
/src
  /store
    CartContext.jsx    # Context dan Provider untuk keranjang
  /components
    Cart.jsx           # Menampilkan jumlah item dalam keranjang
    Product.jsx        # Menambahkan item ke keranjang
  App.jsx              # Menggunakan CartProvider di root
  index.jsx
```

---

## ✅ Langkah 1: Buat Context (`CartContext.jsx`)

Buat file `CartContext.jsx` di dalam folder `store/`.

```jsx
import { createContext, useReducer } from 'react';

// 1️⃣ Definisikan Context
export const CartContext = createContext();

const initialState = { items: [] };

// 2️⃣ Reducer Function
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { items: state.items.filter((item) => item.id !== action.payload) };
    default:
      return state;
  }
}

// 3️⃣ Provider Component
export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
```

---

## ✅ Langkah 2: Tambahkan Provider di `App.jsx`

Agar Context tersedia di seluruh aplikasi, wrap aplikasi dengan `CartProvider`.

```jsx
import CartProvider from './store/CartContext';
import Cart from './components/Cart';
import Product from './components/Product';

function App() {
  return (
    <CartProvider>
      <Cart />
      <Product />
    </CartProvider>
  );
}

export default App;
```

---

## ✅ Langkah 3: Gunakan Context dalam Komponen

### 📌 Mengambil Data dari Context (`Cart.jsx`)

```jsx
import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

export default function Cart() {
  const { state } = useContext(CartContext);

  return <div>Total Items: {state.items.length}</div>;
}
```

### 📌 Mengupdate State dengan `dispatch` (`Product.jsx`)

```jsx
import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

export default function Product() {
  const { dispatch } = useContext(CartContext);

  const addItemToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { id: 1, name: 'Product A' } });
  };

  return <button onClick={addItemToCart}>Add to Cart</button>;
}
```

---

## 🔥 Troubleshooting (Kesalahan Umum)

### ❌ Error: `TypeError: Cannot read properties of undefined (reading 'items')`

✅ **Solusi:** Pastikan komponen berada dalam `<CartProvider>`.

```jsx
<CartProvider>
  <Cart /> // ✅ Bisa akses Context
</CartProvider>
```

### ❌ `dispatch is not a function`

✅ **Solusi:** Pastikan Anda menggunakan `useReducer` di dalam `CartContext.jsx`.

---

## 💡 Best Practices

✅ **Pisahkan Context ke dalam folder `/store/`**  
✅ **Gunakan `useReducer` untuk state yang kompleks**  
✅ **Gunakan custom hook (`useCart`) untuk kemudahan akses**

```jsx
import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

export function useCart() {
  return useContext(CartContext);
}
```

---

## 🎯 Kesimpulan

- **Context API** menghindari **prop drilling**.
- **Gunakan `useState` untuk state sederhana**.
- **Gunakan `useReducer` untuk state kompleks dengan banyak perubahan**.
- **Pastikan Provider membungkus seluruh aplikasi** agar Context bisa diakses dari
  mana saja.

🚀 Sekarang Anda siap mengelola state global dengan Context API secara efektif!
