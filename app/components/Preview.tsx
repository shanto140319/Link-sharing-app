'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ButtonSecondary from './ButtonSecondary';
import ButtonPrimary from './ButtonPrimary';

type PreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  email: string;
  profilePicture: string;
};

interface PlatformLink {
  platform: string;
  link: string;
  error: string[];
}
const Preview: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  name,
  email,
  profilePicture,
}) => {
  const [links, setLinks] = useState<PlatformLink[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('/api/get-links', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLinks(data.links);
      })
      .catch((error) => {
        console.error('Error fetching links:', error);
      });
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 h-[100%] w-full z-50 bg-white">
      <section className="md:bg-purple  md:h-[350px] p-5 rounded-bl-[20px] rounded-br-[20px]">
        <div className="w-full md:py-3 md:px-5 flex items-center justify-between bg-white rounded-[12px]">
          <ButtonSecondary className="max-w-[150px]" onClick={onClose}>
            Back to editor
          </ButtonSecondary>
          <ButtonPrimary className="max-w-[150px]">Share link</ButtonPrimary>
        </div>
      </section>

      <div className="bg-white rounded-[20px] md:shadow-lg p-8 w-full max-w-[350px] m-auto md:mt-[-100px] min-h-[400px]">
        <div className="flex flex-col items-center">
          <Image
            src={profilePicture}
            alt={`${name}'s profile`}
            className="rounded-full w-24 h-24 mb-4 border-[5px] border-purple"
            height={100}
            width={100}
          />
          <h2>{name}</h2>
          <p className="text-gray">{email}</p>

          <div className="mt-6 w-full">
            {links?.map((link, idx) => (
              <a
                key={idx}
                href={link.link}
                target="_blank"
                className={`flex items-center justify-center py-3 px-4 rounded-lg mb-2 border border-borders`}
              >
                <span>{link.platform}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
