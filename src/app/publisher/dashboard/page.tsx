
"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import SelectedAdList from '@/components/publisher/SelectedAdList';
import PerformanceChart from '@/components/advertiser/PerformanceChart';
import { Ad } from '@/types/ad';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, ListChecks, BarChartHorizontal, Eye, DollarSign, Loader2, Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: 'advertiser' | 'publisher';
}

const transformBackendAdRequestToFrontendAd = (backendAdRequest: any, currentUserId: string): Ad => {
  return {
    id: String(backendAdRequest.id), // This is the Ad's ID
    name: backendAdRequest.title || 'Untitled Ad',
    description: backendAdRequest.description || 'No description available.',
    status: backendAdRequest.status as Ad['status'] || 'unknown', // Ad's own general status (e.g. active/paused by advertiser)
    format: backendAdRequest.ad_format as Ad['format'] || 'unknown',
    imageUrl: backendAdRequest.media_url || undefined,
    aiHint: backendAdRequest.ai_hint || 'advertisement', // Assuming backend might send this
    size: backendAdRequest.ad_size || 'N/A',
    
    startDate: backendAdRequest.start_date || undefined,
    endDate: backendAdRequest.end_date || undefined,
    impressions: parseInt(String(backendAdRequest.impressions), 10) || 0, // Default if not provided
    clicks: parseInt(String(backendAdRequest.clicks), 10) || 0, // Default if not provided
    ctr: backendAdRequest.ctr || '0.00%', // Default if not provided
    createdAt: backendAdRequest.created_at || new Date().toISOString(), // Ad's creation date

    advertiser: {
      name: backendAdRequest.advertiser?.name || 'Unknown Advertiser',
      id: backendAdRequest.advertiser?.id ? String(backendAdRequest.advertiser.id) : undefined,
    },
    
    request_id: String(backendAdRequest.request_id), // ID of the ad_request record
    request_status: backendAdRequest.request_status?.toLowerCase() as Ad['request_status'] || 'pending',
    publisher_id: currentUserId, // The ID of the publisher viewing this dashboard

    // Ad specific details, now available in the updated API response
    header_code: backendAdRequest.header_code || undefined,
    ad_txt_content: backendAdRequest.ad_txt_content || undefined,
    bid_strategy: backendAdRequest.bid_strategy || undefined,
    budget: backendAdRequest.budget || undefined,
    custom_width: backendAdRequest.custom_width || undefined,
    custom_height: backendAdRequest.custom_height || undefined,
    fallback_image: typeof backendAdRequest.fallback_image === 'boolean' ? backendAdRequest.fallback_image : undefined,
    header_bidding: typeof backendAdRequest.header_bidding === 'boolean' ? backendAdRequest.header_bidding : undefined,
    header_bidding_partners: backendAdRequest.header_bidding_partners || undefined,
    target_audience: backendAdRequest.target_audience || undefined,
    target_devices: backendAdRequest.target_devices || undefined,
    target_locations: backendAdRequest.target_locations || undefined,
    user_id: backendAdRequest.user_id ? String(backendAdRequest.user_id) : undefined, // Ad's original advertiser user_id
  };
};


