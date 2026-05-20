/**
 * theme.ts
 * Design tokens for Metro-City Diagnostics.
 *
 * Direction: Deep Navy + Warm Gold — premium healthcare.
 *
 * Mirror these values in tailwind.config.ts under theme.extend.
 */

export const colors = {
  // ── Primary: deep navy ──
  navy: {
    50: '#F1F4FA',
    100: '#E2E8F4',
    200: '#C6D2E6',
    300: '#9FB3D1',
    400: '#6E8BB8',
    500: '#3A6EA5',
    600: '#1E4380',
    700: '#13315C',
    800: '#0B2545',
    900: '#0A1F44',
    950: '#06132A',
  },

  // ── Accent: warm gold ──
  gold: {
    50: '#FBF6E5',
    100: '#F6EBC9',
    200: '#EFDC9D',
    300: '#E8C97C',
    400: '#D4B36A',
    500: '#C8A24F',
    600: '#B8902F',
    700: '#9C7B26',
    800: '#7A5E1B',
    900: '#5C4614',
  },

  // ── Neutral grays ──
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFB',
    100: '#F4F6FA',
    200: '#E5E8EE',
    300: '#D1D6E0',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#0F172A',
  },

  // ── Semantic ──
  success: '#1E8E5A',
  warning: '#D97706',
  error: '#B91C1C',
  info: '#3A6EA5',
} as const;

export const semantic = {
  background: colors.neutral[50],
  surface: colors.neutral[0],
  surfaceMuted: colors.neutral[100],
  border: colors.neutral[200],

  textPrimary: colors.neutral[900],
  textBody: colors.neutral[800],
  textSecondary: colors.neutral[600],
  textMuted: colors.neutral[400],
  textInverse: colors.neutral[0],

  brandPrimary: colors.navy[900],
  brandPrimaryHover: colors.navy[700],
  brandAccent: colors.gold[500],
  brandAccentHover: colors.gold[400],

  focusRing: colors.gold[500],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────────────────────────────────────

export const fonts = {
  display:
    "'Fraunces', ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
  body:
    "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  mono:
    "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const fontSize = {
  // [size, lineHeight]
  display: ['4rem', '1.05'],
  h1: ['3rem', '1.1'],
  h2: ['2.25rem', '1.2'],
  h3: ['1.75rem', '1.3'],
  h4: ['1.375rem', '1.35'],
  bodyLg: ['1.125rem', '1.6'],
  body: ['1rem', '1.6'],
  bodySm: ['0.875rem', '1.5'],
  eyebrow: ['0.8125rem', '1.4'],
} as const;

export const letterSpacing = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.04em',
  wider: '0.08em',
  widest: '0.16em',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Spacing & layout
// ─────────────────────────────────────────────────────────────────────────────

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
} as const;

export const radius = {
  none: '0',
  sm: '6px',
  md: '10px',
  lg: '16px',
  xl: '24px',
  pill: '999px',
} as const;

export const shadow = {
  sm: '0 1px 2px rgba(10, 31, 68, 0.06)',
  md: '0 4px 12px rgba(10, 31, 68, 0.08)',
  lg: '0 12px 32px rgba(10, 31, 68, 0.12)',
  xl: '0 24px 48px rgba(10, 31, 68, 0.16)',
  gold: '0 8px 24px rgba(200, 162, 79, 0.25)',
  inset: 'inset 0 1px 2px rgba(10, 31, 68, 0.06)',
} as const;

export const container = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  '2xl': '1320px',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Motion
// ─────────────────────────────────────────────────────────────────────────────

export const motion = {
  duration: {
    fast: '120ms',
    base: '200ms',
    slow: '320ms',
    slower: '480ms',
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    enter: 'cubic-bezier(0, 0, 0.2, 1)',
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Z-index scale
// ─────────────────────────────────────────────────────────────────────────────

export const zIndex = {
  base: 0,
  raised: 10,
  sticky: 100,
  header: 200,
  overlay: 800,
  modal: 900,
  popover: 1000,
  toast: 1100,
  tooltip: 1200,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Aggregated theme export
// ─────────────────────────────────────────────────────────────────────────────

export const theme = {
  colors,
  semantic,
  fonts,
  fontWeight,
  fontSize,
  letterSpacing,
  spacing,
  radius,
  shadow,
  container,
  breakpoints,
  motion,
  zIndex,
} as const;

export type Theme = typeof theme;
