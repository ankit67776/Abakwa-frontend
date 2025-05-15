
import type { NextPage } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle, LayoutGrid, ListFilter } from 'lucide-react';
import MyAdCard, { type Ad } from './components/my-ad-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"


const mockAds: Ad[] = [
  {
    id: '1',
    name: 'Summer Sale Banner Ad',
    format: 'image',
    status: 'Active',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'summer sale',
    size: '728x90',
    startDate: '2024-07-01',
    endDate: '2024-07-31',
    impressions: 120500,
    clicks: 3450,
    ctr: '2.86%',
  },
  {
    id: '2',
    name: 'New Product Launch Video',
    format: 'video',
    status: 'Paused',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'product launch',
    size: 'Responsive',
    startDate: '2024-06-15',
    endDate: '2024-08-15',
    impressions: 75200,
    clicks: 1200,
    ctr: '1.59%',
  },
  {
    id: '3',
    name: 'Holiday Promotion Text Ad',
    format: 'text',
    status: 'Scheduled',
    textAdContent: {
      headline: 'Biggest Holiday Sale Ever!',
      description: 'Get up to 50% off on all items. Limited time offer.',
    },
    size: 'N/A',
    startDate: '2024-11-20',
    endDate: '2024-12-25',
  },
  {
    id: '4',
    name: 'Interactive HTML5 Game Ad',
    format: 'html5',
    status: 'Under Review',
    html5File: 'game-ad.zip',
    size: '300x250',
    startDate: '2024-08-01',
  },
  {
    id: '5',
    name: 'Q2 Report Campaign Image',
    format: 'image',
    status: 'Ended',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'business report',
    size: '300x250',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    impressions: 250000,
    clicks: 5000,
    ctr: '2.00%',
  },
  {
    id: '6',
    name: 'Brand Awareness Video - Fall',
    format: 'video',
    status: 'Draft',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'brand video',
    size: '16:9',
  },
];

const MyAdsPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              My Ads
            </h1>
            <div className="flex items-center gap-3">
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="lg">
                    <ListFilter className="mr-2 h-5 w-5" />
                    Filter Ads
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Active</DropdownMenuItem>
                  <DropdownMenuItem>Paused</DropdownMenuItem>
                  <DropdownMenuItem>Scheduled</DropdownMenuItem>
                  <DropdownMenuItem>Under Review</DropdownMenuItem>
                  <DropdownMenuItem>Ended</DropdownMenuItem>
                  <DropdownMenuItem>Draft</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Clear Filters</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/" passHref>
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Upload New Ad
                </Button>
              </Link>
            </div>
          </div>
           <p className="mt-3 text-lg text-muted-foreground">
            Manage, review, and analyze your ad creatives.
          </p>
        </header>

        <Tabs defaultValue="grid" className="mb-8">
          <div className="flex justify-end">
            <TabsList>
              <TabsTrigger value="grid">
                <LayoutGrid className="mr-2 h-4 w-4" /> Grid View
              </TabsTrigger>
              {/* Future: Add List View if needed */}
              {/* <TabsTrigger value="list"><List className="mr-2 h-4 w-4" /> List View</TabsTrigger> */}
            </TabsList>
          </div>
          <TabsContent value="grid">
            {mockAds.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockAds.map((ad) => (
                  <MyAdCard key={ad.id} ad={ad} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <LayoutGrid className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground">No Ads Found</h3>
                <p className="text-muted-foreground mt-2">
                  You haven't uploaded any ads yet. Start by creating a new one.
                </p>
                <Link href="/" passHref>
                  <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Upload Your First Ad
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          {/* <TabsContent value="list"> Future: Implement List View </TabsContent> */}
        </Tabs>


      </div>
    </div>
  );
};

export default MyAdsPage;
