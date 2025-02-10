"use client";
import React, { useState } from 'react'
import AddItemButton from './AddItemButton'
import InputNewTechnology from '../molecules/InputNewTechnology';
import TrashBinSvg from './TrashBinSvg';
import ActionButton from '../ActionButton';

type TechnologyRequirement = {
  name: string
  minimumYearsOfExperience: number
}

export default function TechnologiesPicker() {

  const [technologies, setTechnologies] = useState<TechnologyRequirement[]>([]);

  function addTechnologyInput() {
    if (technologies.length > 20) return;
    setTechnologies(() => [...technologies, { name: "Example", minimumYearsOfExperience: 0 }]);
  }

  function removeTechnology(index: number) {
    if (technologies.length == 0) return;
    setTechnologies(() => technologies.filter((_, techIndex) => techIndex !== index));
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="technologies">Required Technologies:</label>
      <div className=" border-2 border-neutral-700 px-4 py-2 rounded-md">
        {technologies && "Technology name | Minimum Years of Experience"}
        {technologies.map((technology, index) => {
          return (
            <div key={index} className="flex flex-row items-center">
              <InputNewTechnology name={technology.name} minimumYearsOfExperience={technology.minimumYearsOfExperience} />
              <ActionButton variant="formSubmit" className="mt-0 h-fit py-1 px-6 bg-red-600 hover:bg-red-600/80 duration-75" onClick={() => removeTechnology(index)}><TrashBinSvg className="size-4 h-5" /></ActionButton>
            </div>
          )
        })}
        <AddItemButton onClick={addTechnologyInput}>Add technology</AddItemButton>
      </div>
    </div>
  )
}

