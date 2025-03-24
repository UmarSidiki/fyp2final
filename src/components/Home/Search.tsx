'use client';
import type { TravelSuggestion } from '@/components/TravelSuggestionsPopup';
import TravelSuggestionsPopup from '@/components/TravelSuggestionsPopup';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';

// Demo data for travel suggestions
const demoSuggestions = [
  {
    destination: 'Quetta',
    budget: 500,
    travelDate: '2025-04-01',
    suggestions: [
      { place: 'Ziarat Valley', description: 'A scenic hill station with pine forests.', cost: 200 },
      { place: 'Hanna Lake', description: 'A beautiful lake surrounded by mountains.', cost: 100 },
      { place: 'Quetta Bazaar', description: 'Explore local markets and cuisine.', cost: 150 },
    ],
  },
  {
    destination: 'Islamabad',
    budget: 1000,
    travelDate: '2025-04-01',
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
  onSubmit: (formData: { destination: string; budget: string; travelDate: Date | undefined }) => Promise<TravelSuggestion[]>;
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
  const [travelDate, setTravelDate] = useState<Date | undefined>(undefined);
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
            && (!travelDate || suggestion.travelDate === format(travelDate, 'yyyy-MM-dd')),
        )
        .flatMap(suggestion => suggestion.suggestions);

      // Simulate API call with onSubmit prop
      const fetchedSuggestions = await onSubmit({ destination, budget, travelDate });
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
            : 'bg-white/40 border-gray-200/50 text-gray-900',
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
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700',
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
                  ? 'bg-gray-800/60 text-white border-gray-600 focus:border-gray-400'
                  : 'bg-white/60 text-gray-900 border-gray-300 focus:border-gray-500',
              )}
            />
          </div>

          {/* Budget Input */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="budget-input"
              className={cn(
                'text-sm font-medium',
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700',
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
                  ? 'bg-gray-800/60 text-white border-gray-600 focus:border-gray-400'
                  : 'bg-white/60 text-gray-900 border-gray-300 focus:border-gray-500',
              )}
            />
          </div>

          {/* Trip Duration Picker */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="trip-duration-btn"
              className={cn(
                'text-sm font-medium',
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700',
              )}
            >
              Trip Duration
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="trip-duration-btn"
                  variant="outline"
                  className={cn(
                    'w-full text-base justify-start text-left font-normal',
                    !travelDate && 'text-muted-foreground',
                    theme === 'dark'
                      ? 'bg-gray-800/60 text-white border-gray-600 hover:bg-gray-700/60'
                      : 'bg-white/60 text-gray-900 border-gray-300 hover:bg-gray-100/60',
                  )}
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {travelDate ? format(travelDate, 'PPP') : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={cn(
                  'w-auto p-0',
                  theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900',
                )}
              >
                <Calendar
                  mode="single"
                  selected={travelDate}
                  onSelect={setTravelDate}
                  initialFocus
                  className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Find Adventures Button - Fixed alignment without hidden label */}
          <div className="flex flex-col justify-end lg:pb-0">
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
