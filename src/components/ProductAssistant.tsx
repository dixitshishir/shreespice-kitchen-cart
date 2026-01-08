import { useState, useRef, useEffect } from 'react';
import { Search, Send, Bot, X, Mic, MicOff, MessageCircle } from 'lucide-react';
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
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const { toast } = useToast();

  useEffect(() => {
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
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
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
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      <div
        className={`absolute bottom-20 right-0 w-[340px] sm:w-[380px] transition-all duration-300 ease-out origin-bottom-right ${
          isChatOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-amber-50 backdrop-blur-md rounded-2xl border border-amber-200 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-white/20 animate-pulse">
                <span className="text-xl">🌿</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-base tracking-wide">SpiceSage</h3>
                <p className="text-xs text-amber-100">Your spice & snack guide ✨</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 max-h-[400px] overflow-y-auto">
            {/* Suggested Questions */}
            {!answer && !isLoading && !isListening && (
              <div className="space-y-2 mb-4">
                <p className="text-xs text-amber-700 font-medium">Quick questions:</p>
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
              </div>
            )}

            {/* Listening State */}
            {isListening && (
              <div className="p-3 rounded-xl bg-amber-100 border border-amber-300 mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Mic className="h-5 w-5 text-amber-700" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-ping" />
                  </div>
                  <span className="text-sm text-amber-900">Listening...</span>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="p-3 rounded-xl bg-amber-100/50 animate-pulse mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="h-2 w-2 rounded-full bg-amber-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="h-2 w-2 rounded-full bg-amber-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-sm text-amber-700 ml-2">SpiceSage is thinking...</span>
                </div>
              </div>
            )}

            {/* Answer */}
            {answer && (
              <div className="p-3 rounded-xl bg-amber-100 border border-amber-200">
                <div className="flex items-start gap-2">
                  <div className="p-1.5 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shrink-0 mt-0.5">
                    <span className="text-xs">🌿</span>
                  </div>
                  <p className="text-amber-900 text-sm leading-relaxed whitespace-pre-wrap">{answer}</p>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-amber-200 bg-amber-50/80">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder={isListening ? "Listening..." : "Ask SpiceSage anything..."}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className={`pr-10 py-2.5 text-sm rounded-xl border-amber-200 bg-white text-black placeholder:text-amber-400 ${isListening ? 'border-amber-500' : ''}`}
                  disabled={isLoading}
                />
                {question && !isListening && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-amber-100 rounded-full"
                  >
                    <X className="h-3 w-3 text-amber-600" />
                  </button>
                )}
              </div>
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={toggleListening}
                disabled={isLoading}
                className={`h-9 w-9 rounded-xl border-amber-300 ${isListening ? 'bg-red-500 text-white border-red-500 animate-pulse' : 'text-amber-700 hover:bg-amber-100'}`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !question.trim()}
                className="h-9 w-9 rounded-xl bg-amber-700 hover:bg-amber-800 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Button - Enhanced with glow and animation */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`relative w-16 h-16 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group ${
          isChatOpen 
            ? 'bg-gradient-to-br from-amber-700 to-orange-700 scale-90' 
            : 'bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 hover:scale-110'
        }`}
        style={{
          boxShadow: isChatOpen 
            ? '0 4px 20px rgba(180, 83, 9, 0.4)' 
            : '0 8px 32px rgba(245, 158, 11, 0.5), 0 0 60px rgba(245, 158, 11, 0.3)'
        }}
      >
        {/* Animated ring */}
        {!isChatOpen && (
          <>
            <span className="absolute inset-0 rounded-full border-2 border-amber-400/50 animate-ping" />
            <span className="absolute inset-[-4px] rounded-full border-2 border-amber-300/30 animate-pulse" />
          </>
        )}
        
        <div className={`transition-transform duration-300 ${isChatOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`}>
          <span className="text-2xl">🌿</span>
        </div>
        <div className={`absolute transition-transform duration-300 ${isChatOpen ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`}>
          <X className="h-6 w-6 text-white" />
        </div>
        
        {/* Enhanced Tooltip */}
        <span className={`absolute right-full mr-4 px-4 py-2 bg-gradient-to-r from-amber-800 to-orange-800 text-white text-sm font-medium rounded-xl whitespace-nowrap transition-all duration-300 shadow-lg ${isChatOpen ? 'opacity-0 pointer-events-none translate-x-2' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2'}`}>
          <span className="flex items-center gap-2">
            <span>✨</span> Ask SpiceSage
          </span>
          <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-8 border-transparent border-l-amber-800" />
        </span>
      </button>
    </div>
  );
};

export default ProductAssistant;
