import "Lib/styles/globals.css";
import type { Metadata } from "next";
import { Nunito_Sans as Font } from "next/font/google";
import AuthProvider from "Lib/Auth/AuthProvider";
import Nav from "components/Nav/PrimaryNav";
import PageName from "components/Nav/Header";
import Right_Tab from "components/Nav/SecondryNav";
import React from "react";

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
      <body style={font.style} className="select-none flex h-screen">
        <AuthProvider>
          <React.Fragment>
            {/* Left Side Navigation */}
            <Nav />
            {/* Centered Content Area */}
            <div className="mx-auto max-w-[900px] flex-col flex w-full">
              <PageName />
              <div className="p-4">{children}</div>
            </div>
            {/* Right Side Content */}
            <Right_Tab />
          </React.Fragment>
        </AuthProvider>
      </body>
    </html>
  );
}
