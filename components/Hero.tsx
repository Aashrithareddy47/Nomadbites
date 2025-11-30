import React, { useState } from 'react';
import { SearchFilters } from '../types';

interface HeroProps {
  onSearch: (filters: SearchFilters) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [food, setFood] = useState('Masala Dosa');
  const [location, setLocation] = useState('Bengaluru, India');
  const [budget, setBudget] = useState<SearchFilters['budget']>('Medium');
  const [mealType, setMealType] = useState<SearchFilters['mealType']>('Breakfast');
  const [diningStyle, setDiningStyle] = useState<SearchFilters['diningStyle']>('Solo');
  const [dietary, setDietary] = useState<SearchFilters['dietary']>('Vegetarian');
  const [stateCuisine, setStateCuisine] = useState('Karnataka');

  const handleGeoLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocation('Using Current Location');
          // In a real app, you would use a reverse geocoding service here.
        },
        (error) => {
          console.error('Error getting location', error);
          alert('Could not detect your location. Please enter it manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ food, location, budget, mealType, diningStyle, dietary, stateCuisine });
  };
  
  const heroStyles: React.CSSProperties = {
    textAlign: 'center',
    padding: '2rem 0',
  };

  const taglineStyles: React.CSSProperties = {
    fontSize: '1.2rem',
    color: 'var(--gray)',
    maxWidth: '600px',
    margin: '0 auto 2rem auto',
  };

  const formStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '2rem',
    borderRadius: '16px',
    backgroundColor: 'var(--white)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    maxWidth: '900px',
    margin: '0 auto',
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  };

  const inputGroupStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
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
  
  const locationContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  };
  
  const buttonStyles: React.CSSProperties = {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'filter 0.2s ease-in-out',
  };
  
  const searchButtonStyles: React.CSSProperties = {
    ...buttonStyles,
    backgroundColor: 'var(--green)',
    color: 'var(--white)',
    gridColumn: '1 / -1',
  };

  const geoButtonStyles: React.CSSProperties = {
      ...buttonStyles,
      backgroundColor: 'var(--orange)',
      color: 'var(--white)',
      padding: '0.5rem',
      fontSize: '0.9rem',
  };


  return (
    <section style={heroStyles} aria-labelledby="hero-heading">
      <h2 id="hero-heading" style={{ fontSize: '2.5rem', margin: '0 0 1rem 0', color: 'var(--green)' }}>Find Your Next Favourite Meal</h2>
      <p style={taglineStyles}>Follow the trail to your state’s authentic taste, anywhere you travel.</p>
      <form style={formStyles} onSubmit={handleSubmit}>
        <div style={gridStyles}>
            <div style={{ ...inputGroupStyles, gridColumn: '1 / -1' }}>
                <label htmlFor="food" style={labelStyles}>What are you craving?</label>
                <input id="food" type="text" value={food} onChange={(e) => setFood(e.target.value)} style={inputStyles} placeholder="e.g., Masala Dosa" required/>
            </div>
             <div style={{ ...inputGroupStyles, gridColumn: '1 / -1' }}>
                <label htmlFor="location" style={labelStyles}>Where are you?</label>
                <div style={locationContainerStyles}>
                    <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{...inputStyles, flex: 1}} placeholder="e.g., Bengaluru, India" required />
                    <button type="button" onClick={handleGeoLocate} style={geoButtonStyles} className="primary-button" aria-label="Detect my location">📍 Detect</button>
                </div>
            </div>

            <div style={inputGroupStyles}>
                <label htmlFor="budget" style={labelStyles}>Budget</label>
                <select id="budget" value={budget} onChange={(e) => setBudget(e.target.value as any)} style={inputStyles}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </div>
            <div style={inputGroupStyles}>
                <label htmlFor="mealType" style={labelStyles}>Meal Type</label>
                <select id="mealType" value={mealType} onChange={(e) => setMealType(e.target.value as any)} style={inputStyles}>
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Snacks</option>
                </select>
            </div>
            <div style={inputGroupStyles}>
                <label htmlFor="diningStyle" style={labelStyles}>Dining Style</label>
                <select id="diningStyle" value={diningStyle} onChange={(e) => setDiningStyle(e.target.value as any)} style={inputStyles}>
                    <option>Solo</option>
                    <option>Friends</option>
                    <option>Family</option>
                </select>
            </div>
            <div style={inputGroupStyles}>
                <label htmlFor="dietary" style={labelStyles}>Dietary Needs</label>
                <select id="dietary" value={dietary} onChange={(e) => setDietary(e.target.value as any)} style={inputStyles}>
                    <option>Vegetarian</option>
                    <option>Vegan</option>
                    <option>Jain</option>
                    <option>Gluten-Free</option>
                    <option>Non-Veg</option>
                </select>
            </div>
             <div style={{ ...inputGroupStyles, gridColumn: 'span 2' }}>
                <label htmlFor="stateCuisine" style={labelStyles}>Home State Cuisine (Optional)</label>
                <input id="stateCuisine" type="text" value={stateCuisine} onChange={(e) => setStateCuisine(e.target.value)} style={inputStyles} placeholder="e.g., Karnataka" />
            </div>
        </div>
        <button type="submit" style={searchButtonStyles} className="primary-button">Find Food Trail</button>
      </form>
    </section>
  );
};

export default Hero;