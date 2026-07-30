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

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function loadFeaturedProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .eq("available", true)
        .order("id");

      if (error) {
        console.error("FEATURED PRODUCTS ERROR:", error);
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error("FEATURED PRODUCTS CATCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  // تحميل المنتجات المميزة أول مرة
  loadFeaturedProducts();

  // تحديث لحظي لأي تغيير في المنتجات
  const channel = supabase
    .channel("featured-products-realtime")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "products",
      },
      (payload) => {
        console.log("FEATURED REALTIME UPDATE:", payload);

        // إضافة منتج
        if (payload.eventType === "INSERT") {
          const newProduct = payload.new as Product;

          if (newProduct.featured && newProduct.available) {
            setProducts((current) => {
              if (current.some((p) => p.id === newProduct.id)) {
                return current;
              }

              return [...current, newProduct].sort(
                (a, b) => a.id - b.id
              );
            });
          }
        }

        // تعديل منتج
        if (payload.eventType === "UPDATE") {
          const updatedProduct = payload.new as Product;

          setProducts((current) => {
            // لو بقى مميز ومتاح → يظهر
            if (
              updatedProduct.featured &&
              updatedProduct.available
            ) {
              const exists = current.some(
                (p) => p.id === updatedProduct.id
              );

              if (exists) {
                return current
                  .map((p) =>
                    p.id === updatedProduct.id
                      ? updatedProduct
                      : p
                  )
                  .sort((a, b) => a.id - b.id);
              }

              return [...current, updatedProduct].sort(
                (a, b) => a.id - b.id
              );
            }

            // لو اتشال منه مميز أو بقى غير متاح → يختفي
            return current.filter(
              (p) => p.id !== updatedProduct.id
            );
          });
        }

        // حذف منتج
        if (payload.eventType === "DELETE") {
          const deletedProduct = payload.old as Product;

          setProducts((current) =>
            current.filter(
              (p) => p.id !== deletedProduct.id
            )
          );
        }
      }
    )
    .subscribe((status) => {
      console.log("FEATURED REALTIME STATUS:", status);
    });

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  if (loading) {
    return (
      <section className="bg-gray-100 px-6 py-24 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black dark:border-gray-700 dark:border-t-white" />

          <p className="text-lg text-gray-600 dark:text-gray-300">
            جاري تحميل المنتجات المميزة...
          </p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section
      id="featured"
      className="relative overflow-hidden bg-gradient-to-b from-gray-100 via-white to-gray-100 px-6 py-24 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-14 text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-sm font-bold text-yellow-700 dark:text-yellow-300">
            <span>⭐</span>
            <span>اختيارات FAB</span>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-black dark:text-white md:text-5xl">
            منتجات مميزة
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            اختارنا لك مجموعة من منتجات FAB المميزة،
            بتصميمات مختلفة وجودة عالية وجاهزة للطلب.
          </p>

          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-yellow-400" />
        </div>

        {/* Featured Products */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative transition duration-300 hover:-translate-y-1"
            >
              {/* Featured Badge */}
              <div className="absolute right-4 top-4 z-10 rounded-full bg-yellow-400 px-3 py-1.5 text-sm font-bold text-black shadow-lg">
                ⭐ مميز
              </div>

              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}