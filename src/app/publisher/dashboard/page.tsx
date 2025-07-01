
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/layout/Header';
import SelectedAdList from '@/components/publisher/SelectedAdList';
import type { Ad } from '@/types/ad';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, ListChecks, BarChart3, Eye, DollarSign, Loader2, Copy, CheckCircle, Users, LineChart as LineChartIcon, Map as MapIcon, GanttChart, View, ListTree, TrendingUp, PieChart, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

// Analytics Components
import ReportHeader from '@/components/publisher/analytics/ReportHeader';
import StatCard from '@/components/publisher/analytics/StatCard';
import UsersOverTimeChart from '@/components/publisher/analytics/UsersOverTimeChart';
import UsersByChannelChart from '@/components/publisher/analytics/UsersByChannelChart';
import SessionsByChannelTable from '@/components/publisher/analytics/SessionsByChannelTable';
import UsersByCountryCard from '@/components/publisher/analytics/UsersByCountryCard';
import UserActivitySmallLineChart from '@/components/publisher/analytics/UserActivitySmallLineChart';
import UserActivityByCohortChart from '@/components/publisher/analytics/UserActivityByCohortChart';
import ViewsByPageTable from '@/components/publisher/analytics/ViewsByPageTable';
import EventCountTable from '@/components/publisher/analytics/EventCountTable';
import LtvByChannelChart from '@/components/publisher/analytics/LtvByChannelChart';
import AnalyticsPlaceholderCard from '@/components/publisher/analytics/AnalyticsPlaceholderCard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: 'advertiser' | 'publisher';
  ga_property_id?: string;
}

// Interface for the analytics data fetched from the backend
interface AnalyticsData {
  stats: {
    activeUsers: string;
    newUsers: string;
    averageEngagementTime: string;
    activeUsersLast30Mins?: string; 
  };
  usersOverTime: { date: string; users: number }[];
  usersByChannel?: { channel: string; users: number; fill: string }[];
  sessionsByChannel?: { headers: string[]; rows: (string | number)[][]; columnAlignments?: ('left' | 'right' | 'center')[] };
  usersByCountry?: { name: string; users: number; code: string }[];
  userActivity?: { period: string; users: number, fill: string }[];
  userActivityByCohort?: { cohortData: { week: string; values: (number | null)[] }[] };
  viewsByPage?: { headers: string[]; rows: (string | number)[][]; columnAlignments?: ('left' | 'right' | 'center')[] };
  eventCountByName?: { headers: string[]; rows: (string | number)[][]; columnAlignments?: ('left' | 'right' | 'center')[] };
  ltvByChannel?: { channel: string; value: number; fill: string }[];
}


const transformBackendAdRequestToFrontendAd = (backendAdRequest: any, currentUserId: string): Ad => {
  return {
    id: String(backendAdRequest.id), 
    name: backendAdRequest.title || 'Untitled Ad',
    description: backendAdRequest.description || 'No description available.',
    status: backendAdRequest.status as Ad['status'] || 'unknown', 
    format: backendAdRequest.ad_format as Ad['format'] || 'unknown',
    imageUrl: backendAdRequest.media_url || undefined,
    aiHint: backendAdRequest.ai_hint || 'advertisement', 
    size: backendAdRequest.ad_size || 'N/A',
    
    startDate: backendAdRequest.start_date || undefined,
    endDate: backendAdRequest.end_date || undefined,
    impressions: parseInt(String(backendAdRequest.impressions), 10) || 0,
    clicks: parseInt(String(backendAdRequest.clicks), 10) || 0, 
    ctr: backendAdRequest.ctr || '0.00%', 
    createdAt: backendAdRequest.created_at || new Date().toISOString(),

    advertiser: {
      name: backendAdRequest.advertiser?.name || 'Unknown Advertiser',
      id: backendAdRequest.advertiser?.id ? String(backendAdRequest.advertiser.id) : undefined,
    },
    
    request_id: String(backendAdRequest.request_id), 
    request_status: backendAdRequest.request_status?.toLowerCase() as Ad['request_status'] || 'pending',
    publisher_id: currentUserId, 

    header_code: backendAdRequest.header_code || undefined,
    ad_txt_content: backendAdRequest.ad_txt_content || undefined,
    bid_strategy: backendAdRequest.bid_strategy || undefined,
    budget: backendAdRequest.budget || undefined,
    custom_width: backendAdRequest.custom_width || undefined,
    custom_height: backendAdRequest.custom_height || undefined,
    fallback_image: typeof backendAdRequest.fallback_image === 'boolean' ? backendAdRequest.fallback_image : (String(backendAdRequest.fallback_image).toLowerCase() === 'true'),
    header_bidding: typeof backendAdRequest.header_bidding === 'boolean' ? backendAdRequest.header_bidding : (String(backendAdRequest.header_bidding).toLowerCase() === 'true'),
    header_bidding_partners: backendAdRequest.header_bidding_partners || undefined,
    target_audience: backendAdRequest.target_audience || undefined,
    target_devices: backendAdRequest.target_devices || undefined,
    target_locations: backendAdRequest.target_locations || undefined,
    user_id: backendAdRequest.user_id ? String(backendAdRequest.user_id) : undefined, 
    title: backendAdRequest.title
  };
};

export default function PublisherDashboardPage() {
  const { toast } = useToast();
  const { user: authUser, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);
  const [activeTab, setActiveTab] = useState<string>('my-ads');
  const [myAdUnits, setMyAdUnits] = useState<Ad[]>([]);
  const [loadingAdUnits, setLoadingAdUnits] = useState<boolean>(true);
  const [errorAdUnits, setErrorAdUnits] = useState<string | null>(null);
  
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [currentAdCode, setCurrentAdCode] = useState<string | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  // State for analytics data
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState<boolean>(false);
  const [errorAnalytics, setErrorAnalytics] = useState<string | null>(null);


  useEffect(() => {
    if (!isAuthLoading) {
      if (!isAuthenticated) {
        router.push('/login?message=login_required');
      } else if (authUser?.role !== 'publisher') {
        toast({ variant: "destructive", title: "Access Denied", description: "You do not have permission to view this page." });
        if (authUser?.role === 'advertiser') {
            router.push('/advertiser/dashboard');
        } else {
            router.push('/'); 
        }
      } else {
        setCurrentUser(authUser);
      }
    }
  }, [isAuthLoading, isAuthenticated, authUser, router, toast]);

  const fetchAnalyticsData = useCallback(async () => {
    if (!API_BASE_URL) {
      setErrorAnalytics("API URL not configured. Cannot fetch analytics.");
      toast({ variant: "destructive", title: "Configuration Error", description: "API URL is missing." });
      return;
    }
    setLoadingAnalytics(true);
    setErrorAnalytics(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/publisher/analytics-snapshot`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = response.data;
      
      // Process date format for usersOverTime chart
      if (data.usersOverTime) {
        data.usersOverTime.sort((a: {date: string}, b: {date: string}) => a.date.localeCompare(b.date));
        data.usersOverTime = data.usersOverTime.map((item: {date: string, users: number}) => ({
          ...item,
          date: new Date(
            parseInt(item.date.substring(0, 4)),
            parseInt(item.date.substring(4, 6)) - 1,
            parseInt(item.date.substring(6, 8))
          ).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }));
      }

      setAnalyticsData(data);
    } catch (error: any) {
      console.error('Error fetching analytics data:', error);
      const errorMessage = error.response?.data?.message || 'Failed to load analytics data. Please try again.';
      setErrorAnalytics(errorMessage);
      toast({ variant: "destructive", title: "Analytics Error", description: errorMessage });
    } finally {
      setLoadingAnalytics(false);
    }
  }, [toast]);

  useEffect(() => {
    if (activeTab === 'performance' && !analyticsData) {
      fetchAnalyticsData();
    }
  }, [activeTab, analyticsData, fetchAnalyticsData]);


  useEffect(() => {
    const fetchMyAdUnits = async () => {
      if (!currentUser || !currentUser.id || !API_BASE_URL) {
        setMyAdUnits([]);
        setLoadingAdUnits(false);
        if (!API_BASE_URL && currentUser) toast({ variant: "destructive", title: "Configuration Error", description: "API URL is missing." });
        return;
      }
      setLoadingAdUnits(true);
      setErrorAdUnits(null);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/requests`, { 
          headers: {
            'Authorization': `Bearer ${token}`,
          },
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
         if (axios.isAxiosError(error) && error.response?.status === 401) {
             errorMessage = 'Authentication failed. Please log in again.';
        } else if (axios.isAxiosError(error) && error.response?.data?.message) {
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

    if (currentUser?.role === 'publisher') {
      fetchMyAdUnits();
    }
  }, [currentUser, toast]); 
  
  const handleRemoveAdUnit = async (adUnit: Ad) => {
    alert(`Mock action: Attempting to remove/cancel ad unit: ${adUnit.name} (Request ID: ${adUnit.request_id}, Status: ${adUnit.request_status}). Backend integration needed.`);
  };
  
  const handleGetAdCode = (ad: Ad) => {
    const embedCode = ad.header_code || 
    `<!-- Ad: ${ad.name} (${ad.format || 'N/A'}, ${ad.size || 'N/A'}) -->...`;
    setCurrentAdCode(embedCode);
    setIsCodeModalOpen(true);
    setCodeCopied(false);
  };

  const handlePreviewAd = (ad: Ad) => {
    alert(`Previewing: ${ad.name}`);
  };

  const copyToClipboard = () => {
    if (currentAdCode) {
      navigator.clipboard.writeText(currentAdCode).then(() => {
        setCodeCopied(true);
        toast({ title: "Code Copied!", description: "Ad embed code copied to clipboard." });
        setTimeout(() => setCodeCopied(false), 2000); 
      }, (err) => {
        console.error('Failed to copy code: ', err);
        toast({ variant: "destructive", title: "Copy Failed", description: "Could not copy code to clipboard." });
      });
    }
  };

  const approvedAdUnits = myAdUnits.filter(unit => unit.request_status === 'approved' || unit.request_status === 'active_on_site');

  if (isAuthLoading || !currentUser || currentUser.role !== 'publisher') {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          {isAuthLoading ? <Loader2 className="h-16 w-16 animate-spin text-primary" /> : null}
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-16"> 
        <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8"> 
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
              <TabsTrigger value="performance" className="flex items-center gap-2"><BarChart3 className="h-4 w-4"/>Performance</TabsTrigger>
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
                        <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
                         <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">{analyticsData?.stats?.activeUsers || '...'}</div>
                        <p className="text-xs text-muted-foreground">From your GA data</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Estimated Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">${'0.00'}</div>
                        <p className="text-xs text-muted-foreground">Calculated from your ad units</p>
                        </CardContent>
                    </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="my-ads" className="mt-6 px-4 sm:px-0">
              {loadingAdUnits ? <div className="text-center py-10 flex items-center justify-center"><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading ad units...</div> : 
               errorAdUnits ? <div className="text-center py-10"><p className="text-destructive">{errorAdUnits}</p></div> :
               myAdUnits.length === 0 ? <div className="text-center py-10"><p>No ad units requested or approved yet. Visit 'All Ads' to find ads for your platform.</p></div> :
              (
                <SelectedAdList 
                  ads={myAdUnits} 
                  onRemove={handleRemoveAdUnit} 
                  onGetCode={handleGetAdCode}
                  onPreview={handlePreviewAd}
                />
              )}
            </TabsContent>
            
            <TabsContent value="performance" className="mt-2 p-2 md:p-4 lg:p-6 bg-muted/30 rounded-lg">
              {loadingAnalytics ? (
                  <div className="flex flex-col items-center justify-center h-96">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">Fetching your analytics data...</p>
                  </div>
              ) : errorAnalytics ? (
                  <div className="flex flex-col items-center justify-center h-96 bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                    <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                    <h3 className="text-xl font-semibold text-destructive">Could Not Load Analytics</h3>
                    <p className="mt-2 text-sm text-destructive/80 text-center">{errorAnalytics}</p>
                    <Button variant="outline" size="sm" className="mt-6" onClick={fetchAnalyticsData}>
                      <RefreshCw className="mr-2 h-4 w-4" /> Try Again
                    </Button>
                  </div>
              ) : analyticsData ? (
                <>
                  <ReportHeader title="Reports snapshot" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
                    <StatCard title="Active users" value={analyticsData.stats.activeUsers} icon={<Users className="text-blue-500" />} />
                    <StatCard title="New users" value={analyticsData.stats.newUsers} icon={<Users className="text-green-500" />} />
                    <StatCard title="Average engagement time" value={analyticsData.stats.averageEngagementTime} icon={<LineChartIcon className="text-purple-500" />} />
                    <StatCard title="Active users in last 30 minutes" value={analyticsData.stats.activeUsersLast30Mins || '0'} subtitle="ACTIVE USERS PER MINUTE" smallBarValue={Number(analyticsData.stats.activeUsersLast30Mins || '0') > 0 ? 1 : 0} icon={<LineChartIcon className="text-orange-500" />} />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
                    <div className="lg:col-span-2">
                      <UsersOverTimeChart data={analyticsData.usersOverTime} />
                    </div>
                    <AnalyticsPlaceholderCard title="Insights" message="Stay connected to your business on the go." icon={<TrendingUp />} />
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
                    <UsersByChannelChart data={analyticsData.usersByChannel || []} title="New users by First user primary channel group" />
                    <SessionsByChannelTable title="Sessions by Session primary channel group" data={analyticsData.sessionsByChannel || { headers: [], rows: [] }} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
                    <UsersByCountryCard title="Active users by Country" countryData={analyticsData.usersByCountry || []} />
                    <UserActivitySmallLineChart title="User activity over time" data={analyticsData.userActivity || []} />
                    <UserActivityByCohortChart title="User activity by cohort" cohortData={analyticsData.userActivityByCohort?.cohortData || []} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
                    <ViewsByPageTable title="Views by Page title and screen class" data={analyticsData.viewsByPage || { headers: [], rows: [] }} />
                    <EventCountTable title="Event count by Event name" data={analyticsData.eventCountByName || { headers: [], rows: [] }} />
                    <AnalyticsPlaceholderCard title="Key events by Event name" message="No data available" icon={<ListTree />} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
                    <LtvByChannelChart title="Average LTV by First user primary channel group" data={analyticsData.ltvByChannel || []} />
                    <AnalyticsPlaceholderCard title="Items purchased by Item name" message="No data available" icon={<DollarSign />} />
                    <AnalyticsPlaceholderCard title="Key events by Platform" message="No data available" isDonutPlaceholder={true} icon={<PieChart />} />
                  </div>
                </>
              ) : (
                 <div className="flex justify-center items-center h-96"><p>Select the performance tab to load data.</p></div>
              )}
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
