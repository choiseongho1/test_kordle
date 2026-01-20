import React from 'react';
import Tile from './Tile';

const Grid = ({ guesses, currentGuess, currentRow, statuses }) => {
  const rows = Array.from({ length: 6 });

  return (
    <div id="grid-container">
      {rows.map((_, i) => {
        const isCurrentRow = i === currentRow;
        const guess = isCurrentRow ? currentGuess : (guesses[i] || []);
        const rowStatuses = statuses[i] || [];

        return (
          <div key={i} className="grid-row" id={`row-${i}`}>
            {Array.from({ length: 6 }).map((_, j) => (
              <Tile 
                key={j} 
                char={guess[j]} 
                status={rowStatuses[j]}
                isToggled={!isCurrentRow && guesses[i] !== undefined}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
