import "./globals.css";
import React from "react";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { I18nProvider } from "../i18n";
import ClientLayout from "./client-layout";

// Header should use M PLUS Rounded 1c
const mPlusRounded = M_PLUS_Rounded_1c({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: 'Kaggi - Sell Your Car',
  description: 'Sell your car quickly and easily with Kaggi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="is">
      <head>
        <script src="https://cdn.commoninja.com/sdk/latest/commonninja.js" defer></script>
      </head>
      <body className={mPlusRounded.className}>
        <I18nProvider>
          <ClientLayout>{children}</ClientLayout>
        </I18nProvider>
      </body>
    </html>
  );
}