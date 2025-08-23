import ProductCard from './ProductCard';
import { Product } from '@/contexts/CartContext';
import turmericImage from '@/assets/turmeric-powder.jpg';
import chiliImage from '@/assets/chili-powder.jpg';
import corianderImage from '@/assets/coriander-powder.jpg';

interface ProductCategory {
  name: string;
  products: Product[];
}

const productCategories: ProductCategory[] = [
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
    <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cinnamon to-paprika bg-clip-text text-transparent">
            Shree Spices - Made with Love
          </h2>
          <div className="space-y-3">
            <p className="text-minnamon font-semibold text-xl">
              🍯 All items are made to order for maximum freshness
            </p>
            <p className="text-cinnamon font-semibold text-lg">
              ✨ All sweets are made with pure ghee
            </p>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Traditional recipes passed down through generations, made with the finest ingredients 
              and lots of love in every batch.
            </p>
          </div>
        </div>
        
        <div className="space-y-16">
          {productCategories.map((category) => (
            <div key={category.name} className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {category.name}
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-cinnamon to-paprika mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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