'use client';

import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';
import ButtonPrimary from '../components/ButtonPrimary';
import CustomInput from '../components/CustomInput';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Define validation schema using Zod
const signupSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    createPassword: z.string().min(8, 'Please check again'),
    confirmPassword: z.string().min(8, 'Please check again'),
  })
  .refine((data) => data.createPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

const Page = () => {
  const [email, setEmail] = useState<string>('');
  const [createPassword, setCreatePassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const handleSignup = async () => {
    setErrors({});

    const result = signupSchema.safeParse({
      email,
      createPassword,
      confirmPassword,
    });

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await axios.post('/api/signup', {
        email,
        password: createPassword,
      });
      if (response.status === 201) {
        toast.success(response.data.message);
        router.push('/login');
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
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
          error={errors.email}
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
          error={errors.createPassword}
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
          error={errors.confirmPassword}
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
