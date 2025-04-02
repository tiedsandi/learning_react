# Panduan Lengkap Form Handling di React

## Apa itu Form?

Form adalah elemen dalam HTML yang digunakan untuk mengumpulkan input dari pengguna.
Form terdiri dari berbagai elemen seperti input, textarea, select, dan button.

## Tantangan dalam Form Input

### 1. Form Submission

- Handling submission relatif mudah.
- Menginput values bisa menggunakan **state**.
- Alternatif lain bisa menggunakan **ref**.
- Bisa juga melalui **FormData** dan fitur native browser.

### 2. Input Invalid

- Memberikan pengalaman pengguna yang baik itu rumit.
- Validasi bisa dilakukan dengan beberapa pendekatan:
  - Validasi setiap ketikan (`onChange`) -> Error mungkin muncul terlalu cepat.
  - Validasi saat kehilangan fokus (`onBlur`) -> Error mungkin muncul terlalu lama.
  - Validasi saat form dikirim (`onSubmit`) -> Error mungkin muncul terlalu
    terlambat.

## Handling Form Submission

> Pada React versi 19 ke atas, terdapat fitur baru yaitu **Form Actions**.

### Kenapa ketika di tag form dan mengklik button, halaman web akan refresh?

Karena **default behavior** dari form HTML adalah mengirimkan request ke server dan
me-reload halaman.

### Solusinya:

#### 1. Menentukan type="button" pada button

```jsx
<button type="button" className="button" onClick={handleSubmit}>
  Submit
</button>
```

#### 2. Menggunakan event.preventDefault() dalam fungsi handleSubmit

```jsx
function handleSubmit(event) {
  event.preventDefault();
  console.log("submitted");
}

<form onSubmit={handleSubmit}>
  <button className="button">Submit</button>
</form>;
```

## Mengelola & Mendapatkan Input User dengan State

```jsx
const [enteredEmail, setEnteredEmail] = useState("");
const [enteredPassword, setEnteredPassword] = useState("");

function handleSubmit(event) {
  event.preventDefault();
  setEnteredEmail("");
  setEnteredPassword("");
}
```

## Generic Handler dan Reset Input

```jsx
const [enteredValue, setEnteredValue] = useState({ email: "", password: "" });

function handleValueChange(identifier, event) {
  setEnteredValue((prevState) => ({
    ...prevState,
    [identifier]: event.target.value,
  }));
}
```

## Menggunakan useRef untuk Mengakses dan Mereset Input

```jsx
const emailRef = useRef();
const passwordRef = useRef();

function handleSubmit(event) {
  event.preventDefault();
  console.log(emailRef.current.value, passwordRef.current.value);
  emailRef.current.value = "";
  passwordRef.current.value = "";
}
```

## Menggunakan FormData untuk Mengakses dan Mereset Input

```jsx
function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  console.log(Object.fromEntries(formData.entries()));
  event.target.reset();
}
```

## Reset Form dengan Button

```jsx
<button type="reset" className="button button-flat">
  Reset
</button>
```

## Validasi Input

### 1. Validasi dengan Keystroke

```jsx
const emailIsInvalid =
  enteredValue.email !== "" && !enteredValue.email.includes("@");
```

### 2. Validasi dengan Lost Focus (onBlur)

```jsx
const [didEdit, setDidEdit] = useState(false);
const emailIsInvalid = didEdit && !enteredValue.email.includes("@");
```

### 3. Validasi saat Submit

```jsx
function handleSubmit(event) {
  event.preventDefault();
  if (emailIsInvalid) return;
  console.log(enteredValue);
}
```

### 4. Menggunakan Library Pihak Ketiga

