import type { Metadata } from "next";
import "./styles/globals.css";
import Header from "./components/layouts/header";
import Footer from "./components/layouts/footer";

export const metadata: Metadata = {
  title: "Mesa Scout",
  description: "Explore analises de jogadores e quais são as promessas do mercado futebolistico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
