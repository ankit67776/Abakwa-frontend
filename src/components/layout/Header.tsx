
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Using ShadCN Button
import { useAuth } from '@/hooks/useAuth'; // Using the new useAuth

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isLandingPage = pathname === '/';
  // Determine transparency based on scroll position for landing page
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isLandingPage) {
        setIsScrolled(window.scrollY > 50);
      } else {
        setIsScrolled(false); // Not transparent on other pages
      }
    };

    if (isLandingPage) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial scroll position
    }
    
    return () => {
      if (isLandingPage) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLandingPage, pathname]);

  const isTransparentHeader = isLandingPage && !isScrolled && !isMenuOpen;


  const navigation = [
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Pricing', href: '/#pricing' }, // Assuming pricing section exists or will be added
  ];

  const handleLogout = () => {
    logout();
    // router.push('/'); // Optionally redirect to home after logout
  };
  
  if (isLoading && !isAuthenticated && pathname !=='/login' && pathname !=='/signup' && pathname !=='/') { // Avoid flickering on initial load for public pages
     // return null; // Or a loading spinner for the header
  }


  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isTransparentHeader ? 'bg-transparent' : 'bg-white shadow-sm'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <span className="sr-only">Abakwa</span>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">A</span>
              </div>
              <span className={`ml-2 text-xl font-bold ${isTransparentHeader ? 'text-white' : 'text-gray-900'}`}>Abakwa</span>
            </Link>
          </div>

          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className={`rounded-md p-2 inline-flex items-center justify-center ${isTransparentHeader ? 'text-white hover:bg-white/10' : 'text-gray-500 hover:bg-gray-100'}`}
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav className="hidden md:flex space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-medium ${isTransparentHeader ? 'text-white hover:text-white/80' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {item.name}
              </Link>
            ))}
             {isAuthenticated && (user?.role === 'advertiser' || user?.role === 'publisher') && (
                <Link href={user.role === 'advertiser' ? '/advertiser/dashboard' : '/publisher/dashboard'} className={`text-base font-medium ${isTransparentHeader ? 'text-white hover:text-white/80' : 'text-gray-500 hover:text-gray-900'}`}>
                    Dashboard
                </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {isAuthenticated ? (
              <div className="ml-3 relative group">
                <div>
                  <button
                    type="button"
                    className={`max-w-xs flex items-center text-sm rounded-full focus:outline-none ${isTransparentHeader ? 'text-white' : 'text-gray-700'}`}
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  > 
                    <span className="sr-only">Open user menu</span>
                    <span className="mr-1">{user?.email}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
                <div className="hidden group-hover:block absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Link href={user?.role === 'advertiser' ? '/advertiser/dashboard' : '/publisher/dashboard'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Dashboard
                  </Link>
                  {/* <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link> */}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className={`whitespace-nowrap text-base font-medium ${isTransparentHeader ? 'text-white hover:text-white/80' : 'text-gray-500 hover:text-gray-900'}`}>
                  Sign in
                </Link>
                <Button
                  variant={isTransparentHeader ? 'outline' : 'default'}
                  size="sm"
                  className={isTransparentHeader ? 'ml-8 border-white text-white hover:bg-white hover:text-primary' : 'ml-8'}
                  onClick={() => router.push('/signup')}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">A</span>
                  </div>
                   <span className="ml-2 text-xl font-bold text-gray-900">Abakwa</span>
                </Link>
              </div>
              <div className="-mr-2">
                <button
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
               {isAuthenticated && (user?.role === 'advertiser' || user?.role === 'publisher') && (
                <Link href={user.role === 'advertiser' ? '/advertiser/dashboard' : '/publisher/dashboard'}  onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    Dashboard
                </Link>
            )}
            </div>
            {isAuthenticated ? (
              <div className="px-5 py-4 border-t border-gray-200">
                <div className="flex items-center">
                  {/* User avatar could go here */}
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link href={user?.role === 'advertiser' ? '/advertiser/dashboard' : '/publisher/dashboard'} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    Dashboard
                  </Link>
                  {/* <Link href="/settings" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    Settings
                  </Link> */}
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-5 py-4 border-t border-gray-200">
                <Button variant="outline" className="w-full mb-2" onClick={() => { router.push('/login'); setIsMenuOpen(false); }}>
                  Sign in
                </Button>
                <Button variant="default" className="w-full" onClick={() => { router.push('/signup'); setIsMenuOpen(false); }}>
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
