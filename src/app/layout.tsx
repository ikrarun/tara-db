import "./globals.css";
import type { Metadata } from "next";
import { Raleway as Font } from "next/font/google";
import AuthProvider from "@/server/AuthProvider";
import Footer from "@/UI/footer";
import Nav from "@/UI/nav";

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
        <div className="min-h-screen w-full tracking-wide">
          <AuthProvider>
            <div className="flex flex-col">
              <div className="flex min-h-screen flex-col">
                <Nav />
                <div className="w-full my-5 p-2 flex">
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
