import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Briefcase, Clock, MessageCircle } from "lucide-react";

interface MemberCardProps {
  member: {
    id: string;
    name: string;
    location: string;
    industry: string;
    profession: string;
    experience: string;
    role: string;
    interests: string[];
    avatar?: string;
    matchScore?: number;
  };
  onConnect?: (memberId: string) => void;
}

const MemberCard = ({ member, onConnect }: MemberCardProps) => {
  const handleConnect = () => {
    onConnect?.(member.id);
  };

  const getAvatarInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="community-card interactive-scale h-full">
      <CardHeader className="text-center pb-4">
        <div className="relative mx-auto mb-4">
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold border-2 border-primary/20">
              {getAvatarInitials(member.name)}
            </div>
          )}
          {member.matchScore && member.matchScore > 80 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-success-green text-pure-white rounded-full flex items-center justify-center text-xs font-bold">
              {member.matchScore}%
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{member.location}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Professional Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="font-medium">{member.profession}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{member.experience} experience</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-primary-blue">{member.industry}</span>
          </div>
        </div>

        {/* Role Badge */}
        <div className="flex justify-center">
          <Badge variant="outline" className="border-primary text-primary">
            {member.role}
          </Badge>
        </div>

        {/* Interests */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Interests
          </p>
          <div className="flex flex-wrap gap-1">
            {member.interests.slice(0, 3).map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs">
                {interest}
              </Badge>
            ))}
            {member.interests.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{member.interests.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Connect Button */}
        <Button 
          onClick={handleConnect}
          className="w-full mt-4 btn-hero flex items-center gap-2"
          size="sm"
        >
          <MessageCircle className="w-4 h-4" />
          Connect
        </Button>
      </CardContent>
    </Card>
  );
};

export default MemberCard;