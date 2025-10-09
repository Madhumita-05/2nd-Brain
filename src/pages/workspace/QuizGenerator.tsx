import { useState } from "react";
import { BookOpen, Brain, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const QuizGenerator = () => {
  const [materialId, setMaterialId] = useState("");
  const [numQuestions, setNumQuestions] = useState("5");
  const [difficulty, setDifficulty] = useState("medium");
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    // TODO: Integrate with backend to generate quiz from materials
    setTimeout(() => {
      const sampleQuiz: Question[] = [
        {
          question: "What is the main concept discussed in the material?",
          options: ["Option A", "Option B", "Option C", "Option D"],
          correct: 1,
        },
        {
          question: "Which technique is most effective according to the text?",
          options: ["Technique 1", "Technique 2", "Technique 3", "Technique 4"],
          correct: 2,
        },
      ];
      setQuiz(sampleQuiz);
      setAnswers({});
      setSubmitted(false);
      setScore(0);
      setLoading(false);
      toast.success("Quiz generated successfully!");
    }, 1500);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quiz.forEach((q, idx) => {
      if (answers[idx] === q.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
    toast.success(`Quiz completed! Score: ${correctCount}/${quiz.length}`);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2">
          Quiz <span className="text-accent">Generator</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Generate interactive quizzes from your materials
        </p>
      </div>

      <Card className="bg-gradient-card border-accent/20 mb-6 animate-slide-up">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-accent/10 rounded-lg">
              <Brain className="w-6 h-6 text-accent" />
            </div>
            <div>
              <CardTitle>Quiz Configuration</CardTitle>
              <CardDescription>Select material and customize your quiz</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Number of Questions</Label>
              <Select value={numQuestions} onValueChange={setNumQuestions}>
                <SelectTrigger className="border-accent/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                  <SelectItem value="15">15 Questions</SelectItem>
                  <SelectItem value="20">20 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="border-accent/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Material</Label>
              <Select value={materialId} onValueChange={setMaterialId}>
                <SelectTrigger className="border-accent/20">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Sample Note 1</SelectItem>
                  <SelectItem value="2">Sample PDF Doc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading}
            variant="accent"
            className="w-full"
          >
            <BookOpen className="w-4 h-4" />
            {loading ? "Generating Quiz..." : "Generate Quiz"}
          </Button>
        </CardContent>
      </Card>

      {quiz.length > 0 && (
        <>
          {submitted && (
            <Card className="bg-gradient-card border-accent/20 mb-6 animate-fade-in">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-accent" />
                    <div>
                      <h3 className="text-2xl font-bold">
                        Score: {score}/{quiz.length}
                      </h3>
                      <p className="text-muted-foreground">
                        {((score / quiz.length) * 100).toFixed(0)}% Correct
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleReset} variant="outline">
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-6">
            {quiz.map((q, idx) => (
              <Card
                key={idx}
                className="bg-gradient-card border-accent/20 animate-fade-in"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-lg">
                      {idx + 1}. {q.question}
                    </CardTitle>
                    {submitted && (
                      <Badge
                        variant={answers[idx] === q.correct ? "default" : "destructive"}
                        className={
                          answers[idx] === q.correct
                            ? "bg-accent/20 text-accent"
                            : ""
                        }
                      >
                        {answers[idx] === q.correct ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={answers[idx]?.toString()}
                    onValueChange={(value) =>
                      !submitted && setAnswers({ ...answers, [idx]: parseInt(value) })
                    }
                    disabled={submitted}
                  >
                    {q.options.map((option, optIdx) => (
                      <div
                        key={optIdx}
                        className={`flex items-center space-x-3 p-3 rounded-lg border ${
                          submitted && optIdx === q.correct
                            ? "border-accent bg-accent/10"
                            : submitted && answers[idx] === optIdx && optIdx !== q.correct
                            ? "border-destructive bg-destructive/10"
                            : "border-accent/20"
                        }`}
                      >
                        <RadioGroupItem value={optIdx.toString()} id={`q${idx}-o${optIdx}`} />
                        <Label
                          htmlFor={`q${idx}-o${optIdx}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
          </div>

          {!submitted && (
            <Button
              onClick={handleSubmit}
              variant="accent"
              className="w-full mt-6"
              disabled={Object.keys(answers).length !== quiz.length}
            >
              Submit Quiz
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default QuizGenerator;
