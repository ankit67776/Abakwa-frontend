
"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { LayoutDashboard, UploadCloud, ListChecks, BarChartHorizontal, Eye, Activity, MailQuestion, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import UploadAdForm from '@/components/advertiser/UploadAdForm';
import AdCard from '@/components/advertiser/AdCard';
import AdRequestCard from '@/components/advertiser/AdRequestCard'; // New component
import PerformanceChart from '@/components/advertiser/PerformanceChart';
import type { Ad, AdRequest } from '@/types/ad'; // AdRequest type added
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: 'advertiser' | 'publisher';
}

const transformBackendAdToFrontendAd = (backendAd: any, currentUserName: string): Ad => {
  return {
    id: String(backendAd.id),
    name: backendAd.title || 'Untitled Ad',
    description: backendAd.description || 'No description available.',
    status: (backendAd.status?.toLowerCase() || 'unknown') as Ad['status'],
    format: (backendAd.ad_format || 'unknown') as Ad['format'],
    imageUrl: backendAd.media_url || undefined,
    aiHint: backendAd.aiHint || 'advertisement',
    size: backendAd.ad_size || 'N/A',
    startDate: backendAd.start_date || undefined,
    endDate: backendAd.end_date || undefined,
    impressions: parseInt(String(backendAd.impressions), 10) || 0,
    clicks: parseInt(String(backendAd.clicks), 10) || 0,
    ctr: backendAd.ctr || '0.00%',
    createdAt: backendAd.created_at || new Date().toISOString(),
    advertiser: {
      name: currentUserName,
      id: String(backendAd.user_id)
    },
    ad_txt_content: backendAd.ad_txt_content,
    bid_strategy: backendAd.bid_strategy,
    budget: backendAd.budget,
    custom_height: backendAd.custom_height,
    custom_width: backendAd.custom_width,
    fallback_image: typeof backendAd.fallback_image === 'boolean' ? backendAd.fallback_image : (String(backendAd.fallback_image).toLowerCase() === 'true'),
    header_bidding: typeof backendAd.header_bidding === 'boolean' ? backendAd.header_bidding : (String(backendAd.header_bidding).toLowerCase() === 'true'),
    header_bidding_partners: backendAd.header_bidding_partners,
    header_code: backendAd.header_code,
    target_audience: backendAd.target_audience,
    target_devices: backendAd.target_devices,
    target_locations: backendAd.target_locations,
    title: backendAd.title,
  };
};

const transformBackendAdRequestData = (backendRequest: any): AdRequest => {
  return {
    requestId: String(backendRequest.id), 
    requestStatus: (backendRequest.status?.toLowerCase() || 'pending') as AdRequest['requestStatus'],
    requestedAt: backendRequest.created_at || new Date().toISOString(), 
    ad: {
      id: String(backendRequest.ad.id),
      name: backendRequest.ad.title || 'Untitled Ad',
      imageUrl: backendRequest.ad.media_url || undefined,
      description: backendRequest.ad.description || 'No description',
      format: (backendRequest.ad.ad_format || 'unknown') as Ad['format'],
      size: backendRequest.ad.ad_size || 'N/A',
    },
    publisher: {
      id: String(backendRequest.publisher.id),
      name: backendRequest.publisher.name || 'Unknown Publisher',
      email: backendRequest.publisher.email || undefined,
    },
  };
};

