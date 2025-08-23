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
          {/* Family Introduction */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-saffron">
                <Heart className="h-5 w-5" />
                <span className="font-semibold">The Heart Behind Shree Spices</span>
              </div>
              <h2 className="text-3xl font-bold">Meet Our Mother - The Soul of Our Kitchen</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our story begins with our beloved mother, a passionate cook whose love for experimenting 
                with flavors and traditional recipes has been the cornerstone of our family for decades. 
                Her culinary journey started in her childhood, learning age-old techniques from her own 
                mother and grandmother.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                What sets her apart is not just her skill, but her unwavering passion for perfection. 
                Every spice blend, every sweet, every powder is crafted with the same love and attention 
                she would give to feed her own family. Her experimental nature led her to create unique 
                combinations that have become family favorites for generations.
              </p>
            </div>
            <div className="bg-gradient-to-br from-saffron/20 to-accent/20 rounded-2xl p-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-saffron to-accent rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                M
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Mother</h3>
              <p className="text-muted-foreground">The Passionate Cook & Creator</p>
            </div>
          </div>

          {/* Father's Support */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="bg-gradient-to-br from-accent/20 to-saffron/20 rounded-2xl p-8 text-center md:order-1">
              <div className="w-32 h-32 bg-gradient-to-br from-accent to-saffron rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                F
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Father</h3>
              <p className="text-muted-foreground">The Supportive Partner & Believer</p>
            </div>
            <div className="space-y-6 md:order-2">
              <div className="flex items-center gap-2 text-accent">
                <Users className="h-5 w-5" />
                <span className="font-semibold">The Pillar of Support</span>
              </div>
              <h2 className="text-3xl font-bold">Our Father - The Unwavering Support</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Behind every successful woman is a supportive partner, and our father exemplifies this perfectly. 
                When our mother first shared her dream of bringing her homemade spices to the world, he didn't 
                just listen – he believed in her vision wholeheartedly.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                His encouragement, practical support, and unwavering faith in our mother's culinary genius 
                became the foundation upon which Shree Spices was built. He understood that what she created 
                in their kitchen was something special that deserved to be shared with the world.
              </p>
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