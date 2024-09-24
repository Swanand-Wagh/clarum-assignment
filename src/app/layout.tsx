import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const appFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clarum Assignment | Swanand",
  description:
    "This is the assignment work assigned by Clarum for the role of frontend developer. This assignment is completed by Swanand Wagh. The tech stacks used are - Next.js 14 (app router), Tailwind, Shadcn + Recharts, and Framer Motion - as directed in the assignment instructions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${appFont.className} antialiased`}>{children}</body>
    </html>
  );
}
