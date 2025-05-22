
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PublisherRegistrationForm from '@/components/publisher/PublisherRegistrationForm';

export default function PublisherRegistrationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-muted/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-10 sm:py-16 md:py-20 pt-28 sm:pt-32 md:pt-36"> {/* Adjusted top padding */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Become a Publisher Partner
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
              Join our network by providing your details. We&apos;re excited to help you monetize your platform!
            </p>
          </div>
          
          <PublisherRegistrationForm />
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
