'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function HeroSection() {
  const [date, setDate] = useState<Date>();
  const [destination, setDestination] = useState('');

  return (
    <section className="py-12 md:py-20 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">
          Your AI-Powered Travel Companion
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-300">
          Plan your perfect trip with the help of our AI tools. Get personalized recommendations, optimize your route,
          and make the most of your travel experience.
        </p>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Start Planning Your Trip</h2>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Where do you want to go?"
                className="pl-10"
                value={destination}
                onChange={e => setDestination(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white">Plan My Trip</Button>
        </div>
      </div>
    </section>
  );
}
