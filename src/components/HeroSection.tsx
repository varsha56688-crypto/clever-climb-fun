import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gamepad2, Star, Trophy, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface HeroSectionProps {
  onNameSubmit: (name: string) => void;
}

export const HeroSection = ({ onNameSubmit }: HeroSectionProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-6xl animate-spin-slow opacity-30">🎯</div>
      <div className="absolute top-32 right-20 text-5xl float-animation opacity-30">📚</div>
      <div className="absolute bottom-32 left-20 text-4xl float-animation opacity-30">🎲</div>
      <div className="absolute bottom-20 right-10 text-6xl animate-bounce opacity-30">🌟</div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 font-fredoka">
          <span className="rainbow-text block mb-4">EduPlay</span>
          <span className="text-gradient-hero text-4xl md:text-5xl">
            Learn • Play • Win!
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-comic">
          🎮 Turn learning into an adventure with educational games that make you smarter while having fun!
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="game-card p-4 text-center">
            <Gamepad2 className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="font-semibold text-sm">Fun Games</p>
          </div>
          <div className="game-card p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-warning" />
            <p className="font-semibold text-sm">Earn Points</p>
          </div>
          <div className="game-card p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-success" />
            <p className="font-semibold text-sm">Achievements</p>
          </div>
          <div className="game-card p-4 text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-accent" />
            <p className="font-semibold text-sm">Offline Play</p>
          </div>
        </div>

        {/* Name Input Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="game-card p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-gradient-hero">Ready to Start?</h2>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-center text-lg border-2 border-primary/20 focus:border-primary rounded-2xl h-12"
                required
              />
              <Button 
                type="submit" 
                className="btn-hero w-full h-12 text-lg"
                disabled={!name.trim()}
              >
                🚀 Start Playing!
              </Button>
            </div>
          </div>
        </form>

        {/* Fun Fact */}
        <div className="text-sm text-muted-foreground opacity-75">
          🎯 Join thousands of students learning through play! Works offline too! 📱
        </div>
      </div>
    </section>
  );
};