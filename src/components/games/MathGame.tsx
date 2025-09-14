import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

interface MathGameProps {
  onScoreUpdate: (points: number) => void;
  onBack: () => void;
}

export const MathGame = ({ onScoreUpdate, onBack }: MathGameProps) => {
  const [question, setQuestion] = useState({ num1: 0, num2: 0, operator: "+", answer: 0 });
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [questionsCompleted, setQuestionsCompleted] = useState(0);
  const [streak, setStreak] = useState(0);

  const operators = ["+", "-", "×"];

  const generateQuestion = () => {
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1 = Math.floor(Math.random() * 20) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;
    let answer = 0;

    // Ensure positive results for subtraction
    if (operator === "-" && num2 > num1) {
      [num1, num2] = [num2, num1];
    }

    switch (operator) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        answer = num1 - num2;
        break;
      case "×":
        answer = num1 * num2;
        break;
    }

    setQuestion({ num1, num2, operator, answer });
    setUserAnswer("");
    setFeedback(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answer = parseInt(userAnswer);
    
    if (isNaN(answer)) return;

    const isCorrect = answer === question.answer;
    
    if (isCorrect) {
      const points = 5 + streak; // Bonus points for streak
      setStreak(streak + 1);
      setFeedback({ 
        correct: true, 
        message: `Correct! +${points} points` + (streak > 0 ? ` (${streak + 1}x streak!)` : "") 
      });
      onScoreUpdate(points);
    } else {
      setStreak(0);
      setFeedback({ 
        correct: false, 
        message: `Not quite! The answer is ${question.answer}` 
      });
    }

    setQuestionsCompleted(questionsCompleted + 1);
    
    // Auto-generate next question after 2 seconds
    setTimeout(() => {
      generateQuestion();
    }, 2000);
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
            🔢 Math Adventures
          </h1>
          <p className="text-muted-foreground">
            Questions completed: {questionsCompleted} | Streak: {streak}🔥
          </p>
        </div>
      </div>

      {/* Game Area */}
      <div className="game-card p-8 text-center">
        <div className="mb-8">
          <h2 className="text-6xl font-bold mb-6 font-fredoka">
            <span className="text-primary">{question.num1}</span>
            <span className="text-secondary mx-4">{question.operator}</span>
            <span className="text-accent">{question.num2}</span>
            <span className="text-muted-foreground mx-4">=</span>
            <span className="text-warning">?</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-32 h-16 text-3xl text-center border-2 border-primary/30 rounded-2xl focus:border-primary focus:outline-none bg-background"
              placeholder="?"
              autoFocus
            />
            
            <div>
              <Button 
                type="submit" 
                className="btn-hero px-8 py-3"
                disabled={!userAnswer.trim()}
              >
                Check Answer! ✨
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
              <div className="text-2xl">🎉 Great job!</div>
            )}
          </div>
        )}

        {/* Progress Indicators */}
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          <span>💪 Keep going!</span>
          <span>⭐ Each correct answer = 5+ points</span>
        </div>
      </div>
    </div>
  );
};