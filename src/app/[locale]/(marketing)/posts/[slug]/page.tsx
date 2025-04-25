import BlogCard from '@/components/Blog/BlogCard';
import { Button } from '@/components/ui/button';
import { getPostBySlug, getRelatedPosts } from '@/lib/blog-data';
import { Calendar, ChevronLeft, Tag, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="inline-block mb-6 group">
          <Button variant="ghost" className="gap-2">
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to all posts
          </Button>
        </Link>

        <article className="mb-16">
          <div className="mb-8 overflow-hidden rounded-lg">
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full h-auto object-cover transition-transform hover:scale-105 duration-500"
            />
          </div>

          <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              <Link href={`/?category=${post.category}`} className="hover:underline">
                {post.category}
              </Link>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

          <div className="prose prose-lg max-w-none">
            {post.content.map((paragraph, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <div className="border-t pt-10">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
