# Styling React

## Vanila CSS: Advantage & Disadvantages

```
import style from './Header.module.css';

<header className={style.header}>
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
