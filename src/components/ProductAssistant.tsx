import { useState, useRef, useEffect } from 'react';
import { Search, Send, Bot, X, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// SpeechRecognition types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

const ProductAssistant = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setQuestion(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          toast({
            variant: "destructive",
            title: "Microphone Access Required",
            description: "Please enable microphone access to use voice input.",
          });
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [toast]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Voice input is not supported in your browser.",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setQuestion('');
      setAnswer('');
      setIsOpen(false);
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    // Stop listening if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    
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
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const suggestedQuestions = [
    "What spice powders do you have?",
    "Which sweets are made with pure ghee?",
    "What's the price of Mysore Pak?",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-amber-50/90 backdrop-blur-sm rounded-2xl border border-amber-200 shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-amber-700/10">
            <Bot className="h-5 w-5 text-amber-700" />
          </div>
          <div>
            <h3 className="font-semibold text-amber-900">Product Assistant</h3>
            <p className="text-sm text-amber-700">Ask me anything about our products</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-600" />
            <Input
              type="text"
              placeholder={isListening ? "Listening..." : "Ask about our spices, sweets, prices..."}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className={`pl-12 pr-24 py-6 text-base rounded-xl border-amber-200 bg-white text-black placeholder:text-amber-400 ${isListening ? 'border-amber-500 animate-pulse' : ''}`}
              disabled={isLoading}
            />
            {question && !isListening && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-[88px] top-1/2 -translate-y-1/2 p-1 hover:bg-amber-100 rounded-full"
              >
                <X className="h-4 w-4 text-amber-600" />
              </button>
            )}
            <Button
              type="button"
              size="icon"
              variant={isListening ? "destructive" : "outline"}
              onClick={toggleListening}
              disabled={isLoading}
              className={`absolute right-14 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg border-amber-300 text-amber-700 hover:bg-amber-100 ${isListening ? 'animate-pulse bg-red-500 text-white border-red-500' : ''}`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !question.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg bg-amber-700 hover:bg-amber-800 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {!isOpen && !isLoading && !isListening && (
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setQuestion(q)}
                  className="text-xs px-3 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </form>
        
        {isListening && (
          <div className="mt-4 p-4 rounded-xl bg-amber-100 border border-amber-300">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Mic className="h-5 w-5 text-amber-700" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-ping" />
              </div>
              <span className="text-sm text-amber-900">Listening... Speak your question</span>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="mt-4 p-4 rounded-xl bg-amber-100/50 animate-pulse">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-600 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="h-2 w-2 rounded-full bg-amber-600 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="h-2 w-2 rounded-full bg-amber-600 animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-sm text-amber-700 ml-2">Thinking...</span>
            </div>
          </div>
        )}
        
        {isOpen && answer && (
          <div className="mt-4 p-4 rounded-xl bg-amber-100 border border-amber-200">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-full bg-amber-700/10 shrink-0 mt-0.5">
                <Bot className="h-4 w-4 text-amber-700" />
              </div>
              <p className="text-amber-900 text-sm leading-relaxed whitespace-pre-wrap">{answer}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductAssistant;
