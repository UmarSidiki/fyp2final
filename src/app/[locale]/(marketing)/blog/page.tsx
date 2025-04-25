import BlogCard from '@/components/Blog/BlogCard';
import BlogSearch from '@/components/Blog/BlogSearch';
import Filter from '@/components/Blog/CategoryFilter';
import Pagination from '@/components/Blog/Pagination';
import { getAllPosts } from '@/lib/blog-data';
import { Suspense } from 'react';

export default function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; category?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || '';
  const category = searchParams.category || '';

  const { posts, totalPages } = getAllPosts({ page, search, category });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="md:flex-1">
            <BlogSearch initialSearch={search} />
          </div>
          <div className="md:w-64">
            <Filter selectedCategory={category} />
          </div>
        </div>

        <Suspense fallback={<div className="text-center py-10">Loading posts...</div>}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {posts.length > 0
              ? (
                  posts.map(post => <BlogCard key={post.slug} post={post} />)
                )
              : (
                  <div className="col-span-full text-center py-10">
                    <h3 className="text-xl font-medium">No posts found</h3>
                    <p className="text-muted-foreground mt-2">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                  </div>
                )}
          </div>
        </Suspense>

        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </main>
  );
}
