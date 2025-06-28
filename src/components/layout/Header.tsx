"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const getInitials = (name?: string) => {
  if (!name) return "?";
  const names = name.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, isLoading } = useAuth(); 
  
  const pathname = usePathname();
  const router = useRouter();

  const isLandingPage = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isLandingPage) {
        setIsScrolled(window.scrollY > 50);
      } else {
        setIsScrolled(true); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLandingPage, pathname]); 

  const isTransparentHeader = isLandingPage && !isScrolled && !isMenuOpen;

  const baseNavigation = [
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
  ];

  const commonNavigation = [
    { name: 'All Ads', href: '/all-ads' },
  ];

  const getNavLinks = () => {
    let links = [];
    if (!isAuthenticated) {
      links.push(...baseNavigation);
    }
    links.push(...commonNavigation);
    if (isAuthenticated && user && (user?.role === 'advertiser' || user?.role === 'publisher')) {
      links.push({ name: 'Dashboard', href: user.role === 'advertiser' ? '/advertiser/dashboard' : '/publisher/dashboard' });
    }
    return links;
  };

  const currentNavLinks = getNavLinks();

  const handleLogout = () => {
    logout(); 
  };
  
  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isTransparentHeader ? 'bg-transparent' : 'bg-card shadow-sm border-b border-border'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <span className="sr-only">Abakwa</span>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">A</span>
              </div>
              <span className="ml-2 text-xl font-bold text-foreground">Abakwa</span>
            </Link>
          </div>

          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="rounded-md p-2 inline-flex items-center justify-center text-muted-foreground hover:bg-muted/50"
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav className="hidden md:flex space-x-10">
            {currentNavLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-muted-foreground hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {isLoading ? (
                <div className="h-10 w-24 bg-muted/50 animate-pulse rounded-md"></div>
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 focus:ring-2 focus:ring-ring">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={(user as any).avatarUrl} alt={user.name} />
                      <AvatarFallback className="bg-muted">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => router.push(user?.role === 'advertiser' ? '/advertiser/dashboard' : '/publisher/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleLogout}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login" className="whitespace-nowrap text-base font-medium text-muted-foreground hover:text-foreground">
                  Sign in
                </Link>
                <Button
                  variant="default"
                  size="sm"
                  className="ml-8"
                  onClick={() => router.push('/signup')}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg bg-card ring-1 ring-border ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">A</span>
                  </div>
                   <span className="ml-2 text-xl font-bold text-foreground">Abakwa</span>
                </Link>
              </div>
              <div className="-mr-2">
                <button
                  type="button"
                  className="bg-card rounded-md p-2 inline-flex items-center justify-center text-muted-foreground hover:bg-muted/50 focus:outline-none"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {currentNavLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-accent-foreground hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {isLoading ? (
                <div className="px-5 py-4 border-t border-border">
                     <div className="h-8 w-full bg-muted/50 animate-pulse rounded-md"></div>
                </div>
            ) : isAuthenticated && user ? (
              <div className="px-5 py-4 border-t border-border">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10">
                       <AvatarImage src={(user as any).avatarUrl} alt={user.name} />
                       <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-foreground">{user.name}</div>
                    <div className="text-sm font-medium text-muted-foreground">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link href={user?.role === 'advertiser' ? '/advertiser/dashboard' : '/publisher/dashboard'} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-accent-foreground hover:bg-accent">
                    Dashboard
                  </Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-accent-foreground hover:bg-accent">
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-5 py-4 border-t border-border">
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
