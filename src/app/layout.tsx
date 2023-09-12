import "Lib/styles/globals.css";
import type { Metadata } from "next";
import { Nunito_Sans as Font } from "next/font/google";
import AuthProvider from "Lib/Auth/AuthProvider";
import Nav from "components/Nav/Nav";
import React from "react";
import { Provider } from "TRPC/Provider";

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
  console.log = () => {};

  return (
    <html lang="en" >
      <body
        style={font.style}
        className="inline-flex  select-none min-h-screen w-full"
      >
        <Provider>
        <AuthProvider>
          <div className="flex relative flex-col w-full mx-auto pt-16 p-3 max-w-[900px]">
            <Nav />
            {children}
          </div>
        </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
