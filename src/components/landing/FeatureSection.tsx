
"use client";

import React from 'react';
import { Zap, Shield, RefreshCw, Users } from 'lucide-react';

const FeatureSection: React.FC = () => {
  const features = [
    {
      name: 'Easy Integration',
      description:
        'Seamlessly integrate with popular platforms like Google Ad Manager and Google Analytics with just a few clicks.',
      icon: Zap,
    },
    {
      name: 'Secure Transactions',
      description:
        'All ad exchanges are secured with enterprise-grade encryption and comply with the latest privacy regulations.',
      icon: Shield,
    },
    {
      name: 'Real-time Updates',
      description:
        'Track ad performance in real-time with comprehensive analytics dashboards for both advertisers and publishers.',
      icon: RefreshCw,
    },
    {
      name: 'Growing Network',
      description:
        'Join our growing network of advertisers and publishers to maximize your reach and revenue potential.',
      icon: Users,
    },
  ];

  return (
    <div id="features" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to exchange ads
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Abakwa provides powerful tools for both advertisers and publishers to streamline the ad exchange process.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
