
"use client"; // Making it a client component for potential future client-side interactions (e.g. modals)

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { ImageIcon as AdImageIcon, Film, FileText as AdFileTextIcon, MessageSquare, Edit3, Eye, Trash2, BarChart2, MoreVertical, CalendarDays, Tag, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Ad {
  id: string;
  name: string;
  format: 'image' | 'video' | 'html5' | 'text';
  status: 'Active' | 'Paused' | 'Draft' | 'Under Review' | 'Ended' | 'Scheduled';
  imageUrl?: string;
  aiHint?: string;
  html5File?: string;
  textAdContent?: { headline: string; description: string };
  size?: string;
  startDate?: string; // Consider using Date objects for proper formatting/logic
  endDate?: string;
  impressions?: number;
  clicks?: number;
  ctr?: string;
}

interface MyAdCardProps {
  ad: Ad;
}

const getStatusVariant = (status: Ad['status']): React.ComponentProps<typeof Badge>['variant'] => {
  switch (status) {
    case 'Active':
      return 'default'; // Uses primary color (blue)
    case 'Scheduled':
      return 'secondary'; // Uses a muted purple/blue if you customize it or gray
    case 'Paused':
      return 'outline'; // Yellowish if you map it, or gray
    case 'Ended':
      return 'destructive';
    case 'Under Review':
    case 'Draft':
    default:
      return 'secondary';
  }
};

const getStatusColorClass = (status: Ad['status']): string => {
  switch (status) {
    case 'Active':
      return 'bg-green-500 text-white';
    case 'Scheduled':
      return 'bg-purple-500 text-white';
    case 'Paused':
      return 'bg-yellow-500 text-black';
    case 'Under Review':
      return 'bg-blue-500 text-white';
    case 'Ended':
      return 'bg-red-600 text-white'; // Using destructive-foreground
    case 'Draft':
      return 'bg-gray-400 text-black';
    default:
      return 'bg-muted text-muted-foreground';
  }
}


const MyAdCard: React.FC<MyAdCardProps> = ({ ad }) => {
  const renderPreview = () => {
    const commonClasses = "w-full h-40 object-cover rounded-t-md bg-muted flex items-center justify-center";
    const iconClasses = "h-16 w-16 text-muted-foreground";

    switch (ad.format) {
      case 'image':
        return ad.imageUrl ? (
          <Image
            src={ad.imageUrl}
            alt={ad.name}
            width={300}
            height={160}
            className={commonClasses}
            data-ai-hint={ad.aiHint || "advertisement"}
          />
        ) : (
          <div className={cn(commonClasses, "bg-secondary/30")}>
            <AdImageIcon className={iconClasses} />
          </div>
        );
      case 'video':
        return (
          <div className={cn(commonClasses, "bg-secondary/30")}>
            {ad.imageUrl ? 
              <Image src={ad.imageUrl} alt={`${ad.name} (video thumbnail)`} width={300} height={160} className={commonClasses} data-ai-hint={ad.aiHint || "video ad"} />
              : <Film className={iconClasses} />
            }
          </div>
        );
      case 'html5':
        return (
          <div className={cn(commonClasses, "bg-secondary/30")}>
            <AdFileTextIcon className={iconClasses} />
          </div>
        );
      case 'text':
        return (
          <div className={cn(commonClasses, "p-4 overflow-hidden bg-secondary/30 flex flex-col justify-center")}>
            <MessageSquare className={cn(iconClasses, "mb-2 self-center")} />
            <h4 className="text-sm font-semibold text-foreground truncate">{ad.textAdContent?.headline}</h4>
            <p className="text-xs text-muted-foreground truncate">{ad.textAdContent?.description}</p>
          </div>
        );
      default:
        return (
          <div className={cn(commonClasses, "bg-secondary/30")}>
             <AlertCircle className={iconClasses} />
          </div>
        );
    }
  };

  const handlePreviewClick = () => {
    // In a real app, this would open the AdPreview modal
    // For now, we can just log or alert
    console.log("Previewing ad:", ad.name);
    alert(`Previewing: ${ad.name}\n(AdPreview component integration needed for full preview)`);
  };


  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
      <CardHeader className="p-0 relative">
        {renderPreview()}
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/70 hover:bg-background rounded-full">
                <MoreVertical className="h-4 w-4 text-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => alert(`Editing ${ad.name}`)}>
                <Edit3 className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePreviewClick}>
                <Eye className="mr-2 h-4 w-4" /> Preview
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart2 className="mr-2 h-4 w-4" /> Analytics
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive" onClick={() => alert(`Deleting ${ad.name}`)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 truncate" title={ad.name}>
          {ad.name}
        </CardTitle>
        <div className="flex items-center space-x-2 mb-3">
          <Badge variant="outline" className="capitalize text-xs">
             {ad.format === 'image' && <AdImageIcon className="mr-1 h-3 w-3" />}
             {ad.format === 'video' && <Film className="mr-1 h-3 w-3" />}
             {ad.format === 'html5' && <AdFileTextIcon className="mr-1 h-3 w-3" />}
             {ad.format === 'text' && <MessageSquare className="mr-1 h-3 w-3" />}
            {ad.format}
          </Badge>
          <Badge className={cn("text-xs", getStatusColorClass(ad.status))}>
            {ad.status}
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          {ad.size && (
            <div className="flex items-center">
              <Tag className="mr-2 h-4 w-4 text-primary/70" />
              <span>Size: {ad.size}</span>
            </div>
          )}
          {(ad.startDate || ad.endDate) && (
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4 text-primary/70" />
              <span>
                {ad.startDate ? new Date(ad.startDate).toLocaleDateString() : 'N/A'} - {ad.endDate ? new Date(ad.endDate).toLocaleDateString() : 'Ongoing'}
              </span>
            </div>
          )}
        </div>

        {(ad.impressions !== undefined || ad.clicks !== undefined || ad.ctr) && (
          <>
            <hr className="my-3 border-border" />
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
                <p className="font-semibold text-foreground">{ad.ctr ?? 'N/A'}</p>
                <p className="text-muted-foreground">CTR</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t border-border bg-secondary/20">
        <div className="flex w-full justify-between items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => alert(`Editing ${ad.name}`)}>
            <Edit3 className="mr-1.5 h-4 w-4" /> Edit
          </Button>
          <Button variant="default" size="sm" className="flex-1" onClick={handlePreviewClick}>
            <Eye className="mr-1.5 h-4 w-4" /> Preview
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MyAdCard;

