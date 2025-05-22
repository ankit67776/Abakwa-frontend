
"use client";

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-background">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mt-16"> {/* Added mt-16 for header spacing */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">Create your account</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{' '}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80">
              sign in to your existing account
            </Link>
          </p>
        </div>
        <SignupForm />
      </main>
    </div>
  );
}
