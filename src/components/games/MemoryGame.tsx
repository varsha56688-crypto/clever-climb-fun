import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";

interface MemoryGameProps {
  onScoreUpdate: (points: number) => void;
  onBack: () => void;
}

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const cardEmojis = ["🎯", "🌟", "🎮", "🎨", "🎪", "🎭", "🎬", "🎵", "🏆", "💎", "🚀", "⚡"];

export const MemoryGame = ({ onScoreUpdate, onBack }: MemoryGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const createCards = () => {
    const gameEmojis = cardEmojis.slice(0, 6); // Use 6 pairs (12 cards)
    const duplicatedEmojis = [...gameEmojis, ...gameEmojis];
    
    const shuffledCards = duplicatedEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameCompleted(false);
    setTimeElapsed(0);
  };

  const handleCardClick = (cardId: number) => {
    if (gameCompleted) return;
    
    const clickedCard = cards.find(card => card.id === cardId);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(cards.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found!
        setTimeout(() => {
          setCards(prevCards => prevCards.map(card => 
            card.id === firstCardId || card.id === secondCardId 
              ? { ...card, isMatched: true } 
              : card
          ));
          setMatches(matches + 1);
          setFlippedCards([]);
          
          // Check if game is completed
          if (matches + 1 === 6) {
            setGameCompleted(true);
            calculateScore();
          }
        }, 500);
      } else {
        // No match, flip cards back
        setTimeout(() => {
          setCards(prevCards => prevCards.map(card => 
            card.id === firstCardId || card.id === secondCardId 
              ? { ...card, isFlipped: false } 
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const calculateScore = () => {
    // Score based on efficiency: fewer moves and faster time = more points
    const basePoints = 25;
    const moveBonus = Math.max(0, 20 - moves) * 2; // Bonus for fewer moves
    const timeBonus = Math.max(0, 60 - timeElapsed); // Bonus for faster completion
    const totalPoints = basePoints + moveBonus + timeBonus;
    
    onScoreUpdate(totalPoints);
  };

  useEffect(() => {
    createCards();
  }, []);

  useEffect(() => {
    if (!gameCompleted && moves > 0) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameCompleted, moves]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button 
          onClick={onBack} 
          variant="outline" 
          size="sm"
          className="rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gradient-hero font-fredoka">
            🧠 Memory Master
          </h1>
          <div className="flex gap-6 text-muted-foreground">
            <span>Moves: {moves}</span>
            <span>Matches: {matches}/6</span>
            <span>Time: {formatTime(timeElapsed)}</span>
          </div>
        </div>
        <Button 
          onClick={createCards}
          variant="outline"
          size="sm"
          className="rounded-full"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Game Completed */}
      {gameCompleted && (
        <div className="game-card p-6 mb-8 text-center bg-success/10 border border-success/20">
          <h2 className="text-2xl font-bold text-success mb-2">🎉 Congratulations!</h2>
          <p className="text-lg mb-4">
            You completed the memory game in {moves} moves and {formatTime(timeElapsed)}!
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <span>Base Points: 25</span>
            <span>Move Bonus: {Math.max(0, 20 - moves) * 2}</span>
            <span>Time Bonus: {Math.max(0, 60 - timeElapsed)}</span>
          </div>
        </div>
      )}

      {/* Game Grid */}
      <div className="game-card p-6">
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                aspect-square rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-center text-4xl font-bold
                ${card.isMatched 
                  ? "bg-success/20 border-2 border-success scale-95 opacity-60" 
                  : card.isFlipped 
                    ? "bg-primary/20 border-2 border-primary shadow-lg" 
                    : "bg-muted hover:bg-muted/70 border-2 border-muted-foreground/20 hover:scale-105"
                }
                ${!card.isFlipped && !card.isMatched ? "hover:shadow-lg" : ""}
              `}
            >
              {card.isFlipped || card.isMatched ? (
                <span className="animate-pulse">{card.emoji}</span>
              ) : (
                <span className="text-2xl">❓</span>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            🎯 Find matching pairs by clicking cards. Remember their positions!
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            ⚡ Fewer moves and faster time = more points!
          </p>
        </div>
      </div>
    </div>
  );
};