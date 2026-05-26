import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Good Student PH",
  description: "Digital study tools made for Filipino students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}