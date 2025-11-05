"use client";
import "../globals.css";
import React from "react";
import { I18nProvider } from "../../i18n";

export default function DealerLoginLayout({ children }) {
  return (
    <html lang="is">
      <body className="bg-[#f5f5f4]">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}