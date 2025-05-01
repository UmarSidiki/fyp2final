'use client';

import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Search } from 'lucide-react';
import { useState } from 'react';

type Event = {
  id: number;
  name: string;
  date: string;
  type: string;
};

export default function EventRecommenderSection() {
  const [location, setLocation] = useState('');
  const [events, setEvents] = useState<Event[]>([
    { id: 1, name: 'Paris Jazz Festival', date: 'June 15-30', type: 'music' },
    { id: 2, name: 'Louvre Night Exhibition', date: 'May 20', type: 'art' },
    { id: 3, name: 'Seine River Food Festival', date: 'July 5-7', type: 'food' },
    { id: 4, name: 'Bastille Day Celebration', date: 'July 14', type: 'cultural' },
    { id: 5, name: 'Paris Fashion Week', date: 'September 25-October 3', type: 'fashion' },
  ]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would fetch events from an API
    // console.log('Searching for events in:', location);
    // Mock update for demo purposes
    if (location.trim()) {
      // Just filter the existing events for demo
      setFilteredEvents(events.filter(event => event.name.toLowerCase().includes(location.toLowerCase())));
    } else {
      setFilteredEvents(events);
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'music':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'art':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'food':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cultural':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'fashion':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
          <CardTitle>Local Event Recommender</CardTitle>
        </div>
        <CardDescription>Discover events and festivals at your destination</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <Input
            placeholder="Search events..."
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        <ScrollArea className="h-[220px]">
          <div className="space-y-3">
            {filteredEvents.map(event => (
              <div key={event.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{event.name}</h3>
                  <Badge className={getBadgeColor(event.type)}>{event.type}</Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{event.date}</p>
              </div>
            ))}
            {filteredEvents.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No events found. Try a different search term.
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full  bg-green-700 text-white dark:bg-green-700" onClick={() => setFilteredEvents(events)}>
          Show All Events
        </Button>
      </CardFooter>
    </Card>
  );
}
