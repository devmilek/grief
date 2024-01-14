import type { Metadata } from "next";
import { DM_Serif_Display, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { SITE_NAME } from "@/constants";

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
  // title: `${SITE_NAME} - Twoja baza przepisów`,
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} - Twoja baza przepisów`, // a default is required when creating a template
  },
  description: `Znajdź inspirację do gotowania i delektuj się smakiem kuchni z różnych zakątków świata. Codziennie dostarczamy inspirujące przepisy na wyjątkowe i smakowite dania, abyś mógł cieszyć się wyjątkowymi posiłkami.`,
  keywords: [
    "przepisy",
    "gotowanie",
    "kuchnia",
    "świat",
    "diety",
    "okazje",
    "kategorie",
    "smaki",
    "smak",
    "dania kuchni",
    "przepisy kulinarne",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pl"
      className={`${poppins.variable} ${db_serif_display.variable}`}
    >
      <body className={cn(poppins.className, "bg-neutral-50")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
