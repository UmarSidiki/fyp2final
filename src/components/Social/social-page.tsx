/* eslint-disable react-dom/no-missing-button-type */
'use client';

import { useMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import { ChatInterface } from './chat-interface';
import { NotificationsPanel } from './notifications-panel';
import { PostsFeed } from './posts-feed';
import { SocialSidebar } from './social-sidebar';

export type ActiveChat = {
  id: string;
  name: string;
  avatar: string;
  online?: boolean;
} | null;

export function SocialPage() {
  const isMobile = useMobile();
  const [activeTab, setActiveTab] = useState<'feed' | 'notifications' | 'friends' | 'chats'>('feed');
  const [activeChat, setActiveChat] = useState<ActiveChat>(null);

  const handleChatOpen = (chat: ActiveChat) => {
    setActiveChat(chat);
    if (isMobile) {
      setActiveTab('feed'); // Switch to feed tab where chat will be displayed on mobile
    }
  };

  const handleChatClose = () => {
    setActiveChat(null);
  };

  return (
    <div className="container py-4 flex flex-col md:flex-row gap-4">
      {isMobile
        ? (
            <div className="w-full">
              <div className="flex mb-4 border-b">
                <button
                  className={`px-4 py-2 ${activeTab === 'feed' ? 'border-b-2 border-primary font-medium' : ''}`}
                  onClick={() => setActiveTab('feed')}
                >
                  Feed
                </button>
                <button
                  className={`px-4 py-2 ${activeTab === 'notifications' ? 'border-b-2 border-primary font-medium' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  Notifications
                </button>
                <button
                  className={`px-4 py-2 ${activeTab === 'friends' ? 'border-b-2 border-primary font-medium' : ''}`}
                  onClick={() => setActiveTab('friends')}
                >
                  Friends
                </button>
                <button
                  className={`px-4 py-2 ${activeTab === 'chats' ? 'border-b-2 border-primary font-medium' : ''}`}
                  onClick={() => setActiveTab('chats')}
                >
                  Chats
                </button>
              </div>

              {activeTab === 'feed'
                && (activeChat ? <ChatInterface chat={activeChat} onClose={handleChatClose} /> : <PostsFeed />)}
              {activeTab === 'notifications' && <NotificationsPanel />}
              {activeTab === 'friends' && <SocialSidebar initialTab="friends" onChatOpen={handleChatOpen} />}
              {activeTab === 'chats' && <SocialSidebar initialTab="chats" onChatOpen={handleChatOpen} />}
            </div>
          )
        : (
            <>
              <div className="w-full md:w-1/4">
                <NotificationsPanel />
              </div>
              <div className="w-full md:w-2/4">
                {activeChat ? <ChatInterface chat={activeChat} onClose={handleChatClose} /> : <PostsFeed />}
              </div>
              <div className="w-full md:w-1/4">
                <SocialSidebar onChatOpen={handleChatOpen} />
              </div>
            </>
          )}
    </div>
  );
}
