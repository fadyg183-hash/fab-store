"use client";

import Image from "next/image";

export default function Hero() {
  function scrollToProducts() {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function customOrder() {
    window.open(
      "https://wa.me/201201824010?text=مرحبًا، أريد تنفيذ طلب طباعة ثلاثية الأبعاد مخصص.",
      "_blank"
    );
  }

  return (
    <section className="overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">

      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col-reverse items-center justify-center gap-10 px-5 py-12 sm:px-6 sm:py-16 md:flex-row md:justify-between md:gap-16 md:py-20">

        {/* Text Side */}
        <div className="w-full max-w-xl text-center md:text-left">

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 sm:text-sm">
            3D Printing & Custom Designs
          </p>

          <h1 className="text-6xl font-black tracking-tight text-black dark:text-white sm:text-7xl md:text-8xl">
            FAB
          </h1>

          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
            Print Your Ideas
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg sm:leading-8 md:mx-0">
            نحول أفكارك إلى منتجات ومجسمات ثلاثية الأبعاد بتصميمات
            مميزة وجودة عالية. اختر منتجك أو اطلب تصميمك الخاص مع FAB.
          </p>

          {/* Buttons */}
          <div className="mt-8 grid w-full gap-3 sm:flex sm:w-auto sm:justify-center md:justify-start">

            <button
              onClick={scrollToProducts}
              className="w-full rounded-full bg-black px-8 py-4 text-base font-bold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:bg-gray-800 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-gray-200 sm:w-auto sm:text-lg"
            >
              🛒 تسوق الآن
            </button>

            <button
              onClick={customOrder}
              className="w-full rounded-full border-2 border-black px-8 py-4 text-base font-bold text-black transition duration-300 hover:bg-black hover:text-white active:scale-95 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black sm:w-auto sm:text-lg"
            >
              ✨ طلب مخصص
            </button>

          </div>

          {/* Features */}
          <div className="mt-9 grid grid-cols-3 gap-3 border-t border-gray-300 pt-7 text-center dark:border-gray-700 md:justify-start md:text-left">

            <div>
              <p className="text-lg font-extrabold text-black dark:text-white sm:text-xl">
                جودة
              </p>
              <span className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                طباعة دقيقة
              </span>
            </div>

            <div className="border-x border-gray-300 dark:border-gray-700">
              <p className="text-lg font-extrabold text-black dark:text-white sm:text-xl">
                تصميم
              </p>
              <span className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                حسب فكرتك
              </span>
            </div>

            <div>
              <p className="text-lg font-extrabold text-black dark:text-white sm:text-xl">
                FAB
              </p>
              <span className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                احترافية
              </span>
            </div>

          </div>

        </div>

        {/* Logo Side */}
        <div className="flex w-full justify-center md:w-auto">

          <div className="relative">

            <div className="absolute inset-0 -z-0 rounded-full bg-gray-400/20 blur-3xl dark:bg-white/10" />

            <Image
              src="/fab-logo-2.jpeg"
              alt="FAB 3D Printing Logo"
              width={600}
              height={600}
              priority
              className="relative z-10 w-[220px] rounded-3xl object-contain shadow-2xl transition duration-500 hover:scale-105 sm:w-[320px] md:w-[500px]"
            />

          </div>

        </div>

      </div>

    </section>
  );
}