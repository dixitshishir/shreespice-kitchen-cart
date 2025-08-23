import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  weight: string;
  description: string;
}

interface ProductCategory {
  name: string;
  products: Product[];
}

const productCategories: ProductCategory[] = [
  {
    name: "New Items",
    products: [
      {
        id: 'n1',
        name: 'Homemade Protein Bar',
        price: 150,
        description: 'Nutritious homemade protein bar with nuts, dates, and oats.',
        weight: '60g each'
      },
      {
        id: 'n2',
        name: 'Homemade Protein Powder',
        price: 350,
        description: 'Natural protein powder made from roasted almonds, dates, and seeds.',
        weight: '250g'
      }
    ]
  },
  {
    name: "Powders",
    products: [
      {
        id: 'p1',
        name: 'Bisibelebath Powder',
        price: 150,
        description: 'Traditional Karnataka style bisibelebath powder blend.',
        weight: '200g'
      },
      {
        id: 'p2',
        name: 'Vangibath Powder',
        price: 140,
        description: 'Aromatic vangibath powder for delicious brinjal rice.',
        weight: '200g'
      },
      {
        id: 'p3',
        name: 'Hulipudi Powder',
        price: 130,
        description: 'Tangy and spicy hulipudi powder perfect for mixing with rice.',
        weight: '200g'
      },
      {
        id: 'p4',
        name: 'Rasam Powder',
        price: 120,
        description: 'Authentic rasam powder blend for perfect South Indian rasam.',
        weight: '200g'
      },
      {
        id: 'p5',
        name: 'Kootu Powder',
        price: 110,
        description: 'Traditional kootu powder for delicious vegetable kootu.',
        weight: '150g'
      }
    ]
  },
  {
    name: "Sweets",
    products: [
      {
        id: 's1',
        name: 'Antina Unde',
        price: 200,
        description: 'Traditional sesame seed laddus made with pure ghee.',
        weight: '250g'
      },
      {
        id: 's2',
        name: 'Kai Kadubu',
        price: 180,
        description: 'Steamed rice dumplings with jaggery filling.',
        weight: '300g'
      },
      {
        id: 's3',
        name: 'Hoorna Kadubu',
        price: 190,
        description: 'Sweet steamed rice dumplings with coconut and jaggery.',
        weight: '300g'
      },
      {
        id: 's4',
        name: 'Mysore Pak',
        price: 250,
        description: 'Famous Mysore pak made with pure ghee and gram flour.',
        weight: '250g'
      },
      {
        id: 's5',
        name: 'Besan Ladoo',
        price: 220,
        description: 'Classic besan laddus made with pure ghee.',
        weight: '250g'
      },
      {
        id: 's6',
        name: 'Shenga Ladoo',
        price: 240,
        description: 'Nutritious peanut laddus made with jaggery.',
        weight: '250g'
      },
      {
        id: 's7',
        name: 'Tambittu',
        price: 200,
        description: 'Traditional festival sweet made with rice flour.',
        weight: '300g'
      }
    ]
  },
  {
    name: "Ready to Eat",
    products: [
      {
        id: 'r1',
        name: 'Menthe Hittu',
        price: 160,
        description: 'Ready to eat fenugreek powder mix.',
        weight: '200g'
      },
      {
        id: 'r2',
        name: 'Puliyogre Gojju',
        price: 140,
        description: 'Tangy tamarind rice paste.',
        weight: '250g'
      },
      {
        id: 'r3',
        name: 'Shenga Chutney Pudi',
        price: 120,
        description: 'Roasted peanut chutney powder.',
        weight: '200g'
      },
      {
        id: 'r4',
        name: 'Hurgadle Chutney Pudi',
        price: 110,
        description: 'Roasted horse gram chutney powder.',
        weight: '200g'
      },
      {
        id: 'r5',
        name: 'Dal Chutney Pudi',
        price: 100,
        description: 'Mixed dal chutney powder.',
        weight: '200g'
      }
    ]
  },
  {
    name: "Snacks",
    products: [
      {
        id: 'sn1',
        name: 'Kodbele',
        price: 180,
        description: 'Traditional ring-shaped snacks made with rice flour.',
        weight: '200g'
      },
      {
        id: 'sn2',
        name: 'Avalakki',
        price: 80,
        description: 'Premium quality beaten rice flakes.',
        weight: '500g'
      },
      {
        id: 'sn3',
        name: 'Shankar Pole (Masala)',
        price: 200,
        description: 'Crispy masala-flavored traditional snack.',
        weight: '200g'
      },
      {
        id: 'sn4',
        name: 'Shankar Pole (Sweet)',
        price: 220,
        description: 'Sweet version of traditional shankar pole.',
        weight: '200g'
      }
    ]
  }
];

interface ProductListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductListModal = ({ isOpen, onClose }: ProductListModalProps) => {
  const handleDownloadList = () => {
    let productText = 'SHREE SPICES - COMPLETE PRODUCT LIST\n\n';
    
    productCategories.forEach(category => {
      productText += `${category.name.toUpperCase()}\n`;
      productText += '═'.repeat(category.name.length) + '\n\n';
      
      category.products.forEach(product => {
        productText += `${product.name} (${product.weight}) - ₹${product.price}\n`;
        productText += `${product.description}\n\n`;
      });
      
      productText += '\n';
    });
    
    const blob = new Blob([productText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'shree-spices-complete-product-list.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-primary">
            Shree Spices - Complete Product List
          </DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          {productCategories.map((category) => (
            <div key={category.name} className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-primary">{category.name}</h3>
                <div className="flex-1 h-px bg-border"></div>
              </div>
              
              <div className="grid gap-3">
                {category.products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4 space-y-2 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold">{product.name}</h4>
                      <div className="text-right">
                        <p className="font-bold text-primary">₹{product.price}</p>
                        <p className="text-sm text-muted-foreground">{product.weight}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="flex justify-center pt-4 border-t">
            <Button onClick={handleDownloadList} className="bg-gradient-to-r from-saffron to-accent hover:from-saffron/90 hover:to-accent/90">
              <Download className="mr-2 h-4 w-4" />
              Download Complete Product List
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductListModal;