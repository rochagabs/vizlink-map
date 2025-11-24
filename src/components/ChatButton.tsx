import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ChatButton = ({ isOpen, onClick }: ChatButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
    >
      {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
    </Button>
  );
};
