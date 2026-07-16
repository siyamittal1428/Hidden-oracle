import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";
import { CursorGlow } from "../components/site/CursorGlow";
import { ScrollProgress } from "../components/site/ScrollProgress";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-8xl font-bold text-gradient-gold">404</h1>
        <h2 className="mt-4 text-2xl font-display text-foreground">The stars are misaligned</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This path doesn't appear in our reading. Let's return to the beginning.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-105 glow-gold"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-display tracking-tight text-foreground">
          The energy was disrupted
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Please try again or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:scale-105 transition-all"
          >
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent/20 transition-all">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Hidden Oracle — Tarot Readings & Spiritual Guidance by Siya" },
      { name: "description", content: "Personalized tarot readings for love, career, finance, and spiritual growth. Book a private online session with Siya, professional tarot reader and spiritual guide." },
      { name: "author", content: "Hidden Oracle" },
      { property: "og:title", content: "Hidden Oracle — Tarot Readings & Spiritual Guidance" },
      { property: "og:description", content: "Discover your path through the wisdom of Tarot. Personalized readings for love, career, finance, and spiritual growth." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Hidden Oracle" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
