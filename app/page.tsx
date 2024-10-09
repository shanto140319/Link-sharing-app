'use client';
import Image from 'next/image';
import ButtonSecondary from './components/ButtonSecondary';
import Navbar from './components/Navbar';
import ButtonPrimary from './components/ButtonPrimary';

export default function Home() {
  return (
    <main className="pb-10">
      <Navbar />
      <section className="grid gap-5 lg:grid-cols-[40%_55%] w-full">
        <div className="hidden lg:block">a</div>
        <div>
          <h2 className="mb-2">Customize your links</h2>
          <p className="mb-10">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <ButtonSecondary>+ Add new link</ButtonSecondary>

          <div className="flex flex-col justify-center items-center mt-20">
            <Image
              src={'/images/empty-links.png'}
              height={300}
              width={300}
              alt="no-data"
            />
            <h2 className="mt-7">Let’s get you started</h2>
            <p className="mt-4 text-gray max-w-[450px] text-center">
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We’re here to help
              you share your profiles with everyone!
            </p>
          </div>

          <div className="mt-10 flex justify-end">
            <ButtonPrimary className="max-w-[90px]">Save</ButtonPrimary>
          </div>
        </div>
      </section>
    </main>
  );
}
