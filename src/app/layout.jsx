import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "QR Generatr",
  description: "QR Code Generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <Header />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
