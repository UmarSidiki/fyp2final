'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { DollarSign } from 'lucide-react';
import { useState } from 'react';

export default function ExpenseEstimatorSection() {
  const [destination, setDestination] = useState('paris');
  const [days, setDays] = useState(5);
  const [accommodationLevel, setAccommodationLevel] = useState('mid');
  const [totalEstimate, setTotalEstimate] = useState<number | null>(null);

  const handleCalculate = () => {
    // In a real app, this would call an AI service to estimate expenses
    // For demo purposes, we'll use a simple calculation
    let basePrice = 0;

    switch (destination) {
      case 'paris':
        basePrice = 150;
        break;
      case 'tokyo':
        basePrice = 180;
        break;
      case 'newyork':
        basePrice = 200;
        break;
      case 'bali':
        basePrice = 100;
        break;
      default:
        basePrice = 150;
    }

    let accommodationMultiplier = 1;
    switch (accommodationLevel) {
      case 'budget':
        accommodationMultiplier = 0.7;
        break;
      case 'mid':
        accommodationMultiplier = 1;
        break;
      case 'luxury':
        accommodationMultiplier = 2;
        break;
      default:
        accommodationMultiplier = 1;
    }

    const estimate = Math.round(basePrice * days * accommodationMultiplier);
    setTotalEstimate(estimate);
  };

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
          <CardTitle>Expense Estimator</CardTitle>
        </div>
        <CardDescription>Calculate your travel budget</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger id="destination">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paris">Paris</SelectItem>
                <SelectItem value="tokyo">Tokyo</SelectItem>
                <SelectItem value="newyork">New York</SelectItem>
                <SelectItem value="bali">Bali</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="days">
                Duration (days):
                {days}
              </Label>
            </div>
            <Slider id="days" min={1} max={14} step={1} value={[days]} onValueChange={value => setDays(value[0] ?? days)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accommodation">Accommodation Level</Label>
            <Select value={accommodationLevel} onValueChange={setAccommodationLevel}>
              <SelectTrigger id="accommodation">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="mid">Mid-range</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {totalEstimate !== null && (
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold">Estimated Cost</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                $
                {totalEstimate}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">per person</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button onClick={handleCalculate} className="w-full bg-green-700 text-white">
          Calculate Estimate
        </Button>
      </CardFooter>
    </Card>
  );
}
