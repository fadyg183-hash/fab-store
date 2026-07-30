"use client";

import { useCart } from "@/context/CartContext";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
};

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => {
        if (product.available) {
          addToCart(product);
        }
      }}
      disabled={!product.available}
      className={`mt-10 w-full rounded-xl py-4 text-lg font-bold transition duration-300 ${
        product.available
          ? "bg-white text-black hover:bg-gray-200"
          : "cursor-not-allowed bg-red-600 text-white"
      }`}
    >
      {product.available
        ? "🛒 أضف إلى السلة"
        : "❌ غير متوفر"}
    </button>
  );
}