
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Building, User, Mail, Globe, Home, Briefcase, Network, Info, CheckCircle } from 'lucide-react';

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
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitMessage(null);
    setSubmitError(null);

    // In a real application, you would send this data to your backend
    console.log('Publisher Registration Data:', formData);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example: Simulate success or error
    const isSuccess = Math.random() > 0.2; // 80% chance of success for demo

    if (isSuccess) {
      setSubmitMessage('Registration data submitted successfully! We will review your application and get back to you soon.');
      // Optionally reset form:
      // setFormData({ companyName: '', contactName: '', contactTitle: '', website: '', address: '', gamContactName: 'Brandon Ross', gamEmail: 'jadeandzelda@gmail.com', gamNetworkId: '22339582871' });
    } else {
      setSubmitError('There was an issue submitting your registration. Please try again later.');
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-secondary/30 dark:bg-card/50 border-b">
          <CardTitle className="text-2xl flex items-center">
            <Building className="mr-3 h-6 w-6 text-primary" />
            Publisher Details
          </CardTitle>
          <CardDescription>Please provide your company and contact information.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="companyName" className="flex items-center text-sm font-medium">
                <Building className="mr-2 h-4 w-4 text-muted-foreground" />Company Name
              </Label>
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
              <Label htmlFor="contactName" className="flex items-center text-sm font-medium">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />Main Contact Name
              </Label>
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
              <Label htmlFor="contactTitle" className="flex items-center text-sm font-medium">
                <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />Contact Title
              </Label>
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
              <Label htmlFor="website" className="flex items-center text-sm font-medium">
                <Globe className="mr-2 h-4 w-4 text-muted-foreground" />Website URL
              </Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="e.g., https://www.yourwebsite.com"
                required
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="address" className="flex items-center text-sm font-medium">
              <Home className="mr-2 h-4 w-4 text-muted-foreground" />Company Address
            </Label>
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

      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-secondary/30 dark:bg-card/50 border-b">
          <CardTitle className="text-2xl flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-7 w-7 text-primary"><path d="M12 12h.01"/><path d="M16.24 7.76A7.72 7.72 0 0 0 12 4a7.72 7.72 0 0 0-4.24 3.76"/><path d="M16.24 7.76C18.1 9.62 19.25 12.25 19.25 15A7.72 7.72 0 0 1 12 19a7.72 7.72 0 0 1-7.25-4"/><path d="M12 19c2.49 0 4.68-1.31 6-3.24"/><path d="M4.75 15c0-2.75 1.15-5.38 3.01-7.24"/></svg>
            Google Ad Manager (GAM)
          </CardTitle>
          <CardDescription>Provide your existing GAM contact and network information. This helps us integrate efficiently.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="gamContactName" className="flex items-center text-sm font-medium">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />GAM Technical Contact Name
              </Label>
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
              <Label htmlFor="gamEmail" className="flex items-center text-sm font-medium">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />GAM Technical Contact Email
              </Label>
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
            <Label htmlFor="gamNetworkId" className="flex items-center text-sm font-medium">
              <Network className="mr-2 h-4 w-4 text-muted-foreground" />GAM Network ID
            </Label>
            <Input
              id="gamNetworkId"
              name="gamNetworkId"
              value={formData.gamNetworkId}
              onChange={handleChange}
              placeholder="e.g., 1234567890"
              required
              className="mt-1"
            />
             <p className="text-xs text-muted-foreground mt-1">Find this in your GAM account under Admin &gt; Global settings &gt; Network settings.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl overflow-hidden border-blue-500/50 dark:border-blue-400/40">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-500/30">
          <CardTitle className="text-2xl flex items-center text-blue-700 dark:text-blue-300">
             <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-7 w-7"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" x2="2" y1="8" y2="22"/><line x1="17.5" x2="9" y1="15" y2="15"/></svg>
            Google Analytics (GA) Access
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-start p-4 bg-primary/5 border border-primary/20 rounded-lg text-primary/90 dark:text-primary/80">
            <Info className="h-7 w-7 mr-4 mt-1 flex-shrink-0 text-primary" />
            <div>
              <h4 className="font-semibold text-lg text-primary">Action Required: Grant Viewer Access</h4>
              <p className="mt-1">
                To complete your integration and enable performance tracking, please grant "Viewer" access
                to your Google Analytics property for the following email address:
              </p>
              <p className="mt-2 text-base font-semibold bg-primary/10 dark:bg-primary/20 px-3 py-1.5 rounded-md inline-block tracking-wider">
                gatabakwastudio@gmail.com
              </p>
              <p className="text-xs mt-2 text-primary/70 dark:text-primary/60">
                This will allow us to securely fetch performance data for the ads displayed on your site. All data is handled according to our privacy policy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="pt-6">
        {submitMessage && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 mr-3" />
            <p>{submitMessage}</p>
          </div>
        )}
        {submitError && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-3" />
            <p>{submitError}</p>
          </div>
        )}
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isLoading} className="min-w-[180px]">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Complete Registration'
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PublisherRegistrationForm;

    