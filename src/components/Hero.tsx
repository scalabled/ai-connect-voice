import { Button } from "@/components/ui/button";
import { Users, Zap, Network } from "lucide-react";

const Hero = () => {
  return (
    <section className="hero-gradient text-pure-white">
      <div className="container mx-auto max-w-6xl px-6 py-24 md:py-28">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="space-y-6 animate-fade-in">
            <h1 className="heading-hero text-pure-white">
              Connect With 70,000+ AI Leaders Worldwide
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-pure-white/85">
              Build your profile once and let our AI concierge introduce you to mentors, collaborators, and investors
              who align with your goals. Human-centered matching, powered by trusted AI intelligence.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Button className="btn-hero" size="lg">
              Join the Community
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-pure-white/60 bg-transparent px-6 py-3 text-base font-semibold text-pure-white transition hover:border-pure-white hover:bg-pure-white hover:text-primary-orange"
            >
              Explore Members
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-3 animate-slide-up">
            <div className="rounded-2xl border border-pure-white/10 bg-pure-white/5 p-6 backdrop-blur">
              <Users className="h-10 w-10 text-accent-orange" />
              <h3 className="mt-4 text-2xl font-semibold">70K+</h3>
              <p className="text-sm text-pure-white/70">Verified members across 90+ countries</p>
            </div>
            <div className="rounded-2xl border border-pure-white/10 bg-pure-white/5 p-6 backdrop-blur">
              <Network className="h-10 w-10 text-accent-orange" />
              <h3 className="mt-4 text-2xl font-semibold">Smart Matching</h3>
              <p className="text-sm text-pure-white/70">AI introductions based on shared goals and expertise</p>
            </div>
            <div className="rounded-2xl border border-pure-white/10 bg-pure-white/5 p-6 backdrop-blur">
              <Zap className="h-10 w-10 text-accent-orange" />
              <h3 className="mt-4 text-2xl font-semibold">Voice Onboarding</h3>
              <p className="text-sm text-pure-white/70">5-minute AI interview captures your story and focus</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
