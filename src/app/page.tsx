import Showcase from "@/components/showcase";
import { ThemeCustomizer } from "@/components/theme-customizer";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">Shadcn Theme Studio</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Github className="w-4 h-4" />
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="">
        <ThemeCustomizer />
      </div>
      <div className="max-w-7xl mx-auto border-t">
        <Showcase />
      </div>
    </div>
  );
}
