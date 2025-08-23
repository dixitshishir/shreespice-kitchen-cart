import ProductCard from './ProductCard';
import { Product } from '@/contexts/CartContext';
import turmericImage from '@/assets/turmeric-powder.jpg';
import chiliImage from '@/assets/chili-powder.jpg';
import corianderImage from '@/assets/coriander-powder.jpg';
import proteinBarImage from '@/assets/protein-bar.jpg';
import proteinPowderImage from '@/assets/protein-powder.jpg';

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
        image: proteinBarImage,
        description: 'Nutritious homemade protein bar with nuts, dates, and oats. Perfect post-workout snack made with natural ingredients.',
        weight: '60g each'
      },
      {
        id: 'n2',
        name: 'Homemade Protein Powder',
        price: 350,
        image: proteinPowderImage,
        description: 'Natural protein powder made from roasted almonds, dates, and seeds. Chemical-free and made fresh daily.',
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
        image: turmericImage,
        description: 'Traditional Karnataka style bisibelebath powder blend. Made with authentic spices for perfect flavor.',
        weight: '200g'
      },
      {
        id: 'p2',
        name: 'Vangibath Powder',
        price: 140,
        image: chiliImage,
        description: 'Aromatic vangibath powder for delicious brinjal rice. Traditional recipe with perfect spice balance.',
        weight: '200g'
      },
      {
        id: 'p3',
        name: 'Hulipudi Powder',
        price: 130,
        image: corianderImage,
        description: 'Tangy and spicy hulipudi powder perfect for mixing with rice. Traditional South Indian flavor.',
        weight: '200g'
      },
      {
        id: 'p4',
        name: 'Rasam Powder',
        price: 120,
        image: turmericImage,
        description: 'Authentic rasam powder blend for perfect South Indian rasam. Made with traditional spices.',
        weight: '200g'
      },
      {
        id: 'p5',
        name: 'Kootu Powder',
        price: 110,
        image: chiliImage,
        description: 'Traditional kootu powder for delicious vegetable kootu. Made with roasted spices.',
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
        image: corianderImage,
        description: 'Traditional sesame seed laddus made with pure ghee. Rich in flavor and nutrition.',
        weight: '250g'
      },
      {
        id: 's2',
        name: 'Kai Kadubu',
        price: 180,
        image: turmericImage,
        description: 'Steamed rice dumplings with jaggery filling. Made with pure ghee and traditional recipe.',
        weight: '300g'
      },
      {
        id: 's3',
        name: 'Hoorna Kadubu',
        price: 190,
        image: chiliImage,
        description: 'Sweet steamed rice dumplings with coconut and jaggery. Made with pure ghee.',
        weight: '300g'
      },
      {
        id: 's4',
        name: 'Mysore Pak',
        price: 250,
        image: corianderImage,
        description: 'Famous Mysore pak made with pure ghee and gram flour. Melts in your mouth.',
        weight: '250g'
      },
      {
        id: 's5',
        name: 'Besan Ladoo',
        price: 220,
        image: turmericImage,
        description: 'Classic besan laddus made with pure ghee and roasted gram flour. Traditional taste.',
        weight: '250g'
      },
      {
        id: 's6',
        name: 'Shenga Ladoo',
        price: 240,
        image: chiliImage,
        description: 'Nutritious peanut laddus made with jaggery and pure ghee. Healthy and delicious.',
        weight: '250g'
      },
      {
        id: 's7',
        name: 'Tambittu',
        price: 200,
        image: corianderImage,
        description: 'Traditional festival sweet made with rice flour and jaggery. Prepared with pure ghee.',
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
        image: turmericImage,
        description: 'Ready to eat fenugreek powder mix. Just add hot rice and ghee for instant meal.',
        weight: '200g'
      },
      {
        id: 'r2',
        name: 'Puliyogre Gojju',
        price: 140,
        image: chiliImage,
        description: 'Tangy tamarind rice paste. Perfect for making instant puliyogre with rice.',
        weight: '250g'
      },
      {
        id: 'r3',
        name: 'Shenga Chutney Pudi',
        price: 120,
        image: corianderImage,
        description: 'Roasted peanut chutney powder. Mix with oil for instant chutney.',
        weight: '200g'
      },
      {
        id: 'r4',
        name: 'Hurgadle Chutney Pudi',
        price: 110,
        image: turmericImage,
        description: 'Roasted horse gram chutney powder. Nutritious and flavorful instant chutney mix.',
        weight: '200g'
      },
      {
        id: 'r5',
        name: 'Dal Chutney Pudi',
        price: 100,
        image: chiliImage,
        description: 'Mixed dal chutney powder. Protein-rich instant chutney mix for daily meals.',
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
        image: corianderImage,
        description: 'Traditional ring-shaped snacks made with rice flour and spices. Crispy and delicious.',
        weight: '200g'
      },
      {
        id: 'sn2',
        name: 'Avalakki',
        price: 80,
        image: turmericImage,
        description: 'Premium quality beaten rice flakes. Perfect for breakfast and snacks.',
        weight: '500g'
      },
      {
        id: 'sn3',
        name: 'Shankar Pole (Masala)',
        price: 200,
        image: chiliImage,
        description: 'Crispy masala-flavored traditional snack. Perfect tea-time companion.',
        weight: '200g'
      },
      {
        id: 'sn4',
        name: 'Shankar Pole (Sweet)',
        price: 220,
        image: corianderImage,
        description: 'Sweet version of traditional shankar pole made with jaggery. Crispy and sweet.',
        weight: '200g'
      }
    ]
  }
];

const ProductGrid = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-2xl"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-6">
            <span className="text-primary font-semibold">✨ Fresh & Natural</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Shree Spices Collection
          </h2>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-xl text-muted-foreground leading-relaxed">
              From traditional spice blends to modern protein products - all made with love and the finest ingredients
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
                <span className="text-2xl">🍯</span>
                <span className="font-medium text-foreground">Made to Order</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
                <span className="text-2xl">🥥</span>
                <span className="font-medium text-foreground">Pure Ghee</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
                <span className="text-2xl">🌿</span>
                <span className="font-medium text-foreground">Natural Ingredients</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-20">
          {productCategories.map((category, index) => (
            <div key={category.name} className="category-section rounded-3xl p-8 md:p-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  {category.name === "New Items" && <span className="text-3xl">🆕</span>}
                  {category.name === "Powders" && <span className="text-3xl">🌶️</span>}
                  {category.name === "Sweets" && <span className="text-3xl">🍯</span>}
                  {category.name === "Ready to Eat" && <span className="text-3xl">🍽️</span>}
                  {category.name === "Snacks" && <span className="text-3xl">🥨</span>}
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground category-title">
                    {category.name}
                  </h3>
                  
                  {category.name === "New Items" && (
                    <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                      NEW
                    </div>
                  )}
                </div>
                
                {category.name === "New Items" && (
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Introducing our latest homemade protein products - naturally nutritious and delicious!
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {category.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;