import Showcase from "@/components/showcase";
import XSS from "@/components/shared/x";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto border-t">
        <Showcase />
      </div>
    </div>
  );
}
