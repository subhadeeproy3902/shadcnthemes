export function generateHarmonizedColors(baseHue: number): ColorConfig {
  const complementaryHue = (baseHue + 180) % 360;
  const analogous1 = (baseHue + 30) % 360;
  const analogous2 = (baseHue - 30 + 360) % 360;

  // Generate totally random colors including the base hue and brightness
  const primary = generateRandomHSL();
  const secondary = generateRandomHSL();
  const accent = generateRandomHSL();
  const destructive = generateRandomHSL(true);

  return {
    primary,
    secondary,
    accent,
    destructive,
  };
}

export function generateRandomHSL(isDestructive: boolean = false): string {
  if (isDestructive) {
    const h = Math.floor(Math.random() * 20) - 10 + 360;
    const s = Math.floor(Math.random() * 20) + 60;
    const l = Math.floor(Math.random() * 20) + 30;
    return `${h % 360} ${s}% ${l}%`;
  }
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 40) + 60;
  const l = Math.floor(Math.random() * 40) + 30;
  return `${h} ${s}% ${l}%`;
}

export function generateBackground(primary: string, isDarkMode: boolean): string {
  const [h, s, l] = primary.split(" ").map(parseFloat);
  if (isNaN(h) || isNaN(s) || isNaN(l))
    return isDarkMode ? "0 0% 2%" : "0 0% 99%";

  return isDarkMode
    ? `${h} ${Math.max(s * 0.2, 5)}% ${Math.max(l * 0.15, 2)}%`
    : `${h} ${Math.min(s * 0.2, 10)}% ${Math.min(l * 1.5 + 40, 99)}%`;
}

export function generateCard(primary: string, isDarkMode: boolean): string {
  const [h, s, l] = primary.split(" ").map(parseFloat);
  if (isNaN(h) || isNaN(s) || isNaN(l))
    return isDarkMode ? "0 0% 10%" : "0 0% 90%";

  return isDarkMode
    ? `${h} ${Math.max(s * 0.2, 10)}% ${Math.max(l * 0.15, 10)}%`
    : `${h} ${Math.min(s * 0.2, 20)}% ${Math.min(l * 1.5 + 40, 90)}%`;
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

  return `${h} ${s}% ${l}%`;
}

export function isValidDestructiveColor(hslString: string): boolean {
  const [h] = hslString.split(" ").map(v => parseFloat(v));
  return (h >= 350 || h <= 10);
}

export function calculateForegroundColor(hslString: string): string {
  const [h, s, l] = hslString.split(" ").map(parseFloat);
  return l > 60 ? "0 0% 0%" : "0 0% 100%";
}

export function parseHSLString(input: string): string | null {
  const cleaned = input.toLowerCase().replace(/\s+/g, '');
  
  const match = cleaned.match(/^(\d{1,3})[,\s](\d{1,3})%[,\s](\d{1,3})%$/);
  
  if (match) {
    const [, h, s, l] = match;
    const hue = Math.min(360, Math.max(0, parseInt(h)));
    const sat = Math.min(100, Math.max(0, parseInt(s)));
    const light = Math.min(100, Math.max(0, parseInt(l)));
    return `${hue} ${sat}% ${light}%`;
  }
  
  return null;
}