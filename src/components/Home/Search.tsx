'use client';
import type { TravelSuggestion } from '@/components/TravelSuggestionsPopup';
import TravelSuggestionsPopup from '@/components/TravelSuggestionsPopup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';

// Demo data for travel suggestions
const demoSuggestions = [
  {
    destination: 'Quetta',
    budget: 500,
    tripDuration: 3,
    suggestions: [
      { place: 'Ziarat Valley', description: 'A scenic hill station with pine forests.', cost: 200 },
      { place: 'Hanna Lake', description: 'A beautiful lake surrounded by mountains.', cost: 100 },
      { place: 'Quetta Bazaar', description: 'Explore local markets and cuisine.', cost: 150 },
    ],
  },
  {
    destination: 'Islamabad',
    budget: 1000,
    tripDuration: 5,
    suggestions: [
      { place: 'Margalla Hills', description: 'Hiking trails with stunning views.', cost: 300 },
      { place: 'Faisal Mosque', description: 'A modern architectural marvel.', cost: 100 },
      { place: 'Daman-e-Koh', description: 'A viewpoint overlooking the city.', cost: 200 },
    ],
  },
];

type TravelSearchProps = {
  initialDestination?: string;
  onDestinationChange: (destination: string) => void;
  onSubmit: (formData: { destination: string; budget: string; tripDuration: number | undefined }) => Promise<TravelSuggestion[]>;
  className?: string;
};

/**
 * A reusable travel search form component with dark/light mode support, mobile responsiveness, glass effect, and bottom overflow.
 * @param initialDestination - Initial value for the destination input.
 * @param onDestinationChange - Callback to handle destination changes.
 * @param onSubmit - Callback to handle form submission and fetch suggestions.
 * @param className - Additional CSS classes for styling.
 */
export default function TravelSearch({
  initialDestination = 'Quetta',
  onDestinationChange,
  onSubmit,
  className,
}: TravelSearchProps) {
  const [destination, setDestination] = useState(initialDestination);
  const [budget, setBudget] = useState('');
  const [tripDuration, setTripDuration] = useState<number | undefined>(undefined);
  const [suggestions, setSuggestions] = useState<TravelSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  // Handle destination change and notify parent
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDestination = e.target.value;
    setDestination(newDestination);
    onDestinationChange(newDestination);
  };

  // Handle trip duration change
  const handleTripDurationChange = (value: string) => {
    setTripDuration(Number.parseInt(value, 10));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use demo data for now, but in production, this would be an API call
      const filteredSuggestions = demoSuggestions
        .filter(
          suggestion =>
            suggestion.destination.toLowerCase() === destination.toLowerCase()
            && (!budget || suggestion.budget <= Number.parseFloat(budget))
            && (!tripDuration || suggestion.tripDuration === tripDuration),
        )
        .flatMap(suggestion => suggestion.suggestions);

      // Simulate API call with onSubmit prop
      const fetchedSuggestions = await onSubmit({ destination, budget, tripDuration });
      setSuggestions(fetchedSuggestions.length > 0 ? fetchedSuggestions : filteredSuggestions);
      setOpen(true);
    } catch (err) {
      setError(`Failed to fetch suggestions. Please try again. ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        // More responsive positioning with better container alignment
        'fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto sm:left-auto w-full z-10 mx-auto',
        // Container size and shape improvements
        'max-w-screen-lg px-4 sm:px-6 mx-auto',
        className,
      )}
    >
      <div
        className={cn(
          // Glass effect container with improved padding and rounded corners
          'p-6 sm:p-8 rounded-t-xl sm:rounded-xl shadow-lg',
          // Glass effect: semi-transparent background with blur
          'backdrop-blur-md border',
          // Dark/light mode styles
          theme === 'dark'
            ? 'bg-black/40 border-white/10 text-white'
            : 'bg-white/40 border-neutral-200/50 text-neutral-900',
        )}
      >
        {/* Form Grid Layout - Improved responsiveness */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Destination Input */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="destination-input"
              className={cn(
                'text-sm font-medium',
                theme === 'dark' ? 'text-neutral-200' : 'text-neutral-700',
              )}
            >
              Destination
            </label>
            <Input
              id="destination-input"
              placeholder="Where to?"
              value={destination}
              onChange={handleDestinationChange}
              className={cn(
                'text-base w-full', // Full width in the grid cell
                theme === 'dark'
                  ? 'bg-neutral-800/60 text-white border-neutral-600 focus:border-neutral-400'
                  : 'bg-white/60 text-neutral-900 border-neutral-300 focus:border-neutral-500',
              )}
            />
          </div>

          {/* Budget Input */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="budget-input"
              className={cn(
                'text-sm font-medium',
                theme === 'dark' ? 'text-neutral-200' : 'text-neutral-700',
              )}
            >
              Budget
            </label>
            <Input
              id="budget-input"
              type="number"
              placeholder="How much?"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              className={cn(
                'text-base w-full', // Full width in the grid cell
                theme === 'dark'
                  ? 'bg-neutral-800/60 text-white border-neutral-600 focus:border-neutral-400'
                  : 'bg-white/60 text-neutral-900 border-neutral-300 focus:border-neutral-500',
              )}
            />
          </div>

          {/* Trip Duration Dropdown */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="trip-duration-select"
              className={cn(
                'text-sm font-medium',
                theme === 'dark' ? 'text-neutral-200' : 'text-neutral-700',
              )}
            >
              Trip Duration
            </label>
            <Select
              value={tripDuration?.toString()}
              onValueChange={handleTripDurationChange}
            >
              <SelectTrigger
                id="trip-duration-select"
                className={cn(
                  'w-full text-base h-10',
                  !tripDuration && 'text-muted-foreground',
                  theme === 'dark'
                    ? 'bg-neutral-800/60 text-white border-neutral-600 hover:bg-neutral-700/60'
                    : 'bg-white/60 text-neutral-900 border-neutral-300 hover:bg-neutral-100/60',
                )}
              >
                <SelectValue placeholder="Select days" />
              </SelectTrigger>
              <SelectContent
                className={cn(
                  theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-900',
                )}
              >
                {[1, 2, 3, 4, 5, 7, 10, 14, 21, 30].map(days => (
                  <SelectItem key={days} value={days.toString()}>
                    {days}
                    {' '}
                    {days === 1 ? 'day' : 'days'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Find Adventures Button - Fixed alignment without hidden label */}
          <div className="flex flex-col justify-end">
            <Button
              onClick={handleSubmit}
              className={cn(
                'w-full text-base h-10',
                'bg-green-600 text-white hover:bg-green-700',
                theme === 'dark' && 'hover:bg-green-600/90',
              )}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Find Adventures'}
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p
            className={cn(
              'text-sm mt-4 text-center',
              theme === 'dark' ? 'text-red-400' : 'text-red-500',
            )}
          >
            {error}
          </p>
        )}

        {/* Suggestions Popup */}
        <TravelSuggestionsPopup
          destination={destination}
          suggestions={suggestions}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    </div>
  );
}
