
"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import SignupForm from '@/components/auth/SignupForm';
import { Loader2 } from 'lucide-react';

function SignupFormFallback() {
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10 min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  );
}

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
        <Suspense fallback={<SignupFormFallback />}>
          <SignupForm />
        </Suspense>
      </main>
    </div>
  );
}
