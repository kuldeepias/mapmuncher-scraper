import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface SearchFormProps {
  onSearch: (businessType: string, location: string) => void;
  isLoading: boolean;
}

export const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [businessType, setBusinessType] = useState('');
  const [location, setLocation] = useState('');
  const [apiKey, setApiKey] = useState(localStorage.getItem('crawl4ai_api_key') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Crawl4AI API key",
        variant: "destructive"
      });
      return;
    }
    localStorage.setItem('crawl4ai_api_key', apiKey);
    onSearch(businessType, location);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Enter Crawl4AI API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="max-w-md"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Business Type (e.g., dentist)"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          required
        />
        <Input
          placeholder="Location (e.g., ranchi)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
    </form>
  );
};