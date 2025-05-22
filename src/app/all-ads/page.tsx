
"use client";

import React, { useEffect, useState } from 'react';
import { adsService } from '../../services/adsService'; 
import type { Ad } from '@/types/ad'; 
import Header from '@/components/layout/Header';
import { AlertCircle, Loader2, PackageSearch } from 'lucide-react'; // Added PackageSearch
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const AllAdsPage: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await adsService.getAllAds();
        setAds(data);
      } catch (err) {
        setError('Failed to load ads. Please try again later.');
        console.error("Error fetching all ads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
    };
    try {
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return "Invalid Date";
    }
  };

  const getStatusColorClass = (status?: Ad['status']): string => {
    // Use a consistent set of Tailwind classes based on the theme if possible, or define specific ones
    // For now, keeping the direct color classes to match original intent
    switch (status?.toLowerCase()) {
        case 'active': return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-800/30 dark:text-green-300 dark:border-green-700';
        case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-800/30 dark:text-yellow-300 dark:border-yellow-700';
        case 'ended': return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700/30 dark:text-gray-400 dark:border-gray-600';
        case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-800/30 dark:text-blue-300 dark:border-blue-700';
        case 'under review': case 'in_review': return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-800/30 dark:text-purple-300 dark:border-purple-700';
        case 'draft': case 'selected': return 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-800/30 dark:text-indigo-300 dark:border-indigo-700';
        default: return 'bg-muted text-muted-foreground border-border';
    }
  };


  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pt-20">
        <div className="px-4 sm:px-0 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">All Advertiser Ads</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Browse active advertising campaigns from all advertisers on the platform.
          </p>
        </div>

        {loading ? (
          <div className="mt-12 flex flex-col items-center justify-center text-muted-foreground">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg">Loading ads...</p>
          </div>
        ) : error ? (
          <div className="mt-12 bg-destructive/10 border border-destructive/30 rounded-md p-6 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-3" />
            <h3 className="text-xl font-semibold text-destructive">Error Loading Ads</h3>
            <p className="mt-2 text-sm text-destructive/80">{error}</p>
          </div>
        ) : ads.length === 0 ? (
            <div className="mt-12 text-center text-muted-foreground">
                <PackageSearch className="mx-auto h-16 w-16 mb-4" />
                <h3 className="text-xl font-semibold">No Ads Found</h3>
                <p className="mt-1">There are currently no ads to display.</p>
            </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ads.map((ad) => (
              <Card key={ad.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                <CardHeader className="p-0">
                  <div className="aspect-[16/9] bg-muted relative">
                    <Image
                      src={ad.imageUrl || ad.thumbnailUrl || 'https://placehold.co/600x338.png'} // Removed text query
                      alt={ad.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover"
                      data-ai-hint={ad.aiHint || "advertisement"}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; 
                        target.src = 'https://placehold.co/600x338.png'; // Removed text query
                      }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow flex flex-col">
                  <CardTitle className="text-lg font-semibold mb-1 truncate" title={ad.name}>{ad.name}</CardTitle>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={cn("text-xs capitalize border", getStatusColorClass(ad.status))}>
                      {ad.status?.replace('_', ' ') || 'Unknown'}
                    </Badge>
                    {ad.format && <Badge variant="outline" className="capitalize text-xs">{ad.format}</Badge>}
                  </div>
                  <CardDescription className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-grow" title={ad.description}>
                    {ad.description || "No description available."}
                  </CardDescription>
                  
                  <div className="text-xs text-muted-foreground space-y-1 mt-auto">
                    <p>By: <span className="font-medium text-foreground">{ad.advertiser?.name || 'Unknown Advertiser'}</span></p>
                    <p>Size: <span className="font-medium text-foreground">{ad.size || 'N/A'}</span></p>
                    <p>Created: <span className="font-medium text-foreground">{formatDate(ad.createdAt)}</span></p>
                    {ad.startDate && <p>Runs: {formatDate(ad.startDate)} - {ad.endDate ? formatDate(ad.endDate) : 'Ongoing'}</p>}
                  </div>
                </CardContent>
                <CardFooter className="p-3 border-t bg-secondary/30 dark:bg-card/50">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs w-full">
                    <div>
                      <p className="font-semibold text-foreground">{ad.impressions?.toLocaleString() ?? 'N/A'}</p>
                      <p className="text-muted-foreground">Impressions</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{ad.clicks?.toLocaleString() ?? 'N/A'}</p>
                      <p className="text-muted-foreground">Clicks</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {typeof ad.ctr === 'number' ? `${ad.ctr.toFixed(2)}%` : (String(ad.ctr).replace('%','') || 'N/A') + (String(ad.ctr).includes('%') ? '%' : '')}
                      </p>
                      <p className="text-muted-foreground">CTR</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AllAdsPage;

    