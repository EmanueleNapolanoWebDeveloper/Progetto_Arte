import styles from "./editorials.module.css";

export function EditorialSkeleton() {
  return (
    <section aria-hidden="true" className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className={styles.skeletonEyebrow} />
          <div className={styles.skeletonTitle} />
        </div>
        <div className={styles.skeletonViewAll} />
      </div>

      <div className={styles.grid}>
        <div className={styles.skeletonFeatured}>
          <div className={styles.skeletonFeaturedImage}>
            <div className={styles.skeletonFeaturedOverlay}>
              <div className={styles.skeletonFeaturedMeta} />
              <div className={styles.skeletonFeaturedTitle} />
              <div className={styles.skeletonFeaturedExcerpt} />
            </div>
          </div>
        </div>

        <div className={styles.skeletonSecondaryList}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={styles.skeletonSecondaryItem}>
              <div className={styles.skeletonSecondaryImage} />
              <div className={styles.skeletonSecondaryContent}>
                <div className={styles.skeletonSecondaryMeta} />
                <div className={styles.skeletonSecondaryTitle} />
                <div className={styles.skeletonSecondaryTitleShort} />
                <div className={styles.skeletonSecondaryExcerpt} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}