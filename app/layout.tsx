import type { Metadata } from "next";
import { Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/layout/sidebar";
import { TodosProvider } from "@/hooks/Todo/TodoItem";
import { DaysLeftProvider } from "@/hooks/Todo/useTodoDateConversion";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fluxis | LifeOS",
  description: "A versatile platform to manage your life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${geistMono.variable}  font-mono antialiased`}
      >
        <SideBar />
        <main id="main-content" className="transition-all">
          <DaysLeftProvider>
            <TodosProvider>{children}</TodosProvider>
          </DaysLeftProvider>
        </main>
      </body>
    </html>
  );
}
