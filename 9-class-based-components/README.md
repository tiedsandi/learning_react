# React Class-Based Components

## What & Why

React awalnya menggunakan class-based components sebagai cara utama untuk membuat
komponen sebelum diperkenalkannya Hooks di React 16.8. Meskipun sekarang kebanyakan
pengembang menggunakan functional components dengan Hooks, memahami class-based
components tetap penting, terutama untuk menangani kode lama atau memahami konsep
seperti lifecycle methods dan error boundaries.

**Mengapa menggunakan Class-Based Components?**

- Memungkinkan penggunaan state dan lifecycle methods sebelum Hooks tersedia.
- Berguna dalam proyek lama yang masih menggunakan sintaks ini.
- Mempermudah pemahaman bagaimana React bekerja secara internal.
- Diperlukan untuk fitur seperti Error Boundaries yang hanya bisa dibuat menggunakan
  class components.

---

## Working with Class-Based Components

#### **Functional Components**

> Components are regular js functions which return renderable results (typically JSX)

```jsx
function Product(props) {
  return <h2>A Product! </h2>;
}
```

#### class-based Components

> components can also be defined as JS classes where a render() method defines the
> to-be-renderd output

```jsx
class Product extends Component {
  render() {
    return <h2>A Product!</h2>;
  }
}
```

Class-based components dibuat dengan mendefinisikan sebuah class yang mewarisi dari
`React.Component`. Setiap class-based component wajib memiliki method `render()` yang
mengembalikan elemen React.

### Contoh Class Component Sederhana

```jsx
import React, { Component } from 'react';

class HelloWorld extends Component {
  render() {
    return <h1>Hello, World!</h1>;
  }
}

export default HelloWorld;
```

### Menggunakan State dalam Class Components

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

  toogle = () => {
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

### Lifecycle Methods dalam Class Components

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

### Menggunakan Context

1. Buat Context

```jsx
//users-context.js
import React from 'react';

const UsersContext = React.createContext({
  users: [],
});

export default UsersContext;
```

2. Configure Context

```jsx
//App.js
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

3. Cara menggunakna Conetxt

```jsx
import { Fragment, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
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

## Error Boundaries

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

## Kesimpulan

Meskipun React Hooks telah menggantikan banyak penggunaan class-based components,
masih penting untuk memahami class components karena mereka tetap digunakan dalam
proyek lama dan fitur spesifik seperti Error Boundaries. Dengan memahami konsep ini,
Anda akan lebih siap untuk bekerja dengan berbagai kode React, baik yang lama maupun
baru.
