# React Class-Based Components

## Apa itu Class-Based Components?

React awalnya menggunakan class-based components sebagai cara utama untuk membuat
komponen sebelum diperkenalkannya Hooks di React 16.8. Meskipun sekarang kebanyakan
pengembang menggunakan functional components dengan Hooks, memahami class-based
components tetap penting, terutama untuk menangani kode lama atau memahami konsep
seperti lifecycle methods dan error boundaries.

### Mengapa Menggunakan Class-Based Components?

- Memungkinkan penggunaan state dan lifecycle methods sebelum Hooks tersedia.
- Berguna dalam proyek lama yang masih menggunakan sintaks ini.
- Membantu pemahaman bagaimana React bekerja secara internal.
- Diperlukan untuk fitur seperti Error Boundaries yang hanya bisa dibuat menggunakan
  class components.

---

## Perbedaan Functional Components vs Class-Based Components

### **Functional Components**

> Functional components adalah fungsi JavaScript biasa yang mengembalikan elemen yang
> bisa dirender (biasanya dalam bentuk JSX).

```jsx
function Product(props) {
  return <h2>A Product!</h2>;
}
```

### **Class-Based Components**

> Class-based components didefinisikan sebagai kelas JavaScript yang memiliki method
> `render()` untuk menentukan tampilan yang akan dirender.

```jsx
import React, { Component } from 'react';

class Product extends Component {
  render() {
    return <h2>A Product!</h2>;
  }
}
```

Class-based components dibuat dengan mendefinisikan sebuah class yang mewarisi dari
`React.Component`. Setiap class-based component wajib memiliki method `render()` yang
mengembalikan elemen React.

---

## Menggunakan State dalam Class Components

State digunakan untuk menyimpan data dalam komponen yang dapat berubah seiring waktu.

```jsx
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      showCount: false,
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  toggle = () => {
    this.setState((curState) => {
      return { showCount: !curState.showUsers };
    });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.toogle.bind(this)}>
          {this.state.showCount ? 'Hide' : 'Show'} Count
        </button>
      </div>
    );
  }
}

export default Counter;
```

---

## Lifecycle Methods dalam Class Components

Lifecycle methods memungkinkan kita menjalankan kode pada tahap tertentu dalam siklus
hidup komponen.

Beberapa lifecycle methods yang umum digunakan:

- `componentDidMount()`: Dipanggil setelah komponen ditambahkan ke DOM.
- `componentDidUpdate()`: Dipanggil setelah komponen diperbarui.
- `componentWillUnmount()`: Dipanggil sebelum komponen dihapus dari DOM.

```jsx
class LifecycleExample extends Component {
  componentDidMount() {
    console.log('Component mounted');
  }

  componentDidUpdate() {
    console.log('Component updated');
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  render() {
    return <h1>Lifecycle Example</h1>;
  }
}
```

---

## Menggunakan Context dalam Class Components

### 1. Membuat Context

```jsx
// users-context.js
import React from 'react';

const UsersContext = React.createContext({
  users: [],
});

export default UsersContext;
```

### 2. Mengonfigurasi Context

```jsx
// App.js
import UserFinder from './components/UserFinder';
import UsersContext from './store/users-context';

const DUMMY_USERS = [
  { id: 'u1', name: 'Fachran' },
  { id: 'u2', name: 'Sandi' },
  { id: 'u3', name: 'Joko' },
];

function App() {
  const usersContext = {
    users: DUMMY_USERS,
  };

  return (
    <UsersContext.Provider value={usersContext}>
      <UserFinder />
    </UsersContext.Provider>
  );
}

export default App;
```

### 3. Menggunakan Context dalam Class Component

```jsx
import { Fragment, Component } from 'react';
import Users from './Users';
import UsersContext from '../store/users-context';

class UserFinder extends Component {
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.setState({ filteredUsers: this.context.users });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}

export default UserFinder;
```

---

