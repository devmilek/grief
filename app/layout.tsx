import type { Metadata } from "next";
import {
  DM_Serif_Display,
  Inter,
  Poppins,
  Roboto_Mono,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/components/providers/modal-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const db_serif_display = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-dm-serif-display",
});

export const metadata: Metadata = {
  title: "Grief - Twoja baza przepisów",
  description:
    "Grief został stworzony z myślą o wszystkich pasjonatach wyśmienitej kuchni. Codziennie dostarczamy inspirujące przepisy na wyjątkowe i smakowite dania, abyś mógł cieszyć się wyjątkowymi posiłkami.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${poppins.variable} ${db_serif_display.variable}`}
      >
        <body className={cn(poppins.className, "bg-neutral-50")}>
          {children}
          <ModalProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
