
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios'; // Ensure axios is imported

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  // We still need useAuth for GoogleLogin and checkAuthStatus
  const { handleGoogleLogin: authHandleGoogleLogin, checkAuthStatus } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Directly POST to the backend for email/password login
      const response = await axios.post('https://abakwa.squaregroup.tech/login', {
        email,
        password,
      });
      
      const { token, user } = response.data; // Assuming backend returns token and user object

      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        checkAuthStatus(); // Update global auth state

        const role = user?.role || 'advertiser';
        router.push(role === 'advertiser' ? '/advertiser/dashboard' : '/publisher/dashboard');
      } else {
        setError('Login failed. Invalid response from server.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onGoogleLoginSuccess = async (credentialResponse: any) => {
    setError(null);
    setIsLoading(true);
    try {
      const authResult = await authHandleGoogleLogin(credentialResponse);
       if (authResult && authResult.user) {
        const role = authResult.user?.role || 'advertiser';
        // checkAuthStatus(); // checkAuthStatus is called inside authHandleGoogleLogin if successful
        router.push(role === 'advertiser' ? '/advertiser/dashboard' : '/publisher/dashboard');
      } else {
        setError('Google Login failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Google Login failed:', err);
      setError(err.response?.data?.message || err.message || 'Google Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const onGoogleLoginError = () => {
    setError('Google Login failed. Please try again.');
    setIsLoading(false);
  };


  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {error && (
          <div className="mb-4 bg-destructive/10 border border-destructive/20 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email address</Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="email"
                name="email"
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
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
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
        </div>

        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={onGoogleLoginSuccess}
            onError={onGoogleLoginError}
            useOneTap={false}
            width="336px" // Standard width for Google button
          />
        </div>

        <div className="mt-6 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-primary hover:text-primary/80">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
