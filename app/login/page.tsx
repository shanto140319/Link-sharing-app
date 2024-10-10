'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ButtonPrimary from '../components/ButtonPrimary';
import CustomInput from '../components/CustomInput';

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleLogin() {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Login failed:', data.message);
    } else {
      // Store the token in localStorage or sessionStorage
      localStorage.setItem('token', data.token);
      router.push('/');
      console.log('Login successful, token saved:', data.token);
    }
  }

  return (
    <section className="w-full flex items-center justify-center h-[100vh] bg-white">
      <article className="w-full max-w-[450px]">
        <h2 className="mb-2">Login</h2>
        <p className="mb-10">Add your details below to get back into the app</p>

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
        <label htmlFor="password" className="body-s mt-4 mb-1 block">
          Password
        </label>
        <CustomInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          placeholder="Enter your password"
          iconUrl="/icons/password.svg"
          id="password"
        />
        <ButtonPrimary className="my-7" onClick={handleLogin}>
          Login
        </ButtonPrimary>
        <p>
          Don’t have an account?{' '}
          <Link href={'/create-account'} className="text-purple">
            Create account
          </Link>
        </p>
      </article>
    </section>
  );
};

export default Page;
