import React from "react";
import "./globals.css";

export const metadata = {
  title: "SaveSpend",
  description: "Personal Fiance Tracker with AI insights",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        {children}
      </body>
    </html>
  );
}
