import { useState } from 'react';
import { Search, Send, Bot, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ProductAssistant = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    setIsLoading(true);
    setAnswer('');
    
    try {
      const { data, error } = await supabase.functions.invoke('product-assistant', {
        body: { question: question.trim() }
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.error) {
        throw new Error(data.error);
      }
      
      setAnswer(data.answer);
      setIsOpen(true);
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get answer. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQuestion('');
    setAnswer('');
    setIsOpen(false);
  };

  const suggestedQuestions = [
    "What spice powders do you have?",
    "Which sweets are made with pure ghee?",
    "What's the price of Mysore Pak?",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Product Assistant</h3>
            <p className="text-sm text-muted-foreground">Ask me anything about our products</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Ask about our spices, sweets, prices..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="pl-12 pr-12 py-6 text-base rounded-xl border-border/50 bg-background/50"
              disabled={isLoading}
            />
            {question && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-14 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !question.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {!isOpen && !isLoading && (
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setQuestion(q)}
                  className="text-xs px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </form>
        
        {isLoading && (
          <div className="mt-4 p-4 rounded-xl bg-muted/30 animate-pulse">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-sm text-muted-foreground ml-2">Thinking...</span>
            </div>
          </div>
        )}
        
        {isOpen && answer && (
          <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-full bg-primary/10 shrink-0 mt-0.5">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">{answer}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductAssistant;
