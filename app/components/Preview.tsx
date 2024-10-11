import Image from 'next/image';
import React from 'react';
import ButtonSecondary from './ButtonSecondary';
import ButtonPrimary from './ButtonPrimary';

type Link = {
  name: string;
  url: string;
  icon: string;
  bgColor: string;
};

type PreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  email: string;
  profilePicture: string;
  links?: Link[];
};

const Preview: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  name,
  email,
  profilePicture,
  links,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 h-[100vh] w-full z-50 bg-white">
      <section className="bg-purple h-[350px] p-5 rounded-bl-[20px] rounded-br-[20px]">
        <div className="w-full py-3 px-5 flex items-center justify-between bg-white rounded-[12px]">
          <ButtonSecondary className="max-w-[160px]" onClick={onClose}>
            Back to editor
          </ButtonSecondary>
          <ButtonPrimary className="max-w-[160px]">Share link</ButtonPrimary>
        </div>
      </section>

      <div className="bg-white rounded-[20px] shadow-lg p-8 w-full max-w-[350px] m-auto mt-[-100px] min-h-[400px]">
        <div className="flex flex-col items-center">
          <Image
            src={profilePicture}
            alt={`${name}'s profile`}
            className="rounded-full w-24 h-24 mb-4"
            height={100}
            width={100}
          />
          <h2>{name}</h2>
          <p className="text-gray">{email}</p>

          <div className="mt-6 w-full">
            {links?.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                className={`flex items-center justify-between py-2 px-4 rounded-lg text-white mb-2 ${link.bgColor}`}
              >
                <span>{link.name}</span>
                <span className="material-icons">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
