/* eslint-disable react/no-array-index-key */
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Plus, X } from 'lucide-react';
import { useState } from 'react';

export default function RouteOptimizerSection() {
  const [newLocation, setNewLocation] = useState('');
  const [locations, setLocations] = useState<string[]>(['Lahore', 'Islamabad', 'Karachi']);
  const [optimizedRoute, setOptimizedRoute] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLocation.trim() && !locations.includes(newLocation)) {
      setLocations([...locations, newLocation.trim()]);
      setNewLocation('');
    }
  };

  const handleRemoveLocation = (locationToRemove: string) => {
    setLocations(prev => prev.filter(loc => loc !== locationToRemove));
    setOptimizedRoute(prev => prev.filter(loc => loc !== locationToRemove));
  };

  const handleOptimizeRoute = async () => {
    if (locations.length < 2) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`https://router.project-osrm.org/trip/v1/driving/${
        encodeURIComponent(locations.join(';'))
      }?source=first&roundtrip=false&overview=false`);

      const data = await response.json();

      if (data.trips && data.trips.length > 0) {
        const ordered = data.waypoints.sort((a: any, b: any) => a.waypoint_index - b.waypoint_index);
        const orderedLocations = ordered.map((wp: any) => locations[wp.waypoint_index]);
        setOptimizedRoute(orderedLocations);
      } else {
        setOptimizedRoute([...locations]);
      }
    } catch (err) {
      console.error('Failed to fetch optimized route:', err);
      setOptimizedRoute([...locations]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="min-h-[400px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
          <CardTitle>Route Optimizer</CardTitle>
        </div>
        <CardDescription>Plan the most efficient route between cities in Pakistan</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <form onSubmit={handleAddLocation} className="flex gap-2 mb-4">
          <Input
            placeholder="Add city (e.g., Faisalabad)"
            value={newLocation}
            onChange={e => setNewLocation(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </form>

        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Your Cities:</h3>
          <ScrollArea className="h-[100px]">
            <div className="flex flex-wrap gap-2">
              {locations.map(location => (
                <Badge key={location} variant="secondary" className="flex items-center gap-1 pr-1">
                  <span>{location}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveLocation(location)}
                    className="hover:text-red-500"
                  >
                    <X className="h-3 w-3 ml-1" />
                  </button>
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
        <Button onClick={handleOptimizeRoute} className="w-full bg-green-700 text-white" disabled={locations.length < 2 || loading}>
          {loading ? 'Optimizing...' : 'Optimize Route'}
        </Button>
      </CardFooter>
    </Card>
  );
}
