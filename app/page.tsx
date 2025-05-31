'use client';
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link'
import Image from "next/image";
import AnimatedShoe from "./animatedShoe";


const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })


export default function Home(){

  const heroText = useRef<HTMLParagraphElement>(null);
  const span1 = useRef<HTMLSpanElement>(null);
  const span2 = useRef<HTMLSpanElement>(null);
  const span3 = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (span1.current, span2.current, span3.current) {
      gsap.from(span1.current, {
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.in'
      });
      gsap.from(span2.current, {
        opacity:0,
        duration: 1,
        delay:1.5,
        stagger:0.3,
        ease: "elastic.in"
      })
      gsap.from(span3.current, {
        opacity:0,
        duration: 1,
        delay:2,
        stagger:0.4,
        ease: "power1.in"
      })
    }
  });

  return(
    <main className="min-h-screen m-5 flex flex-col justify-center items-center">
      <p className={`${spaceGrotesk.className} relative top-30 z-[-1] font-bold text-2xl text-center `} ref={heroText}>
        <span ref={span1}> STEP </span>
        <span ref={span2}> INTO </span>
        <span ref={span3}> FUTURE </span>
      </p>
      <div className="absolute top-45 bg-transparent w-[230px] h-[230px] z-[-1] rounded-full shadow-[0px_0px_80px_1px_#ffffff]"></div>
      <AnimatedShoe />
      <div className={`m-8 p-5 flex justify-center items-center flex-nowrap gap-5 flex-col`}>
        <button className={`${spaceGrotesk.className} absolute top-[80%] bg-gradient-to-tr from-lime-500 to-emerald-600 text-black text-center font-bold pr-2 pl-2 pt-3 pb-3 rounded-4xl hover:bg-gradient-to-br hover:from-sky-600 hover:to-blue-300 cursor-pointer outline-1 hover:text-blue-700 hover:outline-4 transition-all duration-1000 shadow-[0px_0px_15px_1px_#ffffff]`}>
        Shop Now
        </button>
        <p className="flex flex-col justify-center items-center text-center flex-nowrap gap-2">
          <span>✨ Rotate, zoom, and customize in real-time</span>
          <span>🚀Free shipping on orders over $99</span>
          <span>✅ 30-day comfort guarantee</span>
          </p>
        <code className="text-center">!!photos and 3D models can not be loaded cause of device performance!!</code>
      </div>
    </main>
  )
}