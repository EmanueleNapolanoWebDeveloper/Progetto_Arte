// components/home/EditorialSection.tsx
import Image from "next/image";
import Link from "next/link";
import styles from "./editorials.module.css";

type EditorialArticle = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  category: string;
  readTime: string;
};

const featuredArticle: EditorialArticle = {
  slug: "collezionare-arte-contemporanea-guida",
  title: "Come iniziare a collezionare arte contemporanea",
  excerpt:
    "Una guida pratica per chi vuole avvicinarsi al collezionismo: cosa cercare, come valutare un'opera e perché il primo acquisto conta più di quanto pensi.",
  image: "/images/editorial/collezionare-arte.jpg",
  imageAlt: "Collezionista che osserva un dipinto in uno studio luminoso",
  category: "Guide",
  readTime: "6 min",
};

const secondaryArticles: EditorialArticle[] = [
  {
    slug: "tecnica-olio-vs-acrilico",
    title: "Olio o acrilico? Le differenze che ogni collezionista dovrebbe conoscere",
    excerpt: "Materiali, conservazione e valore percepito a confronto.",
    image: "/images/editorial/olio-acrilico.jpg",
    imageAlt: "Dettaglio di pennellate a olio su tela",
    category: "Tecniche",
    readTime: "4 min",
  },
  {
    slug: "intervista-artista-emergente",
    title: "Voci emergenti: intervista a Marta Colombo",
    excerpt: "Dallo studio milanese alla prima mostra personale.",
    image: "/images/editorial/intervista-artista.jpg",
    imageAlt: "Ritratto dell'artista Marta Colombo nel suo studio",
    category: "Interviste",
    readTime: "5 min",
  },
  {
    slug: "come-illuminare-opera-arte-casa",
    title: "Illuminare un'opera d'arte in casa: la guida essenziale",
    excerpt: "Temperatura colore, angoli e errori da evitare.",
    image: "/images/editorial/illuminazione-opera.jpg",
    imageAlt: "Quadro illuminato con luce calda in un salotto",
    category: "Interior",
    readTime: "3 min",
  },
];

export function Editorial() {
  return (
    <section aria-labelledby="editorial-heading" className={styles.section}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Journal</p>
          <h2 id="editorial-heading" className={styles.title}>
            Storie e ispirazioni dal mondo dell&apos;arte
          </h2>
        </div>
        <Link href="/journal" className={styles.viewAllLink}>
          Vedi tutti gli articoli →
        </Link>
      </div>

      <div className={styles.grid}>
        <Link
          href={`/journal/${featuredArticle.slug}`}
          className={styles.featuredLink}
        >
          <div className={styles.featuredImageWrapper}>
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className={styles.featuredImage}
            />
          </div>
          <div className={styles.featuredOverlay}>
            <span className={styles.featuredMeta}>
              {featuredArticle.category} · {featuredArticle.readTime}
            </span>
            <h3 className={styles.featuredTitle}>{featuredArticle.title}</h3>
            <p className={styles.featuredExcerpt}>{featuredArticle.excerpt}</p>
          </div>
        </Link>

        <div className={styles.secondaryList}>
          {secondaryArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/journal/${article.slug}`}
              className={styles.secondaryLink}
            >
              <div className={styles.secondaryImageWrapper}>
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="128px"
                  className={styles.secondaryImage}
                />
              </div>
              <div className={styles.secondaryContent}>
                <span className={styles.secondaryMeta}>
                  {article.category} · {article.readTime}
                </span>
                <h4 className={styles.secondaryTitle}>{article.title}</h4>
                <p className={styles.secondaryExcerpt}>{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Link href="/journal" className={styles.viewAllLinkMobile}>
        Vedi tutti gli articoli →
      </Link>
    </section>
  );
}