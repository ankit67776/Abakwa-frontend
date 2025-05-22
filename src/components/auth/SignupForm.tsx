
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'; // Changed from react-router-dom
import { Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Using ShadCN Button
import { Input } from '@/components/ui/input'; // Using ShadCN Input
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth'; // Using the new useAuth
import { GoogleLogin } from '@react-oauth/google';
import { cn } from '@/lib/utils';

const SignupForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'advertiser' | 'publisher'>('advertiser');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams(); // Changed from useLocation
  const { signup: authSignup, handleGoogleLogin: authHandleGoogleLogin, checkAuthStatus } = useAuth(); // Renamed to avoid conflict
  
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'advertiser' || roleParam === 'publisher') {
      setRole(roleParam);
    }
  }, [searchParams]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const authResult = await authSignup(email, password, name, role);
       if (authResult && authResult.user) {
        checkAuthStatus(); // Ensure auth state is updated
        if (role === 'publisher') {
            router.push('/publisher-registration'); // Redirect to publisher registration
        } else {
            router.push('/advertiser/dashboard'); 
        }
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message ||'An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onGoogleLoginSuccess = async (credentialResponse: any) => {
    setError(null);
    setIsLoading(true);
    try {
      const authResult = await authHandleGoogleLogin(credentialResponse, role); // Pass role for Google signup
      if (authResult && authResult.user) {
        const userRole = authResult.user?.role || 'advertiser'; // Use role from authResult
        checkAuthStatus();
        if (userRole === 'publisher') {
            router.push('/publisher-registration'); // Redirect to publisher registration
        } else {
            router.push('/advertiser/dashboard');
        }
      } else {
        setError('Google Signup failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Google Signup failed:', err);
      setError(err.response?.data?.message || err.message || 'Google Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onGoogleLoginError = () => {
    setError('Google Signup failed. Please try again.');
    setIsLoading(false);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {error && (
          <div className="mb-4 bg-destructive/10 border border-destructive/20 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-destructive" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label className="block text-sm font-medium text-foreground">I am a</Label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                className={cn(
                  `border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium cursor-pointer transition-colors`,
                  role === 'advertiser'
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'border-border text-muted-foreground hover:bg-muted/50'
                )}
                onClick={() => setRole('advertiser')}
              >
                Advertiser
              </button>
              <button
                type="button"
                className={cn(
                  `border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium cursor-pointer transition-colors`,
                  role === 'publisher'
                   ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'border-border text-muted-foreground hover:bg-muted/50'
                )}
                onClick={() => setRole('publisher')}
              >
                Publisher
              </button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="name">Full name</Label>
             <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email address</Label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                />
            </div>
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Password must be at least 8 characters long.</p>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing up...' : 'Sign up'}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={onGoogleLoginSuccess}
              onError={onGoogleLoginError}
              useOneTap={false}
              width="336px"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="text-sm">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
