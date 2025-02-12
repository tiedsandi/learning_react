# Styling di React

## 1. Vanilla CSS

### 📖 Dokumentasi: [Dokumentasi](#https://developer.mozilla.org/en-US/docs/Web/CSS)

### 📌 Kelebihan & Kekurangan

| ✅ Kelebihan                               | ❌ Kekurangan                           |
| ------------------------------------------ | --------------------------------------- |
| Sederhana dan banyak digunakan             | Style global dapat menyebabkan konflik  |
| Cocok untuk proyek kecil                   | Membutuhkan konvensi penamaan agar rapi |
| Bisa menggunakan CSS Modules untuk isolasi |                                         |

### 🚀 Cara Penggunaan

#### 1. Menggunakan CSS Modules (Direkomendasikan)

```jsx
// Header.module.css
.paragraph {
  font-size: 16px;
  color: #333;
}

// Header.jsx
import classes from './Header.module.css';

<header className={classes.paragraph}>Teks Contoh</header>
```

#### 2. Menggunakan File CSS Eksternal

```css
/* header.css */
.header {
  font-size: 20px;
}
```

```jsx
// Header.jsx
import './header.css';

export default function Header() {
  return <header className="header">Teks Contoh</header>;
}
```

#### 3. Inline CSS (Gunakan dengan Hati-hati)

```jsx
<p style={{ color: 'red', textAlign: 'center' }}>Teks contoh</p>
```

#### ✅ Dianjurkan:

```jsx
<input type='email' style={{ color: emailNotValid ? 'red' : '#cacaca' }} />
<label className={`label ${emailNotValid && 'invalid'}`}>Email</label>
```

#### ❌ Jangan:

```jsx
<label className={emailNotValid && 'invalid'}>Email</label>
```

---

## 2. Styled Components

### 📖 Dokumentasi: [Styled Components](https://styled-components.com/docs)

### 📌 Kelebihan & Kekurangan

| ✅ Kelebihan                                       | ❌ Kekurangan             |
| -------------------------------------------------- | ------------------------- |
| Style terisolasi, tidak ada konflik class          | Ukuran bundle lebih besar |
| Styling dinamis dengan props                       | Butuh waktu untuk belajar |
| Mendukung nested, pseudo-selector, dan media query |                           |

### 🚀 Cara Penggunaan

#### 1. Instalasi

```sh
npm install styled-components
```

#### 2. Penggunaan Dasar

```jsx
import styled from 'styled-components';

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #f0b322;

  &:hover {
    background-color: #f0920e;
  }
`;

export default Button;
```

```jsx
// Penggunaan dalam file lain
import Button from './Button';
<Button onClick={handleLogin}>Masuk</Button>;
```

#### 3. Styling Dinamis & Kondisional

```jsx
const Label = styled.label`
  color: ${({ $invalid }) => ($invalid ? '#f87171' : '#6b7280')};
`;
<Label $invalid={emailNotValid}>Email</Label>;
```

#### 4. Pseudo-Selector, Nested Rules, Media Queries

```jsx
const StyledHeader = styled.header`
  display: flex;

  & h1 {
    font-size: 1.5rem;
  }

  @media (min-width: 768px) {
    margin-bottom: 4rem;

    & h1 {
      font-size: 2.25rem;
    }
  }
`;
```

---

## 3. Tailwind CSS

### 📖 Dokumentasi:

- [Tailwind CSS Docs](https://tailwindcss.com/docs/installation/using-vite)
- [Tailwind Theme](https://tailwindcss.com/docs/theme)

### 📌 Kelebihan & Kekurangan

| ✅ Kelebihan                       | ❌ Kekurangan                          |
| ---------------------------------- | -------------------------------------- |
| Utility-first, styling lebih cepat | Membutuhkan pembelajaran class utility |
| Ukuran bundle kecil                | Bisa membuat HTML terlihat ramai       |
| Desain responsif lebih mudah       |                                        |

### 🚀 Cara Penggunaan

#### 1. Instalasi

```sh
npm install -D tailwindcss
npx tailwindcss init
```

#### 2. Konfigurasi (tailwind.config.js)

```js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### 3. Menggunakan Kelas Tailwind

```jsx
<button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md">
  Klik Saya
</button>
```

#### 4. Styling Kondisional

```jsx
<label className={`text-sm ${emailNotValid ? 'text-red-500' : 'text-gray-600'}`}>
  Email
</label>
```
