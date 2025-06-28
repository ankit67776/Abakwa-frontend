
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Building, User, Globe, Home, Briefcase, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface PublisherFormData {
  companyName: string;
  contactName: string;
  contactTitle: string;
  website: string;
  address: string;
}

interface FormFieldProps {
  label: string;
  id: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  description?: string;
}

const FormField: React.FC<FormFieldProps> = ({label, id, icon, children, description}) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="flex items-center text-sm font-medium text-foreground/90">
      {icon && React.cloneElement(icon as React.ReactElement, { className: "mr-2 h-4 w-4 text-muted-foreground" })}
      {label}
    </Label>
    {children}
    {description && <p className="text-xs text-muted-foreground">{description}</p>}
  </div>
);

const PublisherRegistrationForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<PublisherFormData>({
    companyName: '',
    contactName: '',
    contactTitle: '',
    website: '',
    address: '',
  });
  
  const [gaPropertyId, setGaPropertyId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gaPropertyId) {
        setSubmitError("Google Analytics Property ID is required.");
        return;
    }
    if (!API_BASE_URL) {
      setSubmitError("API URL not configured. Please contact support.");
      return;
    }
    
    setIsLoading(true);
    setSubmitMessage(null);
    setSubmitError(null);

    const finalFormData = {
      ...formData,
      ga_property_id: gaPropertyId,
    };

    try {
        const token = localStorage.getItem('token');
        // The single backend endpoint that handles verification and registration
        await axios.post(`${API_BASE_URL}/publisher/complete-registration`, finalFormData, {
           headers: { 'Authorization': `Bearer ${token}` }
        });

        setSubmitMessage('Registration complete! We have received and verified your information. Redirecting to your dashboard...');
        
        setTimeout(() => {
          router.push('/publisher/dashboard'); 
        }, 3000);
    } catch(error: any) {
        // Backend should return a clear error, e.g., for GA verification failure
        const errMsg = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
        setSubmitError(errMsg);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="p-6 sm:p-8 border-b">
          <CardTitle className="text-2xl font-semibold text-foreground flex items-center">
            <Building className="mr-3 h-6 w-6 text-primary" />
            Publisher Information
          </CardTitle>
          <CardDescription className="text-muted-foreground pl-10">
            Please provide your company and contact details.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 space-y-8">
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
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl overflow-hidden bg-muted/20 border-primary/30">
        <CardHeader className="p-6 sm:p-8">
          <CardTitle className="text-xl font-semibold text-primary flex items-center">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-6 w-6"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" x2="2" y1="8" y2="22"/><line x1="17.5" x2="9" y1="15" y2="15"/></svg>
            Google Analytics Integration (Required)
          </CardTitle>
           <CardDescription>
             Before submitting, ensure you have granted "Viewer" access for your property to <strong className="text-foreground">gatabakwastudio@gmail.com</strong> in your Google Analytics settings.
           </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 pt-0 space-y-4">
          <FormField label="Google Analytics Property ID" id="ga-property-id" description="Starts with 'G-' for GA4. Found in your GA admin settings.">
            <Input
              id="ga-property-id"
              name="ga_property_id"
              value={gaPropertyId}
              onChange={(e) => setGaPropertyId(e.target.value)}
              placeholder="e.g., G-XXXXXXXXXX"
              required
            />
          </FormField>
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
          <Button type="submit" size="lg" disabled={isLoading || !!submitMessage} className="min-w-[200px] text-base">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Verifying & Submitting...
              </>
            ) : submitMessage ? (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Submitted!
              </>
            ) : (
              'Verify & Complete Registration'
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PublisherRegistrationForm;
