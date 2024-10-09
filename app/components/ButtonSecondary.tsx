import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const ButtonSecondary: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className,
}) => {
  const inputClass = `transition duration-300 ease-in-out px-5 py-1 h-[42px] md:h-[46px] hover:bg-lightPurple text-purple rounded-[8px] border-purple border-[1px] w-full ${
    disabled ? 'opacity-50' : ''
  } ${className ? className : ''}`;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={inputClass.trim()}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
