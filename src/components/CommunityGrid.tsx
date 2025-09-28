import { useState, useEffect } from "react";
import MemberCard from "./MemberCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockMembers = [
  {
    id: "1",
    name: "Sarah Chen",
    location: "San Francisco, CA",
    industry: "Technology",
    profession: "ML Engineer",
    experience: "6-10 years",
    role: "entrepreneur",
    interests: ["Computer Vision", "NLP", "Healthcare AI", "Startups"],
    matchScore: 92,
  },
  {
    id: "2", 
    name: "Marcus Johnson",
    location: "New York, NY",
    industry: "Finance",
    profession: "Data Scientist",
    experience: "4-5 years",
    role: "product-owner",
    interests: ["Fintech", "Risk Modeling", "Deep Learning"],
    matchScore: 87,
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    location: "Austin, TX",
    industry: "Healthcare",
    profession: "AI Researcher",
    experience: "10+ years",
    role: "founder",
    interests: ["Medical AI", "Ethics", "Research", "Publications"],
  },
  {
    id: "4",
    name: "David Kim",
    location: "Seattle, WA",
    industry: "Technology",
    profession: "Product Manager",
    experience: "2-3 years",
    role: "designer",
    interests: ["UX/UI", "AI Products", "User Research"],
  },
  {
    id: "5",
    name: "Amanda Foster",
    location: "Boston, MA",
    industry: "Education",
    profession: "AI Consultant",
    experience: "6-10 years",
    role: "investor",
    interests: ["EdTech", "AI Training", "Curriculum Design"],
  },
  {
    id: "6",
    name: "James Liu",
    location: "Los Angeles, CA",
    industry: "Entertainment",
    profession: "Computer Vision Engineer",
    experience: "4-5 years",
    role: "partner",
    interests: ["Media AI", "Content Generation", "Creative Tools"],
  }
];

const CommunityGrid = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [filteredMembers, setFilteredMembers] = useState(mockMembers);

  const handleConnect = (memberId: string) => {
    const member = mockMembers.find(m => m.id === memberId);
    toast({
      title: "Connection Request Sent!",
      description: `Your connection request has been sent to ${member?.name}. They'll be notified and can reach out to you directly.`,
      className: "success-state",
    });
  };

  const filterMembers = () => {
    let filtered = mockMembers;

    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.interests.some(interest => 
          interest.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (industryFilter !== "all") {
      filtered = filtered.filter(member => 
        member.industry.toLowerCase() === industryFilter
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter(member => member.role === roleFilter);
    }

    setFilteredMembers(filtered);
  };

  // Apply filters whenever search term or filters change
  useEffect(() => {
    filterMembers();
  }, [searchTerm, industryFilter, roleFilter]);

  const uniqueIndustries = [...new Set(mockMembers.map(m => m.industry))];
  const uniqueRoles = [...new Set(mockMembers.map(m => m.role))];

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="heading-section mb-4">Discover Community Members</h2>
          <p className="text-community max-w-2xl mx-auto">
            Connect with AI professionals, researchers, and innovators from around the world. 
            Find your next collaborator, mentor, or business partner.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search members, skills, interests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            <div className="flex gap-4 items-center">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {uniqueIndustries.map(industry => (
                    <SelectItem key={industry} value={industry.toLowerCase()}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {uniqueRoles.map(role => (
                    <SelectItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {searchTerm && (
              <Badge variant="outline" className="flex items-center gap-1">
                Search: {searchTerm}
                <button onClick={() => setSearchTerm("")} className="ml-1 hover:text-destructive">×</button>
              </Badge>
            )}
            {industryFilter !== "all" && (
              <Badge variant="outline" className="flex items-center gap-1">
                Industry: {industryFilter}
                <button onClick={() => setIndustryFilter("all")} className="ml-1 hover:text-destructive">×</button>
              </Badge>
            )}
            {roleFilter !== "all" && (
              <Badge variant="outline" className="flex items-center gap-1">
                Role: {roleFilter.replace('-', ' ')}
                <button onClick={() => setRoleFilter("all")} className="ml-1 hover:text-destructive">×</button>
              </Badge>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredMembers.length} of {mockMembers.length} members
          </p>
        </div>

        {/* Members Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
            {filteredMembers.map((member, index) => (
              <div key={member.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <MemberCard member={member} onConnect={handleConnect} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No members found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Load More CTA */}
        {filteredMembers.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="btn-secondary">
              Load More Members
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunityGrid;