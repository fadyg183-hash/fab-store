"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function closeMenu() {
    setMenuOpen(false);
  }

function scrollToSection(id: string) {
  setMenuOpen(false);

  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}
    
useEffect(() => {
  function handleCartItemAdded(event: Event) {
    const customEvent = event as CustomEvent<{
      image: string;
      sourceElement: HTMLElement;
    }>;

    const sourceElement = customEvent.detail?.sourceElement;
    const image = customEvent.detail?.image;

    setCartBounce(true);

    setTimeout(() => {
      setCartBounce(false);
    }, 600);

    if (!sourceElement || !image) return;

    const cartButtons = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-cart-button]"
      )
    );

    const target = cartButtons.find((button) => {
      const rect = button.getBoundingClientRect();

      return rect.width > 0 && rect.height > 0;
    });

    if (!target) return;

    const sourceRect = sourceElement.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const flyingImage = document.createElement("img");

    flyingImage.src = image;
    flyingImage.alt = "";

    Object.assign(flyingImage.style, {
      position: "fixed",
      left: `${sourceRect.left}px`,
      top: `${sourceRect.top}px`,
      width: "70px",
      height: "70px",
      objectFit: "cover",
      borderRadius: "16px",
      zIndex: "999999",
      pointerEvents: "none",
      boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    });

    document.body.appendChild(flyingImage);

    const x =
      targetRect.left +
      targetRect.width / 2 -
      sourceRect.left -
      35;

    const y =
      targetRect.top +
      targetRect.height / 2 -
      sourceRect.top -
      35;

    const animation = flyingImage.animate(
      [
        {
          transform: "translate(0, 0) scale(1)",
          opacity: 1,
        },
        {
          transform: `translate(${x * 0.5}px, ${y * 0.5}px) scale(0.7)`,
          opacity: 0.9,
        },
        {
          transform: `translate(${x}px, ${y}px) scale(0.15)`,
          opacity: 0,
        },
      ],
      {
        duration: 650,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      }
    );

    
     const cartSound = new Audio("/sounds/audiomass-output.mp3");
cartSound.volume = 0.70;
cartSound.play().catch(() => {});

animation.onfinish = () => {
  flyingImage.remove();
};
} 

  window.addEventListener(
    "cart:item-added",
    handleCartItemAdded
  );

  return () => {
    window.removeEventListener(
      "cart:item-added",
      handleCartItemAdded
    );
  };

}, []);

  useEffect(() => {
  function handleCartItemAdded() {
    setCartBounce(true);

    setTimeout(() => {
      setCartBounce(false);
    }, 600);
  }

  window.addEventListener(
    "cart:item-added",
    handleCartItemAdded
  );

  return () => {
    window.removeEventListener(
      "cart:item-added",
      handleCartItemAdded
    );
  };
}, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-[#111111]/95 shadow-lg backdrop-blur-md">

      {/* Navbar Main */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="shrink-0"
        >
          <Image
            src="/fab-logo.jpeg"
            alt="FAB Logo"
            width={120}
            height={50}
            priority
            className="h-auto w-[90px] rounded-2xl object-contain transition duration-300 hover:scale-105 sm:w-[105px] md:w-[120px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 font-medium text-gray-300 md:flex">

          <Link
            href="/"
            className="transition duration-200 hover:text-white"
          >
            الرئيسية
          </Link>

          <Link
            href="/#products"
            className="transition duration-200 hover:text-white"
          >
            المنتجات
          </Link>

          <Link
            href="/#about"
            className="transition duration-200 hover:text-white"
          >
            من نحن
          </Link>

          <Link
            href="/#contact"
            className="transition duration-200 hover:text-white"
          >
            تواصل معنا
          </Link>

        </div>

        {/* Desktop Cart */}
        <div className="hidden md:flex">
          <Link
  href="/cart"
  data-cart-button
  className={`rounded-full bg-white px-6 py-2.5 font-bold text-black shadow-md transition duration-300 hover:scale-105 hover:bg-gray-200 ${
    cartBounce ? "animate-bounce" : ""
  }`}
>
            🛒 السلة ({totalItems})
          </Link>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-2 md:hidden">

          {/* Mobile Cart */}
          <Link
  href="/cart"
  data-cart-button
  aria-label="السلة"
  className={`flex min-h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-bold text-black shadow-md transition active:scale-95 ${
    cartBounce ? "animate-bounce" : ""
  }`}
>
            🛒 {totalItems}
          </Link>

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-bold text-black shadow-md transition active:scale-95"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-800 bg-[#111111] px-4 py-4 shadow-2xl md:hidden">

          <div className="mx-auto max-w-7xl space-y-1">

            <Link
              href="/"
              onClick={closeMenu}
              className="flex min-h-12 items-center rounded-xl px-4 py-3 font-semibold text-gray-200 transition hover:bg-[#242424] hover:text-white"
            >
              🏠
              <span className="mr-3">الرئيسية</span>
            </Link>

            <button
              type="button"
              onClick={() => scrollToSection("products")}
              className="flex min-h-12 w-full items-center rounded-xl px-4 py-3 text-right font-semibold text-gray-200 transition hover:bg-[#242424] hover:text-white"
            >
              🛍️
              <span className="mr-3">المنتجات</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("about")}
              className="flex min-h-12 w-full items-center rounded-xl px-4 py-3 text-right font-semibold text-gray-200 transition hover:bg-[#242424] hover:text-white"
            >
              ℹ️
              <span className="mr-3">من نحن</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="flex min-h-12 w-full items-center rounded-xl px-4 py-3 text-right font-semibold text-gray-200 transition hover:bg-[#242424] hover:text-white"
            >
              📞
              <span className="mr-3">تواصل معنا</span>
            </button>

            {/* Mobile Cart inside Menu */}
            <Link
              href="/cart"
              onClick={closeMenu}
              className="mt-2 flex min-h-12 items-center rounded-xl bg-white px-4 py-3 font-bold text-black transition hover:bg-gray-200"
            >
              🛒
              <span className="mr-3">
                السلة ({totalItems})
              </span>
            </Link>

          </div>
        </div>
      )}

    </nav>
  );
}