'use client';
import React from 'react';
import ButtonSecondary from './ButtonSecondary';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = ({ setPreviewOpen }: { setPreviewOpen?: any }) => {
  const pathName = usePathname();
  return (
    <nav className="py-8 flex gap-5 justify-between items-center">
      <div>
        <h2 className="flex items-center">
          L <span className="hidden md:block">ink Sharing</span>
        </h2>
      </div>
      <div className="flex gap-7 items-center">
        <Link
          href="/"
          className={`flex gap-2 ${pathName === '/' ? 'bg-lightPurple text-purple' : 'text-gray'} h-[42px] md:h-[46px] w-14 md:w-[122px] items-center justify-center rounded-[8px]`}
        >
          <Image
            src={`/icons/${pathName === '/' ? 'link_purple' : 'input_link'}.svg`}
            width={20}
            height={20}
            alt="link"
          />
          <h4 className="hidden md:block">Links</h4>
        </Link>

        <Link
          href={'/profile'}
          className={`flex h-[42px] md:h-[46px] px-3 rounded-[8px] gap-2 items-center ${pathName === '/profile' ? 'bg-lightPurple text-purple' : 'text-gray'}`}
        >
          <Image src={'/icons/user.svg'} width={20} height={20} alt="user" />
          <h4 className="hidden md:block">Profile Details</h4>
        </Link>
      </div>
      <div>
        <ButtonSecondary onClick={() => setPreviewOpen && setPreviewOpen(true)}>
          <span className="hidden md:block">Preview</span>
          <Image
            className="md:hidden"
            src={'/icons/preview.svg'}
            width={20}
            height={20}
            alt="preview"
          />
        </ButtonSecondary>
      </div>
    </nav>
  );
};

export default Navbar;
