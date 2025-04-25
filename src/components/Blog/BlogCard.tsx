'use client';

import type { Post } from '@/lib/blog-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function BlogCard({ post }: { post: Post }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group rounded-lg overflow-hidden border bg-card shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/posts/${post.slug}`} className="block overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.featuredImage || '/placeholder.svg'}
            alt={post.title}
            fill
            className={cn('object-cover transition-transform duration-500', isHovered && 'scale-105')}
          />
        </div>
      </Link>

      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <Badge variant="secondary" className="hover:bg-secondary">
            <Link href={`/?category=${post.category}`}>{post.category}</Link>
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {post.date}
          </div>
        </div>

        <Link href={`/posts/${post.slug}`} className="block group-hover:text-primary transition-colors">
          <h3 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h3>
        </Link>

        <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

        <Link href={`/posts/${post.slug}`}>
          <Button
            variant="outline"
            size="sm"
            className="bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600 w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            Read More
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
