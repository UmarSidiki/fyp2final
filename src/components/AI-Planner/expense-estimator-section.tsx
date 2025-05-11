'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { DollarSign } from 'lucide-react';
import { useState } from 'react';

const cities = ['lahore', 'karachi', 'islamabad', 'swat', 'murree'];

function CitySearchBox({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn('w-full justify-between', !value && 'text-muted-foreground')}
          >
            {value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Select city'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
              {cities.map(city => (
                <CommandItem
                  key={city}
                  value={city}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {city.charAt(0).toUpperCase() + city.slice(1)}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default function ExpenseEstimatorSection() {
  const [fromCity, setFromCity] = useState('lahore');
  const [toCity, setToCity] = useState('islamabad');
  const [days, setDays] = useState(5);
  const [accommodationLevel, setAccommodationLevel] = useState('mid');
  const [totalEstimate, setTotalEstimate] = useState<number | null>(null);

  const cityBasePrices: { [key: string]: number } = {
    lahore: 40,
    karachi: 50,
    islamabad: 60,
    swat: 45,
    murree: 55,
  };

  const getDistanceCost = (from: string, to: string) => {
    if (from === to) {
      return 0;
    }
    return 15 + Math.abs(cityBasePrices[from] - cityBasePrices[to]);
  };

  const handleCalculate = () => {
    const basePrice = cityBasePrices[toCity] || 50;
    const distanceCost = getDistanceCost(fromCity, toCity);

    let multiplier = 1;
    switch (accommodationLevel) {
      case 'budget':
        multiplier = 0.3;
        break;
      case 'mid':
        multiplier = 0.6;
        break;
      case 'luxury':
        multiplier = 1;
        break;
    }

    const estimate = Math.round((basePrice * days + distanceCost) * multiplier);
    setTotalEstimate(estimate);
  };

  return (
    <Card className="h-fit flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
          <CardTitle>Pakistan Travel Budget Estimator</CardTitle>
        </div>
        <CardDescription>Estimate your trip cost within Pakistan</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <CitySearchBox label="From" value={fromCity} onChange={setFromCity} />
        <CitySearchBox label="To" value={toCity} onChange={setToCity} />

        <div className="space-y-2">
          <Label>
            Duration (days):
            {days}
          </Label>
          <Slider min={1} max={14} step={1} value={[days]} onValueChange={val => setDays(val[0])} />
        </div>

        <div className="space-y-2 ">
          <Label>Accommodation Level</Label>
          <select
            className="w-full border p-2 rounded-md "
            value={accommodationLevel}
            onChange={e => setAccommodationLevel(e.target.value)}
          >
            <option className="text-black" value="budget">Budget</option>
            <option className="text-black" value="mid">Mid-range</option>
            <option className="text-black" value="luxury">Luxury</option>
          </select>
        </div>

        {totalEstimate !== null && (
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold">Estimated Cost</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              PKR
              {totalEstimate * 280}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">per person (approx)</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleCalculate} className="w-full bg-green-700 text-white">
          Calculate Estimate
        </Button>
      </CardFooter>
    </Card>
  );
}
