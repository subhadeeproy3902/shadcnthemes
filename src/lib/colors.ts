export function generateHarmonizedColors(
  baseHue: number,
  isDarkMode: boolean = false
): ColorConfig {
  const complementaryHue = (baseHue + 180) % 360;
  const analogous1 = (baseHue + 30) % 360;
  const analogous2 = (baseHue - 30 + 360) % 360;

  // Calculate harmonized saturations with randomization
  const primarySat = 60 + Math.random() * 20; // 60-80%
  const primaryLightLight = 40 + Math.random() * 40; // 40-90%
  const primaryDarkLight = 30 + Math.random() * 30; // 30-60%
  const primary = `${baseHue.toFixed(2)} ${primarySat.toFixed(
    2
  )}% ${primaryLightLight.toFixed(2)}%`;
  const primaryDark = `${baseHue.toFixed(2)} ${primarySat.toFixed(
    2
  )}% ${primaryDarkLight.toFixed(2)}%`;

  // Secondary colors with dynamic saturation
  const secondarySatLight = Math.max(10, Math.random() * primarySat * 0.4); // 10-32%
  const secondarySatDark = Math.min(90, primarySat + Math.random() * 20); // primarySat-(primarySat+20)%

  // Accent colors with slightly higher saturation
  const accentSatLight = Math.max(
    15,
    secondarySatLight * (1 + Math.random() * 0.5)
  );
  const accentSatDark = Math.min(
    95,
    secondarySatDark * (1 + Math.random() * 0.3)
  );

  // Dynamic lightness values
  const lightModeLightness = 90 + Math.random() * 10; // 90-100%
  const darkModeLightness = Math.random() * 15; // 0-15%

  // Generate light mode colors
  const secondaryLight = `${analogous1.toFixed(2)} ${secondarySatLight.toFixed(
    2
  )}% ${lightModeLightness.toFixed(2)}%`;
  const accentLight = `${analogous2.toFixed(2)} ${accentSatLight.toFixed(
    2
  )}% ${lightModeLightness.toFixed(2)}%`;

  // Generate dark mode colors
  const secondaryDark = `${analogous1.toFixed(2)} ${secondarySatDark.toFixed(
    2
  )}% ${darkModeLightness.toFixed(2)}%`;
  const accentDark = `${analogous2.toFixed(2)} ${accentSatDark.toFixed(
    2
  )}% ${darkModeLightness.toFixed(2)}%`;

  // Muted colors based on secondary
  const mutedSatLight = secondarySatLight * (0.5 + Math.random() * 0.3); // 50-80% of secondary saturation
  const mutedSatDark = secondarySatDark * (0.4 + Math.random() * 0.3); // 40-70% of secondary saturation
  const mutedLightLight = lightModeLightness * (0.9 + Math.random() * 0.1); // 90-100% of light mode lightness
  const mutedDarkLight = darkModeLightness * (1.2 + Math.random() * 0.3); // 120-150% of dark mode lightness

  const mutedLight = `${analogous1.toFixed(2)} ${mutedSatLight.toFixed(
    2
  )}% ${mutedLightLight.toFixed(2)}%`;
  const mutedDark = `${analogous1.toFixed(2)} ${mutedSatDark.toFixed(
    2
  )}% ${mutedDarkLight.toFixed(2)}%`;

  // Border and input colors based on secondary with reduced saturation
  const borderSatLight = secondarySatLight * (0.7 + Math.random() * 0.2);
  const borderSatDark = secondarySatDark * (0.6 + Math.random() * 0.2);
  const borderLight = `${analogous1.toFixed(2)} ${borderSatLight.toFixed(
    2
  )}% ${(lightModeLightness * 0.9).toFixed(2)}%`;
  const borderDark = `${analogous1.toFixed(2)} ${borderSatDark.toFixed(2)}% ${(
    darkModeLightness * 1.2
  ).toFixed(2)}%`;

  // Destructive color with random variation in the red range
  const destructiveHue = Math.random() * 10; // 0-10 (red range)
  const destructiveSat = 70 + Math.random() * 20; // 70-90%
  const destructiveLight = 45 + Math.random() * 25; // 45-70%
  const destructive = `${destructiveHue.toFixed(2)} ${destructiveSat.toFixed(
    2
  )}% ${destructiveLight.toFixed(2)}%`;

  // Calculate foreground colors dynamically
  const colors: ColorConfig = {
    // Base colors
    primary,
    "primary-dark": primaryDark,
    secondary: secondaryLight,
    "secondary-dark": secondaryDark,
    accent: accentLight,
    "accent-dark": accentDark,
    destructive,
    muted: mutedLight,
    "muted-dark": mutedDark,
    border: borderLight,
    "border-dark": borderDark,
    input: borderLight,
    "input-dark": borderDark,
    ring: primary,

    // Foreground colors
    "primary-foreground": calculateForegroundColor(primary),
    "primary-dark-foreground": calculateForegroundColor(primary),
    "secondary-foreground": calculateForegroundColor(secondaryLight),
    "secondary-dark-foreground": calculateForegroundColor(secondaryLight),
    "accent-foreground": calculateForegroundColor(accentLight),
    "accent-dark-foreground": calculateForegroundColor(accentLight),
    "destructive-foreground": calculateForegroundColor(destructive),
    "muted-foreground": `${analogous1.toFixed(2)} ${(
      mutedSatLight * 1.5
    ).toFixed(2)}% ${(lightModeLightness * 0.4).toFixed(2)}%`,
    "muted-dark-foreground": `${analogous1.toFixed(2)} ${(
      mutedSatDark * 1.2
    ).toFixed(2)}% ${Math.min(98, mutedDarkLight * 4).toFixed(2)}%`,
  };

  return colors;
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

export function generateBackground(
  primary: string,
  isDarkMode: boolean
): string {
  if (!primary) return isDarkMode ? "20 14.3% 4.1%" : "0 0% 100%";

  const [h, s, l] = primary.split(" ").map(parseFloat);
  if (isNaN(h) || isNaN(s) || isNaN(l)) {
    return isDarkMode ? "20 14.3% 4.1%" : "0 0% 100%";
  }

  return isDarkMode
    ? `${h.toFixed(2)} ${Math.max(s * 0.2, 5).toFixed(2)}% ${Math.max(
        l * 0.15,
        2
      ).toFixed(2)}%`
    : `${h.toFixed(2)} ${Math.min(s * 0.1, 5).toFixed(2)}% ${Math.min(
        100,
        100
      ).toFixed(2)}%`;
}

export function generateCard(primary: string, isDarkMode: boolean): string {
  if (!primary) return isDarkMode ? "24 9.8% 10%" : "0 0% 100%";

  const [h, s, l] = primary.split(" ").map(parseFloat);
  if (isNaN(h) || isNaN(s) || isNaN(l)) {
    return isDarkMode ? "24 9.8% 10%" : "0 0% 100%";
  }

  return isDarkMode
    ? `${h.toFixed(2)} ${Math.max(s * 0.2, 10).toFixed(2)}% ${Math.max(
        l * 0.15,
        10
      ).toFixed(2)}%`
    : `${h.toFixed(2)} ${Math.min(s * 0.1, 5).toFixed(2)}% ${Math.min(
        100,
        100
      ).toFixed(2)}%`;
}

export function generatePopover(primary: string, isDarkMode: boolean): string {
  if (!primary) return isDarkMode ? "0 0% 9%" : "0 0% 100%";

  const [h, s, l] = primary.split(" ").map(parseFloat);
  if (isNaN(h) || isNaN(s) || isNaN(l)) {
    return isDarkMode ? "0 0% 9%" : "0 0% 100%";
  }

  return isDarkMode
    ? `${h.toFixed(2)} ${Math.max(s * 0.15, 8).toFixed(2)}% ${Math.max(
        l * 0.12,
        9
      ).toFixed(2)}%`
    : `${h.toFixed(2)} ${Math.min(s * 0.08, 4).toFixed(2)}% ${Math.min(
        100,
        100
      ).toFixed(2)}%`;
}

export function generateBorder(primary: string, isDarkMode: boolean): string {
  if (!primary) return isDarkMode ? "240 3.7% 15.9%" : "240 5.9% 90%";

  const [h, s] = primary.split(" ").map(parseFloat);
  if (isNaN(h) || isNaN(s)) {
    return isDarkMode ? "240 3.7% 15.9%" : "240 5.9% 90%";
  }

  return isDarkMode
    ? `${h} ${Math.max(s * 0.15, 3.7).toFixed(1)}% 15.9%`
    : `${h} ${Math.max(s * 0.15, 5.9).toFixed(1)}% 90%`;
}

export function generateInput(primary: string, isDarkMode: boolean): string {
  if (!primary) return isDarkMode ? "240 3.7% 15.9%" : "240 5.9% 90%";

  const [h, s] = primary.split(" ").map(parseFloat);
  if (isNaN(h) || isNaN(s)) {
    return isDarkMode ? "240 3.7% 15.9%" : "240 5.9% 90%";
  }

  return isDarkMode
    ? `${h} ${Math.max(s * 0.15, 3.7).toFixed(1)}% 15.9%`
    : `${h} ${Math.max(s * 0.15, 5.9).toFixed(1)}% 90%`;
}

export function generateRing(primary: string): string {
  return primary || "346.8 77.2% 49.8%";
}

export function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
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
  if (!hslString) return false;
  const [h] = hslString.split(" ").map((v) => parseFloat(v));
  if (isNaN(h)) return false;
  return h >= 350 || h <= 10;
}

