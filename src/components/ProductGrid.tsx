import ProductCard, { Product } from './ProductCard';
import turmericImage from '@/assets/turmeric-powder.jpg';
import chiliImage from '@/assets/chili-powder.jpg';
import corianderImage from '@/assets/coriander-powder.jpg';
import proteinBarImage from '@/assets/protein-bar.jpg';
import proteinPowderImage from '@/assets/protein-powder.jpg';

// New uploaded product images
const huliPudiImage = '/lovable-uploads/4f53a027-9364-4f1e-8d47-4c92685d1b6a.png';
const rasamPowderImage = '/lovable-uploads/8fcc586e-1f7b-4e1a-9d02-a1a821a80da1.png';
const besanLadooImage = '/lovable-uploads/366b966e-6748-4230-81b7-55f98da0ad64.png';
const avalakkiImage = '/lovable-uploads/b13f6e3a-40d0-4d54-bfcf-beee8db96f65.png';

// New product images
const antinaUndeImage = '/lovable-uploads/741092ef-8516-4c06-a248-501226c1d1a8.png';
const kodbeleImage = '/lovable-uploads/d32d5353-5824-44ba-8f2d-0e0c4873b84a.png';
const mysorePakImage = '/lovable-uploads/4b3d4695-6627-4e32-94dc-e5ab58b683c1.png';
const proteinBarNewImage = '/lovable-uploads/66876d8e-c178-483e-b3f7-ca4a53aa9ba8.png';
const puliyogreGojjuImage = '/lovable-uploads/b798d09e-8bd7-4b0a-8181-2fba1cbdbce5.png';
const shengaUndeImage = '/lovable-uploads/e0bcbd87-ebca-48d6-a329-6147be495905.png';
const shankarPoleSweetImage = '/lovable-uploads/50463df5-e800-4af7-ac70-fad23e5cf1c6.png';
const shankarPoleMasalaImage = '/lovable-uploads/b21f3641-802d-4844-b080-241af1d5ce79.png';
const tambittuImage = '/lovable-uploads/490f588b-bb7e-4241-baed-e2ee28714aab.png';

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
        kannadaName: 'ಮನೆಯಲ್ಲಿ ಮಾಡಿದ ಪ್ರೋಟೀನ ಬಾರ್',
        price: 150,
        image: proteinBarNewImage,
        description: 'Nutritious homemade protein bar with nuts, dates, and oats. Perfect post-workout snack made with natural ingredients.',
        weight: '500g'
      },
      {
        id: 'n2',
        name: 'Homemade Protein Powder',
        kannadaName: 'ಮನೆಯಲ್ಲಿ ಮಾಡಿದ ಪ್ರೋಟೀನ ಪುಡಿ',
        price: 350,
        image: proteinPowderImage,
        description: 'Natural protein powder made from roasted almonds, dates, and seeds. Chemical-free and made fresh daily.',
        weight: '500g'
      }
    ]
  },
  {
    name: "Powders",
    products: [
      {
        id: 'p1',
        name: 'Bisibelebath Powder',
        kannadaName: 'ಬಿಸಿಬೇಳೆಬಾತ್ ಪುಡಿ',
        price: 150,
        image: turmericImage,
        description: 'Traditional Karnataka style bisibelebath powder blend. Made with authentic spices for perfect flavor.',
        weight: '500g'
      },
      {
        id: 'p2',
        name: 'Vangibath Powder',
        kannadaName: 'ವಂಗಿಬಾತ್ ಪುಡಿ',
        price: 140,
        image: chiliImage,
        description: 'Aromatic vangibath powder for delicious brinjal rice. Traditional recipe with perfect spice balance.',
        weight: '500g'
      },
      {
        id: 'p3',
        name: 'Hulipudi Powder',
        kannadaName: 'ಹುಳಿಪುಡಿ',
        price: 130,
        image: huliPudiImage,
        description: 'Tangy and spicy hulipudi powder perfect for mixing with rice. Traditional South Indian flavor.',
        weight: '500g'
      },
      {
        id: 'p4',
        name: 'Rasam Powder',
        kannadaName: 'ರಸಂ ಪುಡಿ',
        price: 120,
        image: rasamPowderImage,
        description: 'Authentic rasam powder blend for perfect South Indian rasam. Made with traditional spices.',
        weight: '500g'
      },
      {
        id: 'p5',
        name: 'Kootu Powder',
        kannadaName: 'ಕೂಟು ಪುಡಿ',
        price: 110,
        image: chiliImage,
        description: 'Traditional kootu powder for delicious vegetable kootu. Made with roasted spices.',
        weight: '500g'
      }
    ]
  },
  {
    name: "Sweets",
    products: [
      {
        id: 's1',
        name: 'Antina Unde',
        kannadaName: 'ಅಂಥಿನ ಉಂಡೆ',
        price: 200,
        image: antinaUndeImage,
        description: 'Traditional sesame seed laddus made with pure ghee. Rich in flavor and nutrition.',
        weight: '500g'
      },
      {
        id: 's2',
        name: 'Kai Kadubu',
        kannadaName: 'ಕಾಯಿ ಕಡುಬು',
        price: 180,
        image: turmericImage,
        description: 'Steamed rice dumplings with jaggery filling. Made with pure ghee and traditional recipe.',
        weight: '500g'
      },
      {
        id: 's3',
        name: 'Hoorna Kadubu',
        kannadaName: 'ಹೂರ್ಣ ಕಡುಬು',
        price: 190,
        image: chiliImage,
        description: 'Sweet steamed rice dumplings with coconut and jaggery. Made with pure ghee.',
        weight: '500g'
      },
      {
        id: 's4',
        name: 'Mysore Pak',
        kannadaName: 'ಮೈಸೂರು ಪಾಕ್',
        price: 250,
        image: mysorePakImage,
        description: 'Famous Mysore pak made with pure ghee and gram flour. Melts in your mouth.',
        weight: '500g'
      },
      {
        id: 's5',
        name: 'Besan Ladoo',
        kannadaName: 'ಬೇಸನ್ ಲಡ್ಡು',
        price: 220,
        image: besanLadooImage,
        description: 'Classic besan laddus made with pure ghee and roasted gram flour. Traditional taste.',
        weight: '500g'
      },
      {
        id: 's6',
        name: 'Shenga Ladoo',
        kannadaName: 'ಶೆಂಗ ಲಡ್ಡು',
        price: 240,
        image: shengaUndeImage,
        description: 'Nutritious peanut laddus made with jaggery and pure ghee. Healthy and delicious.',
        weight: '500g'
      },
      {
        id: 's7',
        name: 'Tambittu',
        kannadaName: 'ತಂಬಿಟ್ಟು',
        price: 200,
        image: tambittuImage,
        description: 'Traditional festival sweet made with rice flour and jaggery. Prepared with pure ghee.',
        weight: '500g'
      }
    ]
  },
  {
    name: "Ready to Eat",
    products: [
      {
        id: 'r1',
        name: 'Menthe Hittu',
        kannadaName: 'ಮೆಂತ್ಯ ಹಿಟ್ಟು',
        price: 160,
        image: turmericImage,
        description: 'Ready to eat fenugreek powder mix. Just add hot rice and ghee for instant meal.',
        weight: '500g'
      },
      {
        id: 'r2',
        name: 'Puliyogre Gojju',
        kannadaName: 'ಪುಳಿಯೋಗರೆ ಗೊಜ್ಜು',
        price: 140,
        image: puliyogreGojjuImage,
        description: 'Tangy tamarind rice paste. Perfect for making instant puliyogre with rice.',
        weight: '500g'
      },
      {
        id: 'r3',
        name: 'Shenga Chutney Pudi',
        kannadaName: 'ಶೆಂಗ ಚಟ್ನಿ ಪುಡಿ',
        price: 120,
        image: corianderImage,
        description: 'Roasted peanut chutney powder. Mix with oil for instant chutney.',
        weight: '500g'
      },
      {
        id: 'r4',
        name: 'Hurgadle Chutney Pudi',
        kannadaName: 'ಹುರಗಾಳ ಚಟ್ನಿ ಪುಡಿ',
        price: 110,
        image: turmericImage,
        description: 'Roasted horse gram chutney powder. Nutritious and flavorful instant chutney mix.',
        weight: '500g'
      },
      {
        id: 'r5',
        name: 'Dal Chutney Pudi',
        kannadaName: 'ಬೇಳೆ ಚಟ್ನಿ ಪುಡಿ',
        price: 100,
        image: chiliImage,
        description: 'Mixed dal chutney powder. Protein-rich instant chutney mix for daily meals.',
        weight: '500g'
      }
    ]
  },
  {
    name: "Snacks",
    products: [
      {
        id: 'sn1',
        name: 'Kodbele',
        kannadaName: 'ಕೊಡಬಲೆ',
        price: 180,
        image: kodbeleImage,
        description: 'Traditional ring-shaped snacks made with rice flour and spices. Crispy and delicious.',
        weight: '500g'
      },
      {
        id: 'sn2',
        name: 'Avalakki',
        kannadaName: 'ಅವಲಕ್ಕಿ',
        price: 80,
        image: avalakkiImage,
        description: 'Premium quality beaten rice flakes. Perfect for breakfast and snacks.',
        weight: '500g'
      },
      {
        id: 'sn3',
        name: 'Shankar Pole (Masala)',
        kannadaName: 'ಶಂಕರ್ ಪೋಲೆ (ಮಸಾಲ)',
        price: 200,
        image: shankarPoleMasalaImage,
        description: 'Crispy masala-flavored traditional snack. Perfect tea-time companion.',
        weight: '500g'
      },
      {
        id: 'sn4',
        name: 'Shankar Pole (Sweet)',
        kannadaName: 'ಶಂಕರ್ ಪೋಲೆ (ಸಿಹಿ)',
        price: 220,
        image: shankarPoleSweetImage,
        description: 'Sweet version of traditional shankar pole made with jaggery. Crispy and sweet.',
        weight: '500g'
      }
    ]
  }
];

