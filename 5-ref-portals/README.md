# ref portals

- apa itu ref?

- contoh penggunaan

###### two-way-binding

```
import { useState } from 'react';

export default function Player() {
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    setSubmitted(false);
    setEnteredPlayerName(event.target.value);
  }

  function handleClick() {
    setSubmitted(true);
  }

  return (
    <section id="player">
      <h2>Welcome {submitted ? enteredPlayerName : 'unknown entity'}</h2>
      <p>
        <input type="text" onChange={handleChange} value={enteredPlayerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}

```

- contoh lain

```
import React, { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileChange(event) {
    const file = event.target.files[0]; // Mengambil file pertama yang dipilih
    setSelectedFile(file);
  }

  return (
    <div id="app">
      <p>Please select an image</p>
      <p>
        <input
          data-testid="file-picker"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button onClick={() => document.querySelector("input[type='file']").click()}>
          Pick Image
        </button>
      </p>
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
    </div>
  );
}

export default App;

```

###### using ref

```
import { useRef, useState } from 'react';

export default function Player() {
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}

```

- contoh lain

```
import React from 'react'

function App() {
    const filePicker = React.useRef();

    function handleStartPickImage() {
    filePicker.current.click();
  }

  return (
    <div id="app">
      <p>Please select an image</p>
      <p>
        <input data-testid="file-picker" type="file" accept="image/*" ref={filePicker} />
        <button  onClick={handleStartPickImage}>Pick Image</button>
      </p>
    </div>
  );
}

export default App;

```

### perbedaan ref dan state

### Ref and Portals

## Catatan

```
<dialog>
  <h2>You {result}</h2>
  <p>
    The target time was <strong>{targetTime} seconds.</strong>
  </p>
  <p>
    You stopped the timer with <strong>X seconds left.</strong>
  </p>
  <form method="dialog">
    <button>Close</button>
  </form>
</dialog>
```
