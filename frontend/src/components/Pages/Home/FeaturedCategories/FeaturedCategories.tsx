import Image from "next/image";
import Link from "next/link";
import { getFeaturedCategories } from "@/src/lib/Services/categories.service";
import styles from "./FeaturedCategories.module.css";

export default async function FeaturedCategories() {
  const categories = await getFeaturedCategories();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Esplora per Categoria</h2>
        <p className={styles.subtitle}>
          Dalla pittura alla scultura, fino all&apos;arte digitale.
        </p>
      </div>

      <div className={styles.grid}>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/catalogo/${category.slug}`}
            className={`${styles.card} ${
              category.size === "large" ? styles.cardLarge : styles.cardSmall
            }`}
          >
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              sizes={
                category.size === "large"
                  ? "(max-width: 768px) 100vw, 50vw"
                  : "(max-width: 768px) 50vw, 25vw"
              }
              className={styles.image}
            />
            <div className={styles.overlay} />
            <div className={styles.content}>
              <h3 className={styles.cardTitle}>{category.name}</h3>
              <p className={styles.cardDescription}>{category.description}</p>
              <div className={styles.accentLine} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
