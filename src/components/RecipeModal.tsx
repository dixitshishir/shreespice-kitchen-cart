import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ChefHat, Clock, Loader2, BookOpen, Sparkles } from 'lucide-react';
import { Product } from './ProductCard';

interface RecipeModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

interface RecipeData {
  recipe: string;
  productName: string;
  spiceInfo: {
    description: string;
    cookingTime: string;
    mainDish: string;
  };
}

const RecipeModal = ({ product, isOpen, onClose }: RecipeModalProps) => {
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateRecipe = async () => {
    if (!product.name.toLowerCase().includes('powder')) {
      toast({
        title: "Not Available",
        description: "AI recipes are only available for powder products.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Generating recipe for:', product.name);
      
      const { data, error } = await supabase.functions.invoke('generate-recipe', {
        body: {
          productName: product.name,
          productType: 'powder'
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to generate recipe');
      }

      if (data?.error) {
        if (data.type === 'invalid_product_type') {
          toast({
            title: "Not Available",
            description: data.error,
            variant: "destructive",
          });
        } else {
          throw new Error(data.error);
        }
        return;
      }

      setRecipe(data);
      toast({
        title: "Recipe Generated! 👨‍🍳",
        description: `Traditional ${product.name} recipe is ready!`,
      });

    } catch (error) {
      console.error('Error generating recipe:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate recipe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setRecipe(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ChefHat className="h-6 w-6 text-orange-500" />
            AI Recipe Assistant
          </DialogTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            Traditional South Indian recipes for {product.name}
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {!recipe ? (
            <div className="text-center py-8 space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Get Traditional Recipe</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Let our AI chef create an authentic South Indian recipe using your {product.name}. 
                Experience traditional cooking with modern convenience!
              </p>
              <Button 
                onClick={generateRecipe} 
                disabled={isLoading || !product.name.toLowerCase().includes('powder')}
                className="btn-primary"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Recipe...
                  </>
                ) : (
                  <>
                    <ChefHat className="h-4 w-4 mr-2" />
                    Generate Recipe
                  </>
                )}
              </Button>
              {!product.name.toLowerCase().includes('powder') && (
                <p className="text-sm text-amber-600 mt-2">
                  🌶️ AI recipes are only available for powder products
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Recipe Header */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-orange-600" />
                  {recipe.productName} Recipe
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {recipe.spiceInfo.cookingTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {recipe.spiceInfo.mainDish}
                  </div>
                </div>
                <p className="mt-2 text-sm">{recipe.spiceInfo.description}</p>
              </div>

              {/* Recipe Content */}
              <ScrollArea className="max-h-96 pr-4">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {recipe.recipe}
                  </div>
                </div>
              </ScrollArea>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  onClick={generateRecipe} 
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3 mr-2" />
                      Generate New Recipe
                    </>
                  )}
                </Button>
                <Button onClick={handleClose} variant="secondary" size="sm">
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModal;