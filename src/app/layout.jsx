import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "QR Generatr",
  description: "QR Code Generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://analytics.us.umami.is/script.js"
          data-website-id="2c3e0a16-57d7-4af6-ac42-10574cca038f"
        ></script>
      </head>
      <body className={robotoMono.className}>
        <Header />
        {children}
        <Analytics />
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
