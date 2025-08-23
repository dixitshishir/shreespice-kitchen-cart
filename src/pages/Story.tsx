import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Globe, Users } from 'lucide-react';


const Story = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-saffron/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-saffron to-accent bg-clip-text text-transparent">
            Our Family Story
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A journey of passion, tradition, and flavors that spans continents
          </p>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Family Photo Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-saffron mb-6">
              <Heart className="h-5 w-5" />
              <span className="font-semibold">Meet Our Family</span>
            </div>
            <div className="max-w-lg mx-auto mb-8">
              <img 
                src="/lovable-uploads/81fbdcac-8037-4723-b27a-cb509e6c64a1.png" 
                alt="Our parents - Mother and Father, the founders of Shree Spices"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
              <div className="bg-gradient-to-br from-saffron/10 to-accent/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-center">Our Mother - The Creative Soul</h3>
                <p className="text-muted-foreground">
                  The passionate cook on the left, whose love for experimenting with flavors and 
                  traditional recipes has been the cornerstone of our family. Her culinary journey 
                  combines age-old techniques with innovative approaches to create authentic, 
                  flavorful spice blends.
                </p>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-saffron/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-center">Our Father - The Supportive Partner</h3>
                <p className="text-muted-foreground">
                  The encouraging partner on the right, who believed in our mother's vision from day one. 
                  His unwavering support and practical guidance became the foundation that helped 
                  transform a kitchen dream into a global business.
                </p>
              </div>
            </div>
          </div>

          {/* Their Story */}
          <div className="bg-card rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Their Beautiful Journey</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                What started as our mother's passion for creating perfect spice blends became a 
                family mission to share authentic Indian flavors with the world.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">A Mother's Passion</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our mother has always been more than just a cook - she's an artist who paints with spices. 
                  Her experimental nature and deep understanding of traditional recipes led her to create 
                  unique combinations that became family treasures for generations.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Every blend tells a story, every recipe carries the wisdom of her ancestors, and every 
                  product reflects her commitment to authentic, high-quality ingredients. Her kitchen 
                  became a laboratory of love where tradition met innovation.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">A Father's Belief</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When our mother shared her dream of bringing her homemade spices to the world, 
                  our father didn't just listen - he became her biggest champion. He understood that 
                  what she created was something truly special that deserved global recognition.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  His practical support, business acumen, and unwavering faith in her culinary genius 
                  provided the foundation needed to transform a passion project into Shree Spices. 
                  Together, they make the perfect team.
                </p>
              </div>
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="bg-card rounded-2xl p-8 mb-16">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 text-saffron mb-4">
                <Globe className="h-5 w-5" />
                <span className="font-semibold">Our Journey</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">From Kitchen to Global Reach</h2>
              <p className="text-lg text-muted-foreground">Four years of growth, passion, and spreading authentic flavors worldwide</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-saffron to-accent text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2020
                </div>
                <h3 className="text-xl font-semibold mb-2">The Beginning</h3>
                <p className="text-muted-foreground">
                  Started with a simple idea: share our mother's authentic homemade spice powders with the world. 
                  What began as a family tradition became a mission to preserve and spread authentic flavors.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-accent to-saffron text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2022
                </div>
                <h3 className="text-xl font-semibold mb-2">Going National</h3>
                <p className="text-muted-foreground">
                  Word spread across India as more families discovered the authentic taste of our homemade spices. 
                  From local neighborhoods to distant states, Shree Spices became a trusted name.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-saffron to-accent text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2024
                </div>
                <h3 className="text-xl font-semibold mb-2">Global Expansion</h3>
                <p className="text-muted-foreground">
                  Today, we proudly ship to countries across the globe - USA, UK, Singapore, and many more. 
                  Our mother's recipes now bring the taste of home to families worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="text-center bg-gradient-to-br from-saffron/10 to-accent/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-8">
              Every product from Shree Spices carries the love, tradition, and passion of our mother's kitchen. 
              We believe that authentic flavors should not be compromised, which is why everything is made fresh 
              to order using traditional methods and the finest ingredients. Our sweets are made with pure ghee, 
              and every spice blend maintains the authentic taste that has been passed down through generations.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-saffron to-accent hover:from-saffron/90 hover:to-accent/90"
            >
              Taste Our Story - Shop Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Story;