
"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ad } from '@/types/ad'; // Using centralized Ad type
import { Eye, BarChart2, Edit3, Trash2, CalendarDays, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdCardProps {
  ad: Ad;
  onView?: (ad: Ad) => void;
  onEdit?: (ad: Ad) => void;
  onDelete?: (adId: string) => void;
  onViewPerformance?: (ad: Ad) => void;
}

const getStatusColorClass = (status: Ad['status']): string => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'bg-green-500 text-white';
    case 'scheduled':
      return 'bg-purple-500 text-white';
    case 'paused':
      return 'bg-yellow-500 text-black';
    case 'under review':
    case 'in_review':
      return 'bg-blue-500 text-white';
    case 'ended':
      return 'bg-red-600 text-white';
    case 'draft':
    case 'selected': // From publisher dashboard
      return 'bg-gray-400 text-black';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

const AdCard: React.FC<AdCardProps> = ({ ad, onView, onEdit, onDelete, onViewPerformance }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return 'Invalid Date';
    }
  };


  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
      <CardHeader className="p-0 relative">
        <div className="w-full h-40 bg-muted flex items-center justify-center">
          {ad.imageUrl || ad.thumbnailUrl ? (
            <Image
              src={ad.imageUrl || ad.thumbnailUrl || "https://placehold.co/300x160.png"}
              alt={ad.name}
              width={300}
              height={160}
              className="w-full h-full object-cover rounded-t-md"
              data-ai-hint={ad.aiHint || "advertisement"}
            />
          ) : (
            <Eye className="h-16 w-16 text-muted-foreground" /> // Placeholder icon
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 truncate" title={ad.name}>
          {ad.name}
        </CardTitle>
        <div className="flex items-center space-x-2 mb-2">
          <Badge className={cn("text-xs capitalize", getStatusColorClass(ad.status))}>
            {ad.status?.replace('_', ' ')}
          </Badge>
          {ad.format && <Badge variant="outline" className="capitalize text-xs">{ad.format}</Badge>}
        </div>
        
        <CardDescription className="text-xs text-muted-foreground line-clamp-2 mb-3" title={ad.description}>
          {ad.description || "No description available."}
        </CardDescription>

        <div className="space-y-1 text-xs text-muted-foreground">
          {ad.size && (
            <div className="flex items-center">
              <ExternalLink className="mr-1.5 h-3 w-3 text-primary/70" />
              <span>Size: {ad.size}</span>
            </div>
          )}
          {(ad.startDate || ad.endDate) && (
            <div className="flex items-center">
              <CalendarDays className="mr-1.5 h-3 w-3 text-primary/70" />
              <span>
                {formatDate(ad.startDate)} - {ad.endDate ? formatDate(ad.endDate) : 'Ongoing'}
              </span>
            </div>
          )}
          {ad.createdAt && (
             <div className="flex items-center">
                <CalendarDays className="mr-1.5 h-3 w-3 text-primary/70" />
                <span>Created: {formatDate(ad.createdAt)}</span>
            </div>
          )}
        </div>

        {(ad.impressions !== undefined || ad.clicks !== undefined || ad.ctr !== undefined) && (
          <>
            <hr className="my-2 border-border" />
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <p className="font-semibold text-foreground">{ad.impressions?.toLocaleString() ?? 'N/A'}</p>
                <p className="text-muted-foreground">Impressions</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">{ad.clicks?.toLocaleString() ?? 'N/A'}</p>
                <p className="text-muted-foreground">Clicks</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">{typeof ad.ctr === 'number' ? `${ad.ctr.toFixed(2)}%` : (ad.ctr || 'N/A')}</p>
                <p className="text-muted-foreground">CTR</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="p-3 border-t bg-secondary/20">
        <div className="flex w-full justify-between items-center gap-2">
          {onView && (
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onView(ad)}>
              <Eye className="mr-1.5 h-3.5 w-3.5" /> View
            </Button>
          )}
          {onEdit && (
             <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(ad)}>
              <Edit3 className="mr-1.5 h-3.5 w-3.5" /> Edit
            </Button>
          )}
          {onViewPerformance && (
            <Button variant="default" size="sm" className="flex-1" onClick={() => onViewPerformance(ad)}>
              <BarChart2 className="mr-1.5 h-3.5 w-3.5" /> Performance
            </Button>
          )}
           {onDelete && (
            <Button variant="destructive" size="sm" className="flex-1" onClick={() => onDelete(ad.id)}>
              <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Delete
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdCard;
