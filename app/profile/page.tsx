'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import CustomInput from '../components/CustomInput';
import ButtonPrimary from '../components/ButtonPrimary';
import Preview from '../components/Preview';

const Page = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [preViewOpen, setPreviewOpen] = useState(false);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const img = new window.Image();
      const imageUrl = URL.createObjectURL(file);
      img.src = imageUrl;

      img.onload = () => {
        if (img.width > 1024 || img.height > 1024) {
          setErrorMessage('Image must be below 1024x1024px.');
          setSelectedImage('');
        } else {
          setSelectedImage(imageUrl);
          setErrorMessage('');
        }
      };
    } else {
      setErrorMessage('Please select a valid PNG or JPEG image');
    }
  };
  return (
    <>
      <Navbar setPreviewOpen={setPreviewOpen} />
      <section className="grid lg:grid-cols-[40%_55%] gap-10">
        <div>a</div>
        <div className="mt-10">
          <h2>Profile Details</h2>
          <p>Add your details to create a personal touch to your profile.</p>

          <div className="flex justify-between items-center mt-10">
            <p>Profile picture</p>

            <div className="flex items-center justify-center gap-6">
              {selectedImage ? (
                <div className="mb-4 h-[190px] w-[190px] relative">
                  <Image
                    src={selectedImage}
                    alt="Uploaded Image"
                    className="mb-4 h-full w-full object-cover rounded-lg"
                    width={190}
                    height={190}
                  />
                  <label
                    htmlFor="profile"
                    className="flex flex-col absolute top-0 left-0 h-full w-full bg-black bg-opacity-50 items-center justify-center z-10 text-white cursor-pointer"
                  >
                    <Image
                      src="/icons/camera-white.svg"
                      alt="Upload Icon"
                      className="mb-4"
                      width={30}
                      height={30}
                    />
                    <input
                      id="profile"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    Change image
                  </label>
                </div>
              ) : (
                <>
                  <label className="cursor-pointer text-purple-600 font-medium flex flex-col items-center justify-center bg-lightPurple p-6 rounded-lg h-[190px] w-[190px]">
                    <Image
                      src="/icons/camera.svg"
                      alt="Upload Icon"
                      className="mb-4"
                      width={30}
                      height={30}
                    />
                    <input
                      id="profile"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    + Upload Image
                  </label>
                </>
              )}
              <p className="mt-2 text-sm text-gray-500">
                Image must be below 1024x1024px.
                <br />
                Use PNG or JPG format.
              </p>
            </div>
          </div>
          <article className="mt-12 grid gap-3">
            <div className="grid grid-cols-[2fr_3fr] gap-10">
              <label htmlFor="firstName" className="block mb-1 md:mb-0">
                First name*
              </label>
              <CustomInput
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                required
                placeholder="e.g. John"
                id="firstName"
              />
            </div>
            <div className="grid grid-cols-[2fr_3fr] gap-10">
              <label htmlFor="lastName" className="block mb-1 md:mb-0">
                Last name*
              </label>
              <CustomInput
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                required
                placeholder="e.g. Doe"
                id="lastName"
              />
            </div>
            <div className="grid grid-cols-[2fr_3fr] gap-10">
              <label htmlFor="email" className="block mb-1 md:mb-0">
                Email
              </label>
              <CustomInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="e.g. john@email.com"
                id="email"
              />
            </div>
          </article>

          <div className="my-10 pb-10">
            <hr className="text-borders mb-4 block" />

            <ButtonPrimary className="w-[90px] float-right">Save</ButtonPrimary>
          </div>
        </div>
      </section>

      <Preview
        isOpen={preViewOpen}
        name={firstName}
        email={email}
        profilePicture={selectedImage}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
};

export default Page;