## Error Boundaries dalam React

Error Boundaries adalah fitur yang hanya bisa dibuat dengan class components. Mereka
digunakan untuk menangkap error di dalam komponen anak tanpa menghentikan seluruh
aplikasi.

### Membuat Error Boundary

```jsx
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

### Menggunakan Error Boundary

```jsx
import ErrorBoundary from './ErrorBoundary';
import BuggyComponent from './BuggyComponent';

function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}

export default App;
```

Jika `BuggyComponent` mengalami error, `ErrorBoundary` akan menangkapnya dan
menampilkan pesan error tanpa merusak seluruh aplikasi.

---

## Try...Catch vs. Error Boundaries

Ketika menangani error di React, ada dua pendekatan utama: **try...catch** (bawaan
JavaScript) dan **Error Boundaries** (khusus React). Berikut perbedaannya:

### **Try...Catch (JavaScript Standard Error Handling)**

- Digunakan untuk menangani error di dalam blok kode **sinkronous**.
- Tidak bisa menangkap error dalam **rendering React components**.
- Cocok digunakan untuk menangani error dalam event handler atau fungsi async.

✅ **Contoh Penggunaan `try...catch` dalam JavaScript**

```javascript
try {
  let data = JSON.parse('{"name": "Fachran"'); // Ada kesalahan JSON
  console.log(data.name);
} catch (error) {
  console.error('Terjadi error:', error.message);
}
```

---

### **Error Boundaries (React-Specific Error Handling)**

- Hanya bisa digunakan dalam **class components**.
- Bisa menangkap error dalam **rendering, lifecycle methods, dan children
  components**.
- Tidak bisa menangkap error dalam **event handlers**.

✅ **Contoh Implementasi Error Boundary di React**

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error caught by boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops! Terjadi Kesalahan.</h1>;
    }
    return this.props.children;
  }
}
```

Penggunaan:

```jsx
<ErrorBoundary>
  <BuggyComponent />
</ErrorBoundary>
```

Jika `BuggyComponent` mengalami error, **hanya komponen itu yang terpengaruh**,
sementara aplikasi tetap berjalan.

---

### 🚀 **Kesimpulan**

| **Fitur**                                 | **Try...Catch** | **Error Boundary**                |
| ----------------------------------------- | --------------- | --------------------------------- |
| Bisa menangkap error di event handler     | ✅ Ya           | ❌ Tidak                          |
| Bisa menangkap error di rendering React   | ❌ Tidak        | ✅ Ya                             |
| Bisa menangkap error di lifecycle methods | ❌ Tidak        | ✅ Ya                             |
| Bisa digunakan di functional components   | ✅ Ya           | ❌ Tidak (hanya class components) |

Gunakan **try...catch untuk menangani error dalam event handler atau async
functions**, dan **Error Boundaries untuk menangkap error dalam rendering komponen
React** agar UI tidak crash sepenuhnya.

---

## Kesimpulan

Meskipun React Hooks telah menggantikan banyak penggunaan class-based components,
masih penting untuk memahami class components karena mereka tetap digunakan dalam
proyek lama dan fitur spesifik seperti Error Boundaries. Dengan memahami konsep ini,
Anda akan lebih siap untuk bekerja dengan berbagai kode React, baik yang lama maupun
baru.

---

---

---

# React Class-Based Components

## 📌 Apa itu Class-Based Components?

React awalnya menggunakan **class-based components** sebelum diperkenalkannya Hooks
di React 16.8. Meskipun sekarang kebanyakan pengembang menggunakan **functional
components**, memahami class-based components tetap penting, terutama dalam kode lama
atau fitur spesifik seperti **Error Boundaries**.

## 📂 Struktur Folder

```plaintext
my-react-app/
├── src/
│   ├── components/
│   │   ├── Counter.js
│   │   ├── LifecycleExample.js
│   │   ├── ErrorBoundary.js
│   │   ├── UserFinder.js
│   ├── store/
│   │   ├── users-context.js
│   ├── App.js
│   ├── index.js
│   ├── styles.css
│
├── package.json
├── README.md
```

