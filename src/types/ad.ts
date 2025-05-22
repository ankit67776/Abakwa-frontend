
export interface Ad {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Paused' | 'Draft' | 'Under Review' | 'Ended' | 'Scheduled' | 'active' | 'in_review' | 'selected'; // Merging statuses
  format?: 'image' | 'video' | 'html5' | 'text'; // Optional as not all versions had it
  imageUrl?: string; // Consolidating thumbnailUrl and imageUrl
  aiHint?: string;
  html5File?: string;
  textAdContent?: { headline: string; description: string };
  size?: string;
  startDate?: string;
  endDate?: string;
  impressions: number; // Assuming always present
  clicks: number; // Assuming always present
  ctr: number | string; // Can be number (e.g., 2.8) or string (e.g., "2.86%")
  createdAt: string; // ISO date string
  advertiser?: {
    name: string;
    id?: string;
  };
  // Kept for compatibility with AdBrowser/SelectedAdList if needed, but ideally consolidated
  thumbnailUrl?: string; 
}
