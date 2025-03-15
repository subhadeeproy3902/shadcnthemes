"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Wand2,
  RotateCcw,
  Copy,
  Check,
  Lock,
  Palette,
  Sparkles,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SHADCN_PRESETS } from "@/lib/constants";
import {
  generateRandomColors,
  generateBackground,
  generateCard,
  generatePopover,
  generateBorder,
  generateInput,
  generateRing,
  hslToHex,
  hexToHSL,
  calculateForegroundColor,
  parseHSLString,
} from "@/lib/colors";
import { ScrollArea } from "./ui/scroll-area";
import { BorderBeam } from "./ui/border-beam";

export function ThemeCustomizer() {
  const { theme, resolvedTheme } = useTheme();
  const [colors, setColors] = useState<ColorConfig>(SHADCN_PRESETS[0].colors);
  const [colorHistory, setColorHistory] = useState<ColorConfig[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("custom");
  const [currentPreset, setCurrentPreset] = useState<ColorPreset | null>(
    SHADCN_PRESETS[0]
  );

  const isDarkMode = resolvedTheme === "dark";
  const mainColors = ["primary", "secondary", "accent", "destructive"];
  const editableColors = ["secondary", "accent"];

  const getThemeSpecificColor = (key: string) => {
    // Ensure we have a valid color value before returning
    const defaultColor = "0 0% 0%";

    if (!colors) return defaultColor;

    if (key === "primary") {
      return isDarkMode
        ? colors["primary-dark"] || defaultColor
        : colors.primary || defaultColor;
    }
    if (key === "destructive") {
      return colors[key] || defaultColor;
    }
    return isDarkMode
      ? colors[`${key}-dark`] || defaultColor
      : colors[key] || defaultColor;
  };

  const updateColor = (key: string, value: string) => {
    if (!editableColors.includes(key)) return;

    let newColors = { ...colors };
    const [h, s] = value.split(" ");

    if (isDarkMode) {
      const l = Math.random() * 20;
      newColors[`${key}-dark`] = `${h} ${s} ${l.toFixed(2)}%`;
      const lightL = 75 + Math.random() * 25;
      newColors[key] = `${h} ${s} ${lightL.toFixed(2)}%`;
    } else {
      const l = 75 + Math.random() * 25;
      newColors[key] = `${h} ${s} ${l.toFixed(2)}%`;
      const darkL = Math.random() * 20;
      newColors[`${key}-dark`] = `${h} ${s} ${darkL.toFixed(2)}%`;
    }

    setCurrentPreset(null);
    addToHistory(newColors);
    setColors(newColors);
    updateThemeColors(newColors);
  };

  const handleColorPickerChange = (key: string, hexColor: string) => {
    if (!editableColors.includes(key)) return;
    const hslColor = hexToHSL(hexColor);
    updateColor(key, hslColor);
  };

  const handleManualColorInput = (key: string, value: string) => {
    if (!editableColors.includes(key)) return;
    const parsedHSL = parseHSLString(value);
    if (parsedHSL) {
      updateColor(key, parsedHSL);
    }
  };

  const getHexFromHSL = (hslString: string): string => {
    if (!hslString) return "#000000";
    const [h, s, l] = hslString.split(" ").map((v) => parseFloat(v));
    if (isNaN(h) || isNaN(s) || isNaN(l)) return "#000000";
    return hslToHex(h, s, l);
  };

  const addToHistory = (newColors: ColorConfig) => {
    const newHistory = [
      ...colorHistory.slice(0, currentHistoryIndex + 1),
      newColors,
    ];
    setColorHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
  };

  const randomizeColors = async () => {
    const newColors = generateRandomColors(isDarkMode);
    setCurrentPreset(null);
    addToHistory(newColors);
    setColors(newColors);
    updateThemeColors(newColors);

    // Add a small delay for visual feedback
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const previousTheme = () => {
    if (currentHistoryIndex > 0) {
      const prevColors = colorHistory[currentHistoryIndex - 1];
      setCurrentHistoryIndex(currentHistoryIndex - 1);
      setColors(prevColors);
      updateThemeColors(prevColors);
      setCurrentPreset(null);
    }
  };

  const updateThemeColors = (
    newColors: ColorConfig,
    preset?: ColorPreset | null
  ) => {
    const root = document.documentElement;

    // Update main colors and their foregrounds
    mainColors.forEach((key) => {
      const value =
        isDarkMode && newColors[`${key}-dark`]
          ? newColors[`${key}-dark`]
          : newColors[key];
      root.style.setProperty(`--${key}`, value);
      const foregroundColor = calculateForegroundColor(value);
      root.style.setProperty(`--${key}-foreground`, foregroundColor);
    });

    // Generate and set background colors
    const backgroundValue = preset
      ? isDarkMode
        ? preset.backgroundDark
        : preset.backgroundLight
      : generateBackground(newColors.primary, isDarkMode);
    root.style.setProperty("--background", backgroundValue);
    root.style.setProperty(
      "--foreground",
      isDarkMode ? "0 0% 98%" : "240 10% 3.9%"
    );

    // Generate and set card colors
    const cardValue = preset
      ? isDarkMode
        ? preset.cardDark
        : preset.cardLight
      : generateCard(newColors.primary, isDarkMode);
    root.style.setProperty("--card", cardValue);
    root.style.setProperty(
      "--card-foreground",
      isDarkMode ? "0 0% 98%" : "240 10% 3.9%"
    );

    // Generate and set popover colors
    const popoverValue = generatePopover(newColors.primary, isDarkMode);
    root.style.setProperty("--popover", popoverValue);
    root.style.setProperty(
      "--popover-foreground",
      isDarkMode ? "0 0% 98%" : "240 10% 3.9%"
    );

    // Generate and set border and input colors
    const borderValue = generateBorder(newColors.primary, isDarkMode);
    const inputValue = generateInput(newColors.primary, isDarkMode);
    root.style.setProperty("--border", borderValue);
    root.style.setProperty("--input", inputValue);

    // Set ring color
    const ringValue = generateRing(newColors.primary);
    root.style.setProperty("--ring", ringValue);

    // Set muted colors based on background
    const [bgH, bgS] = backgroundValue.split(" ");
    const mutedValue = isDarkMode ? `${bgH} ${bgS} 15%` : `${bgH} ${bgS} 96%`;
    root.style.setProperty("--muted", mutedValue);
    root.style.setProperty(
      "--muted-foreground",
      isDarkMode ? "0 0% 63.9%" : "240 3.8% 46.1%"
    );
  };

  const generateCSS = () => {
    const lightBackground = currentPreset
      ? currentPreset.backgroundLight
      : generateBackground(colors.primary, false);
    const darkBackground = currentPreset
      ? currentPreset.backgroundDark
      : generateBackground(colors.primary, true);
    const lightCard = currentPreset
      ? currentPreset.cardLight
      : generateCard(colors.primary, false);
    const darkCard = currentPreset
      ? currentPreset.cardDark
      : generateCard(colors.primary, true);
    const lightPopover = generatePopover(colors.primary, false);
    const darkPopover = generatePopover(colors.primary, true);
    const lightBorder = generateBorder(colors.primary, false);
    const darkBorder = generateBorder(colors.primary, true);

    // Generate muted colors based on background
    const [lightBgH, lightBgS] = lightBackground.split(" ");
    const [darkBgH, darkBgS] = darkBackground.split(" ");
    const lightMuted = `${lightBgH} ${lightBgS} 96%`;
    const darkMuted = `${darkBgH} ${darkBgS} 15%`;

    return `@layer base {
  :root {
    --background: ${lightBackground};
    --foreground: 240 10% 3.9%;
    --card: ${lightCard};
    --card-foreground: 240 10% 3.9%;
    --popover: ${lightPopover};
    --popover-foreground: 240 10% 3.9%;
    --primary: ${colors.primary};
    --primary-foreground: ${calculateForegroundColor(colors.primary)};
    --secondary: ${colors.secondary};
    --secondary-foreground: ${calculateForegroundColor(colors.secondary)};
    --accent: ${colors.accent};
    --accent-foreground: ${calculateForegroundColor(colors.accent)};
    --destructive: ${colors.destructive};
    --destructive-foreground: 0 0% 98%;
    --muted: ${lightMuted};
    --muted-foreground: 240 3.8% 46.1%;
    --border: ${lightBorder};
    --input: ${lightBorder};
    --ring: ${colors.primary};
    --radius: 0.5rem;
  }

  .dark {
    --background: ${darkBackground};
    --foreground: 0 0% 98%;
    --card: ${darkCard};
    --card-foreground: 0 0% 98%;
    --popover: ${darkPopover};
    --popover-foreground: 0 0% 98%;
    --primary: ${colors["primary-dark"]};
    --primary-foreground: ${calculateForegroundColor(colors["primary-dark"])};
    --secondary: ${colors["secondary-dark"]};
    --secondary-foreground: ${calculateForegroundColor(
      colors["secondary-dark"]
    )};
    --accent: ${colors["accent-dark"]};
    --accent-foreground: ${calculateForegroundColor(colors["accent-dark"])};
    --destructive: ${colors.destructive};
    --destructive-foreground: 0 0% 98%;
    --muted: ${darkMuted};
    --muted-foreground: 0 0% 63.9%;
    --border: ${darkBorder};
    --input: ${darkBorder};
    --ring: ${colors["primary-dark"]};
  }
}`;
  };

  const copyCSS = async () => {
    await navigator.clipboard.writeText(generateCSS());
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const applyPreset = (preset: ColorPreset) => {
    setCurrentPreset(preset);
    setColors(preset.colors);
    updateThemeColors(preset.colors, preset);
    addToHistory(preset.colors);
  };

  useEffect(() => {
    if (colorHistory.length === 0) return;
    if (currentPreset) {
      updateThemeColors(colors, currentPreset);
    } else {
      updateThemeColors(colors);
    }
  }, [theme, resolvedTheme]);

  console.log(colors["primary-dark"], colors.primary);

  return (
    <Card className="relative overflow-hidden border bg-background/60 p-6 backdrop-blur-sm">
      <div className="relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Theme Customizer
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={previousTheme}
              disabled={currentHistoryIndex <= 0}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            <Button
              onClick={randomizeColors}
              className="flex items-center gap-2"
            >
              <Wand2 className="h-4 w-4" />
              <span className="inline">Randomize</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              <span className="inline">Copy</span>
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {mainColors.map((key) => (
            <div key={key}>
              <Label className="capitalize">{key}</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={getThemeSpecificColor(key)}
                  onChange={(e) => handleManualColorInput(key, e.target.value)}
                  className="font-mono flex-1"
                  placeholder="Format: 220 70% 50%"
                  disabled={!editableColors.includes(key)}
                />
                <div className="relative">
                  <input
                    type="color"
                    value={getHexFromHSL(getThemeSpecificColor(key))}
                    onChange={(e) =>
                      handleColorPickerChange(key, e.target.value)
                    }
                    className={`w-12 h-8 rounded border cursor-pointer ${
                      !editableColors.includes(key) ? "opacity-50" : ""
                    }`}
                    disabled={!editableColors.includes(key)}
                  />
                  {!editableColors.includes(key) && (
                    <Lock className="w-4 h-4 absolute top-1/2 right-1 transform -translate-y-1/2 text-muted-foreground" />
                  )}
                </div>
              </div>
              {key === "primary" && (
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-red-500">*</span> Primary color is
                  locked and generates harmonized colors
                </p>
              )}
              {key === "destructive" && (
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-red-500">*</span> Destructive color is
                  locked to the red range
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-start gap-4 mx-auto">
          {SHADCN_PRESETS.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              className={`group w-fit px-8 justify-start items-center hover:border-primar rounded-lg ${
                currentPreset?.name === preset.name ? "ring-1 ring-primary" : ""
              }`}
              onClick={() => applyPreset(preset)}
            >
              <div className="text-sm flex gap-2 font-medium justify-start items-center">
                <div
                  className="h-5 w-5 rounded-full border shadow-sm transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `hsl(${preset.colors["primary-dark"]})`,
                  }}
                />
                {preset.name}
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl flex flex-col max-h-[90vh] bg-white dark:bg-black">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Copy className="w-5 h-5" />
              Theme CSS
            </DialogTitle>
            <DialogDescription>
              Copy the generated CSS code for your theme configuration.
            </DialogDescription>
          </DialogHeader>

          <div className="relative">
            <pre className="max-h-[450px] overflow-x-auto rounded-lg border py-4 bg-muted px-4">
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {generateCSS()}
              </code>
            </pre>
            <Button
              className="h-8 rounded-md px-3 text-xs absolute right-4 top-4"
              onClick={copyCSS}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy{" "}
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <BorderBeam
        duration={6}
        size={300}
        className="from-transparent via-primary to-transparent"
      />
      <BorderBeam
        duration={6}
        size={300}
        reverse
        className="from-transparent via-destructive to-transparent"
      />
    </Card>
  );
}

export default ThemeCustomizer;
