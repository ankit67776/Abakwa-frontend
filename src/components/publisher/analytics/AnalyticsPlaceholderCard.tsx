
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, CheckCircle, TrendingUpIcon, PieChartIcon } from 'lucide-react'; // Added PieChartIcon

interface AnalyticsPlaceholderCardProps {
  title: string;
  message?: string;
  icon?: React.ReactNode;
  viewReportLink?: string;
  viewReportText?: string;
  isDonutPlaceholder?: boolean; // To render a donut-like placeholder
}

const AnalyticsPlaceholderCard: React.FC<AnalyticsPlaceholderCardProps> = ({ 
    title, 
    message = "No data available for this period.", 
    icon, 
    viewReportLink, 
    viewReportText,
    isDonutPlaceholder = false
}) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-xs font-medium text-muted-foreground flex items-center">
          {title} <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
        </CardTitle>
         <div className="flex items-center space-x-1">
            {icon && React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement, {className: "h-3.5 w-3.5 text-muted-foreground"})}
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground opacity-70" />
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-4 px-4 flex-grow flex flex-col items-center justify-center text-center">
        {isDonutPlaceholder ? (
            <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                    className="stroke-current text-muted/30"
                    d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="3"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">{message}</span>
                </div>
            </div>
        ) : (
            <>
              {/* {icon && <div className="mb-3 text-muted-foreground">{React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8"})}</div>} */}
              <p className="text-sm text-muted-foreground">{message}</p>
            </>
        )}
      </CardContent>
      {viewReportLink && viewReportText && (
        <div className="px-4 pb-3 mt-auto border-t pt-3">
          <Button variant="link" size="sm" className="text-xs text-primary p-0 h-auto hover:underline" asChild>
            <a href={viewReportLink}>
              {viewReportText} <ArrowRight className="ml-1 h-3 w-3" />
            </a>
          </Button>
        </div>
      )}
    </Card>
  );
};

export default AnalyticsPlaceholderCard;