export function calculateForegroundColor(hslString: string): string {
  if (!hslString) return "0 0% 100%";
  const [, , l] = hslString.split(" ").map((v) => parseFloat(v));
  return l > 52 ? "240 10% 3.9%" : "0 0% 98%";
}

export function parseHSLString(input: string): string | null {
  if (!input) return null;

  const cleaned = input.toLowerCase().replace(/\s+/g, "");
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

// OKLCH conversion functions for Tailwind v4 support using culori
import { converter, parse, formatCss } from "culori";

// Create a converter to OKLCH
const toOklch = converter("oklch");

/**
 * Converts HSL color to OKLCH format string for CSS
 * @param h Hue (0-360)
 * @param s Saturation (0-100)
 * @param l Lightness (0-100)
 * @returns OKLCH values as string in format "l c h"
 */
export function hslToOklchString(h: number, s: number, l: number): string {
  try {
    // Create HSL color string for culori
    const hslString = `hsl(${h} ${s}% ${l}%)`;

    // Parse the HSL string
    const color = parse(hslString);
    if (!color) return "0 0 0";

    // Convert to OKLCH
    const oklch = toOklch(color);
    if (!oklch) return "0 0 0";

    // Format as CSS and extract values
    const formatted = formatCss(oklch);

    // Extract values and clean them up
    let values = formatted.replace(/oklch\(|\)/g, "");

    // Fix the "none" value for hue and limit decimal places
    values = values.replace(/none/g, "0");

    // Format to 5 decimal places max
    const parts = values.split(" ");
    if (parts.length >= 3) {
      const l = parseFloat(parts[0]).toFixed(5);
      const c = parseFloat(parts[1]).toFixed(5);
      const h = parts[2] === "0" ? "0" : parseFloat(parts[2]).toFixed(5);
      values = `${l} ${c} ${h}`;
    }

    return values;
  } catch (error) {
    console.error("Error converting HSL to OKLCH:", error);
    return "0 0 0";
  }
}

/**
 * Converts HSL color string to OKLCH format string
 * @param hslString HSL color in format "h s% l%"
 * @returns OKLCH color in format "l c h"
 */
export function hslStringToOklchString(hslString: string): string {
  if (!hslString) return "0 0 0";

  try {
    const [h, s, l] = hslString.split(" ").map((v) => {
      // Remove % sign if present
      return parseFloat(v.replace("%", ""));
    });

    if (isNaN(h) || isNaN(s) || isNaN(l)) {
      return "0 0 0";
    }

    return hslToOklchString(h, s, l);
  } catch (error) {
    console.error("Error parsing HSL string:", error);
    return "0 0 0";
  }
}

/**
 * Converts hex color to OKLCH format string
 * @param hex Hex color code (e.g., "#FF5733")
 * @returns OKLCH color in format "l c h"
 */
export function hexToOklch(hex: string): string {
  try {
    // Parse the hex color
    const color = parse(hex);
    if (!color) return "0 0 0";

    // Convert to OKLCH
    const oklch = toOklch(color);
    if (!oklch) return "0 0 0";

    // Format as CSS and extract values
    const formatted = formatCss(oklch);

    // Extract values and clean them up
    let values = formatted.replace(/oklch\(|\)/g, "");

    // Fix the "none" value for hue and limit decimal places
    values = values.replace(/none/g, "0");

    // Format to 5 decimal places max
    const parts = values.split(" ");
    if (parts.length >= 3) {
      const l = parseFloat(parts[0]).toFixed(5);
      const c = parseFloat(parts[1]).toFixed(5);
      const h = parts[2] === "0" ? "0" : parseFloat(parts[2]).toFixed(5);
      values = `${l} ${c} ${h}`;
    }

    return values;
  } catch (error) {
    console.error("Error converting hex to OKLCH:", error);
    return "0 0 0";
  }
}

/**
 * Parses an OKLCH string input
 * @param input OKLCH color string
 * @returns Formatted OKLCH string or null if invalid
 */
export function parseOklchString(input: string): string | null {
  try {
    if (!input) return null;

    // Try to parse as OKLCH
    const oklchString = `oklch(${input})`;
    const color = parse(oklchString);

    if (!color) return null;

    // Format it back to ensure it's valid
    const formatted = formatCss(color);

    // Extract values and clean them up
    let values = formatted.replace(/oklch\(|\)/g, "");

    // Fix the "none" value for hue and limit decimal places
    values = values.replace(/none/g, "0");

    // Format to 5 decimal places max
    const parts = values.split(" ");
    if (parts.length >= 3) {
      const l = parseFloat(parts[0]).toFixed(5);
      const c = parseFloat(parts[1]).toFixed(5);
      const h = parts[2] === "0" ? "0" : parseFloat(parts[2]).toFixed(5);
      values = `${l} ${c} ${h}`;
    }

    return values;
  } catch (error) {
    // If culori can't parse it, try manual parsing
    try {
      const cleaned = input.toLowerCase().replace(/\s+/g, "");
      const match = cleaned.match(
        /^(0\.\d+|\d+\.\d+|\d+)(0\.\d+|\d+\.\d+|\d+)(0\.\d+|\d+\.\d+|\d+)$/
      );

      if (match) {
        const [, l, c, h] = match;
        const lightness = Math.min(1, Math.max(0, parseFloat(l)));
        const chroma = Math.min(0.4, Math.max(0, parseFloat(c)));
        const hue = parseFloat(h);
        return `${lightness.toFixed(3)} ${chroma.toFixed(3)} ${hue.toFixed(3)}`;
      }
    } catch (e) {
      console.error("Error parsing OKLCH string:", e);
    }

    return null;
  }
}

/**
 * Calculates foreground color in OKLCH format based on background lightness
 * @param oklchString OKLCH color string
 * @returns OKLCH foreground color
 */
export function calculateOklchForegroundColor(oklchString: string): string {
  try {
    if (!oklchString) return "0.98500 0.00000 0.00000"; // White in OKLCH

    // Parse the OKLCH string to get the lightness value
    const [l] = oklchString.split(" ").map((v) => parseFloat(v));

    // Use black text on light backgrounds, white text on dark backgrounds
    if (l > 0.5) {
      // Dark text (black) for light backgrounds
      return "0.14100 0.00500 285.82300";
    } else {
      // Light text (white) for dark backgrounds
      return "0.98500 0.00000 0.00000";
    }
  } catch (error) {
    console.error("Error calculating foreground color:", error);
    return "0.98500 0.00000 0.00000"; // Default to white text
  }
}
