
"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { FileText, Film, ImageIcon as AdPreviewImageIcon, AlertTriangle } from 'lucide-react';

interface AdPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  adData: {
    name: string;
    description: string;
    files: File[];
    adFormat: string;
    adSize: string;
    customWidth: string;
    customHeight: string;
    adTxtContent: string;
  };
}

const AdPreview: React.FC<AdPreviewProps> = ({ open, onOpenChange, adData }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (adData.files && adData.files.length > 0 && (adData.adFormat === 'image' || adData.adFormat === 'video')) {
      const file = adData.files[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
        setPreviewUrl(null);
      };
    }
  }, [adData.files, adData.adFormat]);

  const getPreviewSizeClasses = () => {
    if (adData.adSize === 'custom' && adData.customWidth && adData.customHeight) {
      return { width: `${adData.customWidth}px`, height: `${adData.customHeight}px` };
    }
    switch (adData.adSize) {
      case '300x250':
        return { width: '300px', height: '250px' };
      case '728x90':
        return { width: '728px', height: '90px', maxWidth: '100%' };
      case '160x600':
        return { width: '160px', height: '600px' };
      case 'responsive':
        return { width: '100%', height: 'auto', aspectRatio: '16/9' }; // Example aspect ratio
      default:
        return { width: '300px', height: '250px', border: '1px dashed hsl(var(--border))' }; // Default placeholder size
    }
  };

  const previewStyle = getPreviewSizeClasses();

  const renderPreviewContent = () => {
    switch (adData.adFormat) {
      case 'image':
        return previewUrl ? (
          <Image
            src={previewUrl}
            alt={adData.name || 'Ad Preview'}
            width={parseInt(adData.customWidth) || 300}
            height={parseInt(adData.customHeight) || 250}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            data-ai-hint="ad banner"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-muted/50 text-muted-foreground">
            <AdPreviewImageIcon className="w-16 h-16 mb-2" />
            <span>Image Preview</span>
          </div>
        );
      case 'video':
        return previewUrl ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video controls src={previewUrl} style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-muted/50 text-muted-foreground">
            <Film className="w-16 h-16 mb-2" />
            <span>Video Preview</span>
          </div>
        );
      case 'text':
        return (
          <ScrollArea className="h-full w-full">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{adData.name || 'Text Ad Headline'}</h3>
              <p className="text-sm">{adData.adTxtContent || adData.description || 'Text ad content will appear here.'}</p>
            </div>
          </ScrollArea>
        );
      case 'html5':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-muted/50 text-muted-foreground p-4 text-center">
            <FileText className="w-16 h-16 mb-2" />
            <span>HTML5 Ad Preview</span>
            <p className="text-xs mt-2">
              Actual HTML5 rendering is complex. This is a placeholder.
              {adData.files.length > 0 && ` File: ${adData.files[0].name}`}
            </p>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full bg-muted/50 text-muted-foreground">
            <AlertTriangle className="w-16 h-16 mb-2" />
            <span>Select an ad format to see a preview.</span>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Ad Preview: {adData.name || "Untitled Ad"}</DialogTitle>
          <DialogDescription>
            This is a generated preview based on the information you provided. Actual rendering may vary.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-hidden py-4">
            <Card 
              className={cn(
                "mx-auto overflow-hidden shadow-md flex items-center justify-center bg-background",
                (adData.adFormat === 'image' || adData.adFormat === 'video') && 'p-0' 
              )} 
              style={previewStyle}
            >
              <CardContent className="p-0 w-full h-full flex items-center justify-center">
                {renderPreviewContent()}
              </CardContent>
            </Card>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdPreview;
