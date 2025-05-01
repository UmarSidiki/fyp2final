/* eslint-disable react/no-array-index-key */
'use client';

import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Plus, X } from 'lucide-react';
import { useState } from 'react';

export default function RouteOptimizerSection() {
  const [newLocation, setNewLocation] = useState('');
  const [locations, setLocations] = useState<string[]>(['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral']);
  const [optimizedRoute, setOptimizedRoute] = useState<string[]>([]);

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLocation.trim() && !locations.includes(newLocation)) {
      setLocations([...locations, newLocation]);
      setNewLocation('');
    }
  };

  const handleRemoveLocation = (location: string) => {
    setLocations(locations.filter(loc => loc !== location));
  };

  const handleOptimizeRoute = () => {
    // In a real app, this would call an AI service to optimize the route
    // For demo purposes, we'll just shuffle the array
    const shuffled = [...locations].sort(() => 0.5 - Math.random());
    setOptimizedRoute(shuffled);
  };

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
          <CardTitle>Route Optimizer</CardTitle>
        </div>
        <CardDescription>Plan the most efficient route between attractions</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <form onSubmit={handleAddLocation} className="flex gap-2 mb-4">
          <Input
            placeholder="Add attraction or location..."
            value={newLocation}
            onChange={e => setNewLocation(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </form>

        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Your Attractions:</h3>
          <ScrollArea className="h-[100px]">
            <div className="flex flex-wrap gap-2">
              {locations.map((location, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {location}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveLocation(location)} />
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>

        {optimizedRoute.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Optimized Route:</h3>
            <ScrollArea className="h-[100px]">
              <ol className="list-decimal pl-5 space-y-1">
                {optimizedRoute.map((location, index) => (
                  <li key={index}>{location}</li>
                ))}
              </ol>
            </ScrollArea>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button onClick={handleOptimizeRoute} className="w-full  bg-green-700 text-white" disabled={locations.length < 2}>
          Optimize Route
        </Button>
      </CardFooter>
    </Card>
  );
}
