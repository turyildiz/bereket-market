import { Store, Camera, Sparkles, Globe, ChevronRight } from 'lucide-react';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-amber-400/15 blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-primary/15 blur-[100px]" />

        {/* Geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative">
        {/* Header */}
        <header className="container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
                <Store className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">Bereket Market</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Show different content based on auth state */}
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="ghost" className="hidden sm:inline-flex">
                    Anmelden
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="shadow-lg shadow-primary/25">
                    Registrieren
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <a href="/dashboard">
                  <Button variant="ghost" className="hidden sm:inline-flex">
                    Dashboard
                  </Button>
                </a>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10"
                    }
                  }}
                />
              </SignedIn>
            </div>
          </nav>
        </header>

        {/* Hero section */}
        <main className="container mx-auto px-6">
          <div className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center py-20 text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>KI-gestützte Angebotserkennung</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Ihr lokaler Marktplatz</span>
              <span className="mt-2 block text-gradient">für orientalische Spezialitäten</span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Händler laden Fotos hoch, unsere KI erkennt automatisch die Angebote.
              Kunden entdecken die besten Deals in ihrer Nähe.
            </p>

            {/* Coming Soon Badge */}
            <div className="mt-12 flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-amber-400 to-primary opacity-20 blur-lg" />
                <div className="relative rounded-2xl border border-border bg-card px-8 py-6 shadow-2xl">
                  <span className="font-display text-2xl font-bold tracking-wide text-foreground sm:text-3xl">
                    Coming Soon
                  </span>
                </div>
              </div>

              {/* Auth buttons for mobile/CTA */}
              <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button size="lg" className="gap-2 shadow-lg shadow-primary/25">
                      Jetzt registrieren
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <Button size="lg" variant="outline">
                      Anmelden
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <a href="/dashboard">
                    <Button size="lg" className="gap-2 shadow-lg shadow-primary/25">
                      Zum Dashboard
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </a>
                </SignedIn>
              </div>
              <p className="text-sm text-muted-foreground">
                Seien Sie die Ersten, die erfahren, wenn wir starten!
              </p>
            </div>

            {/* Features grid */}
            <div className="mt-24 grid w-full max-w-4xl gap-6 sm:grid-cols-3">
              <FeatureCard
                icon={<Camera className="h-6 w-6" />}
                title="Foto hochladen"
                description="Laden Sie einfach ein Foto Ihrer Angebote hoch"
              />
              <FeatureCard
                icon={<Sparkles className="h-6 w-6" />}
                title="KI-Erkennung"
                description="Unsere KI erkennt und kategorisiert automatisch"
              />
              <FeatureCard
                icon={<Globe className="h-6 w-6" />}
                title="Lokal entdecken"
                description="Kunden finden Sie in ihrer Nähe"
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto border-t border-border/50 px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10">
                <Store className="h-3 w-3 text-primary" />
              </div>
              <span>© 2026 Bereket Market</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-foreground">Impressum</a>
              <a href="#" className="transition-colors hover:text-foreground">Datenschutz</a>
              <a href="#" className="transition-colors hover:text-foreground">Kontakt</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
      <div className="relative">
        <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
          {icon}
        </div>
        <h3 className="mb-2 font-display text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
