import { Trophy, Star, Medal, Crown } from "lucide-react";

interface ScoreDisplayProps {
  score: number;
  userName: string;
}

export const ScoreDisplay = ({ score, userName }: ScoreDisplayProps) => {
  const getLevel = (score: number) => {
    if (score >= 1000) return { name: "Champion", icon: Crown, color: "text-badge-gold" };
    if (score >= 500) return { name: "Expert", icon: Trophy, color: "text-badge-silver" };
    if (score >= 200) return { name: "Scholar", icon: Medal, color: "text-badge-bronze" };
    return { name: "Beginner", icon: Star, color: "text-primary" };
  };

  const level = getLevel(score);
  const LevelIcon = level.icon;
  const nextLevelScore = score >= 1000 ? 1000 : score >= 500 ? 1000 : score >= 200 ? 500 : 200;
  const progress = score >= 1000 ? 100 : ((score % (nextLevelScore === 1000 ? 500 : nextLevelScore === 500 ? 300 : 200)) / (nextLevelScore === 1000 ? 500 : nextLevelScore === 500 ? 300 : 200)) * 100;

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="game-card p-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-gradient-to-r from-primary to-secondary`}>
                  <LevelIcon className={`w-6 h-6 ${level.color}`} />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-gradient-hero">
                    {userName}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {level.name} Level
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Score Display */}
          <div className="flex items-center gap-4">
            <div className="game-card p-4">
              <div className="text-center">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 star-glow" />
                  <span className="text-2xl font-bold score-bounce">
                    {score}
                  </span>
                  <span className="text-sm text-muted-foreground">points</span>
                </div>
                
                {/* Progress Bar */}
                {score < 1000 && (
                  <div className="w-32">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{nextLevelScore} pts</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="progress-fill h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};