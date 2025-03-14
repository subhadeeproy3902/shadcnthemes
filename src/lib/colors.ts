export function generateHarmonizedColors(baseHue: number, isDarkMode: boolean = false): ColorConfig {
  const complementaryHue = (baseHue + 180) % 360;
  const analogous1 = (baseHue + 30) % 360;
  const analogous2 = (baseHue - 30 + 360) % 360;

  // Calculate harmonized saturations based on primary color
  const secondarySatLight = 15 + Math.random() * 20; // 15-35%
  const accentSatLight = 15 + Math.random() * 20; // 15-35%
  const mutedSatLight = 15 + Math.random() * 20; // 15-35%

  const secondarySatDark = 75 + Math.random() * 20; // 75-95%
  const accentSatDark = 75 + Math.random() * 20; // 75-95%
  const mutedSatDark = 75 + Math.random() * 20; // 75-95%

  // Random lightness values
  const lightModeLightness = 80 + Math.random() * 20; // 80-100%
  const darkModeLightness = Math.random() * 20; // 0-20%

  // Generate light variants
  const secondaryLight = `${analogous1.toFixed(2)} ${secondarySatLight.toFixed(2)}% ${lightModeLightness.toFixed(2)}%`;
  const accentLight = `${analogous2.toFixed(2)} ${accentSatLight.toFixed(2)}% ${lightModeLightness.toFixed(2)}%`;
  const mutedLight = `${analogous2.toFixed(2)} ${mutedSatLight.toFixed(2)}% ${lightModeLightness.toFixed(2)}%`;

  // Generate dark variants (same hue, different saturation and lightness)
  const secondaryDark = `${analogous1.toFixed(2)} ${secondarySatDark.toFixed(2)}% ${darkModeLightness.toFixed(2)}%`;
  const accentDark = `${analogous2.toFixed(2)} ${accentSatDark.toFixed(2)}% ${darkModeLightness.toFixed(2)}%`;
  const mutedDark = `${analogous2.toFixed(2)} ${mutedSatDark.toFixed(2)}% ${darkModeLightness.toFixed(2)}%`;

  return {
    primary: generateRandomHSL("primary"),
    secondary: secondaryLight,
    "secondary-dark": secondaryDark,
    accent: accentLight,
    "accent-dark": accentDark,
    destructive: generateRandomHSL("destructive"),
    muted: mutedDark,
    "muted-dark": "0 0% 0%"
  };
}

export function generateRandomHSL(type: keyof ColorConfig = "primary"): string {
  if (type === "destructive") {
    const h = Math.floor(Math.random() * 20) - 10 + 360;
    const s = Math.floor(Math.random() * 20) + 60;
    const l = Math.floor(Math.random() * 20) + 30;
    return `${h.toFixed(2)} ${s.toFixed(2)}% ${l.toFixed(2)}%`;
  }

  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 40) + 60;
  const l = Math.floor(Math.random() * 40) + 30;
  return `${h.toFixed(2)} ${s.toFixed(2)}% ${l.toFixed(2)}%`;
}

export function generateRandomColors(isDarkMode: boolean = false): ColorConfig {
  const primaryHue = Math.floor(Math.random() * 360);
  return generateHarmonizedColors(primaryHue, isDarkMode);
}

export function generateBackground(primary: string, isDarkMode: boolean): string {
  const [h, s, l] = primary.split(" ").map(parseFloat);
  if (isNaN(h) || isNaN(s) || isNaN(l)) {
    return isDarkMode ? "20 14.3% 4.1%" : "0 0% 100%";
  }

  return isDarkMode
    ? `${h.toFixed(2)} ${Math.max(s * 0.2, 5).toFixed(2)}% ${Math.max(l * 0.15, 2).toFixed(2)}%`
    : `${h.toFixed(2)} ${Math.min(s * 0.1, 5).toFixed(2)}% ${Math.min(100, 100).toFixed(2)}%`;
}

export function generateCard(primary: string, isDarkMode: boolean): string {
  const [h, s, l] = primary.split(" ").map(parseFloat);
  if (isNaN(h) || isNaN(s) || isNaN(l)) {
    return isDarkMode ? "24 9.8% 10%" : "0 0% 100%";
  }

  return isDarkMode
    ? `${h.toFixed(2)} ${Math.max(s * 0.2, 10).toFixed(2)}% ${Math.max(l * 0.15, 10).toFixed(2)}%`
    : `${h.toFixed(2)} ${Math.min(s * 0.1, 5).toFixed(2)}% ${Math.min(100, 100).toFixed(2)}%`;
}

export function generatePopover(primary: string, isDarkMode: boolean): string {
  const [h, s, l] = primary.split(" ").map(parseFloat);
  if (isNaN(h) || isNaN(s) || isNaN(l)) {
    return isDarkMode ? "0 0% 9%" : "0 0% 100%";
  }

  return isDarkMode
    ? `${h.toFixed(2)} ${Math.max(s * 0.15, 8).toFixed(2)}% ${Math.max(l * 0.12, 9).toFixed(2)}%`
    : `${h.toFixed(2)} ${Math.min(s * 0.08, 4).toFixed(2)}% ${Math.min(100, 100).toFixed(2)}%`;
}

export function generateBorder(primary: string, isDarkMode: boolean): string {
  const [h, s] = primary.split(" ").map(parseFloat);
  return isDarkMode
    ? `${h} ${Math.max(s * 0.15, 3.7).toFixed(1)}% 15.9%`
    : `${h} ${Math.max(s * 0.15, 5.9).toFixed(1)}% 90%`;
}

export function generateInput(primary: string, isDarkMode: boolean): string {
  const [h, s] = primary.split(" ").map(parseFloat);
  return isDarkMode
    ? `${h} ${Math.max(s * 0.15, 3.7).toFixed(1)}% 15.9%`
    : `${h} ${Math.max(s * 0.15, 5.9).toFixed(1)}% 90%`;
}

export function generateRing(primary: string): string {
  return primary;
}

export function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function hexToHSL(hex: string): string {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h.toFixed(2)} ${s.toFixed(2)}% ${l.toFixed(2)}%`;
}

export function isValidDestructiveColor(hslString: string): boolean {
  const [h] = hslString.split(" ").map(v => parseFloat(v));
  return (h >= 350 || h <= 10);
}

export function calculateForegroundColor(hslString: string): string {
  const [, , l] = hslString.split(" ").map(v => parseFloat(v));
  return l > 60 ? "240 10% 3.9%" : "0 0% 98%";
}

export function parseHSLString(input: string): string | null {
  const cleaned = input.toLowerCase().replace(/\s+/g, '');
  const match = cleaned.match(/^(\d{1,3})[,\s](\d{1,3})%[,\s](\d{1,3})%$/);
  
  if (match) {
    const [, h, s, l] = match;
    const hue = Math.min(360, Math.max(0, parseInt(h)));
    const sat = Math.min(100, Math.max(0, parseInt(s)));
    const light = Math.min(100, Math.max(0, parseInt(l)));
    return `${hue.toFixed(2)} ${sat.toFixed(2)}% ${light.toFixed(2)}%`;
  }
  
  return null;
}