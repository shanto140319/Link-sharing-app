import type {Config} from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                purple: "#633cff",
                purpleHover: "#beadff",
                lightPurple: "#efebff",
                darkGray: "#333333",
                gray: "#737373",
                borders: "#d9d9d9",
                lightGray: "#fafafa",
                white: "#ffffff",
                red: "#ff3939",
            },
        },
    },
    plugins: [],
}
export default config