---

## 🎯 Perbedaan Functional Components vs Class-Based Components

### **Functional Components**

```jsx
function Product() {
  return <h2>A Product!</h2>;
}
```

### **Class-Based Components**

```jsx
import React, { Component } from 'react';

class Product extends Component {
  render() {
    return <h2>A Product!</h2>;
  }
}
```

---

## 🔥 Menggunakan State dalam Class Components

State digunakan untuk menyimpan data yang bisa berubah seiring waktu.

```jsx
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      showCount: false,
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  toggle = () => {
    this.setState((curState) => ({ showCount: !curState.showCount }));
  };

  render() {
    return (
      <div>
        {this.state.showCount && <p>Count: {this.state.count}</p>}
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.toggle}>
          {this.state.showCount ? 'Hide' : 'Show'} Count
        </button>
      </div>
    );
  }
}

export default Counter;
```

---

## 🔄 Lifecycle Methods dalam Class Components

Beberapa lifecycle methods yang umum digunakan:

- `componentDidMount()` → Dipanggil setelah komponen dipasang.
- `componentDidUpdate()` → Dipanggil setelah state atau props berubah.
- `componentWillUnmount()` → Dipanggil sebelum komponen dihapus dari DOM.

```jsx
class LifecycleExample extends Component {
  componentDidMount() {
    console.log('Component mounted');
  }

  componentDidUpdate() {
    console.log('Component updated');
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  render() {
    return <h1>Lifecycle Example</h1>;
  }
}
```

---

## 🎭 Menggunakan Context dalam Class Components

### 1️⃣ Membuat Context

```jsx
import React from 'react';

const UsersContext = React.createContext({
  users: [],
});

export default UsersContext;
```

### 2️⃣ Mengonfigurasi Context di `App.js`

```jsx
import UsersContext from './store/users-context';

const DUMMY_USERS = [
  { id: 'u1', name: 'Fachran' },
  { id: 'u2', name: 'Sandi' },
];

function App() {
  return (
    <UsersContext.Provider value={{ users: DUMMY_USERS }}>
      <UserFinder />
    </UsersContext.Provider>
  );
}
```

### 3️⃣ Menggunakan Context dalam Class Component

```jsx
class UserFinder extends Component {
  static contextType = UsersContext;

  componentDidMount() {
    this.setState({ filteredUsers: this.context.users });
  }
}
```

---

## ⚠️ Error Boundaries

Error Boundaries menangkap error dalam komponen anak agar aplikasi tidak crash.

```jsx
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

🔹 **Penggunaan:**

```jsx
<ErrorBoundary>
  <BuggyComponent />
</ErrorBoundary>
```

---

## 🔄 Konversi Class Components ke Functional Components

Dari **class component**:

```jsx
class Counter extends Component {
  constructor() {
    super();
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return <button onClick={this.increment}>{this.state.count}</button>;
  }
}
```

Menjadi **functional component dengan Hooks**:

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## 🛠️ Cara Menjalankan Proyek

1️⃣ **Clone repo & masuk ke folder proyek**

```sh
git clone https://github.com/username/my-react-app.git
cd my-react-app
```

2️⃣ **Install dependencies**

```sh
npm install
```

3️⃣ **Jalankan proyek**

```sh
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`.

---

## 🚀 Kesimpulan

✅ Class Components masih penting untuk proyek lama dan fitur tertentu (Error
Boundaries).  
✅ Lifecycle Methods membantu dalam mengontrol siklus hidup komponen.  
✅ Context API bisa digunakan dalam Class Components dengan `static contextType`.  
✅ **Error Boundaries** menangkap error agar UI tetap stabil.  
✅ Untuk proyek baru, **Hooks lebih disarankan** karena lebih sederhana.

---
