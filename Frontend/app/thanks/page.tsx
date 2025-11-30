"use client"; 

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ThanksContent() {
    const searchParams = useSearchParams();

    const redirectTarget = searchParams.get("next") || "/";

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center border border-rose-100">
        
        {/* Icon Centang Hijau (Sukses) */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
        </div>

        {/* Judul Halaman */}
        <h1 className="text-3xl font-bold text-rose-900 mb-2" style={{ fontFamily: 'cursive' }}>
            Thank You!
        </h1>
        
        <p className="text-gray-600 mb-8">
            Your RSVP has been received. We can&apos;t wait to see you on our special day!
        </p>

        <a 
            href={redirectTarget} 
            className="inline-block bg-[#C27A72] text-white px-6 py-2 rounded-full hover:bg-[#A8655E] transition-colors"
        >
            Back to Home
        </a>
        </div>
    );
    }

    export default function Thanks() {
    return (
        <div className="min-h-screen bg-[#FDF2F0] flex items-center justify-center p-4 font-serif">
        <Suspense fallback={<div>Loading...</div>}>
            <ThanksContent />
        </Suspense>
        </div>
    );
    }