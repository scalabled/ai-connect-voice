import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Users, UserPlus, Search, Home } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="text-xl font-bold text-primary-blue">AIC Community</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button
              onClick={() => scrollToSection('profile-form')}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Join Community
            </button>
            <button
              onClick={() => scrollToSection('community-grid')}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Search className="w-4 h-4" />
              Explore Members
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              onClick={() => scrollToSection('profile-form')}
              className="btn-hero"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border animate-fade-in">
            <div className="py-4 space-y-2">
              <button
                onClick={() => scrollToSection('hero')}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
              <button
                onClick={() => scrollToSection('profile-form')}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Join Community
              </button>
              <button
                onClick={() => scrollToSection('community-grid')}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
              >
                <Search className="w-4 h-4" />
                Explore Members
              </button>
              <div className="px-4 pt-2">
                <Button 
                  onClick={() => scrollToSection('profile-form')}
                  className="w-full btn-hero"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;