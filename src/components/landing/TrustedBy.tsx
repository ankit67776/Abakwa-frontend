
"use client";

import React from 'react';
import { Briefcase, BarChart, Feather, Film } from 'lucide-react'; // Example icons

const TrustedBy = () => {
  return (
    <div className="bg-background py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-muted-foreground">
          Powering the next generation of digital advertising
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-4 lg:mx-0 lg:max-w-none">
          <div className="col-span-1 flex justify-center items-center gap-x-2 opacity-60 hover:opacity-100 transition-opacity">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
            <span className="text-xl font-semibold text-muted-foreground">InnovateCorp</span>
          </div>
          <div className="col-span-1 flex justify-center items-center gap-x-2 opacity-60 hover:opacity-100 transition-opacity">
             <Feather className="h-8 w-8 text-muted-foreground" />
            <span className="text-xl font-semibold text-muted-foreground">QuantumQuill</span>
          </div>
          <div className="col-span-1 flex justify-center items-center gap-x-2 opacity-60 hover:opacity-100 transition-opacity">
             <BarChart className="h-8 w-8 text-muted-foreground" />
            <span className="text-xl font-semibold text-muted-foreground">DataDriven</span>
          </div>
          <div className="col-span-1 flex justify-center items-center gap-x-2 opacity-60 hover:opacity-100 transition-opacity">
             <Film className="h-8 w-8 text-muted-foreground" />
            <span className="text-xl font-semibold text-muted-foreground">MediaMogul</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrustedBy;
