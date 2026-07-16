import { ShieldCheck, Truck, Palette, Lock } from "lucide-react";
import styles from "./valuePropStrip.module.css";

type ValueProp = {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
};

const VALUE_PROPS: ValueProp[] = [
  {
    icon: ShieldCheck,
    title: "Opere autenticate",
    description:
      "Ogni opera è verificata e proviene direttamente dall'artista.",
  },
  {
    icon: Truck,
    title: "Spedizione assicurata",
    description: "Imballaggio dedicato e tracciamento su ogni ordine.",
  },
  {
    icon: Palette,
    title: "Diretto dall'artista",
    description: "Nessun intermediario: supporti chi crea l'opera.",
  },
  {
    icon: Lock,
    title: "Pagamento sicuro",
    description: "Transazioni protette, resi garantiti entro 14 giorni.",
  },
];

export default function ValuePropStrip() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {VALUE_PROPS.map(({ icon: Icon, title, description }) => (
            <div key={title} className={styles.item}>
              <Icon className={styles.icon} aria-hidden="true" />
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
