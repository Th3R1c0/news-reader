"use client";

import { useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import {MultiChoiceQuizQuestion} from '@/components/renderQuizQuestion'
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Book,
  Brain,
  CheckCircle2,
  CircleSlash2,
  FileQuestion,
  Moon,
  PenLine,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const fontSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
};
function MultiChoiceQuizQuestion({
  quizData,
  handleAnswerSelect,
  index,
  selectedanswer,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(
    selectedanswer ? selectedanswer : null
  );
  const [showExplanation, setShowExplanation] = useState(
    selectedanswer ? true : false
  );

  const [explanationRef] = useAutoAnimate();

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    handleAnswerSelect(index, answer);
  };

  const isCorrect = selectedAnswer === quizData.correctAnswer;

  return (
    <div className="w-full  flex flex-col space-y-4 gap-4 sm:p-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {quizData.answers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            variant={
              selectedAnswer === answer
                ? isCorrect
                  ? "default"
                  : "destructive"
                : quizData.correctAnswer === answer && selectedAnswer !== null
                ? "default" // Correct answer styling when a wrong answer is selected
                : "outline"
            }
            className={`justify-start h-auto py-2 px-4`}
            disabled={selectedAnswer !== null}
          >
            {answer}
            {selectedAnswer === answer &&
              (isCorrect ? (
                <CheckCircle2 className="ml-2 h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="ml-2 h-4 w-4 text-red-500" />
              ))}
          </Button>
        ))}
      </div>

      {showExplanation && (
        <div ref={explanationRef} className="mt-4 p-4 bg-muted rounded-md">
          <h3 className="font-semibold mb-2">説明:</h3>
          <p>{quizData.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default function ArticlePage({ articleContent, articleTitle, isLoading, children }) {
  const [wordCount, setWordCount] = useState(0);
  const [fontSize, setFontSize] = useState("md");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("text");
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [quizSettings, setQuizSettings] = useState({
    numQuestions: 5,
    difficulty: "medium",
    questionType: "infomation-recall",
  });
  const [generatedQuestions, setGeneratedQuestions] = useState({
    questions: [],
  });
  const [userAnswers, setUserAnswers] = useState({});
  const [error, setError] = useState(null);

  const [questionsRef] = useAutoAnimate();


  const generateQuiz = async () => {
    setIsQuizLoading(true);
    setError(null); // Reset any previous error

    const payload = {
      text: articleContent,
      settings: quizSettings,
    };

    try {
        const response = await fetch("/api/generateQuiz", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Failed to generate quiz. Please try again.');
        }

        const { quiz } = await response.json();
        setGeneratedQuestions(JSON.parse(quiz));
        setUserAnswers({});
    } catch (error) {
        setError(error.message); // Set the error message
    } finally {
        setIsQuizLoading(false);
    }
};


  const handleAnswerSelect = (questionIndex, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const RenderQuestion = (question, index) => {
    switch (question.displaytype) {
      case "multiple-choice":
        return (
          <MultiChoiceQuizQuestion
            handleAnswerSelect={handleAnswerSelect}
            quizData={question}
            index={index}
            selectedanswer={userAnswers[index]} // Pass the selected answer
          />
        );
      case "true-false":
        return <div>unfinished</div>;
      case "fill-in-the-blank":
        return <div>unfinished</div>;
      default:
        return (
          <MultiChoiceQuizQuestion
            handleAnswerSelect={handleAnswerSelect}
            quizData={question}
            index={index}
            selectedanswer={userAnswers[index]} // Pass the selected answer
          />
        ); // Pass the selected answer
    }
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${isDarkMode ? "dark" : ""}`}>
      <header className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to News Feed
        </Link>
      </header>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4 w-full"
      >
        <TabsList className="grid grid-cols-2 sticky w-full">
          <TabsTrigger
            value="text"
            className="flex items-center justify-center space-x-2 "
          >
            <Book className="w-4 h-4" />
            <span>Article Text</span>
          </TabsTrigger>
          <TabsTrigger
            value="quiz"
            className="flex items-center justify-center space-x-2"
          >
            <Brain className="w-4 h-4" />
            <span>AI Quiz</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="text">
            {children}
        </TabsContent>
        <TabsContent value="quiz">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileQuestion className="w-6 h-6" />
                <span>AI Quiz Generator</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 ">
              <div className="grid gap-4 md:grid-cols-3 p-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="num-questions"
                    className="text-sm font-medium"
                  >
                    Number of Questions
                  </Label>
                  <Input
                    id="num-questions"
                    type="number"
                    value={quizSettings.numQuestions}
                    onChange={(e) =>
                      setQuizSettings({
                        ...quizSettings,
                        numQuestions: parseInt(e.target.value),
                      })
                    }
                    min="1"
                    max="10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty" className="text-sm font-medium">
                    Difficulty
                  </Label>
                  <Select
                    value={quizSettings.difficulty}
                    onValueChange={(value) =>
                      setQuizSettings({ ...quizSettings, difficulty: value })
                    }
                  >
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 mb-4">
                  <Label
                    htmlFor="question-type"
                    className="text-sm font-medium"
                  >
                    Question Type
                  </Label>
                  <Select
                    value={quizSettings.questionType}
                    onValueChange={(value) =>
                      setQuizSettings({ ...quizSettings, questionType: value })
                    }
                  >
                    <SelectTrigger id="question-type">
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="infomation-recall">
                        infomation recall
                      </SelectItem>
                      <SelectItem value="inference">inference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {error && <div className="text-red-500">{error ? 'error occured, please check sources or reload page' : ''}</div>}
              </div>
              <div
                className="max-w-4xl mx-auto flex justify-center"
                style={{ padding: "1rem" }}
              >
                <Button
                  onClick={generateQuiz}
                  disabled={isQuizLoading}
                  style={{ width: "36rem" }}
                >
                  Generate Quiz
                </Button>
              </div>
              {isQuizLoading ? (
                <>
                  <Skeleton className="w-full h-4 mb-2" />
                  <Skeleton className="w-full h-4 mb-2" />
                  <Skeleton className="w-full h-4 mb-2" />
                  <Skeleton className="w-3/4 h-12" />
                </>
              ) : (
                generatedQuestions.questions.length > 0 && (
                  <div className="mt-8" ref={questionsRef}>
                    <div className="text-2xl font-semibold w-full px-3 py-4 bg-muted flex justify-center gap-4">
                      <div className="flex items-center">
                        <PenLine className="w-6 h-6" />
                        <span className="ml-2">Generated Questions</span>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="ml-2">
                            {
                              Object.values(userAnswers).filter(
                                (answer, index) =>
                                  answer ===
                                  generatedQuestions.questions[index]
                                    .correctAnswer
                              ).length
                            }
                          </span>
                        </div>
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="ml-2">
                            {
                              Object.values(userAnswers).filter(
                                (answer, index) =>
                                  answer !==
                                  generatedQuestions.questions[index]
                                    .correctAnswer
                              ).length
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    {generatedQuestions.questions.map((q, index) => (
                      <div
                        key={index}
                        className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md"
                      >
                        <p className="text-lg font-medium">
                          {index + 1}. {q.question}
                        </p>
                        {RenderQuestion(q, index)}

                        {/* {userAnswers[index] && (
                          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                            <strong>Explanation:</strong> {q.explanation}
                          </p>
                        )} */}
                      </div>
                    ))}
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

