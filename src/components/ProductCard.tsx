"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type Product = {
id: number;
name: string;
description: string;
price: number;
image: string;
available: boolean;
featured: boolean;
};

export default function ProductCard({
product,
}: {
product: Product;
}) {
const { addToCart } = useCart();

const isAvailable = product.available;
const isFeatured = product.featured;

return ( <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">

  {/* Image */}
  <Link href={`/product/${product.id}`}>
    <div className="overflow-hidden">
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
      />
    </div>
  </Link>

  {/* Content */}
  <div className="p-6">

    {/* Name */}
    <Link href={`/product/${product.id}`}>
      <h3 className="line-clamp-1 cursor-pointer text-2xl font-extrabold text-black transition hover:text-gray-600 dark:text-white dark:hover:text-gray-300">
        {product.name}
      </h3>
    </Link>

    {/* Featured */}
    {isFeatured && (
      <span className="mt-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">
        ⭐ منتج مميز
      </span>
    )}

    {/* Description */}
    <p className="mt-3 line-clamp-2 min-h-[50px] text-gray-600 dark:text-gray-300">
      {product.description}
    </p>

    {/* Price + Availability */}
    <div className="mt-6 flex items-center justify-between">

      <span className="text-2xl font-black text-black dark:text-white">
        {product.price} جنيه
      </span>

      {isAvailable ? (
        <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-bold text-green-700 dark:bg-green-900/40 dark:text-green-300">
          ✅ متوفر
        </span>
      ) : (
        <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-bold text-red-700 dark:bg-red-900/40 dark:text-red-300">
          ❌ غير متوفر
        </span>
      )}

    </div>

    {/* Add to Cart */}
    <button
      onClick={(e) => {
  if (!isAvailable) return;

  addToCart(product);

  window.dispatchEvent(
    new CustomEvent("cart:item-added", {
      detail: {
        image: product.image,
        sourceElement: e.currentTarget,
      },
    })
  );

  // هزة بسيطة للموبايل
  if ("vibrate" in navigator) {
    navigator.vibrate(40);
  }

  // صوت خفيف
  try {
    const AudioContext =
      window.AudioContext ||
      (window as any).webkitAudioContext;

    if (AudioContext) {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(
        700,
        audioContext.currentTime
      );

      gainNode.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
      );

      gainNode.gain.exponentialRampToValueAtTime(
        0.06,
        audioContext.currentTime + 0.01
      );

      gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.12
      );

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.12);

      oscillator.onended = () => {
        audioContext.close();
      };
    }
  } catch {
    // لو الصوت غير مدعوم، الإضافة للسلة تستمر طبيعي
  }
}}
      disabled={!isAvailable}
      className={`mt-7 w-full rounded-2xl py-4 text-lg font-bold transition duration-300 ${
        isAvailable
          ? "bg-black text-white hover:scale-[1.03] hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          : "cursor-not-allowed bg-red-600 text-white"
      }`}
    >
      {isAvailable
        ? "🛒 أضف إلى السلة"
        : "❌ غير متوفر"}
    </button>

  </div>

</div>

);
}
