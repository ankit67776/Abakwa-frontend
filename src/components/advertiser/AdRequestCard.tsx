
"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdRequest } from '@/types/ad';
import { CheckCircle, XCircle, UserCircle, Link as LinkIcon, CalendarDays, Info, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdRequestCardProps {
  request: AdRequest;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
  isProcessing: boolean;
}

const getStatusColorClass = (status: AdRequest['requestStatus']): string => {
  switch (status?.toLowerCase()) {
    case 'approved':
      return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-800/30 dark:text-green-300 dark:border-green-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-800/30 dark:text-yellow-300 dark:border-yellow-700';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-800/30 dark:text-red-300 dark:border-red-700';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700/30 dark:text-gray-400 dark:border-gray-600';
  }
};

const getStatusIcon = (status: AdRequest['requestStatus']): React.ReactNode => {
  switch (status?.toLowerCase()) {
    case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'pending': return <Info className="h-4 w-4 text-yellow-500" />;
    case 'rejected': return <XCircle className="h-4 w-4 text-red-500" />;
    default: return <Info className="h-4 w-4 text-gray-500" />;
  }
};

const AdRequestCard: React.FC<AdRequestCardProps> = ({ request, onApprove, onReject, isProcessing }) => {
  const { ad, publisher, requestStatus, requestedAt, requestId } = request;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/4 flex-shrink-0 bg-muted relative aspect-video sm:aspect-auto">
          <Image
            src={ad.imageUrl || 'https://placehold.co/300x200.png?text=Ad+Preview'}
            alt={ad.name}
            fill
            sizes="(max-width: 640px) 100vw, 25vw"
            className="object-cover"
            data-ai-hint={ad.description || "advertisement"}
          />
        </div>
        <div className="flex-grow p-4 sm:p-5">
          <CardHeader className="p-0 mb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-semibold text-foreground leading-tight" title={ad.name}>
                Request for: {ad.name}
              </CardTitle>
              <Badge className={cn("text-xs capitalize ml-2 shrink-0", getStatusColorClass(requestStatus))}>
                {getStatusIcon(requestStatus)}
                <span className="ml-1.5">{requestStatus.replace('_', ' ')}</span>
              </Badge>
            </div>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Ad Format: {ad.format || 'N/A'} | Size: {ad.size || 'N/A'}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 mb-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <UserCircle className="h-4 w-4 mr-2 text-primary" />
                <span>Requested by: <span className="font-medium text-foreground">{publisher.name}</span></span>
              </div>
              {publisher.email && (
                 <div className="flex items-center text-muted-foreground">
                    <UserCircle className="h-4 w-4 mr-2 text-primary" />
                    <span>Email: <span className="font-medium text-foreground">{publisher.email}</span></span>
                </div>
              )}
              {publisher.website && (
                <div className="flex items-center text-muted-foreground">
                  <LinkIcon className="h-4 w-4 mr-2 text-primary" />
                  <a href={publisher.website} target="_blank" rel="noopener noreferrer" className="hover:underline text-foreground">
                    {publisher.website}
                  </a>
                </div>
              )}
              <div className="flex items-center text-muted-foreground">
                <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                <span>Requested on: <span className="font-medium text-foreground">{formatDate(requestedAt)}</span></span>
              </div>
            </div>
          </CardContent>

          {requestStatus === 'pending' && (
            <CardFooter className="p-0 flex justify-end space-x-3">
              <Button variant="outline" size="sm" onClick={() => onReject(requestId)} disabled={isProcessing}>
                {isProcessing ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <XCircle className="mr-1.5 h-4 w-4" />}
                Reject
              </Button>
              <Button variant="default" size="sm" onClick={() => onApprove(requestId)} disabled={isProcessing}>
                 {isProcessing ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-1.5 h-4 w-4" />}
                Approve
              </Button>
            </CardFooter>
          )}
          {requestStatus === 'approved' && (
             <CardFooter className="p-0 flex justify-end space-x-3">
                <p className="text-sm text-green-600 flex items-center"><CheckCircle className="mr-2 h-5 w-5" /> Approved</p>
             </CardFooter>
          )}
          {requestStatus === 'rejected' && (
             <CardFooter className="p-0 flex justify-end space-x-3">
                <p className="text-sm text-red-600 flex items-center"><XCircle className="mr-2 h-5 w-5" /> Rejected</p>
             </CardFooter>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AdRequestCard;

    