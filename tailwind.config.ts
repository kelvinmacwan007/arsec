import type { Config } from 'tailwindcss';
const config: Config = { content: ['./src/**/*.{ts,tsx}'], theme: { extend: { colors: { ground:'var(--ground)', ink:'var(--ink)', accent:'var(--accent)', mint:'var(--mint)', line:'var(--line)', muted:'var(--muted)' }, borderRadius: { card:'var(--radius-card)', pill:'var(--radius-pill)' }, spacing: { section:'var(--section-space)' }, fontFamily: { display:['var(--font-fraunces)'], sans:['var(--font-inter)'] } } }, plugins: [] };
export default config;
