import React from 'react';

interface ButtonProps {
  title: string;
  onClick?: () => unknown;
  disabled?: boolean;
  styles?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  disabled,
  styles,
}) => {
  return (
    <button className="bg-primary-900 w-full text-white-primary py-3 rounded-lg" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
