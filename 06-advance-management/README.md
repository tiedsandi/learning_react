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
