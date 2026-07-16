import Image from "next/image";
import Link from "next/link";
import WorkCardActions from "./WorkCardActions";
import { Work } from "@/src/types/Auth/work";
import styles from "./FeaturedWorks.module.css";

interface WorkCardProps {
  work: Work;
  priority?: boolean;
}

const currencyFormatter = (currency: string) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency });

export default function WorkCard({ work, priority = false }: WorkCardProps) {
  return (
    <li>
      <article className={styles.cardArticle}>
        <Link href={`/opere/${work.slug}`} className={styles.cardLink}>
          <div className={styles.cardImageWrapper}>
            <Image
              src={work.imageUrl}
              alt={work.imageAlt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className={styles.cardImage}
            />
          </div>

          <div className={styles.cardInfo}>
            <div>
              <h3 className={styles.cardTitle}>{work.title}</h3>
              <p className={styles.cardArtist}>{work.artist.name}</p>
            </div>
            <p className={styles.cardPrice}>
              {currencyFormatter(work.currency).format(work.price)}
            </p>
          </div>
        </Link>

        <WorkCardActions workId={work.id} initialSaved={work.isSaved} />
      </article>
    </li>
  );
}
