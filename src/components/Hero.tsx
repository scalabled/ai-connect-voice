import { Button } from "@/components/ui/button";
import { Users, Zap, Network } from "lucide-react";

const Hero = () => {
  return (
    <section className="hero-gradient text-pure-white py-24 px-6">
      <div className="container mx-auto max-w-6xl text-center">
        <div className="animate-fade-in">
          <h1 className="heading-hero text-pure-white mb-6">
            Connect with 70,000+ AI Community Members
          </h1>
          <p className="text-xl md:text-2xl text-pure-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Discover collaborators, mentors, and innovators in the AI space. 
            Create your profile, share your expertise, and find meaningful connections 
            that drive the future of artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="secondary" size="lg" className="btn-hero">
              Join the Community
            </Button>
            <Button variant="outline" size="lg" className="btn-secondary bg-transparent border-pure-white text-pure-white hover:bg-pure-white hover:text-primary-orange">
              Explore Members
            </Button>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-slide-up">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12 text-accent-orange" />
            </div>
            <h3 className="text-2xl font-bold mb-2">70,000+</h3>
            <p className="text-pure-white/80">Active Members</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Network className="w-12 h-12 text-accent-orange" />
            </div>
            <h3 className="text-2xl font-bold mb-2">AI-Powered</h3>
            <p className="text-pure-white/80">Smart Matching</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Zap className="w-12 h-12 text-accent-orange" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Instant</h3>
            <p className="text-pure-white/80">Connections</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;