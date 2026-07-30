import type { Metadata } from "next";
import "./globals.css";
import LayoutContent from "@/components/LayoutContent";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "FAB | طباعة ثلاثية الأبعاد وتصميمات مخصصة",
  description:
    "FAB للطباعة ثلاثية الأبعاد والتصميم حسب الطلب. حوّل فكرتك إلى منتج حقيقي بجودة عالية وتصميم مميز.",
  keywords: [
    "FAB",
    "3D Printing",
    "طباعة ثلاثية الأبعاد",
    "طباعة 3D",
    "تصميمات 3D",
    "طباعة حسب الطلب",
    "منتجات 3D",
    "3D Printing Egypt",
  ],
  authors: [{ name: "FAB" }],
  creator: "FAB",
  publisher: "FAB",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "FAB | 3D Printing & Custom Designs",
    description:
      "حوّل أفكارك إلى منتجات ومجسمات ثلاثية الأبعاد مع FAB.",
    type: "website",
    locale: "ar_EG",
    siteName: "FAB",
  },
};

function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">

          {/* FAB */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-black tracking-tight">
              FAB
            </h2>

            <p className="mt-4 max-w-md leading-7 text-gray-400">
              نحول أفكارك إلى منتجات ومجسمات ثلاثية الأبعاد
              بتصميمات مميزة وجودة عالية.
            </p>

            <p className="mt-5 text-sm font-semibold text-gray-300">
              Print Your Ideas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold">
              روابط سريعة
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-gray-400">

              <a
                href="/"
                className="transition hover:text-white"
              >
                الرئيسية
              </a>

              <a
                href="/#products"
                className="transition hover:text-white"
              >
                المنتجات
              </a>

              <a
                href="/#about"
                className="transition hover:text-white"
              >
                من نحن
              </a>

              <a
                href="/#contact"
                className="transition hover:text-white"
              >
                تواصل معنا
              </a>

              <a
                href="/cart"
                className="transition hover:text-white"
              >
                🛒 السلة
              </a>

              <a
                href="/privacy"
                className="transition hover:text-white"
              >
               🔒 سياسة الخصوصية
              </a>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold">
              تواصل معنا
            </h3>

            <div className="mt-5 flex flex-col gap-4 text-gray-400">

              <a
                href="https://wa.me/201201824010"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                📱 WhatsApp
              </a>

              <a
                href="tel:+201201824010"
                className="transition hover:text-white"
              >
                📞 +20 120 182 4010
              </a>

              <a
                href="mailto:amirgeorge1211@gmail.com"
                className="break-all transition hover:text-white"
              >
                📧 amirgeorge1211@gmail.com
              </a>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-500 md:flex-row">

            <p>
              © {new Date().getFullYear()} FAB. جميع الحقوق محفوظة.
            </p>

            <p>
              3D Printing & Custom Designs
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-white text-black antialiased dark:bg-gray-950 dark:text-white">

        <CartProvider>

  <LayoutContent>
    {children}
  </LayoutContent>

</CartProvider>

      </body>
    </html>
  );
}