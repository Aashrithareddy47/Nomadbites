import React from 'react';

interface IconProps {
  color?: string;
  size?: number;
}

const ForkKnifeIcon: React.FC<IconProps> = ({ color = 'currentColor', size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 2v20"></path>
    <path d="M12 5v17"></path>
    <path d="M8 2v20"></path>
    <path d="M4 12a5 5 0 0 1 5-5h0a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5h0a5 5 0 0 1-5-5Z"></path>
  </svg>
);

export default ForkKnifeIcon;
