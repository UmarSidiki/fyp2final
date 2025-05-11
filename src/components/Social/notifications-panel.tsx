/* eslint-disable @next/next/no-img-element */
import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';

type Notification = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  type: 'like' | 'comment' | 'follow';
  content: string;
  time: string;
};

const notifications: Notification[] = [
  {
    id: '1',
    user: {
      name: 'Jane Smith',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    type: 'like',
    content: 'Likes your comment',
    time: '2m ago',
  },
  {
    id: '2',
    user: {
      name: 'John Doe',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    type: 'like',
    content: 'Likes your comment',
    time: '5m ago',
  },
  {
    id: '3',
    user: {
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    type: 'like',
    content: 'Likes your comment',
    time: '10m ago',
  },
  {
    id: '4',
    user: {
      name: 'Michael Brown',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    type: 'like',
    content: 'Likes your comment',
    time: '15m ago',
  },
  {
    id: '5',
    user: {
      name: 'Emily Davis',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    type: 'like',
    content: 'Likes your comment',
    time: '20m ago',
  },
  {
    id: '6',
    user: {
      name: 'David Wilson',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    type: 'like',
    content: 'Likes your comment',
    time: '25m ago',
  },
  {
    id: '7',
    user: {
      name: 'Lisa Taylor',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    type: 'like',
    content: 'Likes your comment',
    time: '30m ago',
  },
  {
    id: '8',
    user: {
      name: 'Robert Miller',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    type: 'like',
    content: 'Likes your comment',
    time: '35m ago',
  },
];

export function NotificationsPanel() {
  return (
    <Card className="h-[calc(120vh-8rem)] overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-y-auto h-[calc(100%-4rem)] scrollbar-hide">
        <div className="space-y-1">
          {notifications.map(notification => (
            <div key={notification.id} className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors">
              <Avatar className="h-10 w-10">
                <img
                  src={notification.user.avatar || '/placeholder.svg'}
                  alt={notification.user.name}
                  className="object-cover"
                />
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{notification.user.name}</p>
                <div className="flex items-center gap-1">
                  <p className="text-xs text-muted-foreground">{notification.content}</p>
                  {notification.type === 'like' && <Heart className="h-3 w-3 fill-red-500 text-red-500" />}
                </div>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
