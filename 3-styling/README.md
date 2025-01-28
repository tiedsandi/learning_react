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
