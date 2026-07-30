"use client";

import Link from "next/link";

export default function OrderSuccessPage() {
return ( <main className="flex min-h-screen items-center justify-center px-6 py-12"> <div className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-lg dark:border-gray-700 dark:bg-gray-900"> <div className="mb-6 text-6xl">
🎉 </div>

```
    <h1 className="mb-4 text-3xl font-bold text-green-600">
      تم استلام طلبك بنجاح!
    </h1>

    <p className="mb-10 text-lg text-gray-600 dark:text-gray-300">
      شكرًا لطلبك من FAB.
      <br />
      سنقوم بمراجعة الطلب والتواصل معك لتأكيد التفاصيل.
    </p>

    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
      <Link
        href="/"
        className="rounded-xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-gray-800"
      >
        🏠 العودة للرئيسية
      </Link>

      <Link
        href="/#products"
        className="rounded-xl border border-gray-300 bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      >
        🛍️ تصفح المنتجات
      </Link>
    </div>
  </div>
</main>
);
}
