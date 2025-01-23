import { useState, useEffect } from "react";
import { SearchForm } from "@/components/SearchForm";
import { ResultsTable } from "@/components/ResultsTable";
import { scrapeGoogleMaps } from "@/services/scrapeService";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BusinessData {
  name: string;
  address: string;
  phone: string;
  rating: string;
  reviews: string;
  website?: string;
}

const Index = () => {
  const [results, setResults] = useState<BusinessData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('SERPER_API_KEY') || '');

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('SERPER_API_KEY', apiKey);
    toast({
      title: "Success",
      description: "API key has been saved",
    });
  };

  const handleSearch = async (businessType: string, location: string) => {
    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please set your Serper.dev API key first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResults([]); // Clear previous results
    
    try {
      const scrapeGenerator = scrapeGoogleMaps(businessType, location);
      
      for await (const newResults of scrapeGenerator) {
        setResults(prevResults => [...prevResults, ...newResults]);
      }

      toast({
        title: "Success",
        description: `Scraping completed`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch business data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    const headers = ["Name", "Address", "Phone", "Rating", "Reviews", "Website"];
    const csvContent = [
      headers.join(","),
      ...results.map(business => 
        [
          `"${business.name}"`,
          `"${business.address}"`,
          `"${business.phone}"`,
          business.rating,
          business.reviews,
          `"${business.website || ''}"`
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "business_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Google Maps Business Scraper
      </h1>
      
      <div className="mb-8 p-4 border rounded-lg">
        <form onSubmit={handleApiKeySubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Serper.dev API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Serper.dev API key"
            />
          </div>
          <Button type="submit">Save API Key</Button>
        </form>
      </div>

      <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      <ResultsTable data={results} onExport={handleExport} />
    </div>
  );
};

export default Index;