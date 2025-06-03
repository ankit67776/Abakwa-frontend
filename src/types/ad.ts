
export interface Ad {
  id: string;
  name: string; // Will be mapped from backend's 'title'
  description: string;
  status: 'Active' | 'Paused' | 'Draft' | 'Under Review' | 'Ended' | 'Scheduled' | 'active' | 'in_review' | 'selected' | 'unknown'; // This is the ad's general status
  format?: 'image' | 'video' | 'html5' | 'text' | 'unknown' | null;
  imageUrl?: string; // Will be mapped from backend's 'media_url'
  aiHint?: string;
  html5File?: string;
  textAdContent?: { headline: string; description: string };
  size?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  impressions: number;
  clicks: number;
  ctr: number | string;
  createdAt: string;
  advertiser?: {
    name: string;
    id?: string;
  };
  thumbnailUrl?: string;

  // Fields that might come from backend directly
  ad_format?: string | null;
  ad_size?: string | null;
  ad_txt_content?: string | null;
  bid_strategy?: string | null;
  budget?: string | null;
  custom_height?: string | null;
  custom_width?: string | null;
  fallback_image?: boolean | string | null;
  header_bidding?: boolean | string | null;
  header_bidding_partners?: string | null;
  header_code?: string | null;
  media_url?: string | null;
  target_audience?: string | null;
  target_devices?: string | null;
  target_locations?: string | null;
  title?: string;
  user_id?: number | string;

  // New fields for publisher's ad request context
  request_id?: string | number; // ID of the ad_request record
  request_status?: 'pending' | 'approved' | 'rejected' | 'active_on_site' | string; // Status of the publisher's request for this ad
  publisher_id?: string | number; // ID of the publisher who requested/is using this ad
}

export interface PublisherInfo {
  id: string;
  name: string;
  email?: string; // Optional, if available from backend
  website?: string; // Optional
}

export interface AdRequest {
  requestId: string; // The ID of the AdRequest record itself
  requestStatus: 'pending' | 'approved' | 'rejected' | 'active_on_site' | string;
  requestedAt: string; // Or Date
  ad: { // Details of the ad being requested
    id: string;
    name: string;
    imageUrl?: string;
    description?: string;
    format?: Ad['format'];
    size?: Ad['size'];
  };
  publisher: PublisherInfo; // Details of the publisher who made the request
}
