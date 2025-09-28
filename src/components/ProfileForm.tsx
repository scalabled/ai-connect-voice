import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, User, MapPin, Briefcase, Target, Users, Clock, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VoiceWizard from "@/components/VoiceWizard";

const ProfileForm = () => {
  const { toast } = useToast();
  const [isVoiceWizardOpen, setIsVoiceWizardOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    industry: "",
    profession: "",
    experience: "",
    projectCategory: "",
    role: "",
    lookingFor: "",
    interests: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Created Successfully!",
      description: "Your AI agent will contact you shortly for the voice interview.",
      className: "success-state",
    });

  //   curl -X POST "https://aic-f1-backend.onrender.com/start-call" \
  // -H "Content-Type: application/json" \
  // -d '{"phone_number":"+19712464702","user_name":"Hamza"}'

  fetch("https://aic-f1-backend.onrender.com/start-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: formData.phone,
        user_name: formData.name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
  };

  const handleVoiceFormUpdate = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addInterest = (interest: string) => {
    if (interest && !formData.interests.includes(interest)) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  return (
    <section id="profile-form" className="py-16 px-6 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="heading-section mb-4">Create Your Community Profile</h2>
          <p className="text-community max-w-2xl mx-auto mb-6">
            Provide your phone number and our AI agent will call you within 24 hours for a personalized 
            5-minute interview to complete your profile and find the best connections.
          </p>
          
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 max-w-md mx-auto mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">AI Phone Interview</h3>
                <p className="text-sm text-neutral-gray/70">Powered by ElevenLabs</p>
              </div>
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Skip the long form - just provide your phone number and let our AI agent call you for a quick, personalized interview.
            </p>
          </div>
        </div>

        <Card className="community-card animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary-blue">
              <User className="w-6 h-6" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2 text-primary-blue">
                    <User className="w-4 h-4 text-primary" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-primary-blue">
                    <Bot className="w-4 h-4 text-primary" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Our AI agent will call this number for your interview
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 hidden">
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2 text-primary-blue">
                    <MapPin className="w-4 h-4 text-primary" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                    className="form-input"
                    placeholder="City, Country"
                  />
                </div>
                <div></div>
              </div>

              {/* Professional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 hidden">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="flex items-center gap-2 text-primary-blue">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Industry
                  </Label>
                  <Select onValueChange={(value) => setFormData(prev => ({...prev, industry: value}))}>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profession" className="flex items-center gap-2 text-primary-blue">
                    <Target className="w-4 h-4 text-primary" />
                    Profession
                  </Label>
                  <Input
                    id="profession"
                    value={formData.profession}
                    onChange={(e) => setFormData(prev => ({...prev, profession: e.target.value}))}
                    className="form-input"
                    placeholder="Data Scientist, ML Engineer, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 hidden">
                <div className="space-y-2">
                  <Label htmlFor="experience" className="flex items-center gap-2 text-primary-blue">
                    <Clock className="w-4 h-4 text-primary" />
                    Years of Experience
                  </Label>
                  <Select onValueChange={(value) => setFormData(prev => ({...prev, experience: value}))}>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="2-3">2-3 years</SelectItem>
                      <SelectItem value="4-5">4-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="flex items-center gap-2 text-primary-blue">
                    <Users className="w-4 h-4 text-primary" />
                    Role
                  </Label>
                  <Select onValueChange={(value) => setFormData(prev => ({...prev, role: value}))}>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                      <SelectItem value="product-owner">Product Owner</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="founder">Founder</SelectItem>
                      <SelectItem value="investor">Investor</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Project Interests */}
              <div className="space-y-2 hidden">
                <Label htmlFor="projectCategory" className="text-primary-blue">Project Category</Label>
                <Textarea
                  id="projectCategory"
                  value={formData.projectCategory}
                  onChange={(e) => setFormData(prev => ({...prev, projectCategory: e.target.value}))}
                  className="form-input"
                  placeholder="Describe the types of projects you're interested in working on..."
                  rows={3}
                />
              </div>

              <div className="space-y-2 hidden">
                <Label htmlFor="lookingFor" className="text-primary-blue">Who are you looking to meet?</Label>
                <Textarea
                  id="lookingFor"
                  value={formData.lookingFor}
                  onChange={(e) => setFormData(prev => ({...prev, lookingFor: e.target.value}))}
                  className="form-input"
                  placeholder="Describe the types of people you'd like to connect with..."
                  rows={3}
                />
              </div>

              {/* Keywords/Interests */}
              {formData.interests.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-primary-blue">Your Interests</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeInterest(interest)}
                      >
                        {interest} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Voice Call CTA */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Bot className="w-12 h-12 text-primary" />
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Powered by</p>
                    <p className="text-sm font-semibold text-primary">ElevenLabs AI</p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  AI Agent Will Call You
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  After submitting, our advanced AI agent will call your phone number within 24 hours 
                  for a personalized 5-minute interview to complete your profile and find your best matches.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1 text-neutral-gray/70">
                    <span className="inline-flex h-2 w-2 rounded-full bg-success-green"></span>
                    <span>Natural conversation</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-gray/70">
                    <span className="inline-flex h-2 w-2 rounded-full bg-success-green"></span>
                    <span>5 minutes max</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-gray/70">
                    <span className="inline-flex h-2 w-2 rounded-full bg-success-green"></span>
                    <span>No voicemail</span>
                  </div>
                </div>
                <Button type="submit" className="btn-hero">
                  Submit & Schedule AI Call
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <VoiceWizard
          isOpen={isVoiceWizardOpen}
          onClose={() => setIsVoiceWizardOpen(false)}
          onFormUpdate={handleVoiceFormUpdate}
        />
      </div>
    </section>
  );
};

export default ProfileForm;