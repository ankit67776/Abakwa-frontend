
"use client";
// This file is intentionally left empty as its functionality
// has been integrated into the advertiser dashboard's "My Ads" tab.
// It can be safely deleted.

import React from 'react';

const MyAdsPagePlaceholder: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl font-semibold mb-4">My Ads Page - Deprecated</h1>
      <p className="text-muted-foreground">
        The functionality of this page has been moved to the &quot;My Ads&quot; tab within the Advertiser Dashboard.
      </p>
      <p className="mt-2 text-muted-foreground">
        This file (`src/app/my-ads/page.tsx`) can be safely deleted.
      </p>
    </div>
  );
};

export default MyAdsPagePlaceholder;

    