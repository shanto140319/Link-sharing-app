"use client"
import ButtonPrimary from "./components/ButtonPrimary"
import ButtonSecondary from "./components/ButtonSecondary"
import CustomInput from "./components/CustomInput"

export default function Home() {
    return (
        <main>
            <div className='mt-2'></div>
            <CustomInput value='' onChange={() => console.log("")} error />
            <div className='mt-2'></div>
            <ButtonPrimary>Button</ButtonPrimary>
            <div className='mt-2'></div>
            <ButtonSecondary>Button</ButtonSecondary>
        </main>
    )
}
