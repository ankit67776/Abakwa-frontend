
"use client";

import React from 'react';
import { Zap, ShieldCheck, AreaChart, Users } from 'lucide-react';

const features = [
  {
    name: 'Frictionless Marketplace',
    description:
      'Seamlessly connect with a curated network of advertisers and publishers. Discover opportunities and launch campaigns in minutes, not weeks.',
    icon: Zap,
  },
  {
    name: 'Transparent Analytics',
    description:
      'Get a crystal-clear view of your ad performance. Both parties access real-time dashboards to track impressions, clicks, CTR, and revenue.',
    icon: AreaChart,
  },
  {
    name: 'Fortified Security',
    description:
      'Operate with confidence. All transactions and data are protected with enterprise-grade security and full compliance with privacy standards.',
    icon: ShieldCheck,
  },
  {
    name: 'Unified Platform',
    description:
      'Manage everything from a single, intuitive interface. From ad uploads to performance tracking, your entire workflow is streamlined.',
    icon: Users,
  },
];

const FeatureSection: React.FC = () => {
  return (
    <div id="features" className="py-24 sm:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Everything You Need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            A Better Way to Exchange Ads
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground lg:mx-auto">
            Abakwa provides a powerful, unified platform that eliminates the typical friction of ad exchanges, giving you the tools to succeed.
          </p>
        </div>

        <div className="mt-20">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
