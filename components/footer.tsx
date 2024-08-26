import { Button } from "./ui/button";

export default function Footer(){
    return (
        <footer className="bg-secondary py-4 mt-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p>&copy; 2023 NHK News Feed</p>
          <Button
            variant="outline"
            onClick={() => alert("Feedback functionality to be implemented")}
          >
            Provide Feedback
          </Button>
        </div>
      </footer>
    )
}