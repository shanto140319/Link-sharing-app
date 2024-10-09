"use client"
import React from "react"
interface CustomInputProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    placeholder?: string
    className?: string
    id?: string
    error?: boolean
}

const CustomInput: React.FC<CustomInputProps> = ({
    value,
    onChange,
    type = "text",
    placeholder,
    className,
    id,
    error,
}) => {
    const inputClass = `h-[46px] w-full rounded-[8px] placeholder-gray-500 py-1 px-3 border-[1px] focus:outline-none ${
        error
            ? "border-red text-red focus:border-red"
            : "border-borders focus:border-purple"
    }  ${className ? className : ""}`
    return (
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClass.trim()}
        />
    )
}

export default CustomInput
