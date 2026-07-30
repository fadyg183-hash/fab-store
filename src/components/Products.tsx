"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";

type Product = {
id: number;
name: string;
description: string;
price: number;
image: string;
available: boolean;
featured: boolean;
};

export default function Products() {
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

async function loadProducts() {
try {
const { data, error } = await supabase
.from("products")
.select("*")
.order("id");

  if (error) throw error;

  setProducts(data || []);
} catch (err) {
  console.error("LOAD PRODUCTS ERROR:", err);
} finally {
  setLoading(false);
}

}

useEffect(() => {
// تحميل المنتجات أول مرة
loadProducts();

// الاستماع لأي تغيير لحظي في المنتجات
const channel = supabase
  .channel("products-store-realtime")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "products",
    },
    (payload) => {
      console.log("PRODUCT REALTIME UPDATE:", payload);

      // إضافة منتج جديد
      if (payload.eventType === "INSERT") {
        const newProduct = payload.new as Product;

        setProducts((current) => {
          const exists = current.some(
            (product) => product.id === newProduct.id
          );

          if (exists) return current;

          return [...current, newProduct].sort(
            (a, b) => a.id - b.id
          );
        });
      }

      // تعديل منتج
      if (payload.eventType === "UPDATE") {
        const updatedProduct = payload.new as Product;

        setProducts((current) =>
          current
            .map((product) =>
              product.id === updatedProduct.id
                ? updatedProduct
                : product
            )
            .sort((a, b) => a.id - b.id)
        );
      }

      // حذف منتج
      if (payload.eventType === "DELETE") {
        const deletedProduct = payload.old as Product;

        setProducts((current) =>
          current.filter(
            (product) => product.id !== deletedProduct.id
          )
        );
      }
    }
  )
  .subscribe((status) => {
    console.log("PRODUCT REALTIME STATUS:", status);
  });

// تنظيف الاشتراك عند مغادرة الصفحة
return () => {
  supabase.removeChannel(channel);
};

}, []);

if (loading) {
return ( <section className="bg-gray-100 px-6 py-24 text-center dark:bg-gray-950"> <p className="text-lg text-gray-600 dark:text-gray-300">
جاري تحميل منتجات FAB... </p> </section>
);
}

if (products.length === 0) {
return ( <section className="bg-gray-100 px-6 py-24 text-center dark:bg-gray-950"> <h2 className="text-4xl font-bold text-black dark:text-white">
منتجات FAB </h2>

    <p className="mt-4 text-gray-600 dark:text-gray-300">
      لا توجد منتجات متاحة حالياً، تابعنا لمعرفة الجديد.
    </p>
  </section>
);

}

return ( <section
   id="products"
   className="bg-gray-100 px-6 py-24 text-black dark:bg-gray-950 dark:text-white"
 > <div className="mx-auto max-w-7xl">

    {/* Title */}
    <div className="mb-16 text-center">

      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        FAB Collection
      </p>

      <h2 className="text-4xl font-black md:text-5xl">
        منتجات FAB المميزة
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
        اكتشف مجموعة من التصميمات الجاهزة والمميزة،
        أو اطلب تصميمك الخاص ليتم تنفيذه بأعلى جودة.
      </p>

    </div>

    {/* Products Grid */}
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}

    </div>

  </div>
</section>

);
}
