# Form User Input

Mempelajari form dalam React bisa lebih rumit daripada yang terlihat. Form dalam
React memerlukan penanganan khusus karena React tidak secara otomatis mengelola state
seperti pada form HTML biasa.

## Tantangan dalam Form

1. **Handling Form Submission & Validasi Input**  
   Saat pengguna mengisi form, kita perlu menangani pengiriman data serta memastikan
   input yang dimasukkan sesuai dengan yang diharapkan. Ini mencakup validasi seperti
   memastikan email valid, password cukup kuat, atau input tidak kosong.

2. **Menggunakan Fitur Bawaan Form**  
   HTML memiliki fitur bawaan seperti validasi input (`required`, `pattern`,
   `minLength`, dll.) yang bisa digunakan sebelum membuat solusi kustom.

3. **Membangun Solusi Kustom**  
   Terkadang, fitur bawaan HTML tidak cukup, sehingga kita perlu membangun solusi
   sendiri menggunakan state dan event handler dalam React.

## Cara Mengatasi Tantangan

### 1. Menggunakan State untuk Mengelola Form

React menggunakan state untuk mengelola nilai input form:

```jsx
import { useState } from 'react';

function FormExample() {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Nama yang dimasukkan: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nama:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <button type="submit">Kirim</button>
    </form>
  );
}

export default FormExample;
```

### 2. Validasi Input

Kita bisa menambahkan validasi sederhana sebelum pengiriman:

```jsx
const handleSubmit = (event) => {
  event.preventDefault();
  if (name.trim() === '') {
    alert('Nama tidak boleh kosong');
    return;
  }
  alert(`Nama yang dimasukkan: ${name}`);
};
```

### 3. Menggunakan Library Form

Alih-alih mengelola state sendiri, kita bisa menggunakan library seperti **React Hook
Form** untuk menyederhanakan proses.

```bash
npm install react-hook-form
```

Contoh penggunaan:

```jsx
import { useForm } from 'react-hook-form';

function FormWithLibrary() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: 'Nama wajib diisi' })} />
      {errors.name && <p>{errors.name.message}</p>}
      <button type="submit">Kirim</button>
    </form>
  );
}
```

## Kesimpulan

Form dalam React memerlukan pendekatan berbeda dibandingkan HTML murni. Kita bisa
memilih antara mengelola state secara manual atau menggunakan library seperti React
Hook Form untuk menangani form dengan lebih efisien. Dengan pemahaman yang baik, kita
dapat membuat form yang lebih interaktif dan mudah digunakan.

## catatan

1. tambhkan apa itu form

### tantangan dalam form input

ada 2 yaitu:

#### Form Submission

1. handling sumssion relatif mudah
2. menginput values bisa menggunakan dengan **state**
3. alternatif bisa menggunakna **ref**
4. atau melalui FormData dan native browser fitur

#### Input Invalid

1. memberikan pengalaman pengguna yang baik itu rumit
2. you can validate on every keystroke -> errors may be shown too early
3. you can validate on lost focus -> erros may be shown too long
4. you can validate on form submission -> erros may be shown too late

### Handling form submission

> pada react >v.19 ada fitur baru yaitu Form Actions

#### kenapa ketika di tag form dan mengklik button, akan kerefresh halaman webnya?

karena .... <br />

solusinya :

1. kasih type butotn di button

```jsx
<button type="button" className="button" onClick={handleSubmit}>
  Submit
</button>
```

2. kasih onSubmit di form </br> dengan memberikan onSubmit di function kita menerima
   event

```jsx
function handleSubmit(event) {
  event.preventDefault();
  console.log('submitted');
}

<form onSubmit={hanldeSubmit}>
  // rest code...
  <button className="button">Submit</button>
</form>;
```

#### Managing & Getting user input via state

```jsx
const [enteredEmail, setEnteredEmail] = useState('');
const [enteredPassword, setEnteredPassword] = useState('');

function handleSubmit(event) {
  event.preventDefault();
}

function handleEmailChange(event) {
  setEnteredEmail(event.target.value);
  console.log('User Email: ' + enteredEmail);
}
function handlePasswordChange(event) {
  setEnteredPassword(event.target.value);
  console.log('User Password: ' + enteredPassword);
}

<form onSubmit={handleSubmit}>
  <h2>Login</h2>

  <div className="control-row">
    <div className="control no-margin">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        onChange={handleEmailChange}
        value={enteredEmail}
      />
    </div>

    <div className="control no-margin">
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        onChange={handlePasswordChange}
        value={enteredPassword}
      />
    </div>
  </div>

  <p className="form-actions">
    <button className="button button-flat">Reset</button>
    <button className="button">Login</button>
  </p>
</form>;
```

#### Generic Handler

```jsx
import { useState } from 'react';

export default function Login() {
  const [enteredValue, setEnteredValue] = useState({
    email: '',
    password: '',
  });

  function handleSubmit(event) {
    event.preventDefault();

    console.log(enteredValue);
  }

  function handleValueChange(identifier, event) {
    setEnteredValue((prevState) => ({
      ...prevState,
      [identifier]: event.target.value,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={(event) => handleValueChange('email', event)}
            value={enteredValue.email}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) => handleValueChange('password', event)}
            value={enteredValue.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
```

#### getting user input via ref

```jsx
import { useRef } from 'react';

export default function Login() {
  const email = useRef();
  const password = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    console.log(enteredEmail, enteredPassword);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
```

#### getting value via formData

> kalo mau pakai ini harus ada **name propertie** pada input

```jsx
export default function Signup() {
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const acquisitionChanel = fd.getAll('acquisition');
    const data = Object.fromEntries(fd.entries()); //
    data.acquisition = acquisitionChanel;
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input id="confirm-password" type="password" name="confirm-password" />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input type="checkbox" id="google" name="acquisition" value="google" />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input type="checkbox" id="friend" name="acquisition" value="friend" />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I agree to
          the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
```
