import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans as Font } from "next/font/google";
import AuthProvider from "_auth/AuthProvider";
import Footer from "_components/Footer";
import Nav from "_components/Nav";
import { Provider } from "_trpc/_important/Provider";

const font = Font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TARA",
  description: "Truth and Reclamation for Ambedkarism",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={font.className}>
          <div className="flex select-none screen flex-col w-full">
            <Nav />
            <div className="max-w-[900px] grow w-full flex flex-row  p-4 mx-auto">
              <Provider>{children}</Provider>
            </div>
            <Footer />
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
