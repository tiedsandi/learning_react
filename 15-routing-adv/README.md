# React Router Basics

## 📌 Pendahuluan

Repositori ini berisi contoh kode dan konsep dasar dalam menggunakan **React Router**
untuk menangani navigasi dalam aplikasi React.

> 📖 [Dokumentasi](https://reactrouter.com/6.30.0) v6.30

### Instalasi

```sh
npm install react-router-dom
```

---

## 📖 Konsep yang Dipelajari

### 1️⃣ Definisi Routing Dasar

Menggunakan `createBrowserRouter` untuk mendefinisikan route dalam aplikasi React.

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';

const router = createBrowserRouter([{ path: '/', element: <HomePage /> }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

### 2️⃣ Menambahkan Multiple Routes

Menambahkan halaman `/products` untuk navigasi ke daftar produk.

```jsx
import ProductsPage from './pages/Products';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/products', element: <ProductsPage /> },
]);
```

### 3️⃣ Alternatif Cara Definisi Routes

Menggunakan `createRoutesFromElements` untuk pendekatan yang lebih deklaratif.

```jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage />} />
    <Route path="/products" element={<ProductsPage />} />
  </Route>
);

const router = createBrowserRouter(routeDefinitions);
```

### 4️⃣ Navigasi Menggunakan `<Link />`

Menggunakan `<Link>` untuk berpindah halaman tanpa reload.

```jsx
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <h1>Homepage</h1>
      <p>
        Go to <Link to="/products">the list of products</Link>
      </p>
    </>
  );
}
```

### 5️⃣ Layouts dan Nested Routes

Menggunakan `Outlet` agar halaman dalam layout bisa berubah sesuai route.

```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: <ProductsPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: '/admin', element: <DashboardPage /> },
      { path: '/admin/products', element: <ProductsAdminPage /> },
    ],
  },
]);
```

**RootLayout.js**

```jsx
import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigations';

export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}
```

**AdminLayout.js**

```jsx
import { Outlet } from 'react-router-dom';
import AdminNavigation from '../components/AdminNavigation';

export default function AdminLayout() {
  return (
    <>
      <AdminNavigation />
      <Outlet />
    </>
  );
}
```

### 6️⃣ Menampilkan Halaman Error (Not Found)

Menampilkan halaman error ketika pengguna mengakses halaman yang tidak tersedia.

```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage title="Page not found!" />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/products/:id',
        element: <ProductsPage />,
        errorElement: <ErrorPage title="Product not found!" />,
      },
    ],
  },
]);
```

### 7️⃣ Navigasi Menggunakan `<NavLink />`

Menggunakan `<NavLink>` untuk menambahkan styling pada link aktif.

```jsx
import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? classes.active : undefined)}
              // style={({ isActive }) => ({
              //   textAlign: isActive ? 'center' : 'left',
              // })}
              end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? classes.active : undefined)}>
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? classes.active : undefined)}
              // style={({ isActive }) => ({
              //   textAlign: isActive ? 'center' : 'left',
              // })}
              end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? classes.active : undefined)}>
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
```

> Note

- useNavigate()
- dynamic routes and using useParams();
- adding links for dynamic routes using maps
- understanding relative & absolute path

```jsx
import {
  createBrowserRouter,
  // createRoutesFromElements,
  RouterProvider,
  // Route,
} from 'react-router-dom';

import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailPage from './components/ProductDetail';

// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/products" element={<ProductsPage />} />
//   </Route>
// );
// const router = createBrowserRouter(routeDefintions);

const router = createBrowserRouter([
  {
    path: '/root', //di sini di tambahkan root
    element: <RootLayout />,
    errorElement: <ErrorPage title="Page not found!" />,
    children: [
      { path: '', element: <HomePage /> },
      {
        path: 'products', //tidak ada / di awal untuk mengikutin path yang di atas jadi /root/products
        element: <ProductsPage />,
        errorElement: <ErrorPage title="Product not found!" />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

> cukup kompleks pahami link atribute:
>
> 1. relative: root/path
> 2. to => bersifat absolute, jadi kalo ingin mengikuti rootnya atau parentsnya
>    jangan ada slash di depan
> 3. index routes
