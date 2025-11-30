import React from 'react';
import ForkKnifeIcon from './icons/ForkKnifeIcon';
import { Page } from '../App';

interface HeaderProps {
  isLoggedIn: boolean;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onNavigate, onLogout }) => {
  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem 2rem',
    backgroundColor: 'var(--green)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const logoContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '2rem',
    color: 'var(--white)',
    margin: '0 0 0 0.75rem',
    fontWeight: 700,
  };

  const authContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };
  
  const buttonStyles: React.CSSProperties = {
    padding: '0.5rem 1.25rem',
    border: '2px solid var(--white)',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: 'var(--white)',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  };

  const signUpButtonStyles: React.CSSProperties = {
    ...buttonStyles,
    backgroundColor: 'var(--orange)',
    borderColor: 'var(--orange)',
  };

  return (
    <header style={headerStyles} aria-label="nomadbites Header">
      <div style={logoContainerStyles}>
        <ForkKnifeIcon color="var(--white)" size={32} />
        <h1 style={titleStyles}>nomadbites</h1>
      </div>
      <div style={authContainerStyles}>
        {isLoggedIn ? (
          <button onClick={onLogout} style={buttonStyles} className="primary-button">Logout</button>
        ) : (
          <>
            <button onClick={() => onNavigate('login')} style={buttonStyles} className="primary-button">Login</button>
            <button onClick={() => onNavigate('signup')} style={signUpButtonStyles} className="primary-button">Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
