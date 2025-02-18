import { useState } from 'react';

export default function Login() {
  const [enteredValue, setEnteredValue] = useState({
    email: '',
    password: '',
  });

  const emailIsInvalid =
    enteredValue.email !== '' && !enteredValue.email.includes('@');

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
