
"use client";

import React from 'react';
import { Upload, Search, BarChart } from 'lucide-react';
import Image from 'next/image';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      name: 'Upload',
      description: 'Advertisers upload their ad units in various formats including HTML, JS, images, and video.',
      icon: Upload,
      color: 'bg-primary', // Changed to primary
    },
    {
      name: 'Select',
      description: 'Publishers browse and select the most relevant ads for their platforms with just a few clicks.',
      icon: Search,
      color: 'bg-primary', // Changed to primary
    },
    {
      name: 'Track',
      description: 'Both parties track performance metrics like impressions, clicks, and conversions in real-time.',
      icon: BarChart,
      color: 'bg-primary', // Changed to primary
    },
  ];

  return (
    <div id="how-it-works" className="py-16 bg-background overflow-hidden lg:py-24"> {/* Changed bg-white to bg-background */}
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="relative">
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl"> {/* text-gray-900 to text-foreground */}
            How Abakwa Works
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-muted-foreground"> {/* text-gray-500 to text-muted-foreground */}
            Our simple three-step process makes ad exchange effortless for both advertisers and publishers.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-16 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {steps.map((step, index) => (
            <div key={step.name} className="mt-10 lg:mt-0">
              <div className="relative">
                <div>
                  <span
                    className={`${step.color} h-12 w-12 rounded-md flex items-center justify-center text-primary-foreground`} // Added text-primary-foreground
                  >
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-6">
                  <div className="flex items-center">
                    <span className={`${step.color} rounded-full text-primary-foreground text-sm font-medium px-4 py-1 mr-3`}> {/* Added text-primary-foreground */}
                      Step {index + 1}
                    </span>
                    <h3 className="text-xl font-medium text-foreground">{step.name}</h3> {/* text-gray-900 to text-foreground */}
                  </div>
                  <p className="mt-2 text-base text-muted-foreground">{step.description}</p> {/* text-gray-500 to text-muted-foreground */}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-12 sm:mt-16 lg:mt-24">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="lg:col-start-2">
              <h3 className="text-2xl font-extrabold text-foreground tracking-tight sm:text-3xl"> {/* text-gray-900 to text-foreground */}
                Real-time Analytics
              </h3>
              <p className="mt-3 text-lg text-muted-foreground"> {/* text-gray-500 to text-muted-foreground */}
                Track your ad performance with our comprehensive analytics dashboard. Monitor impressions, clicks, 
                conversions, and more in real-time to optimize your campaigns.
              </p>

              <dl className="mt-10 space-y-10">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-foreground">Performance Metrics</p> {/* text-gray-900 to text-foreground */}
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-muted-foreground"> {/* text-gray-500 to text-muted-foreground */}
                    View detailed metrics on impressions, clicks, conversions, and CTR to understand what&apos;s working.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-foreground">Data Visualization</p> {/* text-gray-900 to text-foreground */}
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-muted-foreground"> {/* text-gray-500 to text-muted-foreground */}
                    Beautiful charts and graphs make it easy to visualize trends and patterns in your ad performance.
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-card rounded-lg overflow-hidden"> {/* bg-white to bg-card */}
                  <Image
                    className="w-full"
                    src="https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Dashboard analytics screen"
                    width={1260}
                    height={750}
                    data-ai-hint="dashboard analytics"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
