import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export const ChatPopup = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Olá! Como posso ajudar com suas dependências?", isUser: false }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Simular resposta do bot
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "Estou aqui para ajudar! Esta é uma versão demo do chatbot.",
        isUser: false
      }]);
    }, 1000);
  };

  return (
    <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-2xl flex flex-col z-50 border-2">
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
        <h3 className="font-semibold">Assistente de Dependências</h3>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Digite sua mensagem..."
        />
        <Button onClick={handleSend} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
