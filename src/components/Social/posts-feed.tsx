/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type Post = {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  time: string;
  likes: number;
  comments: number;
  shares: number;
};

// Sample data for initial posts
const initialPosts: Post[] = [
  {
    id: '1',
    user: {
      name: 'Alex Morgan',
      username: 'alexmorgan',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    content:
      'A career counseling website is designed to assist individuals in exploring and achieving their career goals by providing personalized tools, expert guidance, and valuable resources. Users can create profiles tailored to their needs, whether they are students seeking career direction or professionals aiming for advancement.',
    image: '/placeholder.svg?height=300&width=500',
    time: '5 days ago',
    likes: 24,
    comments: 5,
    shares: 2,
  },
  {
    id: '2',
    user: {
      name: 'Jamie Lee',
      username: 'jamielee',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    content:
      'Just discovered this amazing hiking trail in the mountains! The views are absolutely breathtaking. Who wants to join me for the next adventure?',
    image: '/placeholder.svg?height=300&width=500',
    time: '2 days ago',
    likes: 42,
    comments: 8,
    shares: 3,
  },
];

// Function to generate more posts for infinite scrolling
const generateMorePosts = (startId: number, count: number): Post[] => {
  const posts: Post[] = [];
  for (let i = 0; i < count; i++) {
    const id = startId + i;
    posts.push({
      id: id.toString(),
      user: {
        name: `User ${id}`,
        username: `user${id}`,
        avatar: '/placeholder.svg?height=40&width=40',
      },
      content: `This is post number ${id} with some content about travel experiences and adventures around the world. Sharing memories and tips for fellow travelers.`,
      image: id % 2 === 0 ? '/placeholder.svg?height=300&width=500' : undefined,
      time: `${id % 24} hours ago`,
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
      shares: Math.floor(Math.random() * 10),
    });
  }
  return posts;
};

export function PostsFeed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  const loadMorePosts = useCallback(() => {
    if (loading) {
      return;
    }

    setLoading(true);
    // Simulate API call with setTimeout
    setTimeout(() => {
      const newPosts = generateMorePosts(posts.length + 1, 2);
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
    }, 1000);
  }, [loading, posts.length]);

  useEffect(() => {
    // Disconnect previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 0.5 },
    );

    // Observe the last post element
    if (lastPostRef.current) {
      observerRef.current.observe(lastPostRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMorePosts, posts]);

  return (
    <div className="h-[calc(120vh-8rem)] overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide">
        <div className="space-y-4">
          {posts.map((post, index) => (
            <Card key={post.id} ref={index === posts.length - 1 ? lastPostRef : null}>
              <CardHeader className="p-4 pb-0">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <img src={post.user.avatar || '/placeholder.svg'} alt={post.user.name} className="object-cover" />
                  </Avatar>
                  <div>
                    <p className="font-medium">{post.user.name}</p>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm mb-3">{post.content}</p>
                {post.image && (
                  <div className="rounded-md overflow-hidden">
                    <img
                      src={post.image || '/placeholder.svg'}
                      alt="Post image"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="ghost" size="sm" className="gap-1">
                  <Heart className="h-4 w-4" />
                  <span className="text-xs">{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs">{post.comments}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  <span className="text-xs">{post.shares}</span>
                </Button>
              </CardFooter>
            </Card>
          ))}

          {loading && (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
