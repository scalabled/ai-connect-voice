import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProfileForm from "@/components/ProfileForm";
import CommunityGrid from "@/components/CommunityGrid";
import { Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="profile-form">
          <ProfileForm />
        </section>
        <section id="community-grid">
          <CommunityGrid />
        </section>
      </main>
      <footer className="bg-neutral-gray text-pure-white py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="text-xl font-bold">AIC Community</div>
            </div>
            <p className="text-pure-white/80 mb-4">
              Connecting 70,000+ AI professionals worldwide
            </p>
            <p className="text-sm text-pure-white/60">
              © 2024 AI Community Connection Platform. Powered by intelligent matching.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
