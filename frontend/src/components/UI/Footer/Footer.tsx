// src/components/UI/Footer/Footer.tsx
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Navigazione a piè di pagina
      </h2>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Colonna Brand / Intro */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              ProgettoArte
            </Link>
            <p className={styles.payoff}>
              La piattaforma dedicata a scoprire, collezionare e supportare le
              voci artistiche emergenti più brillanti della scena contemporanea.
            </p>
            {/* Social Link Mock */}
            <div className={styles.socials}>
              <a
                href="#"
                className={styles.socialLink}
                aria-label="Seguici su Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#"
                className={styles.socialLink}
                aria-label="Seguici su Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className={styles.socialLink}
                aria-label="Canale Pinterest"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 22c-.5-1.5 0-3 1-5l2-10s-.5-1.5 0-3 1.5 0 2 1.5c1 3-1.5 6-3 6.5s-2.5-.5-3-2l-.5 2s-1 3.5-1.5 5.5c-.5 2 0 4 0 4.5"></path>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Colonna Acquirenti */}
          <div className={styles.linksCol}>
            <h3 className={styles.columnHeading}>Per gli acquirenti</h3>
            <ul className={styles.linksList}>
              <li>
                <Link href="/come-funziona" className={styles.linkItem}>
                  Come funziona
                </Link>
              </li>
              <li>
                <Link href="/opere" className={styles.linkItem}>
                  Opere in evidenza
                </Link>
              </li>
              <li>
                <Link href="/categorie" className={styles.linkItem}>
                  Categorie d&apos;arte
                </Link>
              </li>
              <li>
                <Link href="/spedizioni" className={styles.linkItem}>
                  Spedizioni e tutele
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonna Artisti */}
          <div className={styles.linksCol}>
            <h3 className={styles.columnHeading}>Per gli artisti</h3>
            <ul className={styles.linksList}>
              <li>
                <Link href="/diventa-venditore" className={styles.linkItem}>
                  Diventa venditore
                </Link>
              </li>
              <li>
                <Link href="/come-vendere" className={styles.linkItem}>
                  Come vendere
                </Link>
              </li>
              <li>
                <Link href="/commissioni" className={styles.linkItem}>
                  Commissioni e pagamenti
                </Link>
              </li>
              <li>
                <Link href="/faq-artisti" className={styles.linkItem}>
                  FAQ artisti
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonna Azienda */}
          <div className={styles.linksCol}>
            <h3 className={styles.columnHeading}>Azienda</h3>
            <ul className={styles.linksList}>
              <li>
                <Link href="/chi-siamo" className={styles.linkItem}>
                  Chi siamo
                </Link>
              </li>
              <li>
                <Link href="/blog" className={styles.linkItem}>
                  Blog / Magazine
                </Link>
              </li>
              <li>
                <Link href="/contatti" className={styles.linkItem}>
                  Contatti
                </Link>
              </li>
              <li>
                <Link href="/lavora-con-noi" className={styles.linkItem}>
                  Lavora con noi
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonna Legale */}
          <div className={styles.linksCol}>
            <h3 className={styles.columnHeading}>Legale</h3>
            <ul className={styles.linksList}>
              <li>
                <Link href="/termini" className={styles.linkItem}>
                  Termini di servizio
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={styles.linkItem}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie" className={styles.linkItem}>
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Riga finale */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} ProgettoArte S.r.l. Tutti i diritti riservati.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy" className={styles.bottomLink}>
              Informativa Privacy
            </Link>
            <Link href="/termini" className={styles.bottomLink}>
              Condizioni d&apos;uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
