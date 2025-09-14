import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle, Volume2 } from "lucide-react";

interface SpellingGameProps {
  onScoreUpdate: (points: number) => void;
  onBack: () => void;
}

const words = [
  { word: "HAPPY", hint: "A feeling of joy 😊", difficulty: 1 },
  { word: "SCHOOL", hint: "Where you learn 📚", difficulty: 1 },
  { word: "FRIEND", hint: "Someone you play with 👫", difficulty: 2 },
  { word: "NATURE", hint: "Trees, flowers, and animals 🌳", difficulty: 2 },
  { word: "RAINBOW", hint: "Colorful arc in the sky 🌈", difficulty: 2 },
  { word: "ELEPHANT", hint: "Large animal with trunk 🐘", difficulty: 3 },
  { word: "ADVENTURE", hint: "An exciting journey 🗺️", difficulty: 3 },
  { word: "WONDERFUL", hint: "Something amazing 🌟", difficulty: 3 },
  { word: "BUTTERFLY", hint: "Beautiful flying insect 🦋", difficulty: 3 },
  { word: "BRILLIANT", hint: "Very smart or bright ✨", difficulty: 3 }
];

export const SpellingGame = ({ onScoreUpdate, onBack }: SpellingGameProps) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [questionsCompleted, setQuestionsCompleted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [scrambledWord, setScrambledWord] = useState("");

  const scrambleWord = (word: string) => {
    const chars = word.split('');
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('');
  };

  const generateQuestion = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setScrambledWord(scrambleWord(randomWord.word));
    setUserAnswer("");
    setFeedback(null);
  };

  const speakWord = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answer = userAnswer.toUpperCase().trim();
    
    if (!answer) return;

    const isCorrect = answer === currentWord.word;
    
    if (isCorrect) {
      const basePoints = currentWord.difficulty * 5;
      const streakBonus = streak * 2;
      const totalPoints = basePoints + streakBonus;
      
      setStreak(streak + 1);
      setFeedback({ 
        correct: true, 
        message: `Perfect spelling! +${totalPoints} points` + (streak > 0 ? ` (${streak + 1}x streak!)` : "") 
      });
      onScoreUpdate(totalPoints);
    } else {
      setStreak(0);
      setFeedback({ 
        correct: false, 
        message: `Not quite! The correct spelling is: ${currentWord.word}` 
      });
    }

    setQuestionsCompleted(questionsCompleted + 1);
    
    // Auto-generate next question after 3 seconds
    setTimeout(() => {
      generateQuestion();
    }, 3000);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
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
        <div>
          <h1 className="text-3xl font-bold text-gradient-hero font-fredoka">
            📝 Word Wizard
          </h1>
          <p className="text-muted-foreground">
            Words spelled: {questionsCompleted} | Streak: {streak}🔥
          </p>
        </div>
      </div>

      {/* Game Area */}
      <div className="game-card p-8 text-center">
        <div className="mb-8">
          {/* Difficulty Badge */}
          <div className="flex justify-center mb-4">
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              currentWord.difficulty === 1 ? "bg-success/20 text-success" :
              currentWord.difficulty === 2 ? "bg-warning/20 text-warning" :
              "bg-destructive/20 text-destructive"
            }`}>
              {currentWord.difficulty === 1 ? "Easy" : currentWord.difficulty === 2 ? "Medium" : "Hard"}
            </div>
          </div>

          {/* Hint */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-secondary">Hint:</h3>
            <p className="text-lg text-muted-foreground">{currentWord.hint}</p>
          </div>

          {/* Scrambled Letters */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 text-accent">Unscramble these letters:</h4>
            <div className="flex justify-center gap-2 mb-4">
              {scrambledWord.split('').map((letter, index) => (
                <div
                  key={index}
                  className="w-12 h-12 bg-primary/10 border-2 border-primary/30 rounded-lg flex items-center justify-center text-xl font-bold text-primary"
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>

          {/* Audio Button */}
          <div className="mb-6">
            <Button
              onClick={speakWord}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              🔊 Hear the word
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-80 h-16 text-2xl text-center border-2 border-secondary/30 rounded-2xl focus:border-secondary focus:outline-none bg-background uppercase tracking-wider"
              placeholder="TYPE YOUR ANSWER..."
              autoFocus
            />
            
            <div>
              <Button 
                type="submit" 
                className="btn-hero px-8 py-3"
                disabled={!userAnswer.trim()}
              >
                Check Spelling! ✨
              </Button>
            </div>
          </form>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`p-4 rounded-2xl mb-4 ${
            feedback.correct ? "bg-success/10 border border-success/20" : "bg-destructive/10 border border-destructive/20"
          }`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              {feedback.correct ? (
                <CheckCircle className="w-6 h-6 text-success" />
              ) : (
                <XCircle className="w-6 h-6 text-destructive" />
              )}
              <span className={`font-semibold ${feedback.correct ? "text-success" : "text-destructive"}`}>
                {feedback.message}
              </span>
            </div>
            {feedback.correct && (
              <div className="text-2xl">🎉 Excellent spelling!</div>
            )}
          </div>
        )}

        {/* Tips */}
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          <span>🎯 Harder words = more points!</span>
          <span>⭐ Build streaks for bonus points</span>
        </div>
      </div>
    </div>
  );
};