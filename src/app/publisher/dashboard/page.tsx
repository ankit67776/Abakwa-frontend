
"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import AdBrowser from '@/components/publisher/AdBrowser';
import SelectedAdList from '@/components/publisher/SelectedAdList';
import PerformanceChart from '@/components/advertiser/PerformanceChart'; // Can be reused
import { Ad } from '@/types/ad';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Search, ListChecks, BarChartHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

// Mock data - replace with API calls
const mockAvailableAds: Ad[] = [
  {
    id: 'pub-ad-1', name: 'EcoFriendly Water Bottles', description: 'Promote sustainable living with our new eco-friendly water bottles.', status: 'Active',
    imageUrl: 'https://placehold.co/600x400/a2d9ce/ffffff?text=Eco+Bottles', impressions: 12500, clicks: 350, ctr: 2.8, createdAt: '2023-05-15T10:30:00Z', format: 'image', size: '300x250', advertiser: { name: 'GreenCo' }
  },
  {
    id: 'pub-ad-2', name: 'Smart Home Hub Launch', description: 'Introducing the Aether Hub - control your home with voice commands.', status: 'Active',
    imageUrl: 'https://placehold.co/600x400/85c1e9/ffffff?text=Smart+Hub', impressions: 5000, clicks: 120, ctr: 2.4, createdAt: '2023-05-20T14:45:00Z', format: 'video', size: '16:9', advertiser: { name: 'TechForward' }
  },
  {
    id: 'pub-ad-3', name: 'Gourmet Coffee Subscription', description: 'Discover artisanal coffee beans delivered to your door.', status: 'Active',
    imageUrl: 'https://placehold.co/600x400/d7bde2/ffffff?text=Coffee+Club', impressions: 8700, clicks: 310, ctr: 3.6, createdAt: '2023-05-10T09:15:00Z', format: 'image', size: '728x90', advertiser: { name: 'BeanMaster' }
  },
];

export default function PublisherDashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [availableAds, setAvailableAds] = useState<Ad[]>([]);
  const [selectedAds, setSelectedAds] = useState<Ad[]>([]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [authLoading, isAuthenticated, router]);
  
  useEffect(() => {
    if (isAuthenticated) {
      // TODO: Fetch available ads from API
      // For now, using mock data
      setAvailableAds(mockAvailableAds);
      // TODO: Fetch publisher's currently selected ads from API
    }
  }, [isAuthenticated]);
  
  const handleSelectAd = (ad: Ad) => {
    if (!selectedAds.some((selectedAd) => selectedAd.id === ad.id)) {
      setSelectedAds((prev) => [...prev, ad]);
      // TODO: API call to save this selection for the publisher
    }
  };
  
  const handleRemoveAd = (adId: string) => {
    setSelectedAds((prev) => prev.filter((ad) => ad.id !== adId));
    // TODO: API call to remove this selection for the publisher
  };
  
  const handleDownloadAdCode = (ad: Ad) => {
    console.log('Downloading code for ad:', ad.name);
    // Actual download logic is in SelectedAdList component
  };

  const handlePreviewAd = (ad: Ad) => {
    console.log('Previewing ad:', ad.name);
    // In a real app, this would open a modal with the ad preview.
    // For now, an alert or a simple display.
    alert(`Previewing: ${ad.name}\nFormat: ${ad.format}\nSize: ${ad.size}`);
  };


  if (authLoading || (!isAuthenticated && typeof window !== 'undefined')) {
    return <div className="flex items-center justify-center min-h-screen">Loading dashboard...</div>;
  }
  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-16"> {/* Added pt-16 for fixed header */}
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
            {/* <div className="mt-4 flex md:mt-0 md:ml-4">
              <Button>
                Connect Google Analytics
              </Button>
            </div> */}
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
                    data={[ // Mock data
                      { label: 'Eco Bottles', value: 128.45, color: 'hsl(var(--chart-1))' },
                      { label: 'Smart Hub', value: 106.20, color: 'hsl(var(--chart-2))' },
                    ]}
                  />
                  <PerformanceChart
                    title="Traffic Sources (Mock)"
                    data={[ // Mock data
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
                onDownload={handleDownloadAdCode} // downloadCode logic is within SelectedAdList for now
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
                     {/* Placeholder for more detailed performance stats and charts */}
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
