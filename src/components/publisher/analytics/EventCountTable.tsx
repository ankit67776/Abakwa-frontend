
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowRight, ChevronDown, CheckCircle } from 'lucide-react';

interface EventCountTableProps {
  title: string;
  data: {
    headers: string[];
    rows: (string | number)[][];
    columnAlignments?: ('left' | 'right' | 'center')[];
  };
}

const EventCountTable: React.FC<EventCountTableProps> = ({ title, data }) => {
  const displayRows = data.rows.slice(0, 7); // Display top 7 like GA

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-xs font-medium text-muted-foreground flex items-center">
          {title} <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
        </CardTitle>
         <div className="flex items-center space-x-1">
            <CheckCircle className="h-3.5 w-3.5 text-green-500" />
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground opacity-70" />
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-4 px-2 sm:px-4 flex-grow">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {data.headers.map((header, index) => (
                  <TableHead 
                    key={header} 
                    className={`text-[10px] uppercase tracking-wider px-2 py-1.5 h-auto ${data.columnAlignments?.[index] === 'right' ? 'text-right' : 'text-left'}`}
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayRows.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="text-xs hover:bg-muted/30">
                  {row.map((cell, cellIndex) => (
                    <TableCell 
                      key={cellIndex} 
                      className={`px-2 py-1.5 ${data.columnAlignments?.[cellIndex] === 'right' ? 'text-right font-medium text-foreground' : 'text-left text-muted-foreground'}`}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <div className="px-4 pb-3 mt-auto border-t pt-3">
        <Button variant="link" size="sm" className="text-xs text-primary p-0 h-auto hover:underline">
          View events <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
};

export default EventCountTable;
