
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PublisherRegistrationForm from '@/components/publisher/PublisherRegistrationForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function PublisherRegistrationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24"> {/* pt-24 for header offset */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Publisher Registration
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Join our network by providing your details. Let's grow together!
            </p>
          </div>
          
          <PublisherRegistrationForm />
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
