
import React from 'react';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import ChatbotWidget from '@/components/ui/chatbot-widget';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-auto p-6 bg-gray-50">{children}</main>
      </div>
      <ChatbotWidget />
    </div>
  );
};

export default AppLayout;
