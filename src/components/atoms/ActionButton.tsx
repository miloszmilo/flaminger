import React, { MouseEventHandler } from 'react'
import Spinner from './Spinner'

interface Props {
  readonly variant?: ButtonVariant | null
  readonly children?: React.ReactNode
  readonly className?: string
  readonly isLoading?: boolean
  readonly onClick?: MouseEventHandler<HTMLButtonElement>
  readonly disabled?: boolean
  readonly value?: string
}

const BUTTON_VARIANTS = {
  BIG: "big",
  ALT: "alt",
  FORM_SUBMIT: "formSubmit",
  LLM: "llmCopy",
  NAVIGATION: "navigation",
  CHECKBOX: "checkbox"
}

const BUTTON_STYLES = {
  [BUTTON_VARIANTS.BIG]:
    `flex mt-8 bg-orange-600 hover:bg-red-600 hover:animate-none
text-white rounded-md p-8 py-2 text-[2rem] leading-tight animate-pulse
duration-75 focus:border-2 border-blue-500`,
  [BUTTON_VARIANTS.ALT]:
    `underline hover:text-neutral-400 hover:decoration-orange-800
ease-in-out duration-100 decoration-orange-500 underline-offset-8 rounded-md px-2 py-1`,
  [BUTTON_VARIANTS.FORM_SUBMIT]:
    `bg-orange-600 text-white rounded-md px-4 py-2 text-[1rem]
leading-tight hover:bg-red-600 hover:ease-in-out duration-75
focus:border-2 border-blue-500`,
  [BUTTON_VARIANTS.LLM]:
    `px-2 py-1 bg-neutral-800 hover:bg-neutral-800/60
focus:bg-neutral-800/60 rounded-md text-white`,
  [BUTTON_VARIANTS.NAVIGATION]:
    `flex justify-center items-center ease-in-out duration-100 rounded-md px-2 py-1 h-fit`,
  [BUTTON_VARIANTS.CHECKBOX]:
    `hover:animate-none text-white rounded-md p-2 w-fit text-md
leading-tight duration-75 focus:border-2 border-blue-500`,
  default:
    `mt-2 bg-orange-600 text-white rounded-md px-4 py-2 text-[1rem]
leading-tight animate-pulse hover:bg-red-600 hover:ease-in-out
duration-75 focus:border-2 border-blue-500`
}

type ButtonVariant = typeof BUTTON_VARIANTS[keyof typeof BUTTON_VARIANTS]

export default function ActionButton({ variant = null, children, className, isLoading = false, onClick, disabled, value }: Props) {

  const buttonStyle = variant ? BUTTON_STYLES[variant] : BUTTON_STYLES.default;
  const disabledStyle = `mt-2 cursor-not-allowed text-[1rem]
leading-tight bg-neutral-800/40 px-4 py-2 rounded-md text-white`.trim();
  const combinedStyle = `${disabled ? disabledStyle : buttonStyle} ${className ?? ""}`.trim();
  const buttonType = variant === "formSubmit" ? "submit" : "button";

  return <>
    {isLoading
      ?
      <Spinner /> : <button
        type={buttonType}
        className={combinedStyle}
        disabled={isLoading}
        onClick={disabled ? () => { } : onClick}
        value={value ? value : ""}>
        {isLoading ?
          <Spinner /> : children}
      </button>}
  </>
}

