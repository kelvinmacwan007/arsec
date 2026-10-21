'use client';
import {useEffect, type ReactNode} from 'react';

export function SmoothScroll({children}:{children:ReactNode}){
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    let disposed=false;
    let cleanup=()=>{};
    Promise.all([import('lenis'),import('gsap'),import('gsap/ScrollTrigger')]).then(([lenisModule,gsapModule,scrollModule])=>{
      if(disposed)return;
      const Lenis=lenisModule.default;
      const gsap=gsapModule.gsap;
      const ScrollTrigger=scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const lenis=new Lenis({duration:1.1,easing:(t:number)=>Math.min(1,1.001-Math.pow(2,-10*t))});
      const update=(time:number)=>lenis.raf(time*1000);
      gsap.ticker.add(update);
      lenis.on('scroll',ScrollTrigger.update);
      cleanup=()=>{gsap.ticker.remove(update);lenis.destroy();};
    }).catch(()=>{});
    return()=>{disposed=true;cleanup();};
  },[]);
  return <>{children}</>;
}
