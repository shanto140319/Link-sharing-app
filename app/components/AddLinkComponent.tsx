'use client';
import { platforms } from '@/helpers/PlatformData';
import CustomInput from './CustomInput';
import CustomSelect from './CustomSelect';

interface PropsType {
  index: number;
  handleRemove: any;
  handleChange: any;
  field: {
    id: number;
    platform: string;
    link: string;
  };
}

const AddLinkComponent: React.FC<PropsType> = ({
  index,
  handleRemove,
  handleChange,
  field,
}) => {
  return (
    <article className="bg-lightGray rounded-[12px] p-5">
      <div className="flex items-center justify-between text-gray mb-5">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col gap-1">
            <span className="h-[1px] w-3 bg-gray"></span>
            <span className="h-[1px] w-3 bg-gray"></span>
          </div>
          <h4 className="font-extrabold"> Link#{field.id + 1}</h4>
        </div>
        <span onClick={() => handleRemove(index)} className="cursor-pointer">
          Remove
        </span>
      </div>
      <label className="body-s block mb-1">Platform</label>
      <CustomSelect
        options={platforms}
        value={field.platform}
        onChange={(value) => handleChange(index, 'platform', value)}
        placeholder="Select an option"
        className="mb-4"
      />
      <label htmlFor="email" className="body-s block mb-1">
        Link
      </label>
      <CustomInput
        value={field.link}
        onChange={(e) => handleChange(index, 'link', e.target.value)}
        type="url"
        required
        placeholder="Enter your link"
        iconUrl="/icons/input_link.svg"
        id="email"
      />
    </article>
  );
};

export default AddLinkComponent;
