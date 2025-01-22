import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface BusinessData {
  name: string;
  address: string;
  phone: string;
  rating: string;
  reviews: string;
  website?: string;
}

interface ResultsTableProps {
  data: BusinessData[];
  onExport: () => void;
}

export const ResultsTable = ({ data, onExport }: ResultsTableProps) => {
  if (!data.length) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={onExport} className="flex items-center gap-2">
          <Download size={16} />
          Export CSV
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Reviews</TableHead>
              <TableHead>Website</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((business, index) => (
              <TableRow key={index}>
                <TableCell>{business.name}</TableCell>
                <TableCell>{business.address}</TableCell>
                <TableCell>{business.phone}</TableCell>
                <TableCell>{business.rating}</TableCell>
                <TableCell>{business.reviews}</TableCell>
                <TableCell>
                  {business.website && (
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Visit
                    </a>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};