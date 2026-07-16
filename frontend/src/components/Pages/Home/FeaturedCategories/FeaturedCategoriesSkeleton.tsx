export default function FeaturedCategoriesSkeleton() {
  return (
    <section
      className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8"
      aria-hidden="true"
    >
      <div className="mx-auto h-4 w-24 animate-pulse rounded bg-[var(--color-border)]" />
      <div className="mx-auto mt-4 h-8 w-80 max-w-full animate-pulse rounded bg-[var(--color-border)]" />
      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`animate-pulse rounded-2xl bg-[var(--color-border)] ${
              i === 0
                ? "aspect-[4/5] sm:col-span-2 sm:row-span-2"
                : "aspect-[4/5]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
