# Advance Management

### prop drilling

### React's Context API

biasanya disimpan di folder store

- cara membuat dan providing

```
// folder store/nama-context.jsx
import { createContext } from 'react';

export const CartContext = createContext({
  items: [],
});


//App.js atau top level file
<CartContext.Provider>
  ... rest code
</CartContext.Provider>
```

- cara memanggil atau menggunakannya

```
//Component Cart.jsx
import { useContext } from 'react';

import { CartContext } from '../store/shoping-cart-context';


export default function Cart(){
  //const cartCtx = useContext(CartContext);
  const {items} = useContext(CartContext);


  return()
}
```

import useContext bisa dengan use

```
import { use } from 'react';

const cartCtx = use(CartContext);

```
