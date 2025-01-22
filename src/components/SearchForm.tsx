import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFormProps {
  onSearch: (businessType: string, location: string) => void;
  isLoading: boolean;
}

export const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [businessType, setBusinessType] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(businessType, location);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
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