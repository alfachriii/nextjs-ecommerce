import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - Shopcart online store",
    default: "Shopcart online store",
  },
  description: "Shopcart online store, Your one stop shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className="relative font-sans">
            <Header />
            {children}
            <Footer />
        </div>
    )
}