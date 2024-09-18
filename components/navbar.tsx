import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import InfoDialog from "./infodialog"

export default function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">Reading quiz app</h1>
          </div>
          <div className="flex items-center">
            <InfoDialog>
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <Info className="h-5 w-5" />
                <span className="sr-only">Information</span>
              </Button>
            </InfoDialog>
          </div>
        </div>
      </div>
    </nav>
  )
}