"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 text-center">
        © {new Date().getFullYear()} FAB. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}

      <main>{children}</main>

      {!isAdmin && <Footer />}
    </>
  );
}