"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wand2, RotateCcw } from "lucide-react";
import { useTheme } from "next-themes"; // Ensure theme detection

interface ColorConfig {
  [key: string]: string;
}

function generateRandomHSL(): string {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 40) + 60; // 60-100
  const l = Math.floor(Math.random() * 40) + 30; // 30-70
  return `${h} ${s}% ${l}%`;
}

function generateBackground(primary: string, isDarkMode: boolean): string {
  const [h, s, l] = primary.split(" ").map(parseFloat);
  if (isNaN(h) || isNaN(s) || isNaN(l))
    return isDarkMode ? "0 0% 2%" : "0 0% 99%"; // Fallback

  return isDarkMode
    ? `${h} ${Math.max(s * 0.2, 5)}% ${Math.max(l * 0.15, 2)}%` // Very dark
    : `${h} ${Math.min(s * 0.2, 10)}% ${Math.min(l * 1.5 + 40, 99)}%`; // Very light
}

function generateCard(primary: string, isDarkMode: boolean): string {
  const [h, s, l] = primary.split(" ").map(parseFloat);
  if (isNaN(h) || isNaN(s) || isNaN(l))
    return isDarkMode ? "0 0% 10%" : "0 0% 90%"; // Fallback

  return isDarkMode
    ? `${h} ${Math.max(s * 0.2, 10)}% ${Math.max(l * 0.15, 10)}%` // Very dark
    : `${h} ${Math.min(s * 0.2, 20)}% ${Math.min(l * 1.5 + 40, 90)}%`; // Very light
}

export function ThemeCustomizer() {
  const { theme } = useTheme();
  const isDarkMode = theme === undefined;

  const [colors, setColors] = useState<ColorConfig>({
    primary: "220 70% 50%",
    secondary: "160 60% 45%",
    accent: "220 65% 60%", // Similar hue to primary
    destructive: "0 62.8% 30.6%",
  });

  const [colorHistory, setColorHistory] = useState<ColorConfig[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  const updateColor = (key: string, value: string) => {
    const newColors = { ...colors, [key]: value };
    addToHistory(newColors);
    setColors(newColors);
    updateThemeColors(newColors);
  };

  const addToHistory = (newColors: ColorConfig) => {
    const newHistory = [
      ...colorHistory.slice(0, currentHistoryIndex + 1),
      newColors,
    ];
    setColorHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
  };

  const randomizeColors = () => {
    const primary = generateRandomHSL();
    const newColors = {
      primary,
      secondary: `${parseFloat(primary.split(" ")[0])} 65% 60%`,
      accent: generateRandomHSL(),
      destructive: "0 65% 40%",
    };
    addToHistory(newColors);
    setColors(newColors);
    updateThemeColors(newColors);
  };

  const previousTheme = () => {
    if (currentHistoryIndex > 0) {
      const prevColors = colorHistory[currentHistoryIndex - 1];
      setCurrentHistoryIndex(currentHistoryIndex - 1);
      setColors(prevColors);
      updateThemeColors(prevColors);
    }
  };

  const updateThemeColors = (newColors: ColorConfig) => {
    const root = document.documentElement;
    const background = generateBackground(newColors.primary, isDarkMode);
    const card = generateCard(newColors.primary, isDarkMode);

    const [ph, ps, pl] = newColors.primary.split(" ").map(parseFloat);
    const [sh, ss, sl] = newColors.secondary.split(" ").map(parseFloat);

    const primaryForeground = pl < 65 ? "0 0% 100%" : "0 0% 0%"; // White if dark, black if light
    const secondaryForeground = sl < 65 ? "0 0% 100%" : "0 0% 0%"; // White if dark, black

    Object.entries(newColors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
      root.style.setProperty(
        `--${key}-foreground`,
        key === "destructive" ? "0 0% 98%" : "0 0% 98%"
      );
    });

    root.style.setProperty("--background", background);
    root.style.setProperty("--card", card);
    root.style.setProperty("--primary-foreground", primaryForeground);
    root.style.setProperty("--secondary-foreground", secondaryForeground);
  };

  useEffect(() => {
    updateThemeColors(colors);
    setColorHistory([colors]);
    setCurrentHistoryIndex(0);
  }, [theme]); // Update when theme changes

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shadcn Theme Customizer</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={previousTheme}
              disabled={currentHistoryIndex <= 0}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Previous
            </Button>
            <Button
              onClick={randomizeColors}
              className="flex items-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              Randomize
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(colors).map(([key, value]) => (
            <div key={key}>
              <Label className="capitalize">{key}</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={value}
                  onChange={(e) => updateColor(key, e.target.value)}
                  className="font-mono"
                />
                <div
                  className="w-12 h-8 rounded border"
                  style={{ backgroundColor: `hsl(${value})` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
