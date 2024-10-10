import Image from 'next/image';

const EmptyLinks = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-20">
        <Image
          src={'/images/empty-links.png'}
          height={300}
          width={300}
          alt="no-data"
        />
        <h2 className="mt-7">Let’s get you started</h2>
        <p className="mt-4 text-gray max-w-[450px] text-center">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We’re here to help you share
          your profiles with everyone!
        </p>
      </div>
    </div>
  );
};

export default EmptyLinks;
