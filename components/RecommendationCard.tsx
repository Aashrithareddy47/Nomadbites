import React, { useState } from 'react';
import { Restaurant } from '../types';

interface RecommendationCardProps {
  restaurant: Restaurant;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ restaurant }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${restaurant.name}, ${restaurant.address}`
  )}`;

  const cardStyles: React.CSSProperties = {
    backgroundColor: 'var(--white)',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.12)' : '0 4px 8px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
    transform: isHovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
    animation: 'fadeIn 0.5s ease-out forwards',
  };

  const nameStyles: React.CSSProperties = {
    margin: '0 0 0.5rem 0',
    fontSize: '1.25rem',
    color: 'var(--charcoal)',
  };

  const addressStyles: React.CSSProperties = {
    margin: '0 0 1rem 0',
    color: 'var(--gray)',
    fontStyle: 'italic',
  };

  const highlightStyles: React.CSSProperties = {
    margin: '0 0 1rem 0',
    padding: '0.75rem',
    backgroundColor: 'var(--soft-green)',
    borderLeft: '4px solid var(--green)',
    borderRadius: '4px',
  };

  const footerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
  };

  const priceStyles: React.CSSProperties = {
    fontWeight: 'bold',
    backgroundColor: 'var(--orange)',
    color: 'var(--white)',
    padding: '0.25rem 0.75rem',
    borderRadius: '16px',
    fontSize: '0.9rem',
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .card-button {
            padding: 0.5rem 1rem;
            border: 1px solid var(--green);
            border-radius: 8px;
            background-color: transparent;
            color: var(--green);
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.2s ease, color 0.2s ease;
            text-decoration: none;
          }
          .card-button:hover {
            background-color: var(--green);
            color: var(--white);
          }
        `}
      </style>
      <div
        style={cardStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h4 style={nameStyles}>{restaurant.name}</h4>
        <p style={addressStyles}>📍 {restaurant.address}</p>
        <div style={highlightStyles}>
          <strong>✨ Highlight:</strong> {restaurant.highlight}
        </div>
        <footer style={footerStyles}>
          <span style={priceStyles}>💰 {restaurant.price}</span>
          <div>
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="card-button"
              style={{ marginRight: '0.5rem' }}
            >
              View on Map
            </a>
            <button
              className="card-button"
              onClick={() => alert(`${restaurant.name} saved to favorites!`)}
              aria-label={`Save ${restaurant.name} to favorites`}
            >
              ❤️ Save
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default RecommendationCard;