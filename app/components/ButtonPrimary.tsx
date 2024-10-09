import React from "react"

interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    type?: "button" | "submit" | "reset"
    disabled?: boolean
    className?: string
}

const ButtonPrimary: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = "button",
    disabled = false,
    className,
}) => {
    const inputClass = `transition duration-300 ease-in-out px-5 py-1 h-[46px] bg-purple hover:bg-purpleHover text-white rounded-[8px] w-full ${
        disabled ? "bg-lightPurple cursor-not-allowed hover:bg-lightPurple" : ""
    } ${className ? className : ""}`
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={inputClass.trim()}
        >
            {children}
        </button>
    )
}

export default ButtonPrimary
