# Side effects use effect

## apa itu sideEffect

## apa itu useEffect

### bagaimana cara menggunakan useEffect

###### tanpa [] di useEffect akan looping

###### perhatikan untuk tidak menggunakan useEffect secara berlebihan

```
useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    const storedPlaces = storedIds.map((id) =>
      AVAILABLE_PLACES.find((place) => place.id === id)
    );

    setPickedPlaces(storedPlaces);
  }, []);
```

<b>cara yang lebih baik</b>

```
const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  //...rescode

```

###### perhatikan depedency pada useEffect, dependecny tidak menggunakan fungsi

karena fungsi dengan isi yang sama tidak sama

```
function Hello1(){
  console.log('hello')
}

function Hello2(){
  console.log('hello')
}

// Hello1 === Hello2 return false
```

untuk solusinya menggunakan useCallBack
