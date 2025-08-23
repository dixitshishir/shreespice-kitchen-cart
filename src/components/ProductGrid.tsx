import ProductCard from './ProductCard';
import { Product } from '@/contexts/CartContext';
import turmericImage from '@/assets/turmeric-powder.jpg';
import chiliImage from '@/assets/chili-powder.jpg';
import corianderImage from '@/assets/coriander-powder.jpg';

const products: Product[] = [
  {
    id: '1',
    name: 'Premium Turmeric Powder',
    price: 120,
    image: turmericImage,
    description: 'Pure, organic turmeric powder with vibrant color and rich flavor. Perfect for daily cooking and health benefits.',
    weight: '250g'
  },
  {
    id: '2',
    name: 'Red Chili Powder',
    price: 150,
    image: chiliImage,
    description: 'Authentic red chili powder with perfect heat and aroma. Made from specially selected chilies.',
    weight: '200g'
  },
  {
    id: '3',
    name: 'Coriander Powder',
    price: 100,
    image: corianderImage,
    description: 'Fresh ground coriander seeds powder with intense aroma. Essential for Indian cooking.',
    weight: '250g'
  },
  {
    id: '4',
    name: 'Garam Masala Blend',
    price: 180,
    image: corianderImage,
    description: 'Traditional family recipe garam masala blend. A perfect mix of aromatic spices.',
    weight: '150g'
  },
  {
    id: '5',
    name: 'Cumin Powder',
    price: 130,
    image: turmericImage,
    description: 'Freshly ground cumin powder with earthy flavor. Adds depth to any dish.',
    weight: '200g'
  },
  {
    id: '6',
    name: 'Sambar Powder',
    price: 160,
    image: chiliImage,
    description: 'Authentic South Indian sambar powder blend. Traditional recipe passed down generations.',
    weight: '200g'
  }
];

const ProductGrid = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cinnamon to-paprika bg-clip-text text-transparent">
            Our Premium Spices
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Each spice powder is carefully crafted using traditional methods and the finest ingredients, 
            bringing authentic flavors to your kitchen.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;