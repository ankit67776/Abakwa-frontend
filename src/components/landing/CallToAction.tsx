
"use client";

import React from 'react';
import Link from 'next/link'; // Changed from react-router-dom
import { Button } from '@/components/ui/button'; // Using ShadCN Button

const CallToAction: React.FC = () => {
  return (
    <div className="bg-primary"> {/* Use theme color */}
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-primary-foreground sm:text-4xl"> {/* Use theme color */}
          <span className="block">Ready to get started?</span>
          <span className="block">Sign up for Abakwa today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-blue-200"> {/* Consider theme color: primary-foreground/70 ? */}
          Join thousands of advertisers and publishers who are already using Abakwa to streamline their ad exchange process.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/signup?role=advertiser" passHref>
            <Button
              variant="outline" // Or a custom variant for on-primary
              size="lg"
              className="bg-white text-primary hover:bg-gray-100" // Explicitly white for contrast on primary
            >
              Sign up as Advertiser
            </Button>
          </Link>
          <Link href="/signup?role=publisher" passHref>
            <Button
              variant="outline" // Or a custom variant for on-primary
              size="lg"
              className="bg-white text-primary hover:bg-gray-100" // Explicitly white for contrast on primary
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
