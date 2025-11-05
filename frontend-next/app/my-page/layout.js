import "../globals.css";
import { I18nProvider } from "../../i18n";

export default function MyPageLayout({ children }) {
  return (
    <html lang="is">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Mín síða - Kaggi</title>
      </head>
      <body>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}