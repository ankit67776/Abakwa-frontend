
"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import TrustedBy from '@/components/landing/TrustedBy';
import FeatureSection from '@/components/landing/FeatureSection';
import Solutions from '@/components/landing/Solutions';
import HowItWorks from '@/components/landing/HowItWorks';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import CallToAction from '@/components/landing/CallToAction';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        {/* <TrustedBy /> */}
        <FeatureSection />
        <Solutions />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
