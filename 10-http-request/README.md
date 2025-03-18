# HTTP Requests di React

## Pendahuluan

Dalam pengembangan aplikasi web, HTTP request digunakan untuk mengirim dan menerima
data dari backend atau database. React menyediakan beberapa metode untuk melakukan
data fetching, baik menggunakan API bawaan seperti `fetch()` maupun menggunakan
pustaka eksternal seperti Axios.

---

## 1. Cara Menghubungkan Backend / Database

React tidak bisa langsung terhubung ke database karena React adalah sebuah
<i><b>client-side</b> web application</i> (berjalan di browser). Jika React terhubung
langsung ke database, kredensial akan terekspos dan menimbulkan risiko keamanan. Oleh
karena itu, komunikasi antara frontend (React App) dan database dilakukan melalui
sebuah backend (API) menggunakan HTTP Request.

Jika ingin membangun aplikasi fullstack dengan React, bisa menggunakan framework
seperti <b>Next.js</b> atau <b>Remix</b> yang menyediakan fitur backend bawaan.

### Memahami Konsep API dan RESTful API

- Menggunakan endpoint untuk mengakses data.
- Menggunakan backend seperti Node.js, Express, atau Firebase sebagai sumber data.

---

## 2. Fetching Data (Mengambil Data dari Backend)

Untuk mengambil data dari backend atau API, kita bisa menggunakan beberapa metode di
React:

### a. Menggunakan Fetch API

```jsx
import React, { useState, useEffect } from 'react';

const FetchData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const resData = await response.json();
      setData(resData);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Data dari API</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchData;
```

### b. Menggunakan Axios

```javascript
import axios from 'axios';
useEffect(() => {
  axios
    .get('https://api.example.com/data')
    .then((response) => setData(response.data))
    .catch((error) => console.error('Error fetching data:', error));
}, []);
```

---

## 3. Mengirim Data (POST, PUT, DELETE)

Selain mengambil data, kita juga bisa mengirim data ke backend menggunakan HTTP
request dengan metode seperti POST, PUT, atau DELETE.

### a. Menggunakan Fetch API (POST Request)

```javascript
const postData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Belajar HTTP Request',
      body: 'React itu keren!',
      userId: 1,
    }),
  });
  const data = await response.json();
  console.log(data);
};

postData();
```

### b. Menggunakan Axios (POST Request)

```javascript
const sendData = async () => {
  try {
    const response = await axios.post('https://api.example.com/data', {
      name: 'John Doe',
      age: 30,
    });
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error sending data:', error);
  }
};
```

#### Metode HTTP yang Sering Digunakan

- `GET`: Mengambil data dari server.
- `POST`: Mengirim data baru ke server.
- `PUT/PATCH`: Memperbarui data yang sudah ada.
- `DELETE`: Menghapus data dari server.

---

## 4. Keuntungan Menggunakan API

- **Keamanan:** Data tidak terekspos langsung ke frontend.
- **Modularitas:** Backend dan frontend dapat dikembangkan secara terpisah.
- **Skalabilitas:** Bisa digunakan oleh berbagai aplikasi (mobile, web, dll).
- **Reusability:** API yang sama bisa digunakan untuk berbagai platform.

---

## 5. Best Practices dalam Fetching Data

### **1. Menggunakan Loading State**

Loading state membantu memberi feedback ke user saat fetching data:

```jsx
const [isLoading, setIsLoading] = useState(false);
useEffect(() => {
  async function fetchData() {
    setIsLoading(true);
    const response = await fetch('https://api.example.com/data');
    const resData = await response.json();
    setData(resData);
    setIsLoading(false);
  }
  fetchData();
}, []);
```

### **2. Tiga State Utama dalam Fetching Data**

- `data` → Menyimpan hasil request.
- `loading` → Indikator bahwa data sedang diambil.
- `error` → Menangani error saat request gagal.

### **3. Menggunakan Error State**

Menangani error dengan memberikan feedback ke user:

```jsx
const [error, setError] = useState(null);
useEffect(() => {
  async function fetchData() {
    try {
      const response = await fetch('https://api.example.com/data');
      if (!response.ok) {
        throw new Error('Gagal mengambil data');
      }
      const resData = await response.json();
      setData(resData);
    } catch (err) {
      setError(err.message);
    }
  }
  fetchData();
}, []);
```

### **4. Memisahkan Fetching ke File Terpisah**

Agar lebih reusable, pisahkan fungsi fetching:

```javascript
export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }
  return resData.places;
}
```

### **5. Optimistic UI Update**

Memperbarui UI sebelum konfirmasi dari server untuk pengalaman yang lebih responsif:

```jsx
setUserPlaces((prevPlaces) => [selectedPlace, ...prevPlaces]);
try {
  await updateUserPlaces([selectedPlace, ...userPlaces]);
} catch (error) {
  setUserPlaces(userPlaces);
}
```

---

## 6. Kesimpulan

Dengan memahami cara melakukan HTTP Request di React, kita dapat dengan mudah
menghubungkan frontend dengan backend untuk mengambil dan mengirim data. Gunakan
`fetch()` atau pustaka seperti Axios untuk mempermudah pengelolaan data dari API.

---

---

---

# HTTP Requests di React

## Pendahuluan

Dalam pengembangan aplikasi web, HTTP request digunakan untuk mengirim dan menerima
data dari backend atau database. React menyediakan beberapa metode untuk melakukan
data fetching, baik menggunakan API bawaan seperti `fetch()` maupun pustaka eksternal
seperti Axios.

---

## 1. Cara Menghubungkan Frontend ke Backend

React tidak bisa langsung terhubung ke database karena berjalan di sisi klien
(client-side). Untuk mengambil data dari database, React perlu berkomunikasi dengan
backend melalui API. Backend ini bisa menggunakan berbagai teknologi seperti
**Node.js + Express**, **Django**, **Spring Boot**, atau lainnya.

### Contoh Backend dengan Express.js

```javascript
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let data = [
  { id: 1, title: 'Belajar React' },
  { id: 2, title: 'Belajar HTTP Request' },
];

app.get('/api/posts', (req, res) => {
  res.json(data);
});

app.listen(5000, () => console.log('Server berjalan di port 5000'));
```

---

## 2. Fetching Data di React

### a. Menggunakan Fetch API

```jsx
import React, { useState, useEffect } from 'react';

const FetchData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5000/api/posts');
      const resData = await response.json();
      setData(resData);
    }
    fetchData();
  }, []);

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
};

export default FetchData;
```

### b. Menggunakan Axios

```javascript
import axios from 'axios';
useEffect(() => {
  axios
    .get('http://localhost:5000/api/posts')
    .then((response) => setData(response.data))
    .catch((error) => console.error('Error:', error));
}, []);
```

---

## 3. Mengirim Data ke Backend (POST, PUT, DELETE)

### a. POST Request dengan Fetch API

```javascript
const postData = async () => {
  await fetch('http://localhost:5000/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Postingan baru' }),
  });
};
```

### b. POST Request dengan Axios

```javascript
axios
  .post('http://localhost:5000/api/posts', { title: 'Postingan baru' })
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));
```

---

## 4. Keamanan dalam HTTP Requests

### a. Menggunakan Token JWT untuk Autentikasi

```javascript
const login = async () => {
  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'user', password: 'pass' }),
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
};
```

### b. Menambahkan Token ke Header Request

```javascript
const fetchProtectedData = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/protected', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  console.log(data);
};
```

---

## 5. Optimasi Data Fetching

### a. Menggunakan React Query

```javascript
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchPosts = async () => {
  const response = await axios.get('http://localhost:5000/api/posts');
  return response.data;
};

const PostList = () => {
  const { data, isLoading, error } = useQuery('posts', fetchPosts);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
```

### b. Implementasi Caching dengan SWR

```javascript
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Posts = () => {
  const { data, error } = useSWR('http://localhost:5000/api/posts', fetcher);

  if (error) return <p>Error loading data</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
```

---

## 6. Real-time Data dengan WebSockets

### a. Implementasi WebSocket di Backend (Node.js + Socket.io)

```javascript
const io = require('socket.io')(5001, {
  cors: { origin: '*' },
});
io.on('connection', (socket) => {
  console.log('User connected');
  socket.emit('message', 'Hello from server');
});
```

### b. Implementasi WebSocket di React

```javascript
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5001');

const RealTimeComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('message', (data) => {
      setMessage(data);
    });
  }, []);

  return <p>{message}</p>;
};
```

---

## 7. Kesimpulan

- **Gunakan `fetch()` atau Axios untuk HTTP request biasa.**
- **Gunakan React Query atau SWR untuk caching dan optimasi.**
- **Pastikan keamanan dengan autentikasi menggunakan JWT.**
- **Gunakan WebSockets jika membutuhkan real-time data update.**

Dengan mengikuti praktik ini, aplikasi React yang berkomunikasi dengan backend akan
lebih cepat, aman, dan efisien!
