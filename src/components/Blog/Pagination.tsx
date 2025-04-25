'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Convert pageNumber to number if it's a string
    const pageNum = typeof pageNumber === 'string' ? Number.parseInt(pageNumber) : pageNumber;

    if (pageNum === 1) {
      params.delete('page');
    } else {
      params.set('page', pageNum.toString());
    }

    // Return just the query string without the leading /?
    return `?${params.toString()}`;
  };

  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  // Create array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max to show
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page, last page, current page, and one page before and after current
      pageNumbers.push(1);

      if (currentPage > 3) {
        pageNumbers.push('...');
      }

      if (currentPage > 2) {
        pageNumbers.push(currentPage - 1);
      }

      if (currentPage !== 1 && currentPage !== totalPages) {
        pageNumbers.push(currentPage);
      }

      if (currentPage < totalPages - 1) {
        pageNumbers.push(currentPage + 1);
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <nav className="flex justify-center items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        onClick={() => router.push(createPageURL(currentPage - 1))}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((page, index) =>
        page === '...'
          ? (
              <span key={`ellipsis-${index}`} className="px-3 py-2">
                ...
              </span>
            )
          : (
              <Button
                key={`page-${page}`}
                variant={currentPage === page ? 'default' : 'outline'}
                size="icon"
                onClick={() => router.push(createPageURL(page))}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </Button>
            ),
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => router.push(createPageURL(currentPage + 1))}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
