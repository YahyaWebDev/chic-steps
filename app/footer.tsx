import { Space_Grotesk, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const spaceGrotesk = Space_Grotesk({ subsets : ['latin']});
const geistMono = Geist_Mono({ subsets : ['latin']});

export default function Footer(){
    return(
    <div className="text-white flex flex-col justify-center items-center flex-nowrap gap-5 p-5 m-5 bg-gray-800 shadow-[0px_0px_25px_2px_#d9d0d0] rounded-2xl">
    <div className="flex flex-row justify-center items-center gap-8 ">
        <div className="flex flex-col flex-nowrap gap-3">
            <h1 className={`${spaceGrotesk.className} text-xl font-bold`}>Chic Steps ™</h1>
            <div className="flex flex-col justify-center items-center flex-nowrap gap-5">
                <Link className={`hover:underline ${geistMono.className}`} href="/">Home</Link>
                <Link className={`hover:underline ${geistMono.className}`} href="/products">Products</Link>
                <Link className={`hover:underline ${geistMono.className}`} href="/shipping">Shipping</Link>
                <Link className={`hover:underline ${geistMono.className}`} href="/reviews">Reviews</Link>
            </div>
        </div>
        <Link href="/">
        <button className="bg-black p-2 rounded-2xl cursor-pointer hover:translate-y-2 hover:bg-gray-500 transition-all duration-1000">
            <Image
                src="/arrow-up.svg"
                height={25}
                width={25}
                alt="arrow-up"
             />
        </button>
        </Link>
    </div>
    <h1 className={`${geistMono.className}`}>All rights reserved 2024-2025 ©</h1>
    </div>
    )
}