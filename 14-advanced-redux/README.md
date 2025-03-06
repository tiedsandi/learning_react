# Advanced Redux (async)

## Di mana logic code harus di tempatkan

### Fat Reducers vs Fat Components vs Fat Actions

1. Synchronous, side-effect free code (contoh: data transformations)
   > Lebih baik Reducecrs, hindari actions creators atau components.
2. async code atau code dengan side-effects
   > Lebih baik Actions Creators atau componetns, hindari reducers.

### Redux Best Practices: Hindari Fat Reducers, Fat Components, dan Fat Actions

Dalam Redux, penting untuk memastikan bahwa **logika ditempatkan di tempat yang
tepat** agar kode tetap bersih, terstruktur, dan mudah di-maintain. Berikut adalah
penjelasan dan contoh dari **Fat Reducers, Fat Components, dan Fat Actions**, serta
cara memperbaikinya.

---

#### 1️⃣ Fat Reducers (Reducer yang Terlalu Gemuk)

##### 🔴 Masalah

Fat reducers terjadi ketika terlalu banyak logika bisnis dan efek samping dimasukkan
ke dalam reducer. Reducer seharusnya hanya fokus pada perubahan state **tanpa efek
samping**.

###### ❌ Contoh Fat Reducer (Buruk)

```js
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      state.totalQuantity++;
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({ ...newItem, quantity: 1, totalPrice: newItem.price });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }

      // ❌ LOGIKA ASYNC SEHARUSNYA TIDAK ADA DI SINI!
      fetch('firebase-url', {
        method: 'POST',
        body: JSON.stringify(state.items),
      });
    },
  },
});
```

##### 🟢 Solusi

Pindahkan efek samping ke **action creator**:

```js
export const sendCartData = (cart) => {
  return async (dispatch) => {
    try {
      await fetch('firebase-url', {
        method: 'POST',
        body: JSON.stringify(cart),
      });
    } catch (error) {
      console.error('Failed to send cart data:', error);
    }
  };
};
```

Sekarang reducer hanya fokus pada perubahan state.

---

#### 2️⃣ Fat Components (Komponen yang Terlalu Gemuk)

##### 🔴 Masalah

Fat components terjadi ketika komponen menangani terlalu banyak logika state
management dan efek samping, padahal seharusnya itu tugas Redux.

###### ❌ Contoh Fat Component (Buruk)

```js
const ProductItem = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { title, price, description, id } = props;

  const addToCartHandler = () => {
    const updatedItems = [...cart.items];
    const existingItem = updatedItems.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice += price;
    } else {
      updatedItems.push({ id, price, quantity: 1, totalPrice: price, name: title });
    }

    dispatch(
      cartActions.replaceCart({
        totalQuantity: cart.totalQuantity + 1,
        items: updatedItems,
      })
    );

    // ❌ Tidak seharusnya ada di sini!
    fetch('firebase-url', {
      method: 'POST',
      body: JSON.stringify(updatedItems),
    });
  };

  return (
    <li>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={addToCartHandler}>Add to Cart</button>
    </li>
  );
};
```

##### 🟢 Solusi

Gunakan Redux dengan action creator:

```js
const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { title, price, description, id } = props;

  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart({ id, title, price }));
    dispatch(sendCartData()); // Kirim data ke server
  };

  return (
    <li>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={addToCartHandler}>Add to Cart</button>
    </li>
  );
};
```

Komponen sekarang hanya fokus pada UI dan event handling.

---

#### 3️⃣ Fat Actions (Action Creator yang Terlalu Gemuk)

##### 🔴 Masalah

Fat actions terjadi ketika action creator menangani banyak logika manipulasi state,
padahal itu seharusnya tugas reducer.

###### ❌ Contoh Fat Action (Buruk)

```js
export const addItemToCart = (item) => {
  return async (dispatch, getState) => {
    const cart = getState().cart;

    const updatedItems = [...cart.items];
    const existingItem = updatedItems.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice += item.price;
    } else {
      updatedItems.push({ ...item, quantity: 1, totalPrice: item.price });
    }

    dispatch(
      cartActions.replaceCart({
        totalQuantity: cart.totalQuantity + 1,
        items: updatedItems,
      })
    );

    await fetch('firebase-url', {
      method: 'POST',
      body: JSON.stringify(updatedItems),
    });
  };
};
```

##### 🟢 Solusi

Pisahkan logika manipulasi state ke dalam reducer:

```js
export const sendCartData = () => {
  return async (dispatch, getState) => {
    const cart = getState().cart;
    await fetch('firebase-url', {
      method: 'POST',
      body: JSON.stringify(cart),
    });
  };
};
```

Sekarang reducer hanya menangani perubahan state, sedangkan action hanya untuk efek
samping.

---

#### Kesimpulan

| **Jenis "Fat"**   | **Masalah**                                           | **Solusi**                                        |
| ----------------- | ----------------------------------------------------- | ------------------------------------------------- |
| **Fat Reducer**   | Reducer menangani banyak logika bisnis & efek samping | Pindahkan efek samping ke action creator          |
| **Fat Component** | Komponen menangani banyak logika state & API calls    | Pindahkan state ke Redux & gunakan action creator |
| **Fat Action**    | Action creator menangani terlalu banyak logika state  | Pindahkan manipulasi state ke reducer             |

Dengan mengikuti best practice ini, kode Redux Anda akan lebih bersih, lebih mudah
di-maintain, dan lebih scalable! 🚀

## Using Thunk

### Apa itu thunk?
