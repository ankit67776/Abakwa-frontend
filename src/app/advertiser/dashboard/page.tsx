
"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { LayoutDashboard, UploadCloud, ListChecks, BarChartHorizontal } from 'lucide-react';
import Header from '@/components/layout/Header';
import UploadAdForm from '@/components/advertiser/UploadAdForm';
import AdCard from '@/components/advertiser/AdCard';
import PerformanceChart from '@/components/advertiser/PerformanceChart';
import { Ad } from '@/types/ad';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';


const AdvertiserDashboardPage: React.FC = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [ads, setAds] = useState<Ad[]>([]);
  const [loadingAds, setLoadingAds] = useState<boolean>(true);
  const [errorAds, setErrorAds] = useState<string | null>(null);  

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [authLoading, isAuthenticated, router]);
  
  useEffect(() => {
    if (isAuthenticated) {
      const fetchAds = async () => {
        setLoadingAds(true);
        setErrorAds(null);
        try {
          // Replace with your actual API endpoint and token handling
          const token = localStorage.getItem('token');
          if (!token) {
            setErrorAds('Authentication token not found.');
            setLoadingAds(false);
            return;
          }
          // Assuming your API returns ads in a structure that can be mapped to the Ad type
          // The following is a placeholder for your actual API call
          // const response = await axios.get('http://localhost:3000/api/advertiser/ads', {
          //   headers: { 'Authorization': `Bearer ${token}` }
          // });
          // For now, using mock data similar to what was in the original component
           await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
           const mockApiResponse: any[] = [
             // This should come from your backend
              {
                id: '1', name: 'Summer Sale Banner Ad', format: 'image', status: 'Active', 
                imageUrl: 'https://placehold.co/600x400.png?text=Summer+Ad', aiHint: 'summer sale', 
                size: '728x90', startDate: '2024-07-01', endDate: '2024-07-31', 
                impressions: 120500, clicks: 3450, ctr: '2.86%', description: 'A great summer sale!', createdAt: new Date().toISOString(),
              },
              {
                id: '2', name: 'New Product Launch Video', format: 'video', status: 'Paused', 
                imageUrl: 'https://placehold.co/600x400.png?text=Product+Video', aiHint: 'product launch', 
                size: 'Responsive', startDate: '2024-06-15', endDate: '2024-08-15', 
                impressions: 75200, clicks: 1200, ctr: '1.59%', description: 'Launch video for new product.', createdAt: new Date().toISOString(),
              },
           ];
          
          setAds(mockApiResponse as Ad[]);
        } catch (error) {
          console.error('Error fetching ads:', error);
          setErrorAds('Failed to load ads. Please try again.');
        } finally {
          setLoadingAds(false);
        }
      };
      fetchAds();
    }
  }, [isAuthenticated]);

  const handleAdUpload = async (formData: FormData) => {
    console.log('Uploading ad with form data:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    // TODO: Implement actual API call for ad upload
    // For now, simulate and add to local state
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newAd: Ad = {
          id: Math.random().toString(36).substring(2, 9),
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          status: 'Under Review', // Or 'in_review' based on your Ad type status values
          imageUrl: files.length > 0 ? URL.createObjectURL(files[0]) : 'https://placehold.co/600x400.png?text=New+Ad', // Basic preview
          impressions: 0,
          clicks: 0,
          ctr: 0,
          createdAt: new Date().toISOString(),
          format: formData.get('adFormat') as Ad['format'],
          size: formData.get('adSize') as string,
        };
        const files = formData.getAll('files') as File[];
        
        setAds((prevAds) => [newAd, ...prevAds]);
        setActiveTab('my-ads'); // Switch to my ads tab after upload
        resolve();
      }, 1500);
    });
  };
  
  const handleViewAd = (ad: Ad) => {
    console.log('View ad:', ad);
    // This would open a modal or navigate to a detailed view page
    alert(`Viewing ad: ${ad.name}`);
  };
  
  const handleViewPerformance = (ad: Ad) => {
    console.log('View performance for ad:', ad.id);
    setActiveTab('performance');
    // Potentially set a state here to show performance for this specific ad
  };

  if (authLoading || (!isAuthenticated && typeof window !== 'undefined')) {
    return <div className="flex items-center justify-center min-h-screen">Loading dashboard...</div>;
  }
  if (!isAuthenticated) return null; // Should be handled by redirect


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-16"> {/* Added pt-16 for fixed header */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-8 px-4 sm:px-0">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-foreground sm:text-3xl sm:truncate">
                Welcome, {user?.name || 'Advertiser'}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your ad campaigns and track their performance.
              </p>
            </div>
            {/* <div className="mt-4 flex md:mt-0 md:ml-4">
              <Button>
                Connect Google Ad Manager
              </Button>
            </div> */}
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-2"><LayoutDashboard className="h-4 w-4"/>Overview</TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2"><UploadCloud className="h-4 w-4"/>Upload Ad</TabsTrigger>
              <TabsTrigger value="my-ads" className="flex items-center gap-2"><ListChecks className="h-4 w-4"/>My Ads</TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2"><BarChartHorizontal className="h-4 w-4"/>Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 px-4 sm:px-0">
              <div className="space-y-6">
                {/* Overview Cards - Simplified from user's code */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Total Impressions Card */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{ads.reduce((sum, ad) => sum + (ad.impressions || 0), 0).toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">+8.1% from last week (mock)</p>
                    </CardContent>
                  </Card>
                   {/* Total Clicks Card */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{ads.reduce((sum, ad) => sum + (ad.clicks || 0), 0).toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">+11.3% from last week (mock)</p>
                    </CardContent>
                  </Card>
                  {/* Average CTR Card */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
                      <BarChartHorizontal className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {(() => {
                            const totalImpressions = ads.reduce((sum, ad) => sum + (ad.impressions || 0), 0);
                            const totalClicks = ads.reduce((sum, ad) => sum + (ad.clicks || 0), 0);
                            return totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) + '%' : '0.00%';
                        })()}
                      </div>
                      <p className="text-xs text-muted-foreground">+3.2% from last week (mock)</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <PerformanceChart
                    title="Top Performing Ads (CTR)"
                    description="Based on click-through rate"
                    data={ads
                        .filter(ad => ad.impressions && ad.impressions > 0) // Ensure impressions exist and are not zero
                        .sort((a,b) => (typeof b.ctr === 'number' ? b.ctr : parseFloat(b.ctr || '0')) - (typeof a.ctr === 'number' ? a.ctr : parseFloat(a.ctr || '0')))
                        .slice(0,3)
                        .map((ad, i) => ({label: ad.name, value: typeof ad.ctr === 'number' ? ad.ctr : parseFloat(ad.ctr || '0'), color: `hsl(var(--chart-${(i%5)+1}))`}))
                    }
                    percentage={true}
                  />
                  <PerformanceChart
                    title="Impressions by Ad"
                     data={ads
                        .sort((a,b) => (b.impressions || 0) - (a.impressions || 0))
                        .slice(0,3)
                        .map((ad, i) => ({label: ad.name, value: ad.impressions || 0, color: `hsl(var(--chart-${(i%5)+1}))`}))
                    }
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="mt-6 px-4 sm:px-0">
              <div className="max-w-3xl mx-auto">
                <Card className="mb-5">
                  <CardHeader>
                    <CardTitle className="text-lg leading-6 font-medium text-foreground">
                      Upload New Ad
                    </CardTitle>
                    <CardDescription className="mt-2 max-w-xl text-sm text-muted-foreground">
                      Create a new ad to be displayed on publisher platforms.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Suspense fallback={<div>Loading form...</div>}>
                  <UploadAdForm onSubmit={handleAdUpload} />
                </Suspense>
              </div>
            </TabsContent>
            
            <TabsContent value="my-ads" className="mt-6 px-4 sm:px-0">
              <div>
                <div className="pb-5 sm:flex sm:items-center sm:justify-between">
                  <h3 className="text-lg leading-6 font-medium text-foreground">
                    My Ads
                  </h3>
                  {/* Search input can be added here if needed */}
                </div>
                {loadingAds ? <p>Loading ads...</p> : 
                 errorAds ? <p className="text-destructive">{errorAds}</p> :
                 ads.length === 0 ? <p>No ads uploaded yet.</p> :
                (
                  <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {ads.map((ad) => (
                      <AdCard
                        key={ad.id}
                        ad={ad}
                        onView={handleViewAd}
                        onViewPerformance={handleViewPerformance}
                        // Add onEdit, onDelete if needed
                      />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="mt-6 px-4 sm:px-0">
               <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                    <CardDescription>Detailed insights into your ad campaigns.</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    {/* Date range picker can be added here */}
                    <Button variant="outline">Export Data</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-3 mb-8">
                     {/* Stats like Total Impressions, Clicks, CTR - similar to overview */}
                  </div>
                  
                  {/* Detailed chart placeholder */}
                  <div className="mt-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-3 bg-background text-sm text-muted-foreground">Performance Over Time</span>
                      </div>
                    </div>
                    <div className="mt-4 h-64 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Interactive chart would be displayed here (e.g., using Recharts)</p>
                    </div>
                  </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <PerformanceChart
                    title="Performance by Publisher (Mock)"
                    data={[
                      { label: 'Tech Blog', value: 4.2, color: 'hsl(var(--chart-1))' },
                      { label: 'News Site', value: 3.1, color: 'hsl(var(--chart-2))'  },
                    ]}
                    percentage={true}
                  />
                  
                  <PerformanceChart
                    title="Performance by Device (Mock)"
                    data={[
                      { label: 'Mobile', value: 15000, color: 'hsl(var(--chart-3))' },
                      { label: 'Desktop', value: 8500, color: 'hsl(var(--chart-4))'  },
                    ]}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdvertiserDashboardPage;
