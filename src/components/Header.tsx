"use server"
import React from 'react'
import LinkButton from './LinkButton'
import { cookies } from 'next/headers';

export default async function Header() {
  const cookieStore = await cookies();
  const isEmployer = false;
  const headerStyle = "sticky top-0 flex flex-row gap-2 min-h-[6svh] w-full text-xl items-center justify-center backdrop-blur-md bg-neutral-800/50";

  if (cookieStore.get("session")?.value) {
    return (
      <header className={headerStyle}>
        <LinkButton variant="header" href="/">Home</LinkButton>
        <LinkButton variant="header" href="/offers">Job offers</LinkButton>
        <LinkButton variant="header" href="/about_us">About us</LinkButton>
        <LinkButton variant="header" href="/profile">My Profile</LinkButton>
        <LinkButton variant="logout" href="/">Logout</LinkButton>
        {isEmployer && <LinkButton variant="header" href="/offer/add">Add Offer</LinkButton>}
      </header>
    )
  }
  return (
    <header className={headerStyle}>
      <LinkButton variant="header" href="/">Home</LinkButton>
      <LinkButton variant="header" href="/offers">Job offers</LinkButton>
      <LinkButton variant="header" href="/about_us">About us</LinkButton>
      <LinkButton variant="header" href="/login">Signin</LinkButton>
      <LinkButton variant="header" href="/register">Signup</LinkButton>
    </header>
  )
}

