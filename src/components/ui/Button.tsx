import type { ButtonHTMLAttributes } from 'react';
type Props=ButtonHTMLAttributes<HTMLButtonElement>&{variant?:'dark'|'light'};
export function Button({variant='dark',children,className='',...props}:Props){return <button className={`focus-ring inline-flex items-center justify-center gap-3 rounded-pill px-5 py-3 text-sm font-semibold transition-transform duration-500 hover:-translate-y-0.5 ${variant==='dark'?'bg-ink text-white':'bg-white text-ink border border-line'} ${className}`} {...props}>{children}<span aria-hidden>↗</span></button>}
