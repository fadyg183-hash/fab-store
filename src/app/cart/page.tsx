"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const router = useRouter();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">

      <h1 className="mb-10 text-4xl font-bold text-black dark:text-white">
        🛒 السلة
      </h1>

      {cart.length === 0 ? (
        <p className="text-lg text-gray-500 dark:text-gray-300">
          السلة فارغة.
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 md:flex-row"
              >

                <div className="flex items-center gap-6">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="rounded-xl object-cover"
                  />

                  <div>
                    <h2 className="text-2xl font-bold text-black dark:text-white">
                      {item.name}
                    </h2>

                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {item.price} جنيه
                    </p>

                    <p className="mt-2 font-semibold text-black dark:text-white">
                      الإجمالي: {item.price * item.quantity} جنيه
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xl text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  >
                    −
                  </button>

                  <span className="min-w-[30px] text-center text-xl font-bold text-black dark:text-white">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xl text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  🗑️ حذف
                </button>

              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-100 p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">

            <h2 className="text-3xl font-bold text-black dark:text-white">
              إجمالي الطلب: {totalPrice} جنيه
            </h2>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
              الشحن سيتم حسابه عند إتمام الطلب.
            </p>

            <button
              onClick={() => router.push("/checkout")}
              className="mt-6 w-full rounded-xl bg-black py-4 text-lg font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              إتمام الطلب
            </button>

          </div>
        </>
      )}
    </main>
  );
}