import React from 'react';

const LoadingSpinner: React.FC = () => {
  const spinnerContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4rem 0',
  };

  const spinnerStyles: React.CSSProperties = {
    border: '8px solid var(--light-gray)',
    borderTop: '8px solid var(--green)',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    animation: 'spin 1s linear infinite',
  };

  const loadingTextStyles: React.CSSProperties = {
    marginTop: '1.5rem',
    fontSize: '1.2rem',
    color: 'var(--charcoal)',
    fontWeight: 600,
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerContainerStyles} role="status" aria-label="Loading recommendations">
        <div style={spinnerStyles}></div>
        <p style={loadingTextStyles}>Finding the best flavours for you...</p>
      </div>
    </>
  );
};

export default LoadingSpinner;
