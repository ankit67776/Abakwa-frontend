
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <div className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to get started?<br />
          Join the future of ad exchange today.
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
           <Link href="/signup?role=advertiser" passHref>
            <Button
              size="lg"
            >
             Sign up as Advertiser
            </Button>
          </Link>
          <Link href="/signup?role=publisher" passHref>
            <Button
              variant="outline"
              size="lg"
            >
              Sign up as Publisher
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
