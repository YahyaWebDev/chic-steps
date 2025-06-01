'use client';
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import {
  ClerkProvider, SignInButton, SignUpButton, SignedIn,SignedOut, UserButton,
} from '@clerk/nextjs';
import Link from 'next/link'
import Image from "next/image";


const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export default function Navbar(){
    const ulLinks = useRef<HTMLUListElement>(null);
  const ham = useRef<HTMLButtonElement>(null);


  return(
    <div className={`${spaceGrotesk.className} text-white m-5 p-2  flex flex-row justify-center items-center flex-nowrap gap-20 max-md:gap-5 bg-gray-800 rounded-2xl shadow-[0px_0px_25px_2px_#d9d0d0]`}>
      <div className="logo">
        <h1 className={` text-xl font-bold`}>Chic   Steps ™</h1>
      </div>
      
        <ul className="z-[1000] flex flex-row justify-center items-center flex-nowrap gap-2 md:flex max-md:hidden max-md:flex-col max-md:fixed max-md:top-30 max-md:w-2xs max-md:bg-gray-800  max-md:left-0 max-md:items-start max-md:p-5 max-md:border-4 max-md:rounded-xl " id="links" ref={ulLinks}>
          <Link href="/">         <li className={`${geistMono.className} hover:underline transition-all `}>Home</li></Link>
          <Link href="/products"> <li className={`${geistMono.className} hover:underline transition-all `}>Products</li></Link>
          <Link href="/shipping"> <li className={`${geistMono.className} hover:underline transition-all `}>Shipping</li></Link>
          <Link href="/reviews">  <li className={`${geistMono.className} hover:underline transition-all `}>Reviews</li></Link>
        </ul>    
        
      <div className="flex flex-row justify-center items-center flex-nowrap gap-2.5">
        <ClerkProvider>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </ClerkProvider>
        
        <button className="border-0 flex"   onClick={
          function openLinks(){
            if(ulLinks.current){
              ulLinks.current.style.display = "flex";
            }
            if(ham.current){
              ham.current.style.display = "block";
            }
          }
        } >
          <div className="md:hidden " >
          <Image 
            src="/menu.svg"
            width={25}
            height={25}
            alt="menu"
            className="cursor-pointer"
          />
          </div>
        </button>

          <button className="cursor-pointer hidden " ref={ham} onClick={
            function closeLinks() {
              if(ulLinks.current){
              ulLinks.current.style.display = "none";
              }
              if(ham.current){
                ham.current.style.display = "none";
              }
            }  }>
            <Image 
              src="/close.svg"
              width={20}
              height={20}
              alt="close menu"
            />
          </button>
      </div>
    </div>
  )
}
