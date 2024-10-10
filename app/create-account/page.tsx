'use client';

import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import ButtonPrimary from '../components/ButtonPrimary';
import CustomInput from '../components/CustomInput';

const Page = () => {
  const [email, setEmail] = useState<string>('');
  const [createPassword, setCreatePassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('/api/signup', {
        email,
        password: createPassword,
      });
      alert(response.data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <section className="w-full flex items-center justify-center h-[100vh] bg-white">
      <article className="w-full max-w-[450px]">
        <h2 className="mb-2">Create account</h2>
        <p className="mb-10">Let’s get you started sharing your links!</p>

        <label htmlFor="email" className="body-s block mb-1">
          Email address
        </label>
        <CustomInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="e.g. alex@email.com"
          iconUrl="/icons/email.svg"
          id="email"
        />
        <label htmlFor="create-password" className="body-s mt-4 mb-1 block">
          Create password
        </label>
        <CustomInput
          value={createPassword}
          onChange={(e) => setCreatePassword(e.target.value)}
          type="password"
          required
          placeholder="Enter your password"
          iconUrl="/icons/password.svg"
          id="create-password"
        />

        <label htmlFor="confirm-password" className="body-s mt-4 mb-1 block">
          Confirm password
        </label>
        <CustomInput
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          required
          placeholder="Enter your password"
          iconUrl="/icons/password.svg"
          id="confirm-password"
        />

        <p className="mt-7 body-s">
          Password must contains at least 8 characters
        </p>
        <ButtonPrimary className="my-7" onClick={handleSignup}>
          Create new account
        </ButtonPrimary>
        <p>
          Already have an account?{' '}
          <Link href={'/login'} className="text-purple">
            Login
          </Link>
        </p>
      </article>
    </section>
  );
};

export default Page;
