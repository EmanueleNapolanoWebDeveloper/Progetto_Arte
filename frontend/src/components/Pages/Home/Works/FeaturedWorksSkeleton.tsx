export default function FeaturedWorksSkeleton() {
  return (
    <section
      className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8"
      aria-hidden="true"
    >
      <div className="h-4 w-20 animate-pulse rounded bg-[var(--color-border)]" />
      <div className="mt-4 h-8 w-96 max-w-full animate-pulse rounded bg-[var(--color-border)]" />
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] animate-pulse rounded-xl bg-[var(--color-border)]"
          />
        ))}
      </div>
    </section>
  );
}
