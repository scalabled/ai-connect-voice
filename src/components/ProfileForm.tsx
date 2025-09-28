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
            Fill out the form below and our AI agent will call you for a personalized 
            interview to complete your profile and find the best connections.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => setIsVoiceWizardOpen(true)}
              className="btn-hero"
              size="lg"
            >
              <Bot className="w-5 h-5 mr-2" />
              Start Voice Wizard
            </Button>
            <p className="text-sm text-muted-foreground self-center">
              or fill out manually below
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
                  <Label htmlFor="name" className="flex items-center gap-2">
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
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                    className="form-input"
                    placeholder="City, Country"
                    required
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="flex items-center gap-2">
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
                  <Label htmlFor="profession" className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Profession
                  </Label>
                  <Input
                    id="profession"
                    value={formData.profession}
                    onChange={(e) => setFormData(prev => ({...prev, profession: e.target.value}))}
                    className="form-input"
                    placeholder="Data Scientist, ML Engineer, etc."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="experience" className="flex items-center gap-2">
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
                  <Label htmlFor="role" className="flex items-center gap-2">
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
              <div className="space-y-2">
                <Label htmlFor="projectCategory">Project Category</Label>
                <Textarea
                  id="projectCategory"
                  value={formData.projectCategory}
                  onChange={(e) => setFormData(prev => ({...prev, projectCategory: e.target.value}))}
                  className="form-input"
                  placeholder="Describe the types of projects you're interested in working on..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lookingFor">Who are you looking to meet?</Label>
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
                  <Label>Your Interests</Label>
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
                <Mic className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Next: AI Voice Interview
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  After submitting this form, our AI agent will call you within 24 hours 
                  for a personalized 5-minute interview to complete your profile and find your best matches.
                </p>
                <Button type="submit" className="btn-hero">
                  Submit & Schedule AI Interview
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