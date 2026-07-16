import styles from "./FeaturedWorks.module.css";

export default function FeaturedWorksSkeleton() {
  return (
    <section className={styles.section} aria-hidden="true">
      <div className={styles.skeletonEyebrow} />
      <div className={styles.skeletonHeading} />
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.skeletonItem} />
        ))}
      </div>
    </section>
  );
}
