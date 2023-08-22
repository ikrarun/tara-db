import "./globals.css";
import type { Metadata } from "next";
import { Raleway as Font } from "next/font/google";
import AuthProvider from "@/server/AuthProvider";
import Footer from "@/components/footer";
import Nav from "@/components/nav";

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
      <body className={font.className}>
        <div className="w-full min-h-screen min-w-[320px]  tracking-wide">
          <AuthProvider>
            <div className="flex flex-col">
              <div className="flex flex-col min-h-screen">
                <Nav />
                <div className="flex w-full p-2 my-5">
                  <div className="max-w-[900px] mx-auto w-full min-h-full flex flex-col gap-2  items-center justify-center">
                    {children}
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
