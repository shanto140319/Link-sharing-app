'use client';
import Image from 'next/image';
import React, { useState } from 'react';
interface CustomInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  error?: [] | string[];
  iconUrl?: string;
  required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
  type = 'text',
  placeholder,
  className,
  id,
  error,
  iconUrl,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className={`flex items-center gap-3 rounded-[8px] h-[46px] w-full px-3 border-[1px]  ${
        error && error?.length > 0 ? 'border-red text-red' : 'border-borders'
      } ${isFocused && !error ? 'border-shadow' : ''}  ${className ? className : ''}`}
    >
      {iconUrl && (
        <Image
          src={iconUrl || '/icons/input_link.svg'}
          height={15}
          width={15}
          alt="input_link"
        />
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        className="placeholder-gray-500 border-0 w-full h-full focus:outline-none"
        required
      />

      <p className="body-s min-w-[150px] hidden md:block text-right">
        {error?.map((e, i) => (
          <span className="block" key={i}>
            {e}{' '}
          </span>
        ))}
      </p>
    </div>
  );
};

export default CustomInput;
