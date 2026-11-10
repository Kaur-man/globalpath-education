import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

export const metadata: Metadata = {
  title: "Global Expert Immigration Consultants | Study Abroad & Visa Guidance",
  description:
    "Make your study abroad and visa journey simpler with experienced, personalised guidance from counselling and course selection to applications and the next step towards your international future.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
