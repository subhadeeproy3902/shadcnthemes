import { ThemeCustomizer } from "@/components/theme-customizer";
import { Separator } from "@/components/ui/separator";
import { Space_Grotesk } from "next/font/google";
import Showcase from "@/components/showcase";
import Navbar from "@/components/navbar";
import { Badge } from "@/components/Badge";

const brico = Space_Grotesk({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="min-h-svh p-4 max-w-7xl mx-auto w-full">
        <Navbar />

        <main className="container relative py-6 md:py-8 max-w-7xl mx-auto z-10">
          <div className="pointer-events-none absolute top-0 inset-0 flex items-center justify-center">
            <div className="h-[800px] w-[800px] rounded-full bg-primary/10 blur-3xl" />
          </div>
          <div className="pointer-events-none absolute left-1/2 top-0">
            <div className="h-[300px] w-[300px] rounded-full bg-secondary/20 blur-3xl" />
          </div>
          <div className="pointer-events-none absolute right-0 top-0">
            <div className="h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
          </div>
          <div className="mx-auto max-w-[800px] space-y-6 md:space-y-8">
            <div className="text-center">
              <h2
                className={
                  "text-4xl flex flex-wrap mx-auto items-center justify-center my-8 font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl lg:text-7xl" +
                  brico.className
                }
              >
                Randomise{" "}
                <span className="block w-fit relative transform -rotate-3 group">
                  <span className="relative rounded-lg mx-4 text-white  bg-[linear-gradient(60deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))] px-3 py-1">
                    colors
                  </span>
                </span>
                to Make it yours.
              </h2>
              <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                Experience the ultimate in design customization with our premium
                theme editor. Create stunning, harmonious color schemes with
                unparalleled precision.
              </p>
            </div>

            <div className="flex-wrap hidden sm:flex items-center justify-center gap-3 px-4 sm:gap-4">
              <div className="inline-flex items-center rounded-lg justify-center px-3 py-1 text-sm font-medium">
                <Badge text="🎨 Real-time preview" />
              </div>
              <div className="nline-flex items-center rounded-lg justify-center px-3 py-1 text-sm font-medium">
                <Badge text="🌗 Light & Dark modes" />
              </div>
              <div className="nline-flex items-center rounded-lg justify-center px-3 py-1 text-sm font-medium">
                <Badge text="📋 Copy CSS variables" />
              </div>
            </div>

            <div className="relative z-10">
              <ThemeCustomizer />
            </div>
          </div>
        </main>
        <div className="mx-auto max-w-7xl py-6">
          <Showcase />
        </div>
      </div>
    </div>
  );
}
