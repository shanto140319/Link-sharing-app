'use client';
import { useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import AddLinkComponent from './components/AddLinkComponent';
import ButtonPrimary from './components/ButtonPrimary';
import ButtonSecondary from './components/ButtonSecondary';
import EmptyLinks from './components/EmptyLinks';
import Navbar from './components/Navbar';
import StrictModeDroppable from './components/StrictModeDroppable';

interface PlatformLink {
  id: number;
  platform: string;
  link: string;
}

export default function Home() {
  const [fields, setFields] = useState<PlatformLink[]>([]);

  // Handle change in platform or link
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
    setFields([...fields, { id: fields.length, platform: '', link: '' }]);
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

  console.log('fields', fields);
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
          <ButtonSecondary className="mb-5" onClick={handleAdd}>
            + Add new link
          </ButtonSecondary>

          {fields.length <= 0 ? (
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
        <ButtonPrimary className="max-w-[90px]" disabled={fields.length <= 0}>
          Save
        </ButtonPrimary>
      </div>
    </main>
  );
}