const ProductGrid = () => {
  return (
    <section className="py-20 bg-transparent">
      <div className="container px-6">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 spice-badge rounded-full px-8 py-4 border-2 border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10">
            <span className="text-3xl animate-spice-float">🌿</span>
            <span className="text-primary font-black text-2xl drop-shadow-md">Premium South Indian Spices</span>
            <span className="text-3xl animate-spice-float" style={{animationDelay: '1s'}}>✨</span>
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6 drop-shadow-xl tracking-tight">
            Authentic Spice Collection
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            <div className="spice-badge px-6 py-3 flex items-center gap-2 bg-gradient-to-r from-turmeric/10 to-paprika/10 border-turmeric/30">
              <span className="text-xl">🍯</span>
              <span className="font-medium text-cumin">Made to Order</span>
            </div>
            <div className="spice-badge px-6 py-3 flex items-center gap-2 bg-gradient-to-r from-cardamom/10 to-coriander/10 border-cardamom/30">
              <span className="text-xl">🥥</span>
              <span className="font-medium text-cumin">Pure Ghee</span>
            </div>
            <div className="spice-badge px-6 py-3 flex items-center gap-2 bg-gradient-to-r from-coriander/10 to-turmeric/10 border-coriander/30">
              <span className="text-xl">🌿</span>
              <span className="font-medium text-cumin">100% Natural</span>
            </div>
            <div className="spice-badge px-6 py-3 flex items-center gap-2 bg-gradient-to-r from-cinnamon/10 to-clove/10 border-cinnamon/30">
              <span className="text-xl">🏠</span>
              <span className="font-medium text-cumin">Homemade</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-20">
          {productCategories.map((category, index) => (
            <div key={category.name} className="category-section animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-4 mb-6">
                  <div className="text-4xl" style={{animationDelay: `${index * 0.5}s`}}>
                    {category.name === "New Items" && "✨"}
                    {category.name === "Powders" && "🌶️"}
                    {category.name === "Sweets" && "🍯"}
                    {category.name === "Ready to Eat" && "🍽️"}
                    {category.name === "Snacks" && "🥨"}
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                    {category.name}
                  </h3>
                </div>
              </div>
              
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {category.products.map((product, productIndex) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    delay={productIndex * 0.1} 
                  />
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