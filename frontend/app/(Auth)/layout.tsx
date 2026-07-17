// app/(auth)/layout.tsx
import Link from "next/link";
import { ArtworkCarouselBackground } from "@/src/components/Pages/Auth/ArtworkCarouselBackground";
import styles from "./auth.module.css";
import DeskNavbar from "@/src/components/UI/Navbars/DeskNavbar/DeskNavbar";
import Footer from "@/src/components/UI/Footer/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <ArtworkCarouselBackground />

      <DeskNavbar />

      <main className={styles.main}>
        <div className={styles.panel}>{children}</div>
      </main>

      <Footer />
    </div>
  );
}
