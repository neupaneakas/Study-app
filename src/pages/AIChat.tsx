import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: "ai",
    content: "Hi there! How can I help you today?",
    timestamp: new Date()
  },
  {
    id: 2,
    type: "user", 
    content: "Can you help me with my math homework?",
    timestamp: new Date()
  },
  {
    id: 3,
    type: "ai",
    content: "Of course! What's the problem?",
    timestamp: new Date()
  }
];

const quickActions = [
  "Summarize text",
  "Explain a concept", 
  "Solve a math problem"
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: "ai",
        content: "I'd be happy to help you with that! Could you provide more details about what specifically you need assistance with?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Header title="AI Chat" showBackButton={true} />
      
      <main className="flex-1 flex flex-col p-4">
        {/* Messages */}
        <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.type === "ai" && (
                <Avatar className="h-8 w-8 bg-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={16} />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <Card 
                className={`max-w-[80%] ${
                  message.type === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                }`}
              >
                <CardContent className="p-3">
                  <p className="text-sm">{message.content}</p>
                </CardContent>
              </Card>

              {message.type === "user" && (
                <Avatar className="h-8 w-8 bg-secondary">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    <User size={16} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setInputValue(action)}
            >
              {action}
            </Button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/90">
            <Send size={16} />
          </Button>
        </div>
      </main>
    </div>
  );
}