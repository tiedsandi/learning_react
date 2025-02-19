import { useState } from 'react';
import Input from './Input';

export default function Login() {
  const [enteredValue, setEnteredValue] = useState({
    email: '',
    password: '',
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid = didEdit.email && !enteredValue.email.includes('@');
  const passwordIsInvalid =
    didEdit.password && enteredValue.password.trim().length < 6;

  function handleSubmit(event) {
    event.preventDefault();

    if (emailIsInvalid) {
      return;
    }

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
        <Input
          label={'Email'}
          id={'email'}
          type="email"
          name="email"
          onBlur={() => hanldeInputBlur('email')}
          onChange={(event) => handleValueChange('email', event)}
          value={enteredValue.email}
          error={emailIsInvalid && 'Please enter a valid email.'}
        />

        <div className="control no-margin">
          <Input
            label={'Password'}
            id={'password'}
            type="password"
            name="password"
            onBlur={() => hanldeInputBlur('password')}
            onChange={(event) => handleValueChange('password', event)}
            value={enteredValue.password}
            error={passwordIsInvalid && 'Password must be at least 7 characters.'}
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
