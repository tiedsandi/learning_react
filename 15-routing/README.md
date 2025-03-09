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
