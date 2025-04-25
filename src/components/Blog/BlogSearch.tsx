'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function BlogSearch({ initialSearch = '' }: { initialSearch?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    } else {
      params.delete('search');
    }

    // Reset to page 1 when searching
    params.delete('page');

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full ">
      <Input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="pr-10"
      />
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="absolute right-0 top-0 h-full"
        disabled={isPending}
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
