import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { rail: '#0b4fb3', signal: '#06b6d4' } } }, plugins: [] };
export default config;
