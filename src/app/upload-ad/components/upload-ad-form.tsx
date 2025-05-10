
"use client";

import React, { useState, useCallback } from 'react';
import { Upload, X, Plus, Image as ImageIcon, FileText, Film, Calendar, DollarSign, Target, Info, Loader2, Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import AdPreview from './ad-preview'; // Import the AdPreview component

interface UploadAdFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

const adFormatOptions = [
  { value: 'image', label: 'Image Ad' },
  { value: 'video', label: 'Video Ad' },
  { value: 'html5', label: 'HTML5 Ad' },
  { value: 'text', label: 'Text Ad' },
];

const adSizeOptions = [
  { value: '300x250', label: '300x250 (Medium Rectangle)' },
  { value: '728x90', label: '728x90 (Leaderboard)' },
  { value: '160x600', label: '160x600 (Wide Skyscraper)' },
  { value: 'responsive', label: 'Responsive' },
  { value: 'custom', label: 'Custom Size' },
];

const bidStrategyOptions = [
  { value: 'cpc', label: 'Cost Per Click (CPC)' },
  { value: 'cpm', label: 'Cost Per Mille (CPM)' },
  { value: 'cpa', label: 'Cost Per Action (CPA)' },
  { value: 'cpv', label: 'Cost Per View (CPV)' },
];

const deviceOptions = [
  { value: 'all', label: 'All Devices' },
  { value: 'desktop', label: 'Desktop Only' },
  { value: 'mobile', label: 'Mobile Only' },
  { value: 'tablet', label: 'Tablet Only' },
];

const UploadAdForm: React.FC<UploadAdFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  
  const [adFormat, setAdFormat] = useState('');
  const [adSize, setAdSize] = useState('');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  
  const [adTxtContent, setAdTxtContent] = useState('');
  const [headerCode, setHeaderCode] = useState('');
  const [headerBidding, setHeaderBidding] = useState(false);
  const [headerBiddingPartners, setHeaderBiddingPartners] = useState('');
  const [fallbackImage, setFallbackImage] = useState(false);
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [bidStrategy, setBidStrategy] = useState('');
  
  const [targetAudience, setTargetAudience] = useState('');
  const [targetLocations, setTargetLocations] = useState('');
  const [targetDevices, setTargetDevices] = useState('all');
  
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // State for preview dialog

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  }, []);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  }, []);
  
  const removeFile = useCallback((index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }, []);
  
  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith('image/')) return <ImageIcon className="h-6 w-6 text-primary" />;
    if (type === 'text/html' || type === 'application/javascript') return <FileText className="h-6 w-6 text-orange-500" />;
    if (type.startsWith('video/')) return <Film className="h-6 w-6 text-purple-500" />;
    return <FileText className="h-6 w-6 text-muted-foreground" />;
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setFiles([]);
    setAdFormat('');
    setAdSize('');
    setCustomWidth('');
    setCustomHeight('');
    setAdTxtContent('');
    setHeaderCode('');
    setHeaderBidding(false);
    setHeaderBiddingPartners('');
    setFallbackImage(false);
    setStartDate('');
    setEndDate('');
    setBudget('');
    setBidStrategy('');
    setTargetAudience('');
    setTargetLocations('');
    setTargetDevices('all');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0 && adFormat !== 'text' && !(adFormat === 'html5' && !fallbackImage)) { 
      alert('Please upload at least one file for non-text ads or HTML5 ads without fallback.');
      return;
    }
    
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('adFormat', adFormat);
    formData.append('adSize', adSize);
    if (adSize === 'custom') {
      formData.append('customWidth', customWidth);
      formData.append('customHeight', customHeight);
    }
    formData.append('adTxtContent', adTxtContent);
    formData.append('headerCode', headerCode);
    formData.append('headerBidding', String(headerBidding));
    formData.append('headerBiddingPartners', headerBiddingPartners);
    formData.append('fallbackImage', String(fallbackImage));
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('budget', budget);
    formData.append('bidStrategy', bidStrategy);
    formData.append('targetAudience', targetAudience);
    formData.append('targetLocations', targetLocations);
    formData.append('targetDevices', targetDevices);
    files.forEach((file) => formData.append('files', file));
    
    try {
      await onSubmit(formData);
      resetForm();
    } catch (error) {
      console.error('Error uploading ad:', error);
      // Potentially show a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const adPreviewData = {
    name,
    description,
    files,
    adFormat,
    adSize,
    customWidth,
    customHeight,
    adTxtContent,
  };

  const renderSectionTitle = (title: string) => (
    <h3 className="text-xl font-semibold text-foreground mb-4 pt-6 first:pt-0">{title}</h3>
  );

  const renderInfoTooltip = (text: string) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6 p-0 ml-2 shrink-0">
          <Info className="h-4 w-4 text-muted-foreground" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Upload New Ad Creative</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div>
              {renderSectionTitle("Basic Information")}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="ad-name" className="text-sm font-medium">Ad Name</Label>
                  <Input id="ad-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Summer Sale Banner" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="ad-description" className="text-sm font-medium">Description</Label>
                  <Textarea id="ad-description" rows={3} placeholder="Briefly describe the ad creative or campaign" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1" />
                </div>
              </div>
            </div>

            <div>
              {renderSectionTitle("Ad Specifications")}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="ad-format" className="text-sm font-medium">Ad Format</Label>
                  <Select value={adFormat} onValueChange={setAdFormat} required>
                    <SelectTrigger id="ad-format" className="mt-1">
                      <SelectValue placeholder="Select ad format" />
                    </SelectTrigger>
                    <SelectContent>
                      {adFormatOptions.map(option => (
                        <SelectItem key={option.value} value={option.value || 'none'}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ad-size" className="text-sm font-medium">Ad Size</Label>
                  <Select value={adSize} onValueChange={setAdSize} required>
                    <SelectTrigger id="ad-size" className="mt-1">
                      <SelectValue placeholder="Select ad size" />
                    </SelectTrigger>
                    <SelectContent>
                      {adSizeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value || 'none'}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {adSize === 'custom' && (
                  <>
                    <div>
                      <Label htmlFor="custom-width" className="text-sm font-medium">Width (px)</Label>
                      <Input id="custom-width" type="number" min="1" required={adSize === 'custom'} value={customWidth} onChange={(e) => setCustomWidth(e.target.value)} placeholder="e.g., 320" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="custom-height" className="text-sm font-medium">Height (px)</Label>
                      <Input id="custom-height" type="number" min="1" required={adSize === 'custom'} value={customHeight} onChange={(e) => setCustomHeight(e.target.value)} placeholder="e.g., 50" className="mt-1" />
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <Accordion type="multiple" className="w-full space-y-4">
              <AccordionItem value="advanced-settings" className="border rounded-lg shadow-sm">
                <AccordionTrigger className="px-4 py-3 text-lg font-medium hover:no-underline">Advanced Settings</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 space-y-6">
                  <div className="flex items-start">
                    <div className="flex-grow">
                      <Label htmlFor="ad-txt-content" className="text-sm font-medium">Ad.txt Content</Label>
                      <Textarea id="ad-txt-content" rows={3} placeholder="Enter ad.txt content for authorized digital sellers" value={adTxtContent} onChange={(e) => setAdTxtContent(e.target.value)} className="mt-1" />
                    </div>
                    {renderInfoTooltip("Ad.txt is a text file that publishers place on their websites to publicly declare the companies authorized to sell their digital inventory.")}
                  </div>
                  <div className="flex items-start">
                    <div className="flex-grow">
                      <Label htmlFor="header-code" className="text-sm font-medium">Header Code</Label>
                      <Textarea id="header-code" rows={3} placeholder="Enter any custom header code or scripts" value={headerCode} onChange={(e) => setHeaderCode(e.target.value)} className="mt-1" />
                    </div>
                    {renderInfoTooltip("Custom header code can include tracking pixels, JavaScript tags, or other scripts that need to load before the ad.")}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="header-bidding" checked={headerBidding} onCheckedChange={setHeaderBidding} />
                      <Label htmlFor="header-bidding">Enable Header Bidding</Label>
                    </div>
                    <p className="text-xs text-muted-foreground">Allow multiple Supply-Side Platforms (SSPs) to bid on your inventory simultaneously.</p>
                  </div>
                  {headerBidding && (
                    <div>
                      <Label htmlFor="header-bidding-partners" className="text-sm font-medium">Header Bidding Partners</Label>
                      <Textarea id="header-bidding-partners" rows={2} placeholder="List your header bidding partners (e.g., Rubicon, AppNexus, PubMatic)" value={headerBiddingPartners} onChange={(e) => setHeaderBiddingPartners(e.target.value)} className="mt-1" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="fallback-image" checked={fallbackImage} onCheckedChange={setFallbackImage} />
                      <Label htmlFor="fallback-image">Provide Fallback Image</Label>
                    </div>
                     <p className="text-xs text-muted-foreground">Include a backup image if the main ad fails to load. Relevant for HTML5 ads.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="campaign-settings" className="border rounded-lg shadow-sm">
                <AccordionTrigger className="px-4 py-3 text-lg font-medium hover:no-underline">Campaign Settings</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-end">
                      <div className="flex-grow">
                        <Label htmlFor="start-date" className="text-sm font-medium">Start Date</Label>
                        <Input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1" />
                      </div>
                      <Calendar className="h-5 w-5 text-muted-foreground ml-2 mb-2" />
                    </div>
                    <div className="flex items-end">
                      <div className="flex-grow">
                        <Label htmlFor="end-date" className="text-sm font-medium">End Date</Label>
                        <Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1" />
                      </div>
                      <Calendar className="h-5 w-5 text-muted-foreground ml-2 mb-2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-end">
                      <div className="flex-grow">
                        <Label htmlFor="budget" className="text-sm font-medium">Budget ($)</Label>
                        <Input id="budget" type="number" min="0" step="0.01" placeholder="e.g., 500.00" value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-1" />
                      </div>
                      <DollarSign className="h-5 w-5 text-muted-foreground ml-2 mb-2" />
                    </div>
                    <div className="flex items-end">
                      <div className="flex-grow">
                        <Label htmlFor="bid-strategy" className="text-sm font-medium">Bid Strategy</Label>
                        <Select value={bidStrategy} onValueChange={setBidStrategy}>
                          <SelectTrigger id="bid-strategy" className="mt-1">
                            <SelectValue placeholder="Select bid strategy" />
                          </SelectTrigger>
                          <SelectContent>
                            {bidStrategyOptions.map(option => (
                              <SelectItem key={option.value} value={option.value || 'none'}>{option.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {renderInfoTooltip("The bid strategy determines how you pay for your ad: CPC (cost per click), CPM (cost per thousand impressions), CPA (cost per action), or CPV (cost per view).")}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="targeting-options" className="border rounded-lg shadow-sm">
                <AccordionTrigger className="px-4 py-3 text-lg font-medium hover:no-underline">Targeting Options</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 space-y-6">
                  <div className="flex items-start">
                    <div className="flex-grow">
                      <Label htmlFor="target-audience" className="text-sm font-medium">Target Audience</Label>
                      <Textarea id="target-audience" rows={2} placeholder="Describe your target audience (e.g., age, interests, demographics)" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} className="mt-1" />
                    </div>
                    <Target className="h-5 w-5 text-muted-foreground mt-8 ml-2" />
                  </div>
                  <div className="flex items-start">
                    <div className="flex-grow">
                      <Label htmlFor="target-locations" className="text-sm font-medium">Target Locations</Label>
                      <Textarea id="target-locations" rows={2} placeholder="List target geographic locations (e.g., countries, regions, cities)" value={targetLocations} onChange={(e) => setTargetLocations(e.target.value)} className="mt-1" />
                    </div>
                    {renderInfoTooltip("Specify the geographic locations where you want your ad to be shown. You can target by country, region, city, or even postal code.")}
                  </div>
                  <div>
                    <Label htmlFor="target-devices" className="text-sm font-medium">Target Devices</Label>
                    <Select value={targetDevices} onValueChange={setTargetDevices}>
                      <SelectTrigger id="target-devices" className="mt-1">
                        <SelectValue placeholder="Select target devices" />
                      </SelectTrigger>
                      <SelectContent>
                        {deviceOptions.map(option => (
                          <SelectItem key={option.value} value={option.value || 'none'}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-2">
              <Label className="block text-sm font-medium">Upload Ad Files</Label>
              <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors duration-200 ease-in-out",
                  isDragging ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/70',
                  files.length > 0 ? 'pb-3 pt-4' : 'py-10'
                )}
              >
                <Upload className={cn("h-12 w-12 mb-3", isDragging ? 'text-primary' : 'text-muted-foreground')} />
                <div className="flex text-sm text-muted-foreground">
                  <Label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                  >
                    <span>Upload files</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                  </Label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  HTML, JS, Images, Video, Ad.txt files up to 10MB
                </p>
              </div>
              {files.length > 0 && (
                <ul className="mt-4 w-full space-y-2 max-h-60 overflow-y-auto pr-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between p-3 bg-secondary rounded-md border">
                      <div className="flex items-center space-x-3 overflow-hidden">
                        {getFileIcon(file)}
                        <span className="text-sm text-foreground truncate" title={file.name}>{file.name}</span>
                        <span className="text-xs text-muted-foreground shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeFile(index)} className="h-7 w-7 text-muted-foreground hover:text-destructive">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove file</span>
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <CardFooter className="pt-8 pb-0 px-0 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handlePreview}
                className="w-full sm:w-auto"
                size="lg"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview Ad
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                {isLoading ? 'Uploading...' : 'Upload Ad'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      
      <AdPreview 
        open={showPreview} 
        onOpenChange={setShowPreview} 
        adData={adPreviewData} 
      />
    </>
  );
};

export default UploadAdForm;
