import { useState } from "react";
import AICLogo from "@/components/AICLogo";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, UserPlus, Search } from "lucide-react";

const navigationLinks = [
  { id: "hero", label: "Home", icon: Home },
  { id: "profile-form", label: "Join Community", icon: UserPlus },
  { id: "community-grid", label: "Explore Members", icon: Search },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-pure-white/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-pure-white/80">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          <AICLogo className="hidden md:flex" />
          <AICLogo className="md:hidden" />

          <div className="hidden md:flex items-center gap-8">
            {navigationLinks.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-neutral-gray/80 transition-colors hover:text-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue/30 focus-visible:ring-offset-2"
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              type="button"
              onClick={() => scrollToSection("profile-form")}
              className="btn-hero shadow-none"
            >
              Get Started
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="primary-navigation"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-neutral-gray/80 transition-colors hover:text-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue/40 focus-visible:ring-offset-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div
            id="primary-navigation"
            className="md:hidden border-t border-border bg-pure-white/97 py-6"
          >
            <div className="flex flex-col gap-3">
              {navigationLinks.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-neutral-gray/80 transition-colors hover:bg-accent/60 hover:text-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue/30"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
              <Button
                type="button"
                onClick={() => scrollToSection("profile-form")}
                className="btn-hero w-full"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
