import React from 'react';
import { KEYBOARD_LAYOUT } from '../constants';

const Keyboard = ({ onInput, keyStatuses }) => {
  return (
    <section id="keyboard-container">
      {KEYBOARD_LAYOUT.map((row, i) => (
        <div key={i} className="key-row">
          {row.map((key) => {
            const status = keyStatuses[key] || '';
            return (
              <button
                key={key}
                className={`key ${key === 'ENTER' || key === 'BACK' ? 'wide' : ''} ${status}`}
                id={`key-${key}`}
                onClick={() => onInput(key)}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </section>
  );
};

export default Keyboard;