- **Formik**: [https://formik.org/](https://formik.org/)
- **React Hook Form**: [https://react-hook-form.com/](https://react-hook-form.com/)

## Membuat Custom Hook untuk Mengelola Input

```jsx
import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  const [value, setValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const isValid = validationFn(value);

  function handleInputChange(event) {
    setValue(event.target.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !isValid,
  };
}
```

## Cara Menggunakan Custom Hook

```jsx
const {
  value: email,
  handleInputChange: handleEmailChange,
  handleInputBlur: handleEmailBlur,
  hasError: emailHasError,
} = useInput("", (value) => isEmail(value) && isNotEmpty(value));

const {
  value: password,
  handleInputChange: handlePasswordChange,
  handleInputBlur: handlePasswordBlur,
  hasError: passwordHasError,
} = useInput("", (value) => hasMinLength(value, 7) && isNotEmpty(value));
```

## Fungsi Validasi

```jsx
export function isEmail(value) {
  return value.includes("@");
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}
```

## Dokumentasi Referensi:

1. **MDN Form Validation**:
   [https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
2. **React Forms Handling**:
   [https://react.dev/reference/react-dom/components/input](https://react.dev/reference/react-dom/components/input)
3. **React Hook Form**: [https://react-hook-form.com/](https://react-hook-form.com/)
4. **Formik**: [https://formik.org/](https://formik.org/)

<!-- ## catatan -->

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

karena secara default, tombol (`<button>`) di dalam elemen `<form>` memiliki
`type="submit"`.  
Sehingga, ketika tombol diklik, form akan dikirim (submit) dan menyebabkan halaman
**refresh atau reload**.

solusinya :

1. kasih type button di button

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
  console.log("submitted");
}

<form onSubmit={hanldeSubmit}>
  // rest code...
  <button className="button">Submit</button>
</form>;
```

#### Managing & Getting user input via state and reset it

```jsx
const [enteredEmail, setEnteredEmail] = useState("");
const [enteredPassword, setEnteredPassword] = useState("");

function handleSubmit(event) {
  event.preventDefault();

  // how to reset
  setEnteredEmail("");
  setEnteredPassword("");
}

function handleEmailChange(event) {
  setEnteredEmail(event.target.value);
  console.log("User Email: " + enteredEmail);
}
function handlePasswordChange(event) {
  setEnteredPassword(event.target.value);
  console.log("User Password: " + enteredPassword);
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

#### Generic Handler and reset it

```jsx
import { useState } from "react";

export default function Login() {
  const [enteredValue, setEnteredValue] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    console.log(enteredValue);
    // how to reset
    setEnteredValue({
      email: "",
      password: "",
    });
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
            onChange={(event) => handleValueChange("email", event)}
            value={enteredValue.email}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) => handleValueChange("password", event)}
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

#### getting user input via ref and reset it

```jsx
import { useRef } from "react";

export default function Login() {
  const email = useRef();
  const password = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    console.log(enteredEmail, enteredPassword);

    email.current.value = "";
    password.current.value = "";
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

#### getting value via formData and reset it

> kalo mau pakai ini harus ada **name propertie** pada input

```jsx
export default function Signup() {
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const acquisitionChanel = fd.getAll("acquisition");
    const data = Object.fromEntries(fd.entries()); //
    data.acquisition = acquisitionChanel;
    console.log(data);

    event.target.reset();
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

#### reset via button

> ubah type menjadi **reset**

```jsx
<button type="reset" className="button button-flat">
  Reset
</button>
```

### input validating

> **documentaion** :
> [form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)

1. using keystroke
   > hanya untuk state

```jsx
import { useState } from "react";

export default function Login() {
  const [enteredValue, setEnteredValue] = useState({
    email: "",
    password: "",
  });

  const emailIsInvalid =
    enteredValue.email !== "" && !enteredValue.email.includes("@");

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
            onChange={(event) => handleValueChange("email", event)}
            value={enteredValue.email}
          />
          <div className="control-error">
            {emailIsInvalid && <p>please enter a valid email</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) => handleValueChange("password", event)}
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

2. using lost focus
   > onBlur

```jsx
import { useState } from "react";

export default function Login() {
  const [enteredValue, setEnteredValue] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid = didEdit.email && !enteredValue.email.includes("@");

  function handleSubmit(event) {
    event.preventDefault();

    console.log(enteredValue);
  }

  function handleValueChange(identifier, event) {
    setEnteredValue((prevState) => ({
      ...prevState,
      [identifier]: event.target.value,
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function hanldeInputBlur(identifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
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
            onBlur={() => hanldeInputBlur("email")}
            onChange={(event) => handleValueChange("email", event)}
            value={enteredValue.email}
          />
          <div className="control-error">
            {emailIsInvalid && <p>please enter a valid email</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) => handleValueChange("password", event)}
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

> di edit bisa di state valuenya menjadi seperti ini

```jsx
const [enteredValue, setEnteredValue] = useState({
  email: {
    value: "",
    isEdit: false,
  },
  password: {
    value: "",
    isEdit: false,
  },
});
```

3. validating di fungsi submit
   > di form jangan lupa untuk memberhentikan fungsinya agar tidak lanjut ke proses
   > selanjutnya

```jsx
function handleSubmit(event) {
  event.preventDefault();

  if (emailIsInvalid) {
    return;
  }

  console.log(enteredValue);
}
```

4. **Menggunakan Library Pihak Ketiga**  
   Ada beberapa library populer untuk menangani form dengan lebih baik, seperti:
   - **Formik**: Memudahkan pengelolaan state dan validasi form dalam React.
   - **React Hook Form**: Library ringan dan efisien untuk menangani form berbasis
     hooks.
