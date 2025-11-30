import React from 'react';
import { AIResponse } from '../types';
import LoadingSpinner from './LoadingSpinner';
import RecommendationCard from './RecommendationCard';

interface ResultsDisplayProps {
  recommendations: AIResponse | null;
  isLoading: boolean;
  error: string | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ recommendations, isLoading, error }) => {
  
  const containerStyles: React.CSSProperties = {
    padding: '2rem 0',
    textAlign: 'left',
  };
  
  const sectionStyles: React.CSSProperties = {
    marginBottom: '2rem',
    padding: '1.5rem',
    borderRadius: '16px',
    backgroundColor: 'var(--white)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
  };

  const headingStyles: React.CSSProperties = {
    fontSize: '1.5rem',
    color: 'var(--green)',
    borderBottom: '2px solid var(--orange)',
    paddingBottom: '0.5rem',
    marginBottom: '1rem',
  };

  const listStyles: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
  };

  const listItemStyles: React.CSSProperties = {
    marginBottom: '0.75rem',
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
  };

  const trailItemStyles: React.CSSProperties = {
      ...listItemStyles,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: '1rem',
  };

  const trailLabelStyles: React.CSSProperties = {
      fontWeight: 'bold',
      color: 'var(--charcoal)',
      marginBottom: '0.25rem'
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div style={containerStyles}><p style={{color: 'red', textAlign: 'center'}}>{error}</p></div>;
  }

  if (!recommendations) {
    return <div style={{...containerStyles, textAlign: 'center', color: 'var(--gray)'}}><p>Your delicious recommendations will appear here. Start a search!</p></div>;
  }

  return (
    <div style={containerStyles} aria-live="polite">
      <header style={{textAlign: 'center', marginBottom: '3rem'}}>
        <h2 style={{fontSize: '2rem', color: 'var(--charcoal)'}}>🍴 Your AI-Powered Food Recommendations 🍴</h2>
        <p style={{fontSize: '1.1rem', color: 'var(--gray)'}}>Showing results for <strong>{recommendations.foodItem}</strong> in <strong>{recommendations.location}</strong></p>
      </header>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem'}}>
        
        <div style={{gridColumn: '1 / -1'}}>
            <section style={sectionStyles}>
            <h3 style={headingStyles}>✅ Top Restaurant Picks</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                    {recommendations.restaurants.map((resto, index) => (
                        <RecommendationCard key={index} restaurant={resto} />
                    ))}
                </div>
            </section>
        </div>

        <div>
            <section style={sectionStyles}>
                <h3 style={headingStyles}>⭐ Review Summary</h3>
                <ul style={listStyles}>
                    {recommendations.reviewSummary.map((point, index) => (
                    <li key={index} style={listItemStyles}><span style={{marginRight: '0.5rem'}}>⭐</span> {point}</li>
                    ))}
                </ul>
            </section>
        </div>
        
        <div>
            <section style={sectionStyles}>
                <h3 style={headingStyles}>✨ Cuisine Origin</h3>
                <p>{recommendations.cuisineOrigin}</p>
            </section>
        </div>
        
        {recommendations.foodTrail && (
            <div style={{gridColumn: '1 / -1'}}>
                <section style={{...sectionStyles, backgroundColor: 'var(--soft-green)'}}>
                    <h3 style={headingStyles}>🗺️ Your Optional Food Trail</h3>
                    <ul style={listStyles}>
                        <li style={trailItemStyles}>
                            <span style={trailLabelStyles}>🥞 Breakfast:</span>
                            <span>{recommendations.foodTrail.breakfast}</span>
                        </li>
                        <li style={trailItemStyles}>
                            <span style={trailLabelStyles}>🍛 Lunch:</span>
                            <span>{recommendations.foodTrail.lunch}</span>
                        </li>
                        <li style={trailItemStyles}>
                            <span style={trailLabelStyles}>🍜 Dinner:</span>
                            <span>{recommendations.foodTrail.dinner}</span>
                        </li>
                    </ul>
                </section>
            </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;