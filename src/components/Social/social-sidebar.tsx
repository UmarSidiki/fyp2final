/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { useState } from 'react';

type Friend = {
  id: string;
  name: string;
  avatar: string;
  online?: boolean;
};

type Chat = {
  id: string;
  user: Friend;
  lastMessage: string;
  time: string;
  unread: boolean;
};

const friends: Friend[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: '/placeholder.svg?height=40&width=40',
    online: true,
  },
  {
    id: '2',
    name: 'Taylor Swift',
    avatar: '/placeholder.svg?height=40&width=40',
    online: true,
  },
  {
    id: '3',
    name: 'Michael Brown',
    avatar: '/placeholder.svg?height=40&width=40',
    online: false,
  },
  {
    id: '4',
    name: 'Sarah Davis',
    avatar: '/placeholder.svg?height=40&width=40',
    online: true,
  },
  {
    id: '5',
    name: 'John Smith',
    avatar: '/placeholder.svg?height=40&width=40',
    online: false,
  },
];

const chats: Chat[] = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Alex Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
      online: true,
    },
    lastMessage: 'Hey! How are you doing today?',
    time: '2m',
    unread: true,
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'Taylor Swift',
      avatar: '/placeholder.svg?height=40&width=40',
      online: true,
    },
    lastMessage: 'Did you see the new travel deals?',
    time: '1h',
    unread: true,
  },
  {
    id: '3',
    user: {
      id: '3',
      name: 'Michael Brown',
      avatar: '/placeholder.svg?height=40&width=40',
      online: false,
    },
    lastMessage: 'Let\'s plan our next trip soon!',
    time: '5h',
    unread: false,
  },
  {
    id: '4',
    user: {
      id: '4',
      name: 'Sarah Davis',
      avatar: '/placeholder.svg?height=40&width=40',
      online: true,
    },
    lastMessage: 'I found this amazing restaurant in Paris',
    time: '1d',
    unread: false,
  },
  {
    id: '5',
    user: {
      id: '5',
      name: 'John Smith',
      avatar: '/placeholder.svg?height=40&width=40',
      online: false,
    },
    lastMessage: 'Check out my photos from the trip!',
    time: '2d',
    unread: false,
  },
];

type SocialSidebarProps = {
  initialTab?: 'friends' | 'chats';
  onChatOpen?: (chat: { id: string; name: string; avatar: string; online?: boolean }) => void;
};

export function SocialSidebar({ initialTab = 'friends', onChatOpen }: SocialSidebarProps) {
  const [friendsSearch, setFriendsSearch] = useState('');
  const [chatsSearch, setChatsSearch] = useState('');

  const filteredFriends = friends.filter(friend => friend.name.toLowerCase().includes(friendsSearch.toLowerCase()));

  const filteredChats = chats.filter(
    chat =>
      chat.user.name.toLowerCase().includes(chatsSearch.toLowerCase())
      || chat.lastMessage.toLowerCase().includes(chatsSearch.toLowerCase()),
  );

  return (
    <Tabs defaultValue={initialTab} className="h-full">
      <TabsList className="grid grid-cols-2 mb-4 min-w-full">
        <TabsTrigger value="friends">Friends</TabsTrigger>
        <TabsTrigger value="chats">Chats</TabsTrigger>
      </TabsList>

      <TabsContent value="friends" className="h-[calc(100vh-12rem)]">
        <Card className="h-full overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Friends</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                className="pl-8"
                value={friendsSearch}
                onChange={e => setFriendsSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto h-[calc(100%-7rem)] scrollbar-hide">
            <div className="space-y-1">
              {filteredFriends.map(friend => (
                <div
                  key={friend.id}
                  className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => onChatOpen && onChatOpen(friend)}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <img src={friend.avatar || '/placeholder.svg'} alt={friend.name} className="object-cover" />
                    </Avatar>
                    {friend.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{friend.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="chats" className="h-[calc(100vh-12rem)]">
        <Card className="h-full overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Chats</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search chats..."
                className="pl-8"
                value={chatsSearch}
                onChange={e => setChatsSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto h-[calc(100%-7rem)] scrollbar-hide">
            <div className="space-y-1">
              {filteredChats.map(chat => (
                <div
                  key={chat.id}
                  className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => onChatOpen && onChatOpen(chat.user)}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <img src={chat.user.avatar || '/placeholder.svg'} alt={chat.user.name} className="object-cover" />
                    </Avatar>
                    {chat.user.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">{chat.user.name}</p>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                      {chat.unread && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
