"use client"; // Required for form interactions

import UploadAdForm from '@/app/upload-ad/components/upload-ad-form';

export default function UploadAdPage() {
  const handleSubmitAd = async (data: FormData) => {
    // Simulate API call
    console.log('Form data submitted:');
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }
    // In a real app, you would send this data to your backend
    // For example:
    // try {
    //   const response = await fetch('/api/upload-ad', {
    //     method: 'POST',
    //     body: data,
    //   });
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   const result = await response.json();
    //   console.log('Success:', result);
    //   alert('Ad uploaded successfully!');
    // } catch (error) {
    //   console.error('Error:', error);
    //   alert('Failed to upload ad.');
    // }
    return new Promise(resolve => setTimeout(() => {
      alert('Ad submitted for processing!');
      resolve(undefined);
    }, 1000));
  };

  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            AdUploader Pro
          </h1>
          <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
            Streamline your ad creative uploads with our intuitive platform.
          </p>
        </header>
        <UploadAdForm onSubmit={handleSubmitAd} />
      </div>
    </main>
  );
}
