
"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import AdBrowser from '@/components/publisher/AdBrowser';
import SelectedAdList from '@/components/publisher/SelectedAdList';
import PerformanceChart from '@/components/advertiser/PerformanceChart'; // Can be reused
import { Ad } from '@/types/ad';
// import { useAuth } from '@/hooks/useAuth'; // Auth temporarily bypassed
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Search, ListChecks, BarChartHorizontal, Eye, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

// Mock data - replace with API calls
const mockAvailableAds: Ad[] = [
  {
    id: 'pub-ad-1', name: 'EcoFriendly Water Bottles', description: 'Promote sustainable living with our new eco-friendly water bottles.', status: 'Active',
    imageUrl: 'https://placehold.co/600x400.png', aiHint: 'eco friendly', impressions: 12500, clicks: 350, ctr: 2.8, createdAt: '2023-05-15T10:30:00Z', format: 'image', size: '300x250', advertiser: { name: 'GreenCo' }
  },
  {
    id: 'pub-ad-2', name: 'Smart Home Hub Launch', description: 'Introducing the Aether Hub - control your home with voice commands.', status: 'Active',
    imageUrl: 'https://placehold.co/600x400.png', aiHint: 'smart home', impressions: 5000, clicks: 120, ctr: 2.4, createdAt: '2023-05-20T14:45:00Z', format: 'video', size: '16:9', advertiser: { name: 'TechForward' }
  },
  {
    id: 'pub-ad-3', name: 'Gourmet Coffee Subscription', description: 'Discover artisanal coffee beans delivered to your door.', status: 'Active',
    imageUrl: 'https://placehold.co/600x400.png', aiHint: 'coffee subscription', impressions: 8700, clicks: 310, ctr: 3.6, createdAt: '2023-05-10T09:15:00Z', format: 'image', size: '728x90', advertiser: { name: 'BeanMaster' }
  },
];

export default function PublisherDashboardPage() {
  // const { user, isAuthenticated, isLoading: authLoading } = useAuth(); // Auth temporarily bypassed
  const router = useRouter();
  const user = { name: "Demo User (Publisher)", role: "publisher", id: "temp-user-pub", email:"demo-pub@example.com" }; // Mock user
  const isAuthenticated = true; // Mock auth
  const authLoading = false; // Mock auth loading

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [availableAds, setAvailableAds] = useState<Ad[]>([]);
  const [selectedAds, setSelectedAds] = useState<Ad[]>([]);

  // useEffect(() => { // Auth temporarily bypassed
  //   if (!authLoading && !isAuthenticated) {
  //     router.replace('/login');
  //   }
  // }, [authLoading, isAuthenticated, router]);
  
  useEffect(() => {
    if (isAuthenticated) {
      setAvailableAds(mockAvailableAds);
    }
  }, [isAuthenticated]);
  
  const handleSelectAd = (ad: Ad) => {
    if (!selectedAds.some((selectedAd) => selectedAd.id === ad.id)) {
      setSelectedAds((prev) => [...prev, ad]);
    }
  };
  
  const handleRemoveAd = (adId: string) => {
    setSelectedAds((prev) => prev.filter((ad) => ad.id !== adId));
  };
  
  const handleDownloadAdCode = (ad: Ad) => {
    console.log('Downloading code for ad:', ad.name);
  };

  const handlePreviewAd = (ad: Ad) => {
    console.log('Previewing ad:', ad.name);
    alert(`Previewing: ${ad.name}\nFormat: ${ad.format}\nSize: ${ad.size}`);
  };


  // if (authLoading || (!isAuthenticated && typeof window !== 'undefined')) { // Auth temporarily bypassed
  //   return <div className="flex items-center justify-center min-h-screen">Loading dashboard...</div>;
  // }
  // if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-16"> 
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-8 px-4 sm:px-0">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-foreground sm:text-3xl sm:truncate">
                Welcome, {user?.name || 'Publisher'}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Find the right ads for your platform and track their performance.
              </p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-2"><LayoutDashboard className="h-4 w-4"/>Overview</TabsTrigger>
              <TabsTrigger value="browse-ads" className="flex items-center gap-2"><Search className="h-4 w-4"/>Browse Ads</TabsTrigger>
              <TabsTrigger value="my-ads" className="flex items-center gap-2"><ListChecks className="h-4 w-4"/>My Ads</TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2"><BarChartHorizontal className="h-4 w-4"/>Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 px-4 sm:px-0">
              <div className="space-y-6">
                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Ads</CardTitle>
                        <ListChecks className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">{selectedAds.length}</div>
                        <p className="text-xs text-muted-foreground">Currently running on your platform</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Impressions (Mock)</CardTitle>
                         <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">18,700</div>
                        <p className="text-xs text-muted-foreground">+12.3% from last week</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Estimated Revenue (Mock)</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">$432.89</div>
                        <p className="text-xs text-muted-foreground">+8.7% from last week</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <PerformanceChart
                    title="Top Performing Ads (Revenue)"
                    description="Based on estimated revenue generated on your platform"
                    data={[ 
                      { label: 'Eco Bottles', value: 128.45, color: 'hsl(var(--chart-1))' },
                      { label: 'Smart Hub', value: 106.20, color: 'hsl(var(--chart-2))' },
                    ]}
                  />
                  <PerformanceChart
                    title="Traffic Sources (Mock)"
                    data={[ 
                      { label: 'Direct', value: 7500, color: 'hsl(var(--chart-3))' },
                      { label: 'Social', value: 5200, color: 'hsl(var(--chart-4))' },
                    ]}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="browse-ads" className="mt-6 px-4 sm:px-0">
              <AdBrowser ads={availableAds} onSelectAd={handleSelectAd} />
            </TabsContent>
            
            <TabsContent value="my-ads" className="mt-6 px-4 sm:px-0">
              <SelectedAdList 
                ads={selectedAds} 
                onRemove={handleRemoveAd} 
                onDownload={handleDownloadAdCode}
                onPreview={handlePreviewAd}
              />
            </TabsContent>
            
            <TabsContent value="performance" className="mt-6 px-4 sm:px-0">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                    <CardDescription>Detailed insights for ads on your platform.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-4 h-64 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Detailed performance charts coming soon.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

    