const AdvertiserDashboardPage: React.FC = () => {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [ads, setAds] = useState<Ad[]>([]);
  const [loadingAds, setLoadingAds] = useState<boolean>(true);
  const [errorAds, setErrorAds] = useState<string | null>(null);

  const [adRequests, setAdRequests] = useState<AdRequest[]>([]);
  const [loadingAdRequests, setLoadingAdRequests] = useState<boolean>(false);
  const [errorAdRequests, setErrorAdRequests] = useState<string | null>(null);
  const [processingRequestId, setProcessingRequestId] = useState<string | null>(null);


  useEffect(() => {
    const storedUserString = localStorage.getItem('user');
    if (storedUserString) {
      try {
        const parsedUser: StoredUser = JSON.parse(storedUserString);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);

  const isAuthenticated = !!currentUser;

  useEffect(() => {
    const fetchAds = async () => {
      if (!currentUser || !currentUser.id) {
        setAds([]);
        setLoadingAds(false);
        return;
      }
      setLoadingAds(true);
      setErrorAds(null);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://45.33.103.32:3000/api/ads`, {
          params: { advertiserId: currentUser.id },
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const fetchedAds = response.data.map((backendAd: any) =>
          transformBackendAdToFrontendAd(backendAd, currentUser.name)
        );
        setAds(fetchedAds);
      } catch (error: any) {
        console.error('Error fetching ads:', error);
        let errMsg = 'Failed to load your ads. Please try again.';
        if (axios.isAxiosError(error) && error.response?.status === 401) errMsg = 'Authentication failed. Please log in again.';
        setErrorAds(errMsg);
        toast({ variant: "destructive", title: "Error Fetching Ads", description: errMsg });
      } finally {
        setLoadingAds(false);
      }
    };

    if (isAuthenticated && currentUser?.role === 'advertiser') {
      fetchAds();
    } else {
      setAds([]);
      setLoadingAds(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    const fetchAdRequests = async () => {
      if (!currentUser || !currentUser.id || currentUser.role !== 'advertiser') {
        setAdRequests([]);
        setLoadingAdRequests(false);
        return;
      }
      setLoadingAdRequests(true);
      setErrorAdRequests(null);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://45.33.103.32:3000/api/ad_requests`, {
           params: { advertiser_id: currentUser.id }, 
           headers: { 'Authorization': `Bearer ${token}` },
        });
        
        const backendData = Array.isArray(response.data) ? response.data : [];
        const fetchedRequests = backendData.map(transformBackendAdRequestData);
        setAdRequests(fetchedRequests.filter(req => req.requestStatus === 'pending'));
      } catch (error: any) {
        console.error('Error fetching ad requests for advertiser:', error);
        let errMsg = 'Failed to load ad requests. Please try again.';
        if (axios.isAxiosError(error) && error.response?.status === 401) errMsg = 'Authentication failed for ad requests.';
        else if (axios.isAxiosError(error) && error.response?.data?.message) errMsg = error.response.data.message;
        setErrorAdRequests(errMsg);
        toast({ variant: "destructive", title: "Error Fetching Ad Requests", description: errMsg });
      } finally {
        setLoadingAdRequests(false);
      }
    };

    if (isAuthenticated && activeTab === 'ad-requests' && currentUser?.role === 'advertiser') {
      fetchAdRequests();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, currentUser, activeTab]);


  const handleAdUpload = (formData: FormData) => {
    return new Promise<void>(async (resolve, reject) => {
      if (!currentUser) {
        toast({ variant: "destructive", title: "Upload Failed", description: "User not logged in."});
        reject(new Error("User not logged in."));
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://45.33.103.32:3000/api/ads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        const newFrontendAd = transformBackendAdToFrontendAd(response.data, currentUser.name);
        setAds((prevAds) => [newFrontendAd, ...prevAds]);
        setActiveTab('my-ads');
        toast({ title: "Ad Uploaded!", description: `${newFrontendAd.name} has been successfully submitted.` });
        resolve();
      } catch (error: any) {
        console.error('Failed to save ad:', error);
        const errMsg = axios.isAxiosError(error) && error.response?.data?.message ? error.response.data.message : error.message || "Error saving ad.";
        toast({ variant: "destructive", title: "Upload Failed", description: errMsg });
        reject(error);
      }
    });
  };

  const handleViewAd = (ad: Ad) => alert(`Viewing ad: ${ad.name}`);
  const handleViewPerformance = (ad: Ad) => setActiveTab('performance');

  const handleApproveRequest = async (requestId: string) => {
    setProcessingRequestId(requestId);
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://45.33.103.32:3000/api/ad_requests/${requestId}/approve`, {}, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setAdRequests(prev => prev.map(req => req.requestId === requestId ? { ...req, requestStatus: 'approved' } : req).filter(req => req.requestStatus === 'pending'));
      toast({ title: "Request Approved", description: `Request ID ${requestId} has been approved.` });
    } catch (error: any) {
      console.error('Error approving request:', error);
      const errMsg = axios.isAxiosError(error) && error.response?.data?.message ? error.response.data.message : "Failed to approve request.";
      toast({ variant: "destructive", title: "Approval Failed", description: errMsg });
    } finally {
      setProcessingRequestId(null);
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    setProcessingRequestId(requestId);
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://45.33.103.32:3000/api/ad_requests/${requestId}/reject`, {}, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setAdRequests(prev => prev.map(req => req.requestId === requestId ? { ...req, requestStatus: 'rejected' } : req).filter(req => req.requestStatus === 'pending'));
      toast({ title: "Request Rejected", description: `Request ID ${requestId} has been rejected.`, variant: "destructive" });
    } catch (error: any) {
      console.error('Error rejecting request:', error);
      const errMsg = axios.isAxiosError(error) && error.response?.data?.message ? error.response.data.message : "Failed to reject request.";
      toast({ variant: "destructive", title: "Rejection Failed", description: errMsg });
    } finally {
      setProcessingRequestId(null);
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-8 px-4 sm:px-0">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-foreground sm:text-3xl sm:truncate">
                Welcome, {currentUser?.name || 'Advertiser'}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your ad campaigns and track their performance.
              </p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-2"><LayoutDashboard className="h-4 w-4"/>Overview</TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2"><UploadCloud className="h-4 w-4"/>Upload Ad</TabsTrigger>
              <TabsTrigger value="my-ads" className="flex items-center gap-2"><ListChecks className="h-4 w-4"/>My Ads</TabsTrigger>
              <TabsTrigger value="ad-requests" className="flex items-center gap-2"><MailQuestion className="h-4 w-4"/>Ad Requests</TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2"><BarChartHorizontal className="h-4 w-4"/>Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 px-4 sm:px-0">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{ads.reduce((sum, ad) => sum + (ad.impressions || 0), 0).toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">Data from your ads</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                       <Activity className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{ads.reduce((sum, ad) => sum + (ad.clicks || 0), 0).toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">Data from your ads</p>
                    </CardContent>
                  </Card>
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
                            const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100) : 0;
                            return `${avgCtr.toFixed(2)}%`;
                        })()}
                      </div>
                      <p className="text-xs text-muted-foreground">Calculated from your ads</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                   <PerformanceChart
                    title="Top Performing Ads (CTR)"
                    description="Based on click-through rate"
                    data={ads
                        .filter(ad => ad.impressions && ad.impressions > 0 && typeof ad.ctr === 'string' && parseFloat(ad.ctr.replace('%','')) > 0)
                        .sort((a,b) => parseFloat(String(b.ctr).replace('%','')) - parseFloat(String(a.ctr).replace('%','')))
                        .slice(0,3)
                        .map((ad, i) => ({label: ad.name, value: parseFloat(String(ad.ctr).replace('%','')), color: `hsl(var(--chart-${(i%5)+1}))`}))
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
                <div className="mb-5">
                    <h2 className="text-2xl font-semibold leading-6 text-foreground">Upload New Ad</h2>
                    <p className="mt-2 max-w-xl text-sm text-muted-foreground">Create a new ad for publisher platforms.</p>
                </div>
                <Suspense fallback={<div>Loading form...</div>}>
                  <UploadAdForm onSubmit={handleAdUpload} />
                </Suspense>
              </div>
            </TabsContent>

            <TabsContent value="my-ads" className="mt-6 px-4 sm:px-0">
              <div>
                <div className="pb-5 sm:flex sm:items-center sm:justify-between">
                  <h3 className="text-lg leading-6 font-medium text-foreground">My Ads</h3>
                </div>
                {loadingAds && !currentUser ? <div className="text-center py-10"><p>Please log in to see your ads.</p></div> :
                 loadingAds ? <div className="text-center py-10"><Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" /></div> :
                 errorAds ? <div className="text-center py-10"><p className="text-destructive">{errorAds}</p></div> :
                 ads.length === 0 ? <div className="text-center py-10"><p>No ads uploaded yet.</p></div> :
                (
                  <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {ads.map((ad) => (
                      <AdCard
                        key={ad.id}
                        ad={ad}
                        onView={handleViewAd}
                        onViewPerformance={handleViewPerformance}
                      />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="ad-requests" className="mt-6 px-4 sm:px-0">
              <Card>
                <CardHeader>
                  <CardTitle>Incoming Ad Requests</CardTitle>
                  <CardDescription>Review and manage requests from publishers to use your ad units. Only pending requests are shown here.</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingAdRequests ? (
                    <div className="text-center py-10"><Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" /></div>
                  ) : errorAdRequests ? (
                    <div className="text-center py-10 text-destructive"><p>{errorAdRequests}</p></div>
                  ) : adRequests.length === 0 ? (
                    <div className="text-center py-10"><p>No pending ad requests.</p></div>
                  ) : (
                    <div className="space-y-4">
                      {adRequests.map((request) => (
                        <AdRequestCard
                          key={request.requestId}
                          request={request}
                          onApprove={handleApproveRequest}
                          onReject={handleRejectRequest}
                          isProcessing={processingRequestId === request.requestId}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="mt-6 px-4 sm:px-0">
               <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                    <CardDescription>Detailed insights into your ad campaign performance.</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <Button variant="outline">Export Data</Button>
                  </div>
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
                      <p className="text-muted-foreground">Interactive chart would be displayed here</p>
                    </div>
                  </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <PerformanceChart title="Performance by Publisher (Mock)" data={[]} percentage={true} />
                  <PerformanceChart title="Performance by Device (Mock)" data={[]} />
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

      
