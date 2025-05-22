
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Building, User, Mail, Globe, Home, Briefcase, Network, Info, CheckCircle, ExternalLink } from 'lucide-react';

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
    gamContactName: '', // Changed from pre-filled
    gamEmail: '', // Changed from pre-filled
    gamNetworkId: '', // Changed from pre-filled
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

    console.log('Publisher Registration Data:', formData);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const isSuccess = Math.random() > 0.2; 

    if (isSuccess) {
      setSubmitMessage('Registration data submitted successfully! We will review your application and get back to you soon.');
    } else {
      setSubmitError('There was an issue submitting your registration. Please try again later.');
    }
    setIsLoading(false);
  };

  const FormField: React.FC<{label: string, id: string, icon?: React.ReactNode, children: React.ReactNode, description?: string}> = ({label, id, icon, children, description}) => (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="flex items-center text-sm font-medium text-foreground/90">
        {icon && React.cloneElement(icon as React.ReactElement, { className: "mr-2 h-4 w-4 text-muted-foreground" })}
        {label}
      </Label>
      {children}
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="p-6 sm:p-8 border-b">
          <CardTitle className="text-2xl font-semibold text-foreground">
            Publisher & GAM Information
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Please provide your company, contact, and Google Ad Manager details.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 space-y-8">
          {/* Publisher Details Section */}
          <div>
            <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
              <Building className="mr-2 h-5 w-5" />
              Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Company Name" id="companyName" icon={<Building />}>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g., Your Publishing Inc."
                  required
                />
              </FormField>
              <FormField label="Website URL" id="website" icon={<Globe />}>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="e.g., https://www.yourwebsite.com"
                  required
                />
              </FormField>
            </div>
            <div className="mt-6">
              <FormField label="Company Address" id="address" icon={<Home />}>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g., 123 Main St, Anytown, USA 12345"
                  rows={3}
                />
              </FormField>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Contact Person Section */}
          <div>
            <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
              <User className="mr-2 h-5 w-5" />
              Main Contact Person
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Contact Name" id="contactName" icon={<User />}>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="e.g., Jane Doe"
                  required
                />
              </FormField>
              <FormField label="Contact Title" id="contactTitle" icon={<Briefcase />}>
                <Input
                  id="contactTitle"
                  name="contactTitle"
                  value={formData.contactTitle}
                  onChange={handleChange}
                  placeholder="e.g., CEO, Head of Monetization"
                />
              </FormField>
            </div>
          </div>

          <Separator className="my-8" />

          {/* GAM Details Section */}
          <div>
            <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M12 12h.01"/><path d="M16.24 7.76A7.72 7.72 0 0 0 12 4a7.72 7.72 0 0 0-4.24 3.76"/><path d="M16.24 7.76C18.1 9.62 19.25 12.25 19.25 15A7.72 7.72 0 0 1 12 19a7.72 7.72 0 0 1-7.25-4"/><path d="M12 19c2.49 0 4.68-1.31 6-3.24"/><path d="M4.75 15c0-2.75 1.15-5.38 3.01-7.24"/></svg>
              Google Ad Manager (GAM)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="GAM Technical Contact Name" id="gamContactName" icon={<User />}>
                <Input
                  id="gamContactName"
                  name="gamContactName"
                  value={formData.gamContactName}
                  onChange={handleChange}
                  placeholder="Brandon Ross" // Placeholder added
                  required
                />
              </FormField>
              <FormField label="GAM Technical Contact Email" id="gamEmail" icon={<Mail />}>
                <Input
                  id="gamEmail"
                  name="gamEmail"
                  type="email"
                  value={formData.gamEmail}
                  onChange={handleChange}
                  placeholder="jadeandzelda@gmail.com" // Placeholder added
                  required
                />
              </FormField>
            </div>
            <div className="mt-6">
              <FormField label="GAM Network ID" id="gamNetworkId" icon={<Network />} description="Find this in your GAM account under Admin > Global settings > Network settings.">
                <Input
                  id="gamNetworkId"
                  name="gamNetworkId"
                  value={formData.gamNetworkId}
                  onChange={handleChange}
                  placeholder="22339582871" // Placeholder added
                  required
                />
              </FormField>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl overflow-hidden bg-muted/20 border-primary/30">
        <CardHeader className="p-6 sm:p-8">
          <CardTitle className="text-xl font-semibold text-primary flex items-center">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-6 w-6"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" x2="2" y1="8" y2="22"/><line x1="17.5" x2="9" y1="15" y2="15"/></svg>
            Google Analytics (GA) Access
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 pt-0 text-sm">
          <div className="flex items-start space-x-3 p-4 bg-background border border-border rounded-lg">
            <Info className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground">Action Required: Grant Viewer Access</h4>
              <p className="mt-1 text-muted-foreground">
                To complete your integration and enable performance tracking, please grant "Viewer" access
                to your Google Analytics property for the email address:
              </p>
              <p className="mt-2 text-base font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-md inline-block">
                gatabakwastudio@gmail.com
              </p>
              <p className="text-xs mt-2 text-muted-foreground/80">
                This allows us to securely fetch performance data. All data is handled according to our privacy policy.
                Need help? <a href="#" className="text-primary hover:underline">View instructions</a>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="pt-2">
        {submitMessage && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-600 text-green-700 dark:text-green-200 rounded-lg flex items-center text-sm">
            <CheckCircle className="h-5 w-5 mr-3" />
            <p>{submitMessage}</p>
          </div>
        )}
        {submitError && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg flex items-center text-sm">
            <AlertCircle className="h-5 w-5 mr-3" />
            <p>{submitError}</p>
          </div>
        )}
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isLoading} className="min-w-[200px] text-base">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting Registration...
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

    