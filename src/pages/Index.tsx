import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { GameDashboard } from "@/components/GameDashboard";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { toast } from "sonner";

const Index = () => {
  const [userScore, setUserScore] = useState(() => {
    const saved = localStorage.getItem("eduplay-score");
    return saved ? parseInt(saved) : 0;
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("eduplay-username") || "";
  });

  const [showGames, setShowGames] = useState(!!userName);

  const handleScoreUpdate = (points: number) => {
    const newScore = userScore + points;
    setUserScore(newScore);
    localStorage.setItem("eduplay-score", newScore.toString());
    
    if (points > 0) {
      toast.success(`🎉 You earned ${points} points!`, {
        description: `Total score: ${newScore}`,
      });
    }
  };

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    localStorage.setItem("eduplay-username", name);
    setShowGames(true);
    toast.success(`Welcome to EduPlay, ${name}! 🎮`, {
      description: "Start playing games to earn points!",
    });
  };

  useEffect(() => {
    // Register service worker for offline functionality
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        console.log('Service worker registration failed');
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <main>
        {!showGames ? (
          <HeroSection onNameSubmit={handleNameSubmit} />
        ) : (
          <>
            <ScoreDisplay score={userScore} userName={userName} />
            <GameDashboard onScoreUpdate={handleScoreUpdate} />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;