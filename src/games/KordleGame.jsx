import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { WORDS } from '../constants';
import { decompose, getDailyTarget } from '../utils';
import Grid from '../components/Grid';
import Keyboard from '../components/Keyboard';
import Modal from '../components/Modal';
import ToastContainer from '../components/Toast';

const SAVE_KEY = 'mk-game-state';

const KordleGame = () => {
    const [dayNumber] = useState(() => getDailyTarget(WORDS).dayNumber);
    const targetWord = WORDS[dayNumber % WORDS.length];

    const [gameState] = useState(() => {
        const saved = localStorage.getItem(SAVE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.dayNumber === dayNumber) {
                    return parsed;
                }
            } catch (e) {
                console.error("Failed to load saved state", e);
            }
        }
        return {
            guesses: [],
            currentRow: 0,
            gameOver: false,
            statuses: [],
            keyStatuses: {}
        };
    });

    const [guesses, setGuesses] = useState(gameState.guesses);
    const [currentGuess, setCurrentGuess] = useState([]);
    const [currentRow, setCurrentRow] = useState(gameState.currentRow);
    const [gameOver, setGameOver] = useState(gameState.gameOver);
    const [statuses, setStatuses] = useState(gameState.statuses);
    const [keyStatuses, setKeyStatuses] = useState(gameState.keyStatuses);
    const [toasts, setToasts] = useState([]);
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    useEffect(() => {
        const stateToSave = {
            dayNumber,
            guesses,
            currentRow,
            gameOver,
            statuses,
            keyStatuses
        };
        localStorage.setItem(SAVE_KEY, JSON.stringify(stateToSave));
    }, [guesses, currentRow, gameOver, statuses, keyStatuses, dayNumber]);

    const targetJaso = decompose(targetWord);

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

        currentGuess.forEach((char, i) => {
            if (char === targetCopy[i]) {
                rowStatuses[i] = 'correct';
                targetCopy[i] = null;
            }
        });

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
            showToast('아쉽네요. 다음 기회에 도전해보세요!');
        }

        setCurrentRow((prev) => prev + 1);
        setCurrentGuess([]);
    }, [currentGuess, currentRow, guesses, statuses, targetWord, targetJaso, showToast, updateKeyStatuses]);

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
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [gameOver, handleInput]);

    return (
        <div className="game-wrapper">
            <header>
                <div className="header-left">
                    <Link to="/" className="back-btn" title="홈으로">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1>메디꼬들</h1>
                </div>
                <div className="header-right">
                    <button className="icon-btn" aria-label="Help" title="도움말" onClick={() => setIsHelpOpen(true)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <path d="M12 17h.01" />
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

            <Modal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} title="게임 방법">
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
                <p><small>*정답은 매일 아침 9시(KST)에 새로운 단어로 초기화됩니다.</small></p>
                <p><small>*ㅐ, ㅔ 및 복합모음이 포함된 단어는 제외되었습니다.</small></p>
            </Modal>

            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
    );
};

export default KordleGame;
