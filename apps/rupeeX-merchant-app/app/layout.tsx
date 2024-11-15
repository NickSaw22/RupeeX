import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import AppBar from "../components/AppBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "RupeeX Wallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <div className="min-w-screen min-h-screen bg-gradient-to-r from-[#e3f2fd] to-[#bbdefb] transition-all duration-500 ease-in-out">
            <AppBar/>
            <main className="p-0 mr-0">
              {children}
            </main>
          </div>
        </body>
      </Providers>
    </html>
  );
}
