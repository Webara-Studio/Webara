
import { Logo } from '@/components/logo';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <Logo />
            <p className="max-w-sm text-sm text-foreground/70">
              Digital products, ventures and useful ideas from Webara Studio.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-8">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Stay connected</p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://links.webarastudio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 hover:text-foreground"
                >
                  All Webara links
                </a>
                <a
                  href="https://list.webarastudio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 hover:text-foreground"
                >
                  Join the mailing list
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2">
            <Link
              href="https://research.webarastudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground/70 hover:text-foreground"
              prefetch={false}
            >
              Research
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm text-foreground/70 hover:text-foreground"
              prefetch={false}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm text-foreground/70 hover:text-foreground"
              prefetch={false}
            >
              Terms of Service
            </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4">
          <p className="text-sm text-foreground/70">
            © {new Date().getFullYear()} Webara Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
