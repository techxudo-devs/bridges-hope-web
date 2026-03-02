/**
 * Color constants for the application
 * These values should match the CSS custom properties in app/globals.css
 *
 * IMPORTANT: When updating the primary color, you must also update:
 * 1. app/globals.css - --color-primary variable
 * 2. messages/*.json - accentColor fields (these are JSON files and cannot import this constant)
 *
 * The primary color is currently used in:
 * - All campaign accent colors in message files (en.json, ar.json, tr.json)
 * - Tailwind classes (bg-primary, text-primary, border-primary)
 * - Component inline styles that reference COLORS.primary
 */

export const COLORS = {
  primary: "#1cab2d",
  secondary: "#092a24",
  accent: "#fdf2f0",

  // Additional colors used in the app
  yellow: "#FFB800",
  orange: "#F5B100",
  green: "#28D08F",
  purple: "#7E3AF2",
} as const;

export type ColorKey = keyof typeof COLORS;
