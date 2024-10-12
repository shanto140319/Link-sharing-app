'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import CustomInput from '../components/CustomInput';
import ButtonPrimary from '../components/ButtonPrimary';
import Preview from '../components/Preview';
import toast from 'react-hot-toast';
import { z } from 'zod';

// Zod schema
const profileSchema = z.object({
  firstName: z.string().min(1, 'Can not be empty'),
  lastName: z.string().min(1, 'Can not be empty'),
  email: z.string().email('Invalid email address'),
});
interface PlatformLink {
  platform: string;
  link: string;
  error: string[];
}

const Page = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [preViewOpen, setPreviewOpen] = useState(false);

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

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const img = new window.Image();
      const imageUrl = URL.createObjectURL(file);
      img.src = imageUrl;

      img.onload = () => {
        if (img.width > 1024 || img.height > 1024) {
          toast.error('Image must be below 1024x1024px.');
          setSelectedImage('');
        } else {
          setSelectedImage(imageUrl);
        }
      };
    } else {
      toast.error('Please select a valid PNG or JPEG image');
    }
  };

  const handleSubmit = () => {
    setErrors({});
    const result = profileSchema.safeParse({ firstName, lastName, email });

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    toast.success('Profile saved successfully');
  };

  return (
    <>
      <Navbar setPreviewOpen={setPreviewOpen} />
      <section className="grid lg:grid-cols-[40%_55%] gap-10 px-5">
        <div className="hidden lg:flex flex-col justify-center items-center w-full ml-[-10%]">
          <Image
            src={'/images/phone.png'}
            alt="phone"
            height={400}
            width={200}
          />
          <div className="grid gap-5 absolute">
            {links?.map((link, index) => {
              return (
                <div
                  className={`${link?.platform ? 'px-5 py-2 border ' : ''} border-borders rounded-lg`}
                  key={index}
                >
                  {link?.platform}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-10">
          <h2>Profile Details</h2>
          <p>Add your details to create a personal touch to your profile.</p>

          <div className="flex flex-col md:flex-row justify-between md:items-center mt-10 gap-5">
            <p>Profile picture</p>

            <div className="flex flex-col md:flex-row md:items-center justify-center gap-6">
              {selectedImage ? (
                <div className="mb-4 h-[190px] w-[190px] relative">
                  <Image
                    src={selectedImage}
                    alt="Uploaded Image"
                    className="mb-4 h-full max-w-full object-contain rounded-[12px]"
                    width={190}
                    height={190}
                  />
                  <label
                    htmlFor="profile"
                    className="flex flex-col absolute top-0 left-0 h-full w-full bg-black bg-opacity-50 items-center justify-center z-10 text-white cursor-pointer rounded-[12px]"
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
                  <label className="cursor-pointer text-purple-600 font-medium flex flex-col items-center justify-center bg-lightPurple p-6 rounded-[12px] h-[190px] w-[190px]">
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
            <div className="grid md:grid-cols-[2fr_3fr] md:gap-10">
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
                error={errors.firstName}
              />
            </div>
            <div className="grid md:grid-cols-[2fr_3fr] md:gap-10">
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
                error={errors.lastName}
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName}</p>
              )}
            </div>
            <div className="grid md:grid-cols-[2fr_3fr] md:gap-10">
              <label htmlFor="email" className="block mb-1 md:mb-0">
                Email
              </label>
              <CustomInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="e.g. john@email.com"
                id="email"
                error={errors.email}
              />
            </div>
          </article>

          <div className="my-10 pb-10">
            <hr className="text-borders mb-4 block" />

            <ButtonPrimary
              className="max-w-[90px] float-right"
              onClick={handleSubmit}
            >
              Save
            </ButtonPrimary>
          </div>
        </div>
      </section>

      <Preview
        isOpen={preViewOpen}
        name={firstName + ' ' + lastName}
        email={email}
        profilePicture={selectedImage}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
};

export default Page;
