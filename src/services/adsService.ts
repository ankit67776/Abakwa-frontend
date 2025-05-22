
import type { Ad } from '@/types/ad';

// Mock implementation for adsService
export const adsService = {
  getAllAds: async (): Promise<Ad[]> => {
    // In a real app, this would fetch data from an API
    // For now, returning a few mock ads.
    console.warn("adsService.getAllAds is using mock data.");
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    return Promise.resolve([
      {
        id: 'adv-mock-ad-1',
        name: 'GlobalTech Conference Ad',
        description: 'Join the leading minds in technology at the GlobalTech Conference 2024. Early bird tickets available!',
        status: 'Active',
        format: 'image',
        imageUrl: 'https://placehold.co/600x400/78e08f/ffffff?text=Tech+Conference',
        impressions: 25000,
        clicks: 750,
        ctr: "3.00%",
        createdAt: '2024-01-15T09:00:00Z',
        advertiser: { name: 'GlobalTech Events' },
        size: '728x90',
        startDate: '2024-02-01',
        endDate: '2024-04-30',
        aiHint: 'technology conference'
      },
      {
        id: 'adv-mock-ad-2',
        name: 'Artisan Coffee Roasters - Online Store',
        description: 'Experience the finest single-origin coffees, freshly roasted and delivered to your door. 15% off first order!',
        status: 'Active',
        format: 'image',
        imageUrl: 'https://placehold.co/600x400/e5b9b3/ffffff?text=Artisan+Coffee',
        impressions: 18000,
        clicks: 450,
        ctr: "2.50%",
        createdAt: '2024-02-01T11:30:00Z',
        advertiser: { name: 'Artisan Coffee Co.' },
        size: '300x250',
        startDate: '2024-02-10',
        aiHint: 'coffee beans'
      },
      {
        id: 'adv-mock-ad-3',
        name: 'Adventure Travel Deals - Summer Escapes',
        description: 'Unforgettable summer adventures await! Book your dream vacation now and save up to 30%.',
        status: 'Paused', // Example of a different status
        format: 'video',
        imageUrl: 'https://placehold.co/600x400/3498db/ffffff?text=Adventure+Travel', // Placeholder for video thumbnail
        impressions: 32000,
        clicks: 900,
        ctr: "2.81%",
        createdAt: '2024-01-20T14:00:00Z',
        advertiser: { name: 'ExploreMore Travels' },
        size: 'Responsive',
        startDate: '2024-03-01',
        endDate: '2024-08-31',
        aiHint: 'travel vacation'
      }
    ]);
  },
};
