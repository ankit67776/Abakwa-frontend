
"use client";
// This file is intentionally left empty as its functionality
// has been moved to src/components/advertiser/ad-preview.tsx
// It can be safely deleted.

import React from 'react';

const AdPreviewPlaceholder: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl font-semibold mb-4">Ad Preview Component - Deprecated</h1>
      <p className="text-muted-foreground">
        The functionality of this component has been moved to `src/components/advertiser/ad-preview.tsx`.
      </p>
      <p className="mt-2 text-muted-foreground">
        This file (`src/app/upload-ad/components/ad-preview.tsx`) can be safely deleted.
      </p>
    </div>
  );
};

export default AdPreviewPlaceholder;

    