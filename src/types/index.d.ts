interface ColorConfig {
  [key: string]: string;
}

interface ColorPreset {
  name: string;
  colors: ColorConfig;
  backgroundLight: string;
  backgroundDark: string;
  cardLight: string;
  cardDark: string;
}