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
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setData(data));
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

## Kesimpulan

Dengan memahami cara melakukan HTTP Request di React, kita dapat dengan mudah
menghubungkan frontend dengan backend untuk mengambil dan mengirim data. Gunakan
`fetch()` atau pustaka seperti Axios untuk mempermudah pengelolaan data dari API.

Semoga dokumentasi ini membantu! 🚀
