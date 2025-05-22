
"use client";

import React from 'react';
import { Download, ExternalLink, Trash2, PackageSearch } from 'lucide-react';
import { Ad } from '@/types/ad'; // Using centralized Ad type
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

interface SelectedAdListProps {
  ads: Ad[];
  onRemove: (adId: string) => void;
  onDownload?: (ad: Ad) => void; // Made optional as per original code
  onPreview?: (ad:Ad) => void; // Added for consistency
}

const SelectedAdList: React.FC<SelectedAdListProps> = ({ ads, onRemove, onDownload, onPreview }) => {
  const downloadCode = (ad: Ad) => {
    // In a real app, this would generate appropriate code for the publisher to embed
    const embedCode = `
<!-- Abakwa Ad Unit: ${ad.name} -->
<div id="abakwa-ad-${ad.id}" style="width: ${ad.size?.split('x')[0] || '300'}px; height: ${ad.size?.split('x')[1] || '250'}px;">
  <!-- Ad content for ${ad.name} will load here -->
</div>
<script src="https://cdn.abakwa.com/ads/${ad.id}.js" async></script>
<noscript>Please enable JavaScript to view the <a href="https://abakwa.com">Abakwa ad</a>.</noscript>
`;
    
    const element = document.createElement('a');
    const file = new Blob([embedCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `abakwa-ad-${ad.id}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    if (onDownload) {
        onDownload(ad);
    }
  };

  if (ads.length === 0) {
    return (
      <Card className="text-center">
        <CardHeader>
            <PackageSearch className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
            <CardTitle>No Ads Selected</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Get started by selecting ads from the marketplace to display on your platform.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Selected Ads</CardTitle>
        <CardDescription>
          Ads you&apos;ve chosen to display on your platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-border">
          {ads.map((ad) => (
            <li key={ad.id} className="py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center flex-grow min-w-0">
                  <div className="flex-shrink-0 h-16 w-16 sm:h-12 sm:w-12 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={ad.imageUrl || ad.thumbnailUrl || 'https://placehold.co/100x100.png?text=Ad'}
                      alt={ad.name}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                      data-ai-hint={ad.aiHint || "advertisement"}
                    />
                  </div>
                  <div className="ml-4 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate" title={ad.name}>{ad.name}</h4>
                    <div className="flex items-center mt-1">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Active</span>
                       {ad.impressions !== undefined && (
                        <>
                            <div className="mx-2 h-1 w-1 rounded-full bg-gray-300"></div>
                            <p className="text-xs text-muted-foreground">
                            {ad.impressions.toLocaleString()} impressions
                            </p>
                        </>
                       )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 flex-shrink-0 mt-2 sm:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadCode(ad)}
                  >
                    <Download className="mr-1.5 h-4 w-4" /> Code
                  </Button>
                  {onPreview && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPreview(ad)}
                    >
                        <ExternalLink className="mr-1.5 h-4 w-4" /> Preview
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onRemove(ad.id)}
                  >
                    <Trash2 className="mr-1.5 h-4 w-4" /> Remove
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SelectedAdList;
