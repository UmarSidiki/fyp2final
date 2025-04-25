'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getAllCategories } from '@/lib/blog-data';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function CategoryFilter({ selectedCategory = '' }: { selectedCategory?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const allCategories = getAllCategories();
  const [searchValue, setSearchValue] = useState('');

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== 'all') {
      params.set('category', value);
    } else {
      params.delete('category');
    }

    params.delete('page');
    router.push(`/?${params.toString()}`);
  };

  // Filter categories based on search input
  const filteredCategories = allCategories.filter(category =>
    category.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const displayValue = selectedCategory || 'All Categories';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="w-full justify-between">
          {displayValue}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          {' '}
          {/* Disable default filtering */}
          <CommandInput
            placeholder="Search category..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              <CommandItem value="all" onSelect={() => handleCategoryChange('all')} className="cursor-pointer">
                <Check className={cn('mr-2 h-4 w-4', !selectedCategory ? 'opacity-100' : 'opacity-0')} />
                All Categories
              </CommandItem>
              {filteredCategories.map(category => (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={() => handleCategoryChange(category)}
                  className="cursor-pointer"
                >
                  <Check className={cn('mr-2 h-4 w-4', selectedCategory === category ? 'opacity-100' : 'opacity-0')} />
                  {category}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
