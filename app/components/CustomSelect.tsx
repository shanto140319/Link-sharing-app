import React from 'react';

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className,
}) => {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          block appearance-none w-full bg-white border border-borders
          text-gray py-2 px-4 pr-8 rounded-[8px] focus:outline-none focus:border-purple h-[42px] md:h-[46px]
        `}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.516 7.548l3.88 4.036 3.88-4.036 1.182 1.128-5.062 5.26-5.062-5.26z" />
        </svg>
      </div>
    </div>
  );
};

export default CustomSelect;
