import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const games = [
        {
            id: 'kordle',
            title: '메디꼬들',
            description: '6자소 의학용어 맞추기',
            icon: '🏥',
            path: '/kordle',
            color: '#10b981'
        },
        {
            id: 'math',
            title: '메디칼큐',
            description: '정확한 수식을 완성',
            icon: '🧠',
            path: '/math',
            color: '#6366f1'
        }
    ];

    return (
        <div className="home-container">
            <main className="game-grid">
                {games.map(game => (
                    <Link
                        key={game.id}
                        to={game.path}
                        className={`game-card ${game.disabled ? 'disabled' : ''}`}
                        style={{ '--theme-color': game.color }}
                    >
                        <div className="game-icon">{game.icon}</div>
                        <div className="game-info">
                            <h3>{game.title}</h3>
                            <p>{game.description}</p>
                        </div>
                        {!game.disabled && <div className="play-badge">플레이</div>}
                    </Link>
                ))}
            </main>

            <footer className="home-footer">
                <p>© 2026 Medical Kordle Hub</p>
            </footer>
        </div>
    );
};

export default Home;
