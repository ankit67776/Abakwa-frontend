
"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    body: 'Abakwa revolutionized how we approach partnerships. We found high-quality publishers in days, not months. The performance transparency is a game changer.',
    author: {
      name: 'Sarah Johnson',
      handle: 'Marketing Director, InnovateCorp',
      imageUrl: 'https://placehold.co/100x100.png',
      imageHint: 'woman portrait',
    },
  },
  {
    body: 'As a publisher, control is everything. Being able to approve every single ad creative gives us the confidence to monetize without compromising our brand integrity.',
    author: {
      name: 'David Chen',
      handle: 'Founder, QuantumQuill',
      imageUrl: 'https://placehold.co/100x100.png',
      imageHint: 'man portrait',
    },
  },
   {
    body: 'The analytics dashboard is incredibly powerful. We finally have a clear, unified view of both ad performance and audience engagement, all in one place.',
    author: {
      name: 'Maria Rodriguez',
      handle: 'Head of Growth, DataDriven',
      imageUrl: 'https://placehold.co/100x100.png',
      imageHint: 'woman portrait professional',
    },
  },
];

const Testimonials = () => {
  return (
    <div className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            See what our partners are saying
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author.handle} className="p-8 shadow-lg">
                <CardContent className="p-0">
                  <figure>
                    <blockquote className="text-foreground">
                      <p>{`“${testimonial.body}”`}</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <Image 
                        className="h-10 w-10 rounded-full bg-gray-50" 
                        src={testimonial.author.imageUrl} 
                        alt={testimonial.author.name}
                        width={40}
                        height={40}
                        data-ai-hint={testimonial.author.imageHint}
                      />
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.author.name}</div>
                        <div className="text-muted-foreground">{testimonial.author.handle}</div>
                      </div>
                    </figcaption>
                  </figure>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
