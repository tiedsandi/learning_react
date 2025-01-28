# Styling React

## Vanila CSS: Advantage & Disadvantages

- Module css, 'it should name class not tag

```
import classes from './Header.module.css';

<header className={classes.paragraph}>
<header className={isTrue ? classes.paragraph : undefined}>
<header className={`${classes.paragraph}`}>
```

### single line vanila css

- Example

```
<p style={{
  color: 'red',
  textAlign: 'center'
}}>Some text</p>
```

###### do

```
<input
  type='email'
  style={{
    color: emailNotValid ? 'red' : '#cacaca',
  }} />
```

```
<input
  type="password"
  style={{
    backgroundColor: emailNotValid && 'red',
  }} />
```

```
 <label className={`label ${emailNotValid && 'invalid'}`}>Email</label>
```

###### don't

```
<label className={emailNotValid && 'invalid'}>Email</label>
```

- Advantages & Disadvantages

## Styled Components

- how to use styled components

- how to use dynamic & conditional styling

- how to pseudo selector, nested rules, and media queries

```
import { styled } from 'styled-components';

const ControlContainer = styled.div``

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ $invalid }) => ($invalid ? '#f87171' : '#6b7280')};
`

const Input = styled.input`
  width: 100%
  color: ${({ $invalid }) => ($invalid ? '#ef4444' : '#374151')};
  border: 1px solid ${({ $invalid }) => ($invalid ? '#f73f3f' : 'transparent')};
  border-radius: 0.25rem;
`


<Label $invalid={emailNotValid}>Email</Label>

<Input
  $invalid={emailNotValid}
  type="email"
  onChange={(event) => handleInputChange('email', event.target.value)}
/>


const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #f0b322;

  &:hover {
    background-color: #f0920e;
  }
`;

const StyledHeader = styled.header`
  display: flex;
\  & img {
  }

  & h1 {
    font-size: 1.5rem;
  }

  & p {
  }

  @media (min-width: 768px) {
    & {
      margin-bottom: 4rem;
    }

    & h1 {
      font-size: 2.25rem;
    }
  }
`;


```

- Reuseable Components

```
import styled from 'styled-components';

const Button = styled.button`
  padding: 1rem 2rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 0.25rem;
  color: #1f2937;
  background-color: #f0b322;
  border-radius: 6px;
  border: none;

  &:hover {
    background-color: #f0920e;
  }
`;

export default Button;


```

**other files**

```
import Button from './Button';

<Button onClick={handleLogin}>Sign In</Button>
```

- Reuseable Components & Component Combinations

```

import styled from 'styled-components';

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $invalid }) => ($invalid ? '#f87171' : '#6b7280')};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  background-color: ${({ $invalid }) => ($invalid ? '#fed2d2' : '#d1d5db')};
  color: ${({ $invalid }) => ($invalid ? '#ef4444' : '#374151')};
  border: 1px solid ${({ $invalid }) => ($invalid ? '#f73f3f' : 'transparent')};
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export default function CustomInput({ label, invalid, ...props }) {
  return (
    <p>
      <Label $invalid={invalid}>{label}</Label>
      <Input $invalid={invalid} {...props} />
    </p>
  );
}

```

**other files**

```

import Input from './Input';

<Input
  label="Email"
  invalid={emailNotValid}
  type="email"
  onChange={(event) => handleInputChange('email', event.target.value)}
/>

```
