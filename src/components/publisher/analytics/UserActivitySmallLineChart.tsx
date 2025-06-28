
"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowRight, ChevronDown, CheckCircle } from 'lucide-react';

interface UserActivitySmallLineChartProps {
  title: string;
  data: { period: string; users: number, fill: string }[]; // fill for dot color
}

const UserActivitySmallLineChart: React.FC<UserActivitySmallLineChartProps> = ({ title, data }) => {
  // Re-structure data for multiple lines if needed, or use one line with categories
  const chartData = data.map(item => ({ name: item.period, users: item.users, fill: item.fill }));

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
      <CardContent className="pt-0 pb-4 px-4 flex-grow">
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={chartData} margin={{ top: 10, right: 5, left: -30, bottom: 0 }}>
            {/* XAxis might be omitted for simplicity like in GA, or kept minimal */}
            <XAxis dataKey="name" hide />
            <YAxis 
                tickFormatter={(value) => value >= 1000 ? `${value/1000}K` : value} 
                fontSize={10} 
                stroke="hsl(var(--muted-foreground))"
                axisLine={false}
                tickLine={false}
                domain={[0, 'dataMax + 50']}
            />
            <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', fontSize: '10px', padding: '4px 8px' }}
                labelStyle={{ display: 'none' }} // Hide label (period name) as it's implicit
                formatter={(value: number, name: string, props: any) => {
                    return [<span style={{color: props.payload.fill}}>{value.toLocaleString()}</span>, props.payload.name];
                }}
            />
            {/* Create separate lines if data structure is for it, or map one line and color dots */}
            <Line 
                type="monotone" 
                dataKey="users" 
                stroke="hsl(var(--muted-foreground))" // A neutral line color
                strokeWidth={1.5} 
                dot={(props) => {
                    const { cx, cy, payload } = props;
                    return <circle cx={cx} cy={cy} r={3} fill={payload.fill} />;
                }}
                activeDot={{ r: 5 }}
                name="Users" // This will be overridden by formatter if used
            />
          </LineChart>
        </ResponsiveContainer>
         <div className="mt-3 space-y-1">
          {data.map((item) => (
            <div key={item.period} className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full mr-1.5" style={{ backgroundColor: item.fill }}></span>
                <span className="text-muted-foreground">{item.period}</span>
              </div>
              <span className="font-medium text-foreground">{item.users.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
      {/* No "View report" link in this specific GA card */}
    </Card>
  );
};

export default UserActivitySmallLineChart;
