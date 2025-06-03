
"use client";

import React from 'react';
import { Download, ExternalLink, Trash2, PackageSearch, Clock, CheckCircle, XCircle, Info, FileCode } from 'lucide-react';
import { Ad } from '@/types/ad';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SelectedAdListProps {
  ads: Ad[];
  onRemove: (ad: Ad) => void;
  onGetCode: (ad: Ad) => void; // Renamed from onDownload
  onPreview: (ad:Ad) => void;
}

const getRequestStatusColorClass = (status?: Ad['request_status']): string => {
  switch (status?.toLowerCase()) {
    case 'approved':
    case 'active_on_site':
      return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-800/30 dark:text-green-300 dark:border-green-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-800/30 dark:text-yellow-300 dark:border-yellow-700';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-800/30 dark:text-red-300 dark:border-red-700';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700/30 dark:text-gray-400 dark:border-gray-600';
  }
};

const getRequestStatusIcon = (status?: Ad['request_status']): React.ReactNode => {
  switch (status?.toLowerCase()) {
    case 'approved':
    case 'active_on_site':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'rejected':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Info className="h-4 w-4 text-gray-500" />;
  }
};

const SelectedAdList: React.FC<SelectedAdListProps> = ({ ads, onRemove, onGetCode, onPreview }) => {

  if (ads.length === 0) {
    return (
      <Card className="text-center py-10">
        <CardHeader className="items-center">
            <PackageSearch className="h-16 w-16 text-muted-foreground mb-3" />
            <CardTitle className="text-xl">No Ad Units Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You haven't requested or selected any ad units yet.
          </p>
          <Button variant="link" className="mt-2" asChild>
            <a href="/all-ads">Browse Available Ads</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Ad Units</CardTitle>
        <CardDescription>
          Manage ad units you've requested or are displaying on your platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {ads.map((ad) => (
            <Card key={ad.request_id || ad.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 lg:w-1/4 xl:w-1/5 flex-shrink-0 bg-muted relative aspect-video md:aspect-auto">
                  <Image
                    src={ad.imageUrl || 'https://placehold.co/300x200.png?text=Ad'}
                    alt={ad.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                    data-ai-hint={ad.aiHint || "advertisement display"}
                  />
                </div>
                <div className="flex-grow p-4 md:p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                        <h4 className="text-lg font-semibold text-foreground leading-tight truncate" title={ad.name}>{ad.name}</h4>
                        <Badge className={cn("text-xs capitalize ml-2 shrink-0", getRequestStatusColorClass(ad.request_status))}>
                            {getRequestStatusIcon(ad.request_status)}
                            <span className="ml-1.5">{ad.request_status?.replace('_', ' ') || 'Unknown Status'}</span>
                        </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                        Advertiser: <span className="font-medium text-foreground/80">{ad.advertiser?.name || 'N/A'}</span>
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2" title={ad.description}>
                      {ad.description || "No description available."}
                    </p>
                     <div className="text-xs text-muted-foreground">
                        <span>Format: <Badge variant="outline" className="text-xs">{ad.format || 'N/A'}</Badge></span>
                        <span className="ml-2">Size: <Badge variant="outline" className="text-xs">{ad.size || 'N/A'}</Badge></span>
                    </div>
                    {(ad.request_status === 'approved' || ad.request_status === 'active_on_site') && ad.header_code && (
                        <div className="mt-2">
                            <p className="text-xs font-medium text-muted-foreground">Header Code Snippet:</p>
                            <pre className="mt-1 p-2 bg-muted/50 border border-border rounded-md text-xs text-foreground/80 overflow-x-auto whitespace-pre-wrap">
                                {ad.header_code.substring(0, 100)}{ad.header_code.length > 100 ? '...' : ''}
                            </pre>
                        </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-border/60">
                    {(ad.request_status === 'approved' || ad.request_status === 'active_on_site') ? (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => onGetCode(ad)}
                          disabled={!ad.header_code}
                        >
                          <FileCode className="mr-1.5 h-4 w-4" /> Get Code
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPreview(ad)}
                        >
                            <ExternalLink className="mr-1.5 h-4 w-4" /> Preview
                        </Button>
                      </>
                    ) : ad.request_status === 'pending' ? (
                       <Button
                          variant="outline"
                          size="sm"
                          disabled
                        >
                          <Clock className="mr-1.5 h-4 w-4" /> Awaiting Approval
                        </Button>
                    ) : ad.request_status === 'rejected' ? (
                         <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="border-red-500/50 text-red-600 dark:text-red-400"
                        >
                          <XCircle className="mr-1.5 h-4 w-4" /> Rejected
                        </Button>
                    ): null}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="ml-auto"
                      onClick={() => onRemove(ad)}
                      title={ad.request_status === 'pending' ? 'Cancel Request' : (ad.request_status === 'approved' || ad.request_status === 'active_on_site') ? 'Stop Using Ad' : 'Remove from list'}
                    >
                      <Trash2 className="mr-1.5 h-4 w-4" /> 
                      {ad.request_status === 'pending' ? 'Cancel' : 'Remove'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectedAdList;
