
export interface Ad {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Paused' | 'Draft' | 'Under Review' | 'Ended' | 'Scheduled' | 'active' | 'in_review' | 'selected' | 'unknown'; // Added 'unknown' for safety
  format?: 'image' | 'video' | 'html5' | 'text' | 'unknown'; // Added 'unknown' for safety
  imageUrl?: string;
  aiHint?: string;
  html5File?: string;
  textAdContent?: { headline: string; description: string };
  size?: string;
  startDate?: string;
  endDate?: string;
  impressions: number;
  clicks: number;
  ctr: number | string;
  createdAt: string;
  advertiser?: {
    name: string;
    id?: string;
  };
  thumbnailUrl?: string;
}
