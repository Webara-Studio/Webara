'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type AppItem = {
  name: string;
  blurb: string;
  link: string;
  tags: string[];
  image: { src: string; alt: string };
};

const apps: AppItem[] = [
  {
    name: 'PackCheck',
    blurb:
      'Upload a property pack and get an instant AI-powered evaluation — green flags, red flags and a plain-English summary in under 60 seconds.',
    link: 'https://packcheck.mulcareproperty.com',
    tags: ['AI', 'PropTech', 'SaaS'],
    image: {
      src: '/apps/packcheck.webp',
      alt: 'PackCheck AI property pack evaluator homepage',
    },
  },
  {
    name: 'ALIVE Properties',
    blurb:
      'Property in Accra, made clearer — renting, selling, management and brokerage services wrapped in a premium marketing experience.',
    link: 'https://alivepropertiesgh.com',
    tags: ['Real Estate', 'Ghana', 'Web Platform'],
    image: {
      src: '/apps/alive.webp',
      alt: 'ALIVE Properties real estate platform homepage',
    },
  },
  {
    name: 'CaseLens',
    blurb:
      'A client-first legal document literacy tool — structured, neutral analysis that turns complex legal text into plain English.',
    link: 'https://caselens.app',
    tags: ['Legal Tech', 'AI', 'SaaS'],
    image: {
      src: '/apps/caselens.webp',
      alt: 'CaseLens legal document literacy app homepage',
    },
  },
];

function AppCard({ app }: { app: AppItem }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-xl">
      <CardContent className="flex h-full flex-col p-0">
        <Link
          href={app.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-full flex-col"
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={app.image.src}
              alt={app.image.alt}
              width={800}
              height={500}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col gap-4 p-6">
            <div>
              <h3 className="text-xl font-semibold">{app.name}</h3>
              <p className="mt-2 text-sm text-foreground/70">{app.blurb}</p>
            </div>
            <div className="mt-auto space-y-4">
              <div className="flex flex-wrap gap-2">
                {app.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <span className="inline-flex items-center text-sm font-medium text-primary">
                Launch app
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}

function ComingSoonCard() {
  return (
    <Link
      href="/#contact"
      className="group flex h-full flex-col overflow-hidden rounded-lg border-2 border-dashed border-border bg-card/50 shadow-sm transition-colors hover:border-primary/60 hover:bg-card"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-500 group-hover:-translate-y-1">
          <Rocket className="h-7 w-7" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">More coming soon</h3>
          <p className="mt-2 text-sm text-foreground/70">
            We&apos;re always building. Your product could be next in this
            lineup.
          </p>
        </div>
        <span className="inline-flex items-center text-sm font-medium text-primary">
          Start a project
          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function AppsSection() {
  return (
    <section id="apps" className="w-full py-20 md:py-28 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Apps We&apos;ve Shipped
          </h2>
          <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
            From property intelligence to legal literacy — products designed,
            built and launched by Webara Studio, each solving a real problem
            end-to-end.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {apps.map((app) => (
            <AppCard key={app.name} app={app} />
          ))}
          <ComingSoonCard />
        </div>
      </div>
    </section>
  );
}
