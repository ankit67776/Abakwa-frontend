"use client";

import React from 'react';
import Image from 'next/image';
import { Target, Gem, BarChart2, ShieldCheck, Zap } from 'lucide-react';

const advertiserFeatures = [
  {
    name: 'Precision Targeting',
    description: 'Reach your ideal customers by leveraging publisher data and advanced audience segmentation tools.',
    icon: Target,
  },
  {
    name: 'Access Premium Inventory',
    description: 'Place your ads on a curated network of high-quality, trusted publisher websites and platforms.',
    icon: Gem,
  },
  {
    name: 'Transparent Performance',
    description: 'Monitor your campaign performance in real-time with our comprehensive analytics dashboard.',
    icon: BarChart2,
  },
];

const publisherFeatures = [
  {
    name: 'Maximize Revenue',
    description: 'Monetize your inventory effectively with access to high-paying advertisers and competitive bidding.',
    icon: Zap,
  },
  {
    name: 'Maintain Control',
    description: 'Review and approve every ad creative to ensure it aligns with your brand and audience experience.',
    icon: ShieldCheck,
  },
  {
    name: 'Actionable Insights',
    description: 'Understand your audience better and track earnings with our integrated Google Analytics dashboard.',
    icon: BarChart2,
  },
];

const Solutions = () => {
  return (
    <div className="overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-primary">For Advertisers</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Launch Campaigns That Convert</p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Stop guessing and start connecting. Our platform gives you direct access to high-quality publisher inventory with the tools you need to ensure your message hits the mark.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
                {advertiserFeatures.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-foreground">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-primary" aria-hidden="true" />
                      {feature.name}
                    </dt>
                    <dd className="inline ml-1">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg"
            alt="Advertiser dashboard screenshot with charts and graphs"
            className="w-[36rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[48rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
            data-ai-hint="advertiser analytics"
          />
        </div>

        <div className="mx-auto mt-24 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-32 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-primary">For Publishers</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Monetize Your Content, Your Way</p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Take control of your ad revenue. Our platform empowers you to choose the right advertisers, manage your inventory, and unlock the true value of your content with powerful analytics.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
                {publisherFeatures.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-foreground">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-primary" aria-hidden="true" />
                      {feature.name}
                    </dt>
                    <dd className="inline ml-1">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
            alt="Team of publishers or content creators collaborating on a website"
            className="w-[36rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[48rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
            data-ai-hint="publisher analytics"
          />
        </div>
      </div>
    </div>
  );
}

export default Solutions;
