import React, { useState } from 'react';
import Accordion from './Accordion';

const ContainerComponent = () => {

  const [accordions, setAccordion] = useState([
    {
      key: 1,
      title: 'What is GeeksforGeeks?',
      data: [{a:"hi", b:"hello"}, {a:"hi", b:"hello"}, {a:"hi", b:"hello"}, {a:"hi", b:"hello"}],
      isOpen: true
    },
    {
      key: 2,
      title: 'What GeeksforGeeks offer us?',
      data: [{a:"hi", b:"hello"}, {a:"hi", b:"hello"}, {a:"hi", b:"hello"}, {a:"hi", b:"hello"}],
      isOpen: false
    },
    {
      key: 3,
      title: 'Which is the best portal to study Computer Science?',
      data: [{a:"hi", b:"hello"}, {a:"hi", b:"hello"}, {a:"hi", b:"hello"}, {a:"hi", b:"hello"}],
      isOpen: false
    },
    
  ]);

  const toggleAccordion = (accordionkey) => {
    const updatedAccordions = accordions.map((accord) => {
      if (accord.key === accordionkey) {
        return { ...accord, isOpen: !accord.isOpen };
      } else {
        return { ...accord, isOpen: false };
      }
    });

    setAccordion(updatedAccordions);
  };
  return (

    <>
      <div>
        <div className="p-2 m-8">
          <h2 className='text-2xl mb-2 mx-auto text-green-800'>Accordion Using React and Tailwind</h2>
          {accordions.map((accordion) => (
            <Accordion
              key={accordion.key}
              title={accordion.title}
              data={accordion.data}
              isOpen={accordion.isOpen}
              toggleAccordion={() => toggleAccordion(accordion.key)}
            />
          ))}
        </div>
      </div>
    </>

  );
};

export default ContainerComponent;
