
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Building, User, Mail, Globe, Home, Briefcase, Network, Info } from 'lucide-react';

interface PublisherFormData {
  companyName: string;
  contactName: string;
  contactTitle: string;
  website: string;
  address: string;
  gamContactName: string;
  gamEmail: string;
  gamNetworkId: string;
}

const PublisherRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<PublisherFormData>({
    companyName: '',
    contactName: '',
    contactTitle: '',
    website: '',
    address: '',
    gamContactName: 'Brandon Ross', // Pre-filled
    gamEmail: 'jadeandzelda@gmail.com', // Pre-filled
    gamNetworkId: '22339582871', // Pre-filled
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitMessage(null);

    // In a real application, you would send this data to your backend
    console.log('Publisher Registration Data:', formData);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setSubmitMessage('Registration data submitted successfully (logged to console).');
    // Optionally reset form or redirect
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <User className="mr-2 h-6 w-6 text-primary" />
            Publisher Details
          </CardTitle>
          <CardDescription>Please provide your company and contact information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="companyName" className="flex items-center"><Building className="mr-2 h-4 w-4 text-muted-foreground" />Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g., Your Publishing Inc."
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="contactName" className="flex items-center"><User className="mr-2 h-4 w-4 text-muted-foreground" />Contact Name</Label>
              <Input
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="e.g., Jane Doe"
                required
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="contactTitle" className="flex items-center"><Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />Contact Title</Label>
              <Input
                id="contactTitle"
                name="contactTitle"
                value={formData.contactTitle}
                onChange={handleChange}
                placeholder="e.g., CEO, Head of Monetization"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="website" className="flex items-center"><Globe className="mr-2 h-4 w-4 text-muted-foreground" />Website</Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="e.g., https://www.yourwebsite.com"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="address" className="flex items-center"><Home className="mr-2 h-4 w-4 text-muted-foreground" />Address</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g., 123 Main St, Anytown, USA 12345"
              rows={3}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-6 w-6 text-primary"><path d="M12 12h.01"/><path d="M16.24 7.76A7.72 7.72 0 0 0 12 4a7.72 7.72 0 0 0-4.24 3.76"/><path d="M16.24 7.76C18.1 9.62 19.25 12.25 19.25 15A7.72 7.72 0 0 1 12 19a7.72 7.72 0 0 1-7.25-4"/><path d="M12 19c2.49 0 4.68-1.31 6-3.24"/><path d="M4.75 15c0-2.75 1.15-5.38 3.01-7.24"/></svg>
            Google Ad Manager (GAM) Details
          </CardTitle>
          <CardDescription>Provide your existing GAM contact and network information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="gamContactName" className="flex items-center"><User className="mr-2 h-4 w-4 text-muted-foreground" />GAM Contact Name</Label>
              <Input
                id="gamContactName"
                name="gamContactName"
                value={formData.gamContactName}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="gamEmail" className="flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground" />GAM Email Address</Label>
              <Input
                id="gamEmail"
                name="gamEmail"
                type="email"
                value={formData.gamEmail}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="gamNetworkId" className="flex items-center"><Network className="mr-2 h-4 w-4 text-muted-foreground" />GAM Network ID</Label>
            <Input
              id="gamNetworkId"
              name="gamNetworkId"
              value={formData.gamNetworkId}
              onChange={handleChange}
              placeholder="e.g., 1234567890"
              required
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-6 w-6 text-primary"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" x2="2" y1="8" y2="22"/><line x1="17.5" x2="9" y1="15" y2="15"/></svg>
            Google Analytics (GA) Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
            <Info className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Important: Grant Access</h4>
              <p className="text-sm">
                To complete your integration and enable performance tracking, please grant "Viewer" access
                to your Google Analytics property for the following email address:
              </p>
              <p className="mt-2 text-sm font-semibold bg-blue-100 px-2 py-1 rounded inline-block">
                gatabakwastudio@gmail.com
              </p>
              <p className="text-xs mt-2 text-blue-600">
                This will allow us to fetch performance data for the ads displayed on your site.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end pt-4">
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Registration'
          )}
        </Button>
      </div>

      {submitMessage && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          <p>{submitMessage}</p>
        </div>
      )}
    </form>
  );
};

export default PublisherRegistrationForm;
