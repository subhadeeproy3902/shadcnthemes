"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wand2, RotateCcw, Copy, Check, Lock } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  isValidDestructiveColor,
  calculateForegroundColor,
  parseHSLString,
  generateHarmonizedColors,
} from "@/lib/colors";
import { SHADCN_PRESETS } from "@/lib/constants";

export function ThemeCustomizer() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [colors, setColors] = useState<ColorConfig>(SHADCN_PRESETS[0].colors);
  const [colorHistory, setColorHistory] = useState<ColorConfig[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("presets");
  const [currentPreset, setCurrentPreset] = useState<ColorPreset | null>(
    SHADCN_PRESETS[0]
  );

  const isDarkMode = resolvedTheme === "dark";
  const mainColors = ["primary", "secondary", "accent", "destructive"];
  const editableColors = ["secondary", "accent"];

  const getThemeSpecificColor = (key: string) => {
    if (key === "primary" || key === "destructive") {
      return colors[key];
    }
    return isDarkMode ? colors[`${key}-dark`] : colors[key];
  };

  const updateColor = (key: string, value: string) => {
    if (!editableColors.includes(key)) return;

    if (key === "destructive" && !isValidDestructiveColor(value)) {
      return;
    }

    let newColors = { ...colors };

    if (key === "primary") {
      const [h] = value.split(" ").map((v) => parseFloat(v));
      newColors = generateHarmonizedColors(h, isDarkMode);
      // Update muted colors based on primary
      newColors.muted = `${h} 30% 94%`;
      newColors["muted-dark"] = `${h} 30% 12%`;
    } else if (key === "destructive") {
      newColors[key] = value;
    } else {
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
    setActiveTab("custom");
  };

  const handleManualColorInput = (key: string, value: string) => {
    if (!editableColors.includes(key)) return;
    const parsedHSL = parseHSLString(value);
    if (parsedHSL) {
      updateColor(key, parsedHSL);
      setActiveTab("custom");
    }
  };

  const getHexFromHSL = (hslString: string): string => {
    const [h, s, l] = hslString.split(" ").map((v) => parseFloat(v));
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

  const randomizeColors = () => {
    const newColors = generateRandomColors(isDarkMode);
    const [h] = newColors.primary.split(" ").map((v) => parseFloat(v));
    newColors.muted = `${h} 30% 94%`;
    newColors["muted-dark"] = `${h} 30% 12%`;
    setCurrentPreset(null);
    addToHistory(newColors);
    setColors(newColors);
    updateThemeColors(newColors);
    setActiveTab("custom");
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

    // Set muted colors based on primary
    const mutedValue = isDarkMode ? newColors["muted-dark"] : newColors.muted;
    root.style.setProperty("--muted", mutedValue);
    root.style.setProperty(
      "--muted-foreground",
      isDarkMode ? "240 5% 64.9%" : "240 3.8% 46.1%"
    );

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

    // Update data-theme attribute for preset themes
    if (preset) {
      root.setAttribute("data-theme", preset.name.toLowerCase());
    } else {
      root.removeAttribute("data-theme");
    }
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
    --muted: ${colors.muted};
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
    --primary: ${colors.primary};
    --primary-foreground: ${calculateForegroundColor(colors.primary)};
    --secondary: ${colors["secondary-dark"]};
    --secondary-foreground: ${calculateForegroundColor(
      colors["secondary-dark"]
    )};
    --accent: ${colors["accent-dark"]};
    --accent-foreground: ${calculateForegroundColor(colors["accent-dark"])};
    --destructive: ${colors.destructive};
    --destructive-foreground: 0 0% 98%;
    --muted: ${colors["muted-dark"]};
    --muted-foreground: 240 5% 64.9%;
    --border: ${darkBorder};
    --input: ${darkBorder};
    --ring: ${colors.primary};
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
    // History is empty, then return
    if (colorHistory.length === 0) return;
    if (currentPreset) {
      updateThemeColors(colors, currentPreset);
    } else {
      updateThemeColors(colors);
    }
  }, [theme, resolvedTheme]);

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Theme Customizer</h2>
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
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy CSS
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="custom">Custom Colors</TabsTrigger>
            <TabsTrigger value="presets">Shadcn Presets</TabsTrigger>
          </TabsList>

          <TabsContent value="custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mainColors.map((key) => (
                <div key={key}>
                  <Label className="capitalize">{key}</Label>
                  <div className="flex gap-2 mt-1.5">
                    <Input
                      value={getThemeSpecificColor(key)}
                      onChange={(e) =>
                        handleManualColorInput(key, e.target.value)
                      }
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
                      Primary color is locked and generates harmonized colors
                    </p>
                  )}
                  {key === "destructive" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Destructive color is locked to the red range
                    </p>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="presets">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {SHADCN_PRESETS.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  className={`h-auto p-4 flex flex-col gap-2 ${
                    currentPreset?.name === preset.name
                      ? "ring-2 ring-primary"
                      : ""
                  }`}
                  onClick={() => applyPreset(preset)}
                >
                  <div className="text-sm font-medium">{preset.name}</div>
                  <div className="flex gap-2">
                    {mainColors.map((key) => (
                      <div
                        key={key}
                        className="w-6 h-6 rounded-full border"
                        style={{
                          backgroundColor: `hsl(${
                            isDarkMode && preset.colors[`${key}-dark`]
                              ? preset.colors[`${key}-dark`]
                              : preset.colors[key]
                          })`,
                        }}
                      />
                    ))}
                  </div>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">Color Harmony</h3>
          <p className="text-sm text-muted-foreground">
            Changing the primary color will automatically generate harmonized
            secondary and accent colors. The destructive color will always stay
            in the red range for consistency. Muted colors are derived from the
            primary color.
          </p>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Theme CSS</DialogTitle>
            <DialogDescription>
              Copy the generated CSS code for your theme configuration.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="light" className="mt-4">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="light">Light Theme</TabsTrigger>
              <TabsTrigger value="dark">Dark Theme</TabsTrigger>
            </TabsList>
            <TabsContent value="light" className="relative">
              <div className="relative">
                <pre className="p-4 rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto">
                  <code>{generateCSS()}</code>
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="dark" className="relative">
              <div className="relative dark">
                <pre className="p-4 rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto">
                  <code>{generateCSS()}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4 flex justify-end">
            <Button onClick={copyCSS} className="min-w-[100px]">
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy CSS
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ThemeCustomizer;
