"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export const ShippingSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);


  // GSAP Animations
  useEffect(() => {
    // Original text animations
    gsap.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.3
    });

    gsap.from(descRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.6
    });
  }, []);

  return (
    <section className=" w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      <Image 
        src="/logo-earth.png"
        width={500}
        height={500}
        alt='earth'
      />
      {/* Original Text Content */}
      <div className="text-center px-4">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
        >
          Shipping Across the Globe
        </h1>
        <p 
          ref={descRef}
          className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300"
        >
          We deliver to over 150 countries with fast logistics and real-time tracking.
          Our network ensures your packages arrive safely and on time.
        </p>
      </div>
    </section>
  );
};