import React, { useState } from 'react';
import { Page } from '../App';

interface LoginPageProps {
    onLoginSuccess: () => void;
    onNavigate: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login logic
        console.log('Logging in with:', { email, password });
        alert('Login successful! Welcome back.');
        onLoginSuccess();
    };

    const containerStyles: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4rem 0',
    };

    const formWrapperStyles: React.CSSProperties = {
        backgroundColor: 'var(--white)',
        padding: '2.5rem',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        maxWidth: '450px',
        width: '100%',
        textAlign: 'center',
    };

    const titleStyles: React.CSSProperties = {
        fontSize: '2rem',
        color: 'var(--charcoal)',
        marginBottom: '2rem',
    };

    const formStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        textAlign: 'left',
    };

    const inputGroupStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
    };

    const labelStyles: React.CSSProperties = {
        marginBottom: '0.5rem',
        fontWeight: 600,
        color: 'var(--charcoal)',
    };
    
    const inputStyles: React.CSSProperties = {
        padding: '0.75rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '1rem',
    };
    
    const buttonStyles: React.CSSProperties = {
        padding: '0.85rem',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        backgroundColor: 'var(--green)',
        color: 'var(--white)',
        marginTop: '1rem',
        transition: 'filter 0.2s ease-in-out',
    };

    const switchLinkStyles: React.CSSProperties = {
        marginTop: '1.5rem',
        color: 'var(--gray)',
    };
    
    const linkStyles: React.CSSProperties = {
        color: 'var(--green)',
        fontWeight: 'bold',
        cursor: 'pointer',
        textDecoration: 'none',
    };

    return (
        <div style={containerStyles}>
            <div style={formWrapperStyles}>
                <h2 style={titleStyles}>Welcome Back!</h2>
                <form style={formStyles} onSubmit={handleSubmit}>
                    <div style={inputGroupStyles}>
                        <label htmlFor="email" style={labelStyles}>Email</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyles} placeholder="you@example.com" required/>
                    </div>
                    <div style={inputGroupStyles}>
                        <label htmlFor="password" style={labelStyles}>Password</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyles} placeholder="••••••••" required/>
                    </div>
                    <button type="submit" style={buttonStyles} className="primary-button">Login</button>
                </form>
                <p style={switchLinkStyles}>
                    Don't have an account?{' '}
                    <a onClick={() => onNavigate('signup')} style={linkStyles}>
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
