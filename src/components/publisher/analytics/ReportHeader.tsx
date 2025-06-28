
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronDown, Users, Share2, Download } from 'lucide-react';

interface ReportHeaderProps {
  title: string;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ title }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2 sm:mb-0">{title}</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
            <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
            Last 28 days: May 22 - Jun 18, 2025
            <ChevronDown className="ml-1.5 h-3.5 w-3.5" />
          </Button>
          {/* Mock buttons, functionality not implemented */}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="sr-only">Audience</span>
          </Button>
           <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
             <span className="sr-only">Share</span>
          </Button>
           <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Download className="h-4 w-4 sm:h-5 sm:w-5" />
             <span className="sr-only">Download</span>
          </Button>
        </div>
      </div>
      {/* Placeholder for "Add comparison" if needed */}
      {/* <Button variant="outline" size="sm" className="mt-2 text-xs">Add comparison +</Button> */}
    </div>
  );
};

export default ReportHeader;
