import React from 'react';

const Tile = ({ char, status, isToggled }) => {
  return (
    <div 
      className={`tile ${status || ''} ${isToggled ? 'reveal' : ''}`}
      data-state={char ? 'toggled' : undefined}
    >
      {char}
    </div>
  );
};

export default Tile;
