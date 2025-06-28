"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { UploadCloud, Search, BarChartHorizontal, MousePointerClick, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const steps = [
  {
    name: '1. Upload Creatives',
    title: 'Effortless Ad Uploads',
    description: 'Advertisers can easily upload any ad format—images, videos, or HTML5 packages. Our streamlined form handles the rest.',
    icon: UploadCloud,
  },
  {
    name: '2. Discover & Request Ads',
    title: 'A Marketplace of Opportunities',
    description: 'Publishers browse a rich marketplace of available ads, filtering by category and format to find the perfect fit for their platform.',
    icon: Search,
  },
  {
    name: '3. Track Performance',
    title: 'Real-time Analytics',
    description: 'Both advertisers and publishers get access to a live dashboard tracking impressions, clicks, and revenue.',
    icon: BarChartHorizontal,
  },
];

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const renderActiveStepVisual = () => {
    switch (activeStep) {
      case 0:
        return <UploadAdVisual />;
      case 1:
        return <SelectAdVisual />;
      case 2:
        return <TrackPerformanceVisual />;
      default:
        return <UploadAdVisual />;
    }
  };

  return (
    <div id="how-it-works" className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:mx-0 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            See Abakwa in Action
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our platform simplifies every step of the ad exchange process. See how it works from start to finish.
          </p>
        </div>

        <div className="mt-16 lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={step.name}
                  className={cn(
                    'relative p-6 rounded-xl cursor-pointer transition-all duration-300',
                    activeStep === index
                      ? 'bg-primary/10 ring-2 ring-primary scale-105'
                      : 'hover:bg-muted/50'
                  )}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
                      activeStep === index ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    )}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-1 text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-7">
            <div className="relative w-full min-h-[500px] bg-muted/30 rounded-xl border border-border shadow-inner overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 p-8 flex items-center justify-center">
                {renderActiveStepVisual()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnimatedCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("bg-card border rounded-lg shadow-xl animate-fade-in-up w-full", className)}>
    {children}
  </div>
);

const UploadAdVisual = () => (
  <div className="w-full max-w-md mx-auto">
    <AnimatedCard>
      <div className="p-4 border-b">
        <h3 className="font-semibold text-foreground">Upload New Ad Creative</h3>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Ad Name</label>
          <div className="w-full h-8 bg-muted rounded-md mt-1 animate-pulse"></div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Description</label>
          <div className="w-full h-12 bg-muted rounded-md mt-1 animate-pulse"></div>
        </div>
        <div className="flex justify-end">
          <Button disabled size="sm">Submit Ad</Button>
        </div>
      </div>
    </AnimatedCard>
  </div>
);

const SelectAdVisual = () => (
  <div className="w-full grid grid-cols-2 gap-4">
    <div className="relative animate-fade-in-up" style={{ animationDelay: '0s' }}>
      <MockAdCard title="Summer Sale" img="/1.jpg" dataAiHint="summer sale" />
    </div>
    <div className="relative animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <MockAdCard title="New Tech Gadget" img="/2.jpg" dataAiHint="tech gadget" />
      <div className="absolute -right-2 -bottom-2 z-10">
        <MousePointerClick className="w-8 h-8 text-primary animate-ping" />
        <MousePointerClick className="w-8 h-8 text-primary absolute top-0 left-0" />
      </div>
    </div>
    <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <MockAdCard title="Adventure Tours" img="/adventure.jpg" dataAiHint="adventure tour" />
    </div>
    <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
       <MockAdCard title="Artisan Coffee" img="/5.jpg" dataAiHint="artisan coffee" />
    </div>
  </div>
);

const MockAdCard = ({ title, img, dataAiHint }: { title: string, img: string, dataAiHint: string }) => (
  <Card className="overflow-hidden">
    <Image src={img} width={300} height={200} alt={title} className="w-full h-auto object-cover" data-ai-hint={dataAiHint} />
    <div className="p-3">
      <h4 className="font-semibold text-sm truncate">{title}</h4>
      <Button variant="default" size="sm" className="w-full mt-2">Request Ad</Button>
    </div>
  </Card>
);

const TrackPerformanceVisual = () => (
  <div className="w-full max-w-md mx-auto">
    <AnimatedCard>
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold text-foreground">Performance Snapshot</h3>
        <Badge variant="secondary">Live</Badge>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Impressions</div>
          <div className="font-bold text-lg text-foreground">1.2M</div>
        </div>
         <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Clicks</div>
          <div className="font-bold text-lg text-foreground">8,450</div>
        </div>
        <div className="pt-2">
            <div className="flex items-center text-sm">
                <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-muted-foreground">Click-Through Rate (CTR)</span>
                <span className="ml-auto font-bold text-green-500">3.41%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5 mt-2 overflow-hidden">
                <div className="bg-green-500 h-2.5 rounded-full animate-progress-bar"></div>
            </div>
        </div>
      </div>
    </AnimatedCard>
  </div>
);


export default HowItWorks;
