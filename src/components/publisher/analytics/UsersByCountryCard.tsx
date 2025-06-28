
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, CheckCircle } from 'lucide-react'; // Using CheckCircle as placeholder for GA icon

interface CountryData {
  name: string;
  users: number;
  code: string; // For potential flag SVGs or map integration later
}

interface UsersByCountryCardProps {
  title: string;
  countryData: CountryData[];
}

const UsersByCountryCard: React.FC<UsersByCountryCardProps> = ({ title, countryData }) => {
  const topCountries = countryData.slice(0, 7); // Display top 7 like GA

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-xs font-medium text-muted-foreground flex items-center">
          {title} <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
        </CardTitle>
        <div className="flex items-center space-x-1">
            <CheckCircle className="h-3.5 w-3.5 text-green-500" />
            {/* Placeholder for dropdown */}
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground opacity-70" />
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-4 px-4 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <div className="mb-3 md:mb-0">
                {/* Placeholder for World Map SVG */}
                <div className="w-full h-32 bg-muted rounded flex items-center justify-center text-sm text-muted-foreground">
                    Map Placeholder
                </div>
            </div>
            <div>
                <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-wider mb-1 px-1">
                    <span>Country</span>
                    <span>Active Users</span>
                </div>
                <ul className="space-y-0.5">
                {topCountries.map((country) => (
                    <li key={country.code} className="flex justify-between items-center text-xs px-1 py-0.5 rounded hover:bg-muted/50">
                    <span className="text-muted-foreground">{country.name}</span>
                    <span className="font-medium text-foreground">{country.users.toLocaleString()}</span>
                    </li>
                ))}
                </ul>
            </div>
        </div>
      </CardContent>
      <div className="px-4 pb-3 mt-auto border-t pt-3">
        <Button variant="link" size="sm" className="text-xs text-primary p-0 h-auto hover:underline">
          View countries <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
};

export default UsersByCountryCard;