export default function PublisherDashboardPage() {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);
  const [activeTab, setActiveTab] = useState<string>('my-ads');
  const [myAdUnits, setMyAdUnits] = useState<Ad[]>([]);
  const [loadingAdUnits, setLoadingAdUnits] = useState<boolean>(true);
  const [errorAdUnits, setErrorAdUnits] = useState<string | null>(null);
  
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [currentAdCode, setCurrentAdCode] = useState<string | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  useEffect(() => {
    const storedUserString = localStorage.getItem('user');
    if (storedUserString) {
      try {
        const parsedUser: StoredUser = JSON.parse(storedUserString);
        setCurrentUser(parsedUser);
        if (parsedUser.role !== 'publisher') {
            toast({ variant: "destructive", title: "Access Denied", description: "You must be a publisher to view this page."});
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        toast({ variant: "destructive", title: "Authentication Error", description: "Could not load user data."});
      }
    } else {
        console.warn("No user found in localStorage. Publisher dashboard may not function correctly.");
        toast({ variant: "destructive", title: "Not Logged In", description: "Please log in to view the publisher dashboard."});
    }
  }, [toast]);

  const isAuthenticatedPublisher = !!currentUser && currentUser.role === 'publisher';

  useEffect(() => {
    const fetchMyAdUnits = async () => {
      if (!currentUser || !currentUser.id) {
        setMyAdUnits([]);
        setLoadingAdUnits(false);
        return;
      }
      setLoadingAdUnits(true);
      setErrorAdUnits(null);
      try {
        const token = localStorage.getItem('token');
        // The backend should infer publisher_id from the token
        const response = await axios.get(`https://aux-backend.onrender.com/api/ad_requests`, { 
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          // If backend explicitly requires publisher_id in params:
          params: { publisher_id: currentUser.id } 
        });
        
        const backendData = Array.isArray(response.data) ? response.data : [];
        const fetchedAdUnits = backendData.map((backendAdRequest: any) => 
          transformBackendAdRequestToFrontendAd(backendAdRequest, currentUser.id)
        );
        setMyAdUnits(fetchedAdUnits);

      } catch (error: any) {
        console.error('Error fetching publisher ad units:', error);
        let errorMessage = 'Failed to load your ad units. Please try again.';
         if (error.response?.status === 401) {
             errorMessage = 'Authentication failed. Please log in again.';
        } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }
        setErrorAdUnits(errorMessage);
        toast({
            variant: "destructive",
            title: "Error Fetching Ad Units",
            description: errorMessage,
        });
      } finally {
        setLoadingAdUnits(false);
      }
    };

    if (isAuthenticatedPublisher) {
      fetchMyAdUnits();
    } else if (!currentUser && typeof window !== 'undefined') {
        setMyAdUnits([]);
        setLoadingAdUnits(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticatedPublisher, currentUser, toast]); // currentUser is needed here if its properties are used in fetch.
  
  
  const handleRemoveAdUnit = async (adUnit: Ad) => {
    alert(`Mock action: Attempting to remove/cancel ad unit: ${adUnit.name} (Request ID: ${adUnit.request_id}, Status: ${adUnit.request_status}). Backend integration needed.`);
    // Example backend integration (to be implemented on your backend):
    // try {
    //   const token = localStorage.getItem('token');
    //   if (!adUnit.request_id) {
    //     toast({ variant: "destructive", title: "Error", description: "Request ID is missing."});
    //     return;
    //   }
    //   // If 'pending', endpoint might be DELETE /api/ad_requests/{adUnit.request_id}
    //   // If 'approved' or 'active_on_site', endpoint might be POST /api/ad_requests/{adUnit.request_id}/deactivate
    //   // For this example, let's assume a generic DELETE endpoint for cancelling/removing.
    //   await axios.delete(`http://localhost:3000/api/ad_requests/${adUnit.request_id}`, { 
    //       headers: { 'Authorization': `Bearer ${token}` }
    //   });
    //   toast({ title: "Ad Unit Updated", description: `${adUnit.name} has been updated.` });
    //   setMyAdUnits((prev) => prev.filter((unit) => unit.request_id !== adUnit.request_id)); // Optimistic update
    //   // fetchMyAdUnits(); // Or re-fetch
    // } catch (error: any) {
    //   console.error("Error during ad unit removal/cancellation:", error);
    //   toast({ variant: "destructive", title: "Error", description: `Could not update ${adUnit.name}. ${error.response?.data?.message || error.message}`});
    // }
  };
  
  const handleGetAdCode = (ad: Ad) => {
    const embedCode = ad.header_code || 
    `<!-- Ad: ${ad.name} - Code not available or ad not approved. -->
<!-- Placeholder Abakwa Ad Unit -->
<div id="abakwa-ad-${ad.id}" style="width: ${ad.size?.split('x')[0] || '300'}px; height: ${ad.size?.split('x')[1] || '250'}px; border:1px solid #ccc; display:flex; align-items:center; justify-content:center; background-color:#f0f0f0;">
  <p style="font-family:sans-serif; color:#555; font-size:12px;">Abakwa Ad: ${ad.name} (${ad.size || 'N/A'})</p>
</div>
<!-- Note: A real ad script would typically be provided by the backend for approved ads. -->`;
    
    setCurrentAdCode(embedCode);
    setIsCodeModalOpen(true);
    setCodeCopied(false);
  };

  const handlePreviewAd = (ad: Ad) => {
    let previewContent = `Previewing: ${ad.name}\nFormat: ${ad.format}\nSize: ${ad.size}\nRequest Status: ${ad.request_status}`;
    if (ad.imageUrl) {
        previewContent += `\nImage: ${ad.imageUrl}`;
    }
    alert(previewContent);
  };

  const copyToClipboard = () => {
    if (currentAdCode) {
      navigator.clipboard.writeText(currentAdCode).then(() => {
        setCodeCopied(true);
        toast({ title: "Code Copied!", description: "Ad embed code copied to clipboard." });
        setTimeout(() => setCodeCopied(false), 2000); 
      }, (err) => {
        console.error('Failed to copy: ', err);
        toast({ variant: "destructive", title: "Copy Failed", description: "Could not copy code to clipboard." });
      });
    }
  };

  const approvedAdUnits = myAdUnits.filter(unit => unit.request_status === 'approved' || unit.request_status === 'active_on_site');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-16"> 
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-8 px-4 sm:px-0">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-foreground sm:text-3xl sm:truncate">
                Welcome, {currentUser?.name || 'Publisher'}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage ad units for your platform and track their performance.
              </p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-3 mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-2"><LayoutDashboard className="h-4 w-4"/>Overview</TabsTrigger>
              <TabsTrigger value="my-ads" className="flex items-center gap-2"><ListChecks className="h-4 w-4"/>My Ad Units</TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2"><BarChartHorizontal className="h-4 w-4"/>Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 px-4 sm:px-0">
              <div className="space-y-6">
                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Approved Ad Units</CardTitle>
                        <ListChecks className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">{approvedAdUnits.length}</div>
                        <p className="text-xs text-muted-foreground">Currently active or ready to use</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Impressions (Mock)</CardTitle>
                         <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">Data from your ad units (TBD)</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Estimated Revenue (Mock)</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">$0.00</div>
                        <p className="text-xs text-muted-foreground">Calculated from your ad units (TBD)</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <PerformanceChart
                    title="Top Performing Ad Units (Revenue - Mock)"
                    description="Based on estimated revenue generated on your platform"
                    data={[]}
                  />
                  <PerformanceChart
                    title="Ad Impressions by Unit (Mock)"
                    data={[]}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="my-ads" className="mt-6 px-4 sm:px-0">
              {loadingAdUnits && !currentUser ? <div className="text-center py-10"><p>Please log in to see your ad units.</p></div> :
               loadingAdUnits ? <div className="text-center py-10 flex items-center justify-center"><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading ad units...</div> : 
               errorAdUnits ? <div className="text-center py-10"><p className="text-destructive">{errorAdUnits}</p></div> :
               myAdUnits.length === 0 && isAuthenticatedPublisher ? <div className="text-center py-10"><p>No ad units requested or approved yet. Visit 'All Ads' to find ads for your platform.</p></div> :
               !isAuthenticatedPublisher ? <div className="text-center py-10"><p>Please log in as a publisher to manage your ad units.</p></div> :
              (
                <SelectedAdList 
                  ads={myAdUnits} 
                  onRemove={handleRemoveAdUnit} 
                  onGetCode={handleGetAdCode}
                  onPreview={handlePreviewAd}
                />
              )}
            </TabsContent>
            
            <TabsContent value="performance" className="mt-6 px-4 sm:px-0">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                    <CardDescription>Detailed insights for ad units on your platform.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-4 h-64 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Detailed performance charts for publisher ad units are under development.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {isCodeModalOpen && currentAdCode && (
        <Dialog open={isCodeModalOpen} onOpenChange={setIsCodeModalOpen}>
          <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Embed Ad Code</DialogTitle>
              <DialogDescription>
                Copy and paste this code into your website where you want the ad to appear.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <Textarea
                value={currentAdCode}
                readOnly
                rows={10}
                className="w-full font-mono text-sm bg-muted/50 border-border"
              />
            </div>
            <DialogFooter className="mt-6 sm:justify-end">
              <Button type="button" variant="secondary" onClick={() => setIsCodeModalOpen(false)}>
                Close
              </Button>
              <Button type="button" onClick={copyToClipboard}>
                {codeCopied ? <CheckCircle className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {codeCopied ? 'Copied!' : 'Copy Code'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

    