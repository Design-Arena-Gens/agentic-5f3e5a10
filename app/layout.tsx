import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "AstraMine AI | الذكاء الاصطناعي للتعدين",
  description:
    "منصة تتيح لك بناء بوت تعدين ذكي يعتمد على التحليلات الفورية والذكاء الاصطناعي لضبط الجهد والعائد."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body className="font-sans bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
