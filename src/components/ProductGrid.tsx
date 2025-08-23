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
    <section className="py-16 relative overflow-hidden">
      {/* CRAZY animated background */}
      <div className="absolute inset-0 crazy-bg opacity-20"></div>
      
      {/* Static background elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-2xl floating-bg"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-accent/30 to-saffron/30 rounded-full blur-xl floating-bg"></div>
      <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-br from-saffron/30 to-primary/30 rounded-full blur-xl floating-bg"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-lg border border-primary/30 rounded-full px-8 py-3 mb-6 shadow-lg">
            <span className="text-2xl">✨</span>
            <span className="text-primary font-bold text-lg">FRESH & WILD</span>
            <span className="text-2xl">🔥</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6 title-crazy">
            CRAZY SPICES!
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-lg rounded-full px-6 py-3 border border-primary/30 shadow-lg animate-pulse">
              <span className="text-3xl">🍯</span>
              <span className="font-bold text-lg">MADE TO ORDER</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-accent/20 to-saffron/20 backdrop-blur-lg rounded-full px-6 py-3 border border-accent/30 shadow-lg animate-pulse" style={{animationDelay: '0.5s'}}>
              <span className="text-3xl">🥥</span>
              <span className="font-bold text-lg">PURE GHEE</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-saffron/20 to-primary/20 backdrop-blur-lg rounded-full px-6 py-3 border border-saffron/30 shadow-lg animate-pulse" style={{animationDelay: '1s'}}>
              <span className="text-3xl">🌿</span>
              <span className="font-bold text-lg">100% NATURAL</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-16">
          {productCategories.map((category, index) => (
            <div key={category.name} className="category-crazy p-8 md:p-10" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="text-center mb-10 relative z-10">
                <div className="inline-flex items-center gap-4 mb-6">
                  <div className="text-5xl">
                    {category.name === "New Items" && "🆕"}
                    {category.name === "Powders" && "🌶️"}
                    {category.name === "Sweets" && "🍯"}
                    {category.name === "Ready to Eat" && "🍽️"}
                    {category.name === "Snacks" && "🥨"}
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-black title-crazy">
                    {category.name.toUpperCase()}
                  </h3>
                  
                  {category.name === "New Items" && (
                    <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 rounded-full text-lg font-black animate-pulse shadow-lg">
                      HOT! 🔥
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 relative z-10">
                {category.products.map((product, productIndex) => (
                  <ProductCard key={product.id} product={product} delay={productIndex * 0.1} />
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