'use client';
import type { MouseEvent } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TypingAnimation } from '@/components/typing-animation';

export function HeroSection() {
  const handleScroll = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative isolate w-full overflow-hidden rounded-[2rem] py-24 md:py-32 lg:py-40">
      <video
        className="broll-video pointer-events-none absolute inset-0 block h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/video/webara-city-overhead.mp4" type="video/mp4" />
      </video>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70"
        aria-hidden="true"
      />
      <div className="relative z-10 container grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-center justify-center space-y-6 text-center lg:items-start lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            <TypingAnimation
              className="inline-block"
              parts={[
                { text: 'BUILD SMARTER, ', className: 'text-accent' },
                { text: 'TOGETHER' },
              ]}
            />
          </h1>
          <p className="max-w-[600px] text-foreground/80 md:text-xl">
            Join our partner network to co-create cutting-edge digital products at a fraction of the cost, with shared innovation, transparent pricing, and enterprise-level quality.
          </p>
          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Link href="#contact" onClick={(e) => handleScroll(e, '#contact')}>
              <Button size="lg">Start a Project</Button>
            </Link>
            <Link
              href="#portfolio"
              onClick={(e) => handleScroll(e, '#portfolio')}
            >
              <Button size="lg" variant="secondary">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
        <div className="group flex items-center justify-center">
          <div className="relative w-full max-w-lg overflow-hidden rounded-[1.25rem] border border-border bg-card shadow-2xl transition-transform duration-300 group-hover:rotate-0 lg:-rotate-3">
            <video
              className="aspect-video w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster="/hero.webp"
              aria-label="Webara Studio partnership film"
            >
              <source src="/video/webara-partnership-film.mp4" type="video/mp4" />
              Your browser does not support embedded video.
            </video>
            <div className="flex items-center justify-between gap-4 border-t border-border bg-card px-4 py-3 sm:px-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Webara Studio
                </p>
                <p className="mt-1 text-sm text-foreground/70">
                  Build smarter together
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-accent/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                Watch the film
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
