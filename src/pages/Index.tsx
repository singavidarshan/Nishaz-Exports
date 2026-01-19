import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Grid, List, ChevronDown, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import BackToTop from '@/components/BackToTop';
import InquiryDialog from '@/components/InquiryDialog';
import { useToast } from '@/hooks/use-toast';

// Import product images
import heroImage from '@/assets/hero-bg.jpg';
import onionsImage from '@/assets/onions.jpg';
import tomatoesImage from '@/assets/tomatoes.jpg';
import grapesImage from '@/assets/grapes.jpg';
import grapesblackImage from '@/assets/Green grapes.jpg';
import greenChillyImage from '@/assets/green-chilly.jpg';
import bananaImage from '@/assets/banana.jpg';
import limesImage from '@/assets/limes.jpg';
import gingerImage from '@/assets/ginger.jpg';
import onionPowderImage from '@/assets/onion-powder.jpg';
import onionFlakesImage from '@/assets/onion-flakes.jpg';
import pomegranteImage from '@/assets/pomegranate.jpg';
import SeedlessRaisinImage from '@/assets/seedlessraisins.jpg';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [lineProgress, setLineProgress] = useState(0);
  const countriesRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const products = [
    {
      id: 1,
      name: 'Onions: Red & Pink',
      image: onionsImage,
      description: 'Fresh, high-quality red and pink onions sourced directly from Indian farms. Available in various sizes and packaging options for international export.'
    },
    {
      id: 2,
      name: 'Tomato: Fresh Tomato',
      image: tomatoesImage,
      description: 'Vine-ripened tomatoes with excellent shelf life and superior taste. Carefully selected and packed for maintaining freshness during long-distance transportation.'
    },
    {
      id: 3,
      name: 'Grapes: Black',
      image: grapesImage,
      description: 'Premium quality black grapes with natural sweetness. WE have all Types of Grapes and Our grapes are handpicked at optimal ripeness and undergo strict quality control measures.'
    },
    {
      id: 3,
      name: 'Grapes: Green',
      image: grapesblackImage,
      description: 'Premium quality green grapes with natural sweetness. WE have all Types of Grapes and Our grapes are handpicked at optimal ripeness and undergo strict quality control measures.'
    },    
    {
      id: 4,
      name: 'Green Chilly',
      image: greenChillyImage,
      description: 'Fresh green chillies with perfect heat and flavor. Carefully harvested and processed to maintain their natural spice levels and vibrant color.'
    },
    {
      id: 5,
      name: 'Banana',
      image: bananaImage,
      description: 'Fresh tropical bananas with perfect ripeness and natural sweetness. Carefully handled and packed to ensure premium quality during transportation.'
    },
    {
      id: 6,
      name: 'Limes',
      image: limesImage,
      description: 'Fresh green limes with excellent acidity and aroma. Hand-picked at optimal maturity to provide the best citrus flavor for culinary and beverage use.'
    },
    {
      id: 7,
      name: 'Ginger',
      image: gingerImage,
      description: 'Premium quality fresh ginger root with strong aroma and spicy flavor. Carefully cleaned and processed to maintain its natural medicinal properties.'
    },
    {
      id: 8,
      name: 'Onion Powder: Red, White, Pink',
      image: onionPowderImage,
      description: 'High-quality dehydrated onion powder in red, white, and pink varieties. Finely ground and processed to retain maximum flavor and nutritional value.'
    },
    {
      id: 9,
      name: 'Onion Flakes',
      image: onionFlakesImage,
      description: 'Premium dried onion flakes processed from fresh onions. Perfect for seasoning and cooking, retaining natural onion flavor and aroma.'
    },
    {
      id: 9,
      name: 'pomegranate',
      image: pomegranteImage ,
      description: 'Premium pomegranate arils carefully processed from fresh, ripe fruits. Ideal for snacking, desserts, and garnishing—retaining their natural sweetness, vibrant color, and rich antioxidant properties'
    },
    {
      id: 9,
      name: 'Seedless Raisin',
      image: SeedlessRaisinImage  ,
      description: 'Premium seedless raisins made from sun-dried, naturally sweet grapes. Perfect for baking, snacking, and cooking—retaining rich flavor, chewy texture, and natural nutrients.'
    },
  ];

  const countries = [
    'India', 'UAE', 'Bangladesh', 'Oman', 'Nepal', 'Qatar', 'Netherlands', 'Sri Lanka'
  ];

  // Scroll animation for countries section
  useEffect(() => {
    const handleScroll = () => {
      if (countriesRef.current) {
        const rect = countriesRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calculate progress based on scroll position
        const startPoint = windowHeight * 0.8;
        const endPoint = -elementHeight * 0.2;
        
        if (elementTop <= startPoint && elementTop >= endPoint) {
          const progress = (startPoint - elementTop) / (startPoint - endPoint);
          setLineProgress(Math.min(Math.max(progress, 0), 1));
        } else if (elementTop < endPoint) {
          setLineProgress(1);
        } else {
          setLineProgress(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.message) {
    toast({
      title: "Error",
      description: "Please fill in all fields",
      variant: "destructive"
    });
    return;
  }

  // Create form to send via Formsubmit
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://formsubmit.co/nishazexports@gmail.com';

  const nameInput = document.createElement('input');
  nameInput.name = 'name';
  nameInput.value = formData.name;
  form.appendChild(nameInput);

  const emailInput = document.createElement('input');
  emailInput.name = 'email';
  emailInput.value = formData.email;
  form.appendChild(emailInput);

  const messageInput = document.createElement('textarea');
  messageInput.name = 'message';
  messageInput.value = formData.message;
  form.appendChild(messageInput);

  // Optional: redirect after submission
  const redirectInput = document.createElement('input');
  redirectInput.name = '_next';
  redirectInput.value = 'https://nishazexports.com/thank-you';
  form.appendChild(redirectInput);

  // Add hidden form to DOM, submit it, and clean up
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);

  toast({
    title: "Thank you!",
    description: "Your inquiry has been sent successfully.",
  });

  setFormData({ name: '', email: '', message: '' });
};

  return (
    <div className="min-h-screen bg-background font-poppins">
      <Navbar />
      <BackToTop />

      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-poppins">
            NISHAZ EXPORTS
          </h1>
          <p className="text-2xl md:text-3xl mb-8 font-medium">
            BUILDING A TRUST ACROSS THE BORDERS
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg"
              onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Products
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Us</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                A Family Legacy of Quality & Trust
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                NISHAZ EXPORTS is a family-run export business based in India, dedicated to 
                connecting the finest Indian agricultural products with international markets. 
                With years of experience and deep-rooted values, we have built lasting 
                relationships across borders.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our commitment to quality, reliability, and customer satisfaction has made us 
                a trusted partner for businesses worldwide. We specialize in sourcing, processing, 
                and exporting premium fresh produce while maintaining the highest standards of 
                quality control.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-primary">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="font-medium">Based in India</span>
                </div>
                <div className="flex items-center text-accent">
                  <span className="w-5 h-5 mr-2 text-2xl">🌍</span>
                  <span className="font-medium">Global Reach</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-2xl">
              <h4 className="text-xl font-semibold text-foreground mb-4">Our Values</h4>
              <p className="text-sm font-medium mb-4">
              We are traders and suppliers.
              </p>

              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Quality assurance at every step
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Timely delivery and reliable service
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Sustainable farming practices
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Building long-term partnerships
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Products</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Premium quality agricultural products sourced directly from trusted Indian farmers
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-background rounded-lg p-1 border">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="mr-1"
              >
                <Grid className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {products.map((product) => (
              <Card 
                key={product.id} 
                className={`transition-all duration-300 hover:shadow-lg ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}
              >
                <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className={`w-full object-cover cursor-pointer ${
                      viewMode === 'list' ? 'h-32 rounded-l-lg rounded-tr-none' : 'h-48 rounded-t-lg'
                    }`}
                    onClick={() => setSelectedProduct(product)}
                  />
                </div>
                <div className={`${viewMode === 'list' ? 'flex-1 flex flex-col' : ''}`}>
                  <CardHeader 
                    className={`cursor-pointer ${viewMode === 'list' ? 'flex-1' : ''}`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <CardTitle className="text-foreground">{product.name}</CardTitle>
                    <CardDescription className={viewMode === 'list' ? 'line-clamp-3' : 'line-clamp-2'}>
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className={`pt-0 ${viewMode === 'list' ? 'mt-auto' : ''}`}>
                    <InquiryDialog productName={product.name}>
                      <Button 
                        className="w-full gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Send className="w-4 h-4" />
                        Send Inquiry
                      </Button>
                    </InquiryDialog>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Product Modal */}
          {selectedProduct && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl">{selectedProduct.name}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedProduct(null)}
                    >
                      ×
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Export Countries Section */}
      <section id="countries" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Export Countries</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-muted-foreground">
              We proudly serve customers across multiple countries
            </p>
          </div>

          <div className="relative" ref={countriesRef}>
            {/* Animated vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30"></div>
            <div 
              className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-primary via-primary to-accent transition-all duration-1000 ease-out"
              style={{ height: `${lineProgress * 100}%` }}
            ></div>
            
            {/* Countries list */}
            <div className="space-y-8">
              {countries.map((country, index) => (
                <div key={country} className="flex items-center relative">
                  {/* Animated circle marker */}
                  <div 
                    className={`w-4 h-4 rounded-full relative z-10 mr-8 transition-all duration-500 ${
                      lineProgress > index / (countries.length - 1) 
                        ? 'bg-primary scale-110 shadow-lg shadow-primary/50' 
                        : 'bg-primary/30'
                    }`}
                  ></div>
                  
                  {/* Country card */}
                  <Card 
                    className={`flex-1 transition-all duration-500 ${
                      lineProgress > index / (countries.length - 1)
                        ? 'shadow-md scale-105 border-primary/20'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-accent mr-3" />
                        <span className="text-lg font-medium text-foreground">{country}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Contact Us</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-muted-foreground">
              Ready to start your export journey? Get in touch with us today
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Get In Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-muted-foreground">+91 7385010092 </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">nishazexports@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground">
                      Pimpalgaon(Baswant), 422209 <br />
                      Nashik, Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us an inquiry</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your requirements..."
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">NISHAZ EXPORTS</h3>
          <p className="mb-4">Building Trust Across Borders</p>
          <p className="text-sm opacity-80">
            © 2024 NISHAZ EXPORTS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
