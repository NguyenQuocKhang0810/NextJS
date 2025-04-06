export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-12">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 w-full flex items-center justify-center">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-down [animation-fill-mode:backwards] [animation-delay:0.1s]">
              Welcome to Our Enhanced Website
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 animate-fade-in-up [animation-fill-mode:backwards] [animation-delay:0.2s]">
              Explore our enhanced header with dropdown navigation, modern
              authentication pages, and breadcrumb navigation. This demo
              showcases the improved user interface and experience.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring animate-fade-in-up [animation-fill-mode:backwards] [animation-delay:0.3s] hover:scale-105"
              >
                Log in
              </a>
              <a
                href="/register"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring animate-fade-in-up [animation-fill-mode:backwards] [animation-delay:0.4s] hover:scale-105"
              >
                Sign up
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
