
"use client";

import React, { useState, useCallback } from 'react';
import { Upload, X, Plus, Image as ImageIcon, FileText, Film, Calendar, DollarSign, Target, Info, Loader2, Eye, ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import AdPreview from './ad-preview'; 

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
  const [showPreview, setShowPreview] = useState(false);

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
    if (type.startsWith('image/')) return <ImageIcon className="h-5 w-5 text-primary" />;
    if (type === 'text/html' || type === 'application/javascript') return <FileText className="h-5 w-5 text-orange-500" />;
    if (type.startsWith('video/')) return <Film className="h-5 w-5 text-purple-500" />;
    return <FileText className="h-5 w-5 text-muted-foreground" />;
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

  const renderSectionTitle = (title: string, description?: string) => (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      {description && <p className="text-muted-foreground mt-1">{description}</p>}
    </div>
  );
  
  const renderInfoTooltip = (text: string) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="h-5 w-5 p-0 ml-2 shrink-0 align-middle">
          <Info className="h-4 w-4 text-muted-foreground" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs bg-background border-border text-foreground shadow-lg rounded-md p-3">
        <p className="text-sm">{text}</p>
      </TooltipContent>
    </Tooltip>
  );


  const FormFieldContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={cn("space-y-2", className)}>{children}</div>
  );

  return (
    <>
      <Card className="shadow-2xl rounded-xl">
        <CardHeader className="p-6 sm:p-8 border-b border-border">
          <CardTitle className="text-3xl font-bold text-primary">Create New Ad</CardTitle>
          <CardDescription className="text-md text-muted-foreground">Fill in the details below to upload your ad creative.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            <section>
              {renderSectionTitle("Core Details", "Essential information about your ad creative.")}
              <div className="space-y-6">
                <FormFieldContainer>
                  <Label htmlFor="ad-name" className="text-sm font-medium">Ad Name</Label>
                  <Input id="ad-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Summer Sale Banner Vol. 2" className="mt-1" />
                </FormFieldContainer>
                <FormFieldContainer>
                  <Label htmlFor="ad-description" className="text-sm font-medium">Description</Label>
                  <Textarea id="ad-description" rows={3} placeholder="Briefly describe the ad creative or its campaign goals." value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1" />
                </FormFieldContainer>
              </div>
            </section>

            <Separator className="my-8" />

            <section>
              {renderSectionTitle("Ad Specifications", "Define the format and dimensions of your ad.")}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <FormFieldContainer>
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
                </FormFieldContainer>
                <FormFieldContainer>
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
                </FormFieldContainer>
                {adSize === 'custom' && (
                  <>
                    <FormFieldContainer>
                      <Label htmlFor="custom-width" className="text-sm font-medium">Width (px)</Label>
                      <Input id="custom-width" type="number" min="1" required={adSize === 'custom'} value={customWidth} onChange={(e) => setCustomWidth(e.target.value)} placeholder="e.g., 320" className="mt-1" />
                    </FormFieldContainer>
                    <FormFieldContainer>
                      <Label htmlFor="custom-height" className="text-sm font-medium">Height (px)</Label>
                      <Input id="custom-height" type="number" min="1" required={adSize === 'custom'} value={customHeight} onChange={(e) => setCustomHeight(e.target.value)} placeholder="e.g., 50" className="mt-1" />
                    </FormFieldContainer>
                  </>
                )}
              </div>
            </section>
            
            <Separator className="my-8" />

            <section>
              {renderSectionTitle("Creative Files", "Upload your image, video, or HTML5 ad files.")}
               <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors duration-300 ease-in-out",
                  isDragging ? 'border-primary bg-primary/5' : 'border-input hover:border-primary/70 bg-background',
                  files.length > 0 ? 'pb-4 pt-6' : 'py-12'
                )}
              >
                <Upload className={cn("h-12 w-12 mb-4", isDragging ? 'text-primary' : 'text-muted-foreground')} />
                <div className="flex text-sm text-muted-foreground">
                  <Label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                  >
                    <span>Click to upload files</span>
                  </Label>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Supports: Images, Videos, HTML/JS. Max 10MB per file.
                </p>
              </div>
              {files.length > 0 && (
                <div className="mt-6 space-y-3 max-h-72 overflow-y-auto pr-2 rounded-lg border border-border p-4 bg-secondary/30">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 overflow-hidden">
                        {getFileIcon(file)}
                        <div className="flex flex-col">
                           <span className="text-sm font-medium text-foreground truncate" title={file.name}>{file.name}</span>
                           <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeFile(index)} className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove file</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <Separator className="my-8" />
            
            <Accordion type="multiple" className="w-full space-y-6">
              {[
                {id: "advanced-settings", title: "Advanced AdTech Settings", description: "Configure technical aspects like Ad.txt and header bidding.", icon: <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 text-primary" />},
                {id: "campaign-settings", title: "Campaign Configuration", description: "Set up campaign duration, budget, and bidding strategies.", icon: <Calendar className="h-5 w-5 shrink-0 text-primary" />},
                {id: "targeting-options", title: "Audience Targeting", description: "Define who will see your ad based on demographics and location.", icon: <Target className="h-5 w-5 shrink-0 text-primary" />}
              ].map(item => (
                <AccordionItem value={item.id} key={item.id} className="border border-border rounded-xl shadow-sm overflow-hidden bg-card">
                  <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline hover:bg-secondary/50 transition-colors data-[state=open]:bg-secondary/50 data-[state=open]:border-b data-[state=open]:border-border">
                    <div className="flex items-center space-x-3">
                       {React.cloneElement(item.icon, { className: cn(item.icon.props.className, "group-data-[state=open]:hidden") })}
                       <ChevronUp className="h-5 w-5 shrink-0 transition-transform duration-200 text-primary group-data-[state=closed]:hidden" />
                      <div>
                        {item.title}
                        <p className="text-sm font-normal text-muted-foreground mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-6 space-y-6 bg-background/50 border-t border-border">
                    {item.id === "advanced-settings" && (
                      <>
                        <FormFieldContainer>
                          <Label htmlFor="ad-txt-content" className="text-sm font-medium flex items-center">Ad.txt Content {renderInfoTooltip("Ad.txt is a text file that publishers place on their websites to publicly declare the companies authorized to sell their digital inventory.")}</Label>
                          <Textarea id="ad-txt-content" rows={3} placeholder="Enter ad.txt content for authorized digital sellers" value={adTxtContent} onChange={(e) => setAdTxtContent(e.target.value)} className="mt-1" />
                        </FormFieldContainer>
                        <FormFieldContainer>
                          <Label htmlFor="header-code" className="text-sm font-medium flex items-center">Header Code {renderInfoTooltip("Custom header code can include tracking pixels, JavaScript tags, or other scripts that need to load before the ad.")}</Label>
                          <Textarea id="header-code" rows={3} placeholder="Enter any custom header code or scripts" value={headerCode} onChange={(e) => setHeaderCode(e.target.value)} className="mt-1" />
                        </FormFieldContainer>
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center space-x-3">
                            <Switch id="header-bidding" checked={headerBidding} onCheckedChange={setHeaderBidding} />
                            <Label htmlFor="header-bidding" className="font-medium">Enable Header Bidding</Label>
                          </div>
                          <p className="text-xs text-muted-foreground pl-12">Allow multiple Supply-Side Platforms (SSPs) to bid on your inventory simultaneously.</p>
                        </div>
                        {headerBidding && (
                          <FormFieldContainer className="pl-12">
                            <Label htmlFor="header-bidding-partners" className="text-sm font-medium">Header Bidding Partners</Label>
                            <Textarea id="header-bidding-partners" rows={2} placeholder="List your header bidding partners (e.g., Rubicon, AppNexus, PubMatic)" value={headerBiddingPartners} onChange={(e) => setHeaderBiddingPartners(e.target.value)} className="mt-1" />
                          </FormFieldContainer>
                        )}
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center space-x-3">
                            <Switch id="fallback-image" checked={fallbackImage} onCheckedChange={setFallbackImage} />
                            <Label htmlFor="fallback-image" className="font-medium">Provide Fallback Image</Label>
                          </div>
                          <p className="text-xs text-muted-foreground pl-12">Include a backup image if the main ad fails to load. Relevant for HTML5 ads.</p>
                        </div>
                      </>
                    )}
                    {item.id === "campaign-settings" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <FormFieldContainer>
                            <Label htmlFor="start-date" className="text-sm font-medium">Start Date</Label>
                            <div className="relative mt-1">
                                <Input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="pr-10" />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                            </div>
                        </FormFieldContainer>
                         <FormFieldContainer>
                            <Label htmlFor="end-date" className="text-sm font-medium">End Date</Label>
                             <div className="relative mt-1">
                                <Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="pr-10" />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                            </div>
                        </FormFieldContainer>
                        <FormFieldContainer>
                            <Label htmlFor="budget" className="text-sm font-medium">Budget ($)</Label>
                            <div className="relative mt-1">
                                <Input id="budget" type="number" min="0" step="0.01" placeholder="e.g., 500.00" value={budget} onChange={(e) => setBudget(e.target.value)} className="pl-7" />
                                <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                            </div>
                        </FormFieldContainer>
                        <FormFieldContainer>
                          <Label htmlFor="bid-strategy" className="text-sm font-medium flex items-center">Bid Strategy {renderInfoTooltip("The bid strategy determines how you pay for your ad: CPC (cost per click), CPM (cost per thousand impressions), CPA (cost per action), or CPV (cost per view).")}</Label>
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
                        </FormFieldContainer>
                      </div>
                    )}
                    {item.id === "targeting-options" && (
                      <>
                        <FormFieldContainer>
                          <Label htmlFor="target-audience" className="text-sm font-medium flex items-center">Target Audience <Target className="h-4 w-4 text-muted-foreground ml-1.5" /></Label>
                          <Textarea id="target-audience" rows={2} placeholder="Describe your target audience (e.g., age, interests, demographics)" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} className="mt-1" />
                        </FormFieldContainer>
                        <FormFieldContainer>
                          <Label htmlFor="target-locations" className="text-sm font-medium flex items-center">Target Locations {renderInfoTooltip("Specify the geographic locations where you want your ad to be shown. You can target by country, region, city, or even postal code.")}</Label>
                          <Textarea id="target-locations" rows={2} placeholder="List target geographic locations (e.g., countries, regions, cities)" value={targetLocations} onChange={(e) => setTargetLocations(e.target.value)} className="mt-1" />
                        </FormFieldContainer>
                        <FormFieldContainer>
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
                        </FormFieldContainer>
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <CardFooter className="pt-10 pb-0 px-0 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 border-t border-border mt-12">
              <Button
                type="button"
                variant="outline"
                onClick={handlePreview}
                className="w-full sm:w-auto"
                size="lg"
              >
                <Eye className="mr-2 h-5 w-5" />
                Preview Ad
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-5 w-5" /> // Changed from Plus to Upload for better context
                )}
                {isLoading ? 'Submitting...' : 'Submit Ad Creative'}
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
