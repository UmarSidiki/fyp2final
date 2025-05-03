/* eslint-disable @next/next/no-img-element */
'use client';

import type { ActiveChat } from './social-page';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Paperclip, Send, Smile } from 'lucide-react';
import { useState } from 'react';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: string;
};

// Sample messages for demo
const generateSampleMessages = (chatId: string): Message[] => {
  return [
    {
      id: `${chatId}-1`,
      content: 'Hey there! How\'s your trip going?',
      sender: 'other',
      timestamp: '10:30 AM',
    },
    {
      id: `${chatId}-2`,
      content: 'It\'s amazing! The weather is perfect and the views are breathtaking.',
      sender: 'user',
      timestamp: '10:32 AM',
    },
    {
      id: `${chatId}-3`,
      content: 'That sounds wonderful! Have you visited any interesting places?',
      sender: 'other',
      timestamp: '10:35 AM',
    },
    {
      id: `${chatId}-4`,
      content: 'Yes! I went to this incredible local restaurant yesterday. The food was incredible.',
      sender: 'user',
      timestamp: '10:38 AM',
    },
    {
      id: `${chatId}-5`,
      content: 'You have to send me pictures! I\'m planning my trip for next month.',
      sender: 'other',
      timestamp: '10:40 AM',
    },
    {
      id: `${chatId}-6`,
      content: 'Definitely! I\'ll share my travel album when I get back. You\'re going to love it here.',
      sender: 'user',
      timestamp: '10:42 AM',
    },
  ];
};

type ChatInterfaceProps = {
  chat: ActiveChat;
  onClose: () => void;
};

export function ChatInterface({ chat, onClose }: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => (chat ? generateSampleMessages(chat.id) : []));

  const handleSendMessage = () => {
    if (!newMessage.trim() || !chat) {
      return;
    }

    const message: Message = {
      id: `${chat.id}-${Date.now()}`,
      content: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate reply after a short delay
    setTimeout(() => {
      const reply: Message = {
        id: `${chat.id}-${Date.now() + 1}`,
        content: 'Thanks for your message! I\'ll get back to you soon.',
        sender: 'other',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  if (!chat) {
    return null;
  }

  return (
    <Card className="h-[calc(120vh-8rem)] overflow-hidden flex flex-col">
      <CardHeader className="p-4 border-b flex flex-row items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="relative">
          <Avatar className="h-10 w-10">
            <img src={chat.avatar || '/placeholder.svg'} alt={chat.name} className="object-cover" />
          </Avatar>
          {chat.online && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
          )}
        </div>
        <div>
          <p className="font-medium">{chat.name}</p>
          <p className="text-xs text-muted-foreground">{chat.online ? 'Online' : 'Offline'}</p>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-1 overflow-y-auto scrollbar-hide">
        <div className="space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 border-t">
        <div className="flex w-full items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
