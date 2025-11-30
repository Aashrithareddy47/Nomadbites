import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ResultsDisplay from './components/ResultsDisplay';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { getAIRecommendations } from './services/geminiService';
import { SearchFilters, AIResponse } from './types';

export type Page = 'home' | 'login' | 'signup';

const App: React.FC = () => {
  const [recommendations, setRecommendations] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleSearch = async (filters: SearchFilters) => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    try {
      const result = await getAIRecommendations(filters);
      setRecommendations(result);
    } catch (err) {
      setError('Sorry, we hit a snag while fetching recommendations. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleSignUpSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home'); 
  };


  const PageStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const MainStyles: React.CSSProperties = {
    flex: '1',
    padding: '0 1rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box'
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={setCurrentPage} />;
      case 'signup':
        return <SignUpPage onSignUpSuccess={handleSignUpSuccess} onNavigate={setCurrentPage} />;
      case 'home':
      default:
        return (
          <>
            <Hero onSearch={handleSearch} />
            <ResultsDisplay
              recommendations={recommendations}
              isLoading={isLoading}
              error={error}
            />
          </>
        );
    }
  };

  return (
    <div style={PageStyles}>
      <Header 
        isLoggedIn={isLoggedIn}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />
      <main style={MainStyles}>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
