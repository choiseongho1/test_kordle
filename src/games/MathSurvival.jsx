import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const MathSurvival = () => {
    const [score, setScore] = useState(0);
    const [currentTerms, setCurrentTerms] = useState([]);
    const [targetResult, setTargetResult] = useState(0);
    const [userOps, setUserOps] = useState([]);
    const [timeLeft, setTimeLeft] = useState(10);
    const [totalTime, setTotalTime] = useState(10);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameOverReason, setGameOverReason] = useState("");
    const timerRef = useRef(null);

    const initGame = useCallback((currentScore) => {
        setUserOps([]);

        // 난이도 기준: 10 / (0.25 + score * 0.05) 초
        const initialSeconds = 10 / (0.25 + currentScore * 0.05);
        setTimeLeft(initialSeconds);
        setTotalTime(initialSeconds);

        let termCount = 2 + Math.floor(currentScore / 5);
        const opTypes = ['+', '-', '*', '/'];
        let terms = [];
        let target = 0;

        while (true) {
            terms = [];
            let tempOps = [];
            for (let i = 0; i < termCount; i++) {
                terms.push(Math.floor(Math.random() * (10 + currentScore)) + 1);
                if (i < termCount - 1) tempOps.push(opTypes[Math.floor(Math.random() * opTypes.length)]);
            }

            const expression = terms.map((t, i) => i < tempOps.length ? t + tempOps[i] : t).join('');
            try {
                // eslint-disable-next-line no-eval
                const res = eval(expression);
                if (Number.isInteger(res) && res >= 0 && res <= 1000) {
                    target = res;
                    break;
                }
            } catch (e) { }
        }

        setCurrentTerms(terms);
        setTargetResult(target);
    }, []);

    const gameOver = useCallback((reason) => {
        clearInterval(timerRef.current);
        setIsGameOver(true);
        setGameOverReason(reason);
    }, []);

    useEffect(() => {
        if (!isGameOver) {
            initGame(score);
        }
        return () => clearInterval(timerRef.current);
    }, [initGame, score, isGameOver]);

    useEffect(() => {
        if (isGameOver) return;

        // 매 100ms마다 0.1초씩 감소
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                const next = prev - 0.1;
                if (next <= 0) {
                    gameOver("시간 초과!");
                    return 0;
                }
                return next;
            });
        }, 100);

        return () => clearInterval(timerRef.current);
    }, [isGameOver, gameOver, score]);

    const checkAnswer = useCallback((ops) => {
        let userExpression = currentTerms.map((t, i) => i < ops.length ? t + ops[i] : t).join('');
        try {
            // eslint-disable-next-line no-eval
            const userResult = eval(userExpression);
            if (userResult === targetResult) {
                setScore(prev => prev + 1);
            } else {
                gameOver("오답입니다!");
            }
        } catch (e) {
            gameOver("계산 오류!");
        }
    }, [currentTerms, targetResult, gameOver]);

    const inputOp = (op) => {
        if (isGameOver) return;
        if (userOps.length < currentTerms.length - 1) {
            const newOps = [...userOps, op];
            setUserOps(newOps);

            if (newOps.length === currentTerms.length - 1) {
                setTimeout(() => checkAnswer(newOps), 200);
            }
        }
    };

    const deleteOp = () => {
        if (isGameOver || userOps.length === 0) return;
        setUserOps(prev => prev.slice(0, -1));
    };

    const restart = () => {
        setScore(0);
        setIsGameOver(false);
        setGameOverReason("");
        initGame(0);
    };

    return (
        <div className="math-game-wrapper">
            {isGameOver && (
                <div className="math-overlay">
                    <h1>GAME OVER</h1>
                    <p className="math-overlay-score">
                        {gameOverReason}<br />최종 기록: <strong>{score} STAGE</strong>
                    </p>
                    <div className="math-overlay-actions">
                        <button className="btn-primary" onClick={restart}>다시 도전</button>
                        <Link to="/" className="btn-secondary">홈으로</Link>
                    </div>
                </div>
            )}

            <header>
                <div className="header-left">
                    <Link to="/" className="back-btn" title="홈으로">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1>메디칼큐</h1>
                </div>
            </header>

            <main className="math-main-content">
                <div className="math-stats">
                    <div className="score-display">STAGE: <span>{score}</span></div>
                    <div className="timer-text">{timeLeft.toFixed(1)}s</div>
                </div>

                <div className="math-timer-wrapper">
                    <div className="math-timer-bar" style={{ width: `${(timeLeft / totalTime) * 100}%` }}></div>
                </div>

                <div className="math-formula-box">
                    {currentTerms.map((term, i) => (
                        <React.Fragment key={i}>
                            <span>{term}</span>
                            {i < currentTerms.length - 1 && (
                                <div className={`math-slot ${userOps[i] ? 'filled' : ''}`}>
                                    {userOps[i] ? userOps[i].replace('*', '×').replace('/', '÷') : '?'}
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                    <span> = {targetResult}</span>
                </div>

                <div className="math-pad">
                    <button className="math-btn" onClick={() => inputOp('+')}>+</button>
                    <button className="math-btn" onClick={() => inputOp('-')}>-</button>
                    <button className="math-btn" onClick={() => inputOp('*')}>×</button>
                    <button className="math-btn" onClick={() => inputOp('/')}>÷</button>
                    <button className="math-btn math-btn-delete" onClick={deleteOp}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px' }}>
                            <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                            <line x1="18" y1="9" x2="12" y2="15" />
                            <line x1="12" y1="9" x2="18" y2="15" />
                        </svg>
                    </button>
                </div>

                <p className="math-hint">무엇을 입력해도 결과값이 맞으면 정답입니다!</p>
            </main>
        </div>
    );
};

export default MathSurvival;
