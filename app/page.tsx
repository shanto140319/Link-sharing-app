'use client';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import AddLinkComponent from './components/AddLinkComponent';
import ButtonPrimary from './components/ButtonPrimary';
import ButtonSecondary from './components/ButtonSecondary';
import EmptyLinks from './components/EmptyLinks';
import Navbar from './components/Navbar';
import StrictModeDroppable from './components/StrictModeDroppable';
import { platformLinkPatterns } from '@/helpers/PlatformData';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface PlatformLink {
  platform: string;
  link: string;
  error: string[];
}

const Home = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const [fields, setFields] = useState<PlatformLink[]>([]);

  useEffect(() => {
    fetch('/api/get-links', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.links) {
          setFields(data?.links);
        }
      })
      .catch((error) => {
        console.error('Error fetching links:', error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleChange = (
    index: number,
    fieldName: keyof PlatformLink,
    value: string
  ) => {
    const newFields = [...fields]?.map((field, idx) => {
      if (index === idx) {
        return {
          ...field,
          [fieldName]: value,
        };
      } else {
        return field;
      }
    });

    setFields(newFields);
  };
  // Add new platform-link pair
  const handleAdd = () => {
    setFields([...fields, { platform: '', link: '', error: [] }]);
  };

  // Remove platform-link pair
  const handleRemove = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const newFields = Array.from(fields);
    const [draggedItem] = newFields.splice(result.source.index, 1);
    newFields.splice(result.destination.index, 0, draggedItem);
    setFields(newFields);
  }

  const handleSubmit = async () => {
    const newFields = fields?.map((field) => {
      const errors: string[] = [];
      if (!field.platform) {
        errors.push('Select a platform');
      } else if (field.link === '') {
        errors.push('Cannot be empty');
      } else if (
        platformLinkPatterns[field.platform] &&
        !platformLinkPatterns[field.platform].test(field.link)
      ) {
        errors.push('Please check the url');
      }

      return {
        ...field,
        error: errors,
      };
    });

    setFields(newFields);

    // Check if there are no errors before submission
    const isValid = newFields.every((field) => field.error.length === 0);

    if (isValid) {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('/api/upload-links', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            links: newFields,
          }),
        });

        if (response.ok) {
          toast.success('Data submitted successfully!');
        } else {
          toast.error('Failed to submit data');
        }
      } catch (error) {
        console.log(error);
        toast.error('error');
      }
    } else {
      console.log('Validation failed, please correct the errors.');
    }
  };

  if (!token) {
    return '';
  }
  return (
    <main className="pb-10">
      <Navbar />
      <section className="grid gap-6 lg:grid-cols-[40%_55%] w-full">
        <div className="hidden lg:flex flex-col justify-center items-center w-full ml-[-10%]">
          <Image
            src={'/images/phone.png'}
            alt="phone"
            height={400}
            width={200}
          />
          <div className="grid gap-5 absolute">
            {fields?.map((field, index) => {
              return (
                <div
                  className={`${field.platform ? 'px-5 py-2 border ' : ''} border-borders rounded-lg`}
                  key={index}
                >
                  {field?.platform}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="mb-2">Customize your links</h2>
          <p className="mb-10">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <ButtonSecondary className="mb-5" onClick={handleAdd}>
            + Add new link
          </ButtonSecondary>

          {fields?.length <= 0 ? (
            <EmptyLinks />
          ) : (
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <StrictModeDroppable droppableId="boxes">
                {(provided: any) => (
                  <ul ref={provided.innerRef} {...provided.droppableProps}>
                    {fields.map((field, index) => (
                      <Draggable
                        key={index}
                        draggableId={index.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            className="mb-4"
                          >
                            <AddLinkComponent
                              key={index}
                              index={index}
                              handleRemove={handleRemove}
                              handleChange={handleChange}
                              field={field}
                            />
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </StrictModeDroppable>
            </DragDropContext>
          )}
        </div>
      </section>

      <div className="mt-10 flex justify-end">
        <ButtonPrimary
          className="max-w-[90px]"
          disabled={fields?.length <= 0}
          onClick={handleSubmit}
        >
          Save
        </ButtonPrimary>
      </div>
    </main>
  );
};

export default Home;
