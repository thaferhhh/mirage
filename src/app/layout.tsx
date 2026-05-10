import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "الميراج للسفر والسياحة | وجهتك المثالية في العراق",
  description: "أفضل عروض الطيران والفنادق والبرامج السياحية والتأشيرات بأسعار تنافسية وخدمة احترافية على مدار الساعة مع شركة الميراج للسفر والسياحة - بغداد.",
  keywords: "الميراج للسفر والسياحة, العراق, بغداد, عروض سفر, حجوزات طيران, حجوزات فنادق, تأشيرات سياحية, برامج سياحية, عروض عمرة, عروض حج, أفضل شركة سفر وسياحة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${tajawal.variable} antialiased`}
    >
      <body className="min-h-screen bg-background font-cairo text-foreground">
        {children}
      </body>
    </html>
  );
}
