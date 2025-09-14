import { Calculator, SpellCheck, Brain, Puzzle, Book, Music } from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { useState } from "react";
import { MathGame } from "@/components/games/MathGame";
import { SpellingGame } from "@/components/games/SpellingGame";
import { MemoryGame } from "@/components/games/MemoryGame";

interface GameDashboardProps {
  onScoreUpdate: (points: number) => void;
}

export const GameDashboard = ({ onScoreUpdate }: GameDashboardProps) => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: "math",
      title: "Math Adventures",
      description: "Solve fun math problems and earn points!",
      icon: Calculator,
      color: "from-primary to-primary-glow",
      difficulty: "Easy",
      points: "5-15 pts",
      emoji: "🔢"
    },
    {
      id: "spelling",
      title: "Word Wizard",
      description: "Master spelling with exciting word challenges!",
      icon: SpellCheck,
      color: "from-secondary to-secondary-glow",
      difficulty: "Medium",
      points: "10-20 pts",
      emoji: "📝"
    },
    {
      id: "memory",
      title: "Memory Master",
      description: "Test your memory with colorful card matching!",
      icon: Brain,
      color: "from-accent to-warning",
      difficulty: "Medium",
      points: "15-25 pts",
      emoji: "🧠"
    },
    {
      id: "puzzle",
      title: "Puzzle Pro",
      description: "Coming Soon! Logic puzzles and brain teasers",
      icon: Puzzle,
      color: "from-success to-primary",
      difficulty: "Hard",
      points: "20-30 pts",
      emoji: "🧩",
      comingSoon: true
    },
    {
      id: "reading",
      title: "Reading Quest",
      description: "Coming Soon! Reading comprehension adventures",
      icon: Book,
      color: "from-warning to-accent",
      difficulty: "Easy",
      points: "5-15 pts",
      emoji: "📚",
      comingSoon: true
    },
    {
      id: "music",
      title: "Melody Maker",
      description: "Coming Soon! Learn music theory through games",
      icon: Music,
      color: "from-secondary to-accent",
      difficulty: "Medium",
      points: "10-25 pts",
      emoji: "🎵",
      comingSoon: true
    }
  ];

  const handleGameClick = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (game?.comingSoon) return;
    setActiveGame(gameId);
  };

  const handleBackToDashboard = () => {
    setActiveGame(null);
  };

  if (activeGame) {
    return (
      <div className="container mx-auto px-4 py-8">
        {activeGame === "math" && (
          <MathGame onScoreUpdate={onScoreUpdate} onBack={handleBackToDashboard} />
        )}
        {activeGame === "spelling" && (
          <SpellingGame onScoreUpdate={onScoreUpdate} onBack={handleBackToDashboard} />
        )}
        {activeGame === "memory" && (
          <MemoryGame onScoreUpdate={onScoreUpdate} onBack={handleBackToDashboard} />
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Message */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 rainbow-text font-fredoka">
          Choose Your Adventure!
        </h2>
        <p className="text-xl text-muted-foreground font-comic">
          🎮 Pick a game and start earning points while learning! 🌟
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {games.map((game) => (
          <GameCard
            key={game.id}
            {...game}
            onClick={() => handleGameClick(game.id)}
          />
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-16 text-center">
        <div className="game-card p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-gradient-hero">
            🏆 Game Statistics
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary">6</div>
              <div className="text-sm text-muted-foreground">Total Games</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success">3</div>
              <div className="text-sm text-muted-foreground">Available Now</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">∞</div>
              <div className="text-sm text-muted-foreground">Fun Level</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};