
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Show welcome message after a short delay
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setShowWelcome(false); // Hide welcome message when clicked
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Welcome popup */}
      {showWelcome && !isOpen && (
        <Card className="absolute bottom-16 right-0 w-64 mb-2 animate-fade-in shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full ml-1"></div>
              </div>
              <div className="flex-1">
                <div className="bg-cyan-400 text-blue-900 px-3 py-2 rounded-lg text-sm font-medium">
                  HI!
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Need help with revenue optimization? Ask me anything!
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setShowWelcome(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat interface */}
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 h-96 mb-2 animate-scale-in shadow-xl">
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full ml-1"></div>
              </div>
              <span className="font-medium">Revenue Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardContent className="p-4 h-full flex flex-col">
            <div className="flex-1 space-y-4">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full ml-0.5"></div>
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm">
                  Hi! I'm your Revenue Assistant. I can help you with:
                  <ul className="mt-2 space-y-1 text-xs">
                    <li>• Price optimization strategies</li>
                    <li>• Market analysis insights</li>
                    <li>• Forecast interpretations</li>
                    <li>• Room mapping questions</li>
                  </ul>
                  What would you like to know?
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button size="sm" className="px-3">
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat button */}
      <Button
        onClick={handleToggle}
        className={cn(
          "w-14 h-14 rounded-full shadow-lg transition-all duration-200",
          "bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900",
          "hover:scale-110 active:scale-95"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </Button>
    </div>
  );
};

export default ChatbotWidget;
