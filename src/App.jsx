import React, { useState, useEffect, useCallback } from 'react';
import { WORDS } from './constants';
import { decompose, getDailyTarget } from './utils';
import Grid from './components/Grid';
import Keyboard from './components/Keyboard';
import Modal from './components/Modal';
import ToastContainer from './components/Toast';

const App = () => {
  const [target, setTarget] = useState(() => getDailyTarget(WORDS));
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [keyStatuses, setKeyStatuses] = useState({});
  const [toasts, setToasts] = useState([]);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const targetJaso = decompose(target.word);

  const showToast = useCallback((message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateKeyStatuses = useCallback((guess, rowStatuses) => {
    setKeyStatuses((prev) => {
      const newStatuses = { ...prev };
      guess.forEach((char, i) => {
        const status = rowStatuses[i];
        const currentStatus = newStatuses[char];

        if (status === 'correct') {
          newStatuses[char] = 'correct';
        } else if (status === 'present' && currentStatus !== 'correct') {
          newStatuses[char] = 'present';
        } else if (status === 'absent' && !currentStatus) {
          newStatuses[char] = 'absent';
        }
      });
      return newStatuses;
    });
  }, []);

  const submitGuess = useCallback(() => {
    if (currentGuess.length < 6) {
      showToast('6글자(자소)를 모두 입력해주세요.');
      return;
    }

    const targetCopy = [...targetJaso];
    const rowStatuses = new Array(6).fill('absent');

    // First pass: Find correct positions
    currentGuess.forEach((char, i) => {
      if (char === targetCopy[i]) {
        rowStatuses[i] = 'correct';
        targetCopy[i] = null;
      }
    });

    // Second pass: Find present characters
    currentGuess.forEach((char, i) => {
      if (rowStatuses[i] !== 'correct' && targetCopy.includes(char)) {
        rowStatuses[i] = 'present';
        targetCopy[targetCopy.indexOf(char)] = null;
      }
    });

    const newGuesses = [...guesses, currentGuess];
    const newStatuses = [...statuses, rowStatuses];

    setGuesses(newGuesses);
    setStatuses(newStatuses);
    updateKeyStatuses(currentGuess, rowStatuses);

    if (rowStatuses.every((s) => s === 'correct')) {
      setGameOver(true);
      showToast('축하합니다! 정답입니다.');
    } else if (currentRow === 5) {
      setGameOver(true);
      showToast(`아쉽네요. 정답은 [${target.word}]였습니다.`);
    }

    setCurrentRow((prev) => prev + 1);
    setCurrentGuess([]);
  }, [currentGuess, currentRow, guesses, statuses, target.word, targetJaso, showToast, updateKeyStatuses]);

  const handleInput = useCallback((key) => {
    if (gameOver) return;

    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'BACK') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (currentGuess.length < 6) {
      setCurrentGuess((prev) => [...prev, key]);
    }
  }, [gameOver, currentGuess.length, submitGuess]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (gameOver) return;
      if (e.key === 'Enter') handleInput('ENTER');
      else if (e.key === 'Backspace') handleInput('BACK');
      // Note: mapping for Korean keyboard input might be complex, 
      // but for now we rely on the on-screen keyboard for Jaso units.
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gameOver, handleInput]);

  return (
    <div className="app-container">
      <header>
        <div className="header-left">
          <h1>메디꼬들</h1>
        </div>
        <div className="header-right">
          <button className="icon-btn" aria-label="Labs" title="실험실">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2v7.31l-4.5 8.44a1 1 0 0 0 .9 1.45h11.2a1 1 0 0 0 .9-1.45L14 9.31V2" />
              <path d="M10 2h4" />
              <path d="M8.5 13h7" />
            </svg>
          </button>
          <button className="icon-btn" aria-label="Settings" title="설정">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.72l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.72l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button className="icon-btn" aria-label="Help" title="도움말" onClick={() => setIsHelpOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
          </button>
          <button className="icon-btn" aria-label="Statistics" title="통계">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 20V10" />
              <path d="M12 20V4" />
              <path d="M6 20v-6" />
            </svg>
          </button>
        </div>
      </header>

      <main id="game-container">
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          currentRow={currentRow}
          statuses={statuses}
        />
      </main>

      <Keyboard onInput={handleInput} keyStatuses={keyStatuses} />

      <Modal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title="게임 방법"
      >
        <p>6자소로 된 의학용어를 6번의 기회 안에 맞추세요.</p>
        <div className="help-example">
          <div className="tile correct">ㄱ</div>
          <p><strong>ㄱ</strong>는 정답에 포함되며 자리가 일치합니다.</p>
        </div>
        <div className="help-example">
          <div className="tile present">ㅏ</div>
          <p><strong>ㅏ</strong>는 정답에 포함되나 자리가 다릅니다.</p>
        </div>
        <div className="help-example">
          <div className="tile absent">ㄴ</div>
          <p><strong>ㄴ</strong>는 정답에 포함되지 않습니다.</p>
        </div>
        <p><strong>6자소 구성 예시:</strong><br />
          - 간염 (ㄱ, ㅏ, ㄴ, ㅇ, ㅕ, ㅁ = 6)<br />
          - 코로나 (ㅋ, ㅗ, ㄹ, ㅗ, ㄴ, ㅏ = 6)</p>
        <p><small>*ㅐ, ㅔ 및 복합모음이 포함된 단어는 제외되었습니다.</small></p>
      </Modal>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default App;
