import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. Ask me anything about your uploaded materials!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // TODO: Integrate with backend AI chatbot endpoint
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: "This is a sample response. The AI chatbot will be integrated with your knowledge base materials.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl h-[calc(100vh-8rem)]">
      <div className="mb-6 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2">
          AI <span className="text-accent">Chatbot</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Chat with AI about your uploaded materials
        </p>
      </div>

      <Card className="bg-gradient-card border-accent/20 h-[calc(100%-8rem)] flex flex-col">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-accent" />
            Multilingual Knowledge Assistant
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback
                      className={
                        message.role === "user"
                          ? "bg-accent/20 text-accent"
                          : "bg-primary/20 text-primary"
                      }
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-accent/20 text-accent-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-75" />
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-150" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <div className="flex gap-3">
              <Input
                placeholder="Ask a question about your materials..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
                className="border-accent/20 focus:border-accent"
                disabled={loading}
              />
              <Button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                variant="accent"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
