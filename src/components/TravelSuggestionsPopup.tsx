/* eslint-disable jsdoc/check-param-names */
/* eslint-disable react/no-array-index-key */
'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React from 'react';

export type TravelSuggestion = {
  place: string;
  description: string;
  cost: number;
};

type TravelSuggestionsPopupProps = {
  destination: string;
  suggestions: TravelSuggestion[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * A reusable dialog component to display travel suggestions with dark/light mode support.
 // eslint-disable-next-line jsdoc/check-param-names
 * @param destination - The destination name to display in the dialog title.
 * @param suggestions - Array of travel suggestions to display.
 * @param open - Whether the dialog is open.
 * @param onOpenChange - Callback to handle dialog open/close state changes.
 */
export default function TravelSuggestionsPopup({
  destination,
  suggestions,
  open,
  onOpenChange,
}: TravelSuggestionsPopupProps) {
  const { theme } = useTheme();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-gray-900'}
      >
        <DialogHeader>
          <DialogTitle>{`Travel Suggestions for ${destination}`}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4 ">
          {suggestions.length > 0
            ? (
                suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={cn(
                      'border-b pb-2',
                      theme === 'dark' ? 'border-neutral-600' : 'border-gray-200',
                    )}
                  >
                    <h3 className="text-lg font-semibold">{suggestion.place}</h3>
                    <p
                      className={theme === 'dark' ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm'}
                    >
                      {suggestion.description}
                    </p>
                    <p
                      className={theme === 'dark' ? 'text-gray-200 text-sm' : 'text-gray-800 text-sm'}
                    >
                      Estimated Cost: $
                      {suggestion.cost}
                    </p>
                  </div>
                ))
              )
            : (
                <p>No suggestions found for your criteria.</p>
              )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
