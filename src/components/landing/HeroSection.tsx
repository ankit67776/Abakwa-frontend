
"use client";

import React from 'react';
import Link from 'next/link'; // Changed from react-router-dom
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Using ShadCN Button
import Image from 'next/image'; // Using next/image

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden pt-16"> {/* Added pt-16 for header */}
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-gradient-to-r from-blue-600 to-blue-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-blue-800 transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="relative pt-10 px-4 sm:px-6 lg:px-8 sm:pt-12 lg:pt-24">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">The Simplest Way to</span>
                <span className="block text-blue-200">Exchange Ad Units</span>
              </h1>
              <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Abakwa connects advertisers with publishers seamlessly. Upload, select, and track ad performance all in one place.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/signup?role=advertiser" passHref>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-white text-blue-600 bg-white hover:bg-gray-100 hover:text-blue-700" // Adjusted for better contrast
                    >
                      I&apos;m an Advertiser <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="/signup?role=publisher" passHref>
                    <Button
                      variant="outline"
                      size="lg"
                       className="w-full border-white text-blue-600 bg-white hover:bg-gray-100 hover:text-blue-700" // Adjusted for better contrast
                    >
                      I&apos;m a Publisher <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="Team working on digital advertising"
          width={1260}
          height={750}
          priority
          data-ai-hint="team collaboration"
        />
      </div>
    </div>
  );
};

export default HeroSection;
