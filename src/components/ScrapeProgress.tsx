import { Progress } from "@/components/ui/progress";

interface ScrapeProgressProps {
  totalScraped: number;
}

export const ScrapeProgress = ({ totalScraped }: ScrapeProgressProps) => {
  return (
    <div className="w-full space-y-2 mb-4">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Scraping Progress</span>
        <span>{totalScraped} businesses found</span>
      </div>
      <Progress value={100} className="h-2" />
    </div>
  );
};