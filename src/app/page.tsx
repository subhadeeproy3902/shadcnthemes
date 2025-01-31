import Showcase from "@/components/showcase";
import XSS from "@/components/shared/x";
import { ThemeCustomizer } from "@/components/theme-customizer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="">
        <ThemeCustomizer />
      </div>
      <div className="max-w-7xl mx-auto border-t">
        <Showcase />
        <XSS />
      </div>
    </div>
  );
}
