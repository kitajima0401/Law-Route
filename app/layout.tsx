import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {AppRouterCacheProvider} from "@mui/material-nextjs/v15-appRouter"
import { Roboto } from 'next/font/google';
import QueryProvider from "./components/QueryProvider";


export const metadata: Metadata = {
  title: "Law Route",
  description: "法令を検索アプリ司法試験予備試験",
};
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={roboto.className}>
        <AppRouterCacheProvider>
          <QueryProvider>
            <Header/>
              {children}
            <ToastContainer/>
          </QueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
