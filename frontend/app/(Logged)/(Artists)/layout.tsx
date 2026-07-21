import DeskNavbar from "@/src/components/UI/Navbars/DeskNavbar/DeskNavbar";
import Footer from "@/src/components/UI/Footer/Footer";

export default function ArtistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DeskNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
