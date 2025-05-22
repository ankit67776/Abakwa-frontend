
"use client";

import React, { useState } from 'react';
import { Search, Filter as FilterIcon } from 'lucide-react'; // Renamed Filter to FilterIcon
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Ad } from '@/types/ad'; // Using centralized Ad type

interface AdBrowserProps {
  ads: Ad[];
  onSelectAd: (ad: Ad) => void;
}

const ALL_FORMATS_VALUE = "_all_formats_";
const ALL_CATEGORIES_VALUE = "_all_categories_";

const AdBrowser: React.FC<AdBrowserProps> = ({ ads, onSelectAd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<Ad['format'] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Assuming categories might be added to Ad type
  
  const formats: { id: Ad['format'], name: string }[] = [
    { id: 'image', name: 'Image' },
    { id: 'html5', name: 'HTML5' },
    { id: 'video', name: 'Video' },
    { id: 'text', name: 'Text' },
  ];
  
  // Example categories, this should come from your data or Ad type
  const categories = [
    { id: 'tech', name: 'Technology' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'food', name: 'Food & Drink' },
    { id: 'travel', name: 'Travel' },
    { id: 'health', name: 'Health & Fitness' },
  ];
  
  const filteredAds = ads.filter((ad) => {
    let matches = true;
    
    if (searchTerm) {
      matches = matches && (
        ad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ad.description && ad.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedFormat) {
      matches = matches && ad.format === selectedFormat;
    }
    // TODO: Uncomment and implement if ad.category exists and filtering by category is needed
    // if (selectedCategory) {
    //   matches = matches && ad.category?.toLowerCase() === selectedCategory.toLowerCase();
    // }
    
    return matches;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filter Ads</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="search-ads"
                placeholder="Search ads by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 md:flex-shrink-0">
            <Select 
              value={selectedFormat || ALL_FORMATS_VALUE} 
              onValueChange={(value) => setSelectedFormat(value === ALL_FORMATS_VALUE ? null : value as Ad['format'])}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Formats" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_FORMATS_VALUE}>All Formats</SelectItem>
                {formats.map((format) => (
                  <SelectItem key={format.id} value={format.id!}>
                    {format.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              value={selectedCategory || ALL_CATEGORIES_VALUE} 
              onValueChange={(value) => setSelectedCategory(value === ALL_CATEGORIES_VALUE ? null : value)}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                 <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_CATEGORIES_VALUE}>All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
           {/* <Button variant="outline" size="sm" className="md:ml-auto">
             <FilterIcon className="mr-2 h-4 w-4" /> More Filters
           </Button> */}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Ads</CardTitle>
          <CardDescription>
            Browse and select ads from our marketplace to display on your platform.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {filteredAds.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
                <Search className="mx-auto h-12 w-12 mb-4" />
                <p>No ads match your current filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredAds.map((ad) => (
                <Card key={ad.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-[16/9] bg-muted">
                    <Image
                        src={ad.imageUrl || ad.thumbnailUrl || "https://placehold.co/600x338.png"}
                        alt={ad.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        data-ai-hint={ad.aiHint || "advertisement"}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://placehold.co/600x338.png';
                        }}
                    />
                    </div>
                    <CardContent className="p-4">
                    <h4 className="text-lg font-medium text-foreground truncate" title={ad.name}>{ad.name}</h4>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2 h-10">{ad.description || "No description."}</p>
                    <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center">
                        {/* Placeholder for advertiser avatar/name */}
                        <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-primary flex items-center justify-center">
                            <span className="text-xs text-primary-foreground font-medium">{ad.advertiser?.name ? ad.advertiser.name.charAt(0).toUpperCase() : 'A'}</span>
                        </div>
                        <span className="ml-2 text-sm text-muted-foreground">{ad.advertiser?.name || "Advertiser"}</span>
                        </div>
                        <Button
                        variant="default"
                        size="sm"
                        onClick={() => onSelectAd(ad)}
                        >
                        Select Ad
                        </Button>
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdBrowser;

    