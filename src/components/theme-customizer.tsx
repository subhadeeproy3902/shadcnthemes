"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wand2, RotateCcw, Copy, Check } from "lucide-react";
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
  generateHarmonizedColors,
  generateRandomHSL,
  generateBackground,
  generateCard,
  hslToHex,
  hexToHSL,
  isValidDestructiveColor,
  calculateForegroundColor,
  parseHSLString,
} from "@/lib/colors";

export function ThemeCustomizer() {
  const { theme, resolvedTheme } = useTheme();
  const [colors, setColors] = useState<ColorConfig>(SHADCN_PRESETS[4].colors);
  const [colorHistory, setColorHistory] = useState<ColorConfig[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("custom");
  const [currentPreset, setCurrentPreset] = useState<ColorPreset | null>(null);

  const updateColor = (key: string, value: string) => {
    if (key === 'destructive' && !isValidDestructiveColor(value)) {
      return;
    }

    let newColors = { ...colors, [key]: value };

    if (key === 'primary') {
      const [h] = value.split(" ").map(v => parseFloat(v));
      newColors = generateHarmonizedColors(h);
      newColors.destructive = colors.destructive;
    }

    setCurrentPreset(null);
    addToHistory(newColors);
    setColors(newColors);
    updateThemeColors(newColors);
  };

  const handleColorPickerChange = (key: string, hexColor: string) => {
    const hslColor = hexToHSL(hexColor);
    updateColor(key, hslColor);
    setActiveTab("custom");
  };

  const handleManualColorInput = (key: string, value: string) => {
    const parsedHSL = parseHSLString(value);
    if (parsedHSL) {
      if (key === 'destructive' && !isValidDestructiveColor(parsedHSL)) {
        return;
      }
      updateColor(key, parsedHSL);
      setActiveTab("custom");
    }
  };

  const getHexFromHSL = (hslString: string): string => {
    const [h, s, l] = hslString.split(" ").map(v => parseFloat(v));
    return hslToHex(h, s, l);
  };

  const addToHistory = (newColors: ColorConfig) => {
    const newHistory = [...colorHistory.slice(0, currentHistoryIndex + 1), newColors];
    setColorHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
  };

  const randomizeColors = () => {
    const primaryHue = Math.floor(Math.random() * 360);
    const newColors = generateHarmonizedColors(primaryHue);
    newColors.destructive = generateRandomHSL(true);
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

  const updateThemeColors = (newColors: ColorConfig, preset?: ColorPreset) => {
    const root = document.documentElement;
    Object.entries(newColors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
      root.style.setProperty(
        `--${key}-foreground`,
        key === "destructive" ? "0 0% 98%" : "0 0% 98%"
      );
    });

    const isDark = resolvedTheme === 'dark';
    const backgroundValue = preset 
      ? (isDark ? preset.backgroundDark : preset.backgroundLight)
      : generateBackground(newColors.primary, isDark);
    const cardValue = preset
      ? (isDark ? preset.cardDark : preset.cardLight)
      : generateCard(newColors.primary, isDark);

    root.style.setProperty('--background', backgroundValue);
    root.style.setProperty('--card', cardValue);

    const style = document.createElement('style');
    style.textContent = `
      :root {
        --background: ${preset ? preset.backgroundLight : generateBackground(newColors.primary, false)};
        --card: ${preset ? preset.cardLight : generateCard(newColors.primary, false)};
      }
      .dark {
        --background: ${preset ? preset.backgroundDark : generateBackground(newColors.primary, true)};
        --card: ${preset ? preset.cardDark : generateCard(newColors.primary, true)};
      }
    `;
    
    const existingStyle = document.querySelector('style[data-theme-colors]');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    style.setAttribute('data-theme-colors', 'true');
    document.head.appendChild(style);
  };

  console.log(colors.primary);

  const generateCSS = () => {
    const lightBackground = currentPreset ? currentPreset.backgroundLight : generateBackground(colors.primary, false);
    const darkBackground = currentPreset ? currentPreset.backgroundDark : generateBackground(colors.primary, true);
    const lightCard = currentPreset ? currentPreset.cardLight : generateCard(colors.primary, false);
    const darkCard = currentPreset ? currentPreset.cardDark : generateCard(colors.primary, true);
    const primaryForeground = calculateForegroundColor(colors.primary);
    const secondaryForeground = calculateForegroundColor(colors.secondary);

    return `@layer base {
  :root {
    --background: ${lightBackground};
    --foreground: 0 0% 3.9%;
    --card: ${lightCard};
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: ${colors.primary};
    --primary-foreground: ${primaryForeground};
    --secondary: ${colors.secondary};
    --secondary-foreground: ${secondaryForeground};
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: ${colors.accent};
    --accent-foreground: 0 0% 9%;
    --destructive: ${colors.destructive};
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: ${darkBackground};
    --foreground: 0 0% 98%;
    --card: ${darkCard};
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: ${colors.primary};
    --primary-foreground: ${primaryForeground};
    --secondary: ${colors.secondary};
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: ${colors.accent};
    --accent-foreground: 0 0% 98%;
    --destructive: ${colors.destructive};
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
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
  useEffect(() => {
    if (currentPreset) {
      // nothing
      console.log('nothing');
    } else {
      updateThemeColors(colors);
      console.log('updateThemeColors');
    }
  }, [theme, resolvedTheme]);

  const applyPreset = (preset: ColorPreset) => {
    setCurrentPreset(preset);
    setColors(preset.colors);
    updateThemeColors(preset.colors, preset);
    addToHistory(preset.colors);
  };


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
            <Button onClick={randomizeColors} className="flex items-center gap-2">
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
              {Object.entries(colors).map(([key, value]) => (
                <div key={key}>
                  <Label className="capitalize">{key}</Label>
                  <div className="flex gap-2 mt-1.5">
                    <Input
                      value={value}
                      onChange={(e) => handleManualColorInput(key, e.target.value)}
                      className="font-mono flex-1"
                      placeholder="Format: 220 70% 50%"
                    />
                    <div className="relative">
                      <input
                        type="color"
                        value={getHexFromHSL(value)}
                        onChange={(e) => handleColorPickerChange(key, e.target.value)}
                        className="w-12 h-8 rounded border cursor-pointer"
                      />
                    </div>
                  </div>
                  {key === 'primary' && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Primary color will generate harmonized secondary and accent colors
                    </p>
                  )}
                  {key === 'destructive' && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Destructive color must be in the red range
                    </p>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="presets">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {SHADCN_PRESETS.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  className={`h-auto hover:bg-transparent p-4 flex flex-col gap-2 ${
                    currentPreset?.name === preset.name ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => applyPreset(preset)}
                >
                  <div className="text-sm font-medium">{preset.name}</div>
                  <div className="flex gap-2">
                    {Object.values(preset.colors).map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: `hsl(${color})` }}
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
            Changing the primary color will automatically generate harmonized secondary and accent colors.
            The destructive color will always stay in the red range for consistency.
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