import React from 'react';

const Footer: React.FC = () => {
  const footerStyles: React.CSSProperties = {
    textAlign: 'center',
    padding: '2rem',
    marginTop: 'auto',
    backgroundColor: 'var(--dark-green)',
    color: 'var(--white)',
  };

  return (
    <footer style={footerStyles}>
      <p>&copy; {new Date().getFullYear()} nomadbites. All rights reserved.</p>
    </footer>
  );
};

export default Footer;