import Image from "next/image";
import Link from "next/link";
import WorkCardActions from "./WorkCardActions";
import { Work } from "@/src/types/Auth/work";

interface WorkCardProps {
  work: Work;
  priority?: boolean;
}

const currencyFormatter = (currency: string) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency });

export default function WorkCard({ work, priority = false }: WorkCardProps) {
  return (
    <li>
      <article className="group relative">
        <Link
          href={`/opere/${work.slug}`}
          className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[var(--color-secondary)]">
            <Image
              src={work.imageUrl}
              alt={work.imageAlt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          <div className="mt-3 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-primary)]">
                {work.title}
              </h3>
              <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
                {work.artist.name}
              </p>
            </div>
            <p className="shrink-0 text-sm font-medium text-[var(--color-text-primary)]">
              {currencyFormatter(work.currency).format(work.price)}
            </p>
          </div>
        </Link>

        <WorkCardActions workId={work.id} initialSaved={work.isSaved} />
      </article>
    </li>
  );
}
