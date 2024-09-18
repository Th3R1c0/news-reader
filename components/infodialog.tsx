"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function InfoDialog({ children }: { children: React.ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About AI Quiz App</DialogTitle>
          <DialogDescription>
            90% of this app was made using AI, including this description, This is a AI Quiz App is an interactive platform that uses artificial intelligence to generate personalized quizzes for users. Our advanced algorithms analyze your performance and adapt questions to your skill level, ensuring an engaging and challenging experience every time.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h4 className="font-semibold">Key Features:</h4>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Browse NHK news feed by topic genere</li>
            <li>Generate personalized AI quizes to test knowledge</li>
            <li>Generate custom ai quiz'es based on your text, links and images</li>
            <li>more planned features to come if i actually make this into a proper web app prob not </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}