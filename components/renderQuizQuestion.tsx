"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function MultiChoiceQuizQuestion({ quizData }: any) {
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [showExplanation, setShowExplanation] = useState<any>(false);

  const handleAnswerClick = (answer: any) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const isCorrect = selectedAnswer === quizData.correctAnswer;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col space-y-4 gap-4 p-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {quizData.answers.map((answer: any, index: any) => (
          <Button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            variant={
              selectedAnswer === answer
                ? isCorrect
                  ? "default"
                  : "destructive"
                : "outline"
            }
            className="justify-start h-auto py-2 px-4"
            disabled={selectedAnswer !== null}
          >
            {answer}
            {selectedAnswer === answer &&
              (isCorrect ? (
                <CheckCircle2 className="ml-2 h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="ml-2 h-4 w-4 text-red-700" />
              ))}
          </Button>
        ))}
      </div>

      {showExplanation && (
        <div className="mt-4 p-4 bg-muted rounded-md">
          <h3 className="font-semibold mb-2">説明:</h3>
          <p>{quizData.explanation}</p>
        </div>
      )}
    </div>
  );
}
