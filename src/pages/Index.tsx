import { useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { ResultsTable } from "@/components/ResultsTable";
import { scrapeGoogleMaps } from "@/services/scrapeService";
import { toast } from "@/components/ui/use-toast";

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

  const handleSearch = async (businessType: string, location: string) => {
    setIsLoading(true);
    try {
      const data = await scrapeGoogleMaps(businessType, location);
      setResults(data);
      toast({
        title: "Success",
        description: `Found ${data.length} businesses`,
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
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      <ResultsTable data={results} onExport={handleExport} />
    </div>
  );
};

export default Index;