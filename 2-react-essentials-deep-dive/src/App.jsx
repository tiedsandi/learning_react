import { useState } from 'react';

import GameBoard from './components/GameBoard';
import Player from './components/Player';

function App() {
  const [acivePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare() {
    setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={'Player 1'}
            symbol={'X'}
            isActive={acivePlayer === 'X'}
          />
          <Player
            initialName={'Player 2'}
            symbol={'O'}
            isActive={acivePlayer === 'O'}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={acivePlayer}
        />
      </div>
    </main>
  );
}

export default App;
