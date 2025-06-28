
"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background pt-14">
      <div
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-card shadow-xl shadow-primary/10 ring-1 ring-primary/5 sm:-mr-80 lg:-mr-96"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:col-span-2 xl:col-auto">
            The Advertising Exchange, <br /> Reimagined.
          </h1>
          <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
            <p className="text-lg leading-8 text-muted-foreground">
              Abakwa is the frictionless marketplace connecting innovative advertisers with premium publishers. Automate your ad exchange, unlock new revenue streams, and track every impression in real-time.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link href="/signup" passHref>
                <Button size="lg">
                  Get Started <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="#how-it-works" passHref>
                <Button variant="link" size="lg" className="group text-base">
                  See it in action <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 ml-1">&rarr;</span>
                </Button>
              </Link>
            </div>
          </div>
          <Image
            src="/hero.png"
            alt="App screenshot of a dashboard"
            className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            width={1200}
            height={800}
            priority
            data-ai-hint="dashboard analytics"
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-background sm:h-32" />
    </div>
  );
};

export default HeroSection;
