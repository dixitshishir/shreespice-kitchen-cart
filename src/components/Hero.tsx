import heroImage from '@/assets/south-indian-spices-hero.jpg';
interface HeroProps {
  onShopNow: () => void;
}
const Hero = ({
  onShopNow
}: HeroProps) => {
  return <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroImage})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/50" />
      </div>
      
      <div className="relative z-10 container text-center text-white max-w-4xl px-6">
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-4">
            {/* Premium Brand Name with Logo */}
            <div className="flex flex-col items-center mb-6 mx-[16px] gap-0 px-0">
              {/* Elegant Logo */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-400/20 blur-2xl rounded-full scale-150" />
                <div className="relative flex items-center gap-3">
                  {/* Logo Icon - Stylized Spice Leaf */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-2xl rotate-45 shadow-lg shadow-amber-500/30" />
                    <div className="absolute inset-1 bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-400 rounded-xl rotate-45" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl drop-shadow-md">🌶️</span>
                    </div>
                  </div>
                  
                  {/* Brand Text */}
                  <div className="text-left">
                    <p className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-amber-300/90 mb-0.5">
                      Nalini Dixit's
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                      <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent drop-shadow-lg" style={{
                      fontFamily: "'Playfair Display', serif"
                    }}>
                        Shree Spices
                      </span>
                      <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-amber-100/80 ml-2" style={{
                      fontFamily: "'Playfair Display', serif"
                    }}>
                        & Snacks
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
              
              {/* Decorative line */}
              <div className="flex items-center gap-3 mt-2">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-sm font-medium">
              <span className="text-base">🌿</span>
              <span className="text-white/95">100% Natural & Homemade South Indian Spices</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Authentic Spices from
              <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent mt-1">
                Our Family Kitchen
              </span>
            </h1>
          </div>
          
          <p className="text-base sm:text-lg lg:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            Experience the rich flavors of traditional homemade spice powders, 
            crafted with love using time-honored family recipes.
          </p>
          
        </div>
      </div>
    </section>;
};
export default Hero;