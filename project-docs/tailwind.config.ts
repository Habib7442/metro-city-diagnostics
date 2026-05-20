/**
 * tailwind.config.ts
 * Wires the design tokens from src/lib/theme.ts into Tailwind utility classes.
 */

import type { Config } from 'tailwindcss';
import { colors, fonts, radius, shadow, container, motion } from './src/lib/theme';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', md: '2rem', lg: '3rem' },
      screens: container,
    },
    extend: {
      colors: {
        navy: colors.navy,
        gold: colors.gold,
        neutral: colors.neutral,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
      },
      fontFamily: {
        display: fonts.display.split(', '),
        sans: fonts.body.split(', '),
        mono: fonts.mono.split(', '),
      },
      fontSize: {
        display: ['4rem', { lineHeight: '1.05', fontWeight: '600' }],
        h1: ['3rem', { lineHeight: '1.1', fontWeight: '600' }],
        h2: ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        h3: ['1.75rem', { lineHeight: '1.3', fontWeight: '500' }],
        h4: ['1.375rem', { lineHeight: '1.35', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        eyebrow: ['0.8125rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.08em' }],
      },
      borderRadius: {
        sm: radius.sm,
        DEFAULT: radius.md,
        lg: radius.lg,
        xl: radius.xl,
        pill: radius.pill,
      },
      boxShadow: {
        sm: shadow.sm,
        DEFAULT: shadow.md,
        lg: shadow.lg,
        xl: shadow.xl,
        gold: shadow.gold,
        inset: shadow.inset,
      },
      transitionDuration: {
        fast: motion.duration.fast,
        DEFAULT: motion.duration.base,
        slow: motion.duration.slow,
      },
      transitionTimingFunction: {
        DEFAULT: motion.easing.standard,
        enter: motion.easing.enter,
        exit: motion.easing.exit,
      },
      backgroundImage: {
        'navy-gradient': `linear-gradient(135deg, ${colors.navy[900]} 0%, ${colors.navy[700]} 100%)`,
        'gold-gradient': `linear-gradient(135deg, ${colors.gold[600]} 0%, ${colors.gold[400]} 100%)`,
        'wash-gold': `linear-gradient(180deg, ${colors.gold[100]} 0%, transparent 100%)`,
      },
    },
  },
  plugins: [],
};

export default config;
