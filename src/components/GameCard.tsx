import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  difficulty: string;
  points: string;
  emoji: string;
  comingSoon?: boolean;
  onClick: () => void;
}

export const GameCard = ({
  title,
  description,
  icon: Icon,
  color,
  difficulty,
  points,
  emoji,
  comingSoon = false,
  onClick
}: GameCardProps) => {
  return (
    <div
      className={`game-card p-6 relative overflow-hidden ${
        comingSoon ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={!comingSoon ? onClick : undefined}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 rounded-2xl`} />
      
      {/* Coming Soon Badge */}
      {comingSoon && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="secondary" className="text-xs">
            Coming Soon
          </Badge>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}>
            <Icon className="w-8 h-8" />
          </div>
          <div className="text-4xl">{emoji}</div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold mb-2 text-gradient-hero font-fredoka">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {description}
        </p>

        {/* Game Info */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Difficulty:</span>
              <Badge 
                variant={difficulty === "Easy" ? "default" : difficulty === "Medium" ? "secondary" : "destructive"}
                className="text-xs"
              >
                {difficulty}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="star-glow">⭐</span> {points}
            </div>
          </div>

          {!comingSoon && (
            <div className="text-right">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-xs font-semibold text-primary">
                Play Now!
              </div>
            </div>
          )}
        </div>

        {/* Hover Effect Indicator */}
        {!comingSoon && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
        )}
      </div>
    </div>
  );
};