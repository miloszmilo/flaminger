"use client";
import React from 'react'
import RadioWithTextSquare from './RadioWithTextSquare';
import BusinessSvg from './BusinessSvg';
import EmploymentContractSvg from './EmploymentContractSvg';
import { PickerProps } from '@/app/lib/definitions';

export default function ContractTypePicker({ whichRadioIsActive, setWhichRadioIsActiveAction }: PickerProps) {

  function getContractTypeByRadioId(id: number) {
    switch (id) {
      case 0:
        return "b2b";
      case 1:
        return "contract";
      default:
        return "b2b";
    }
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="contractType">*Contract Type:</label>
      <input type="hidden" name="contractType" value={getContractTypeByRadioId(whichRadioIsActive)} />
      <div className="flex flex-col md:flex-row gap-2">
        <RadioWithTextSquare
          radioId={0}
          whichRadioIsActive={whichRadioIsActive}
          setWhichRadioIsActiveAction={setWhichRadioIsActiveAction}
          text="B2B"
          className="w-full md:w-1/2"
        >
          <BusinessSvg
            imageAlt={"Business To Business contract"}
            className={`transition duration-75 ${0 === whichRadioIsActive ?
              "text-orange-600" : "text-black dark:text-white"}`} />
        </RadioWithTextSquare>
        <RadioWithTextSquare
          radioId={1}
          whichRadioIsActive={whichRadioIsActive}
          setWhichRadioIsActiveAction={setWhichRadioIsActiveAction}
          text="Employment Contract"
          className="w-full md:w-1/2"
        >
          <EmploymentContractSvg
            imageAlt={"Employment contract"}
            className={`transition duration-75 ${1 === whichRadioIsActive ?
              "text-orange-600" : "text-black dark:text-white"}`} />
        </RadioWithTextSquare>
      </div>
    </div>
  )
}

