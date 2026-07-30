"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [updatingFeaturedId, setUpdatingFeaturedId] = useState<number | null>(null);

  useEffect(() => {
  checkUser();

  const channel = supabase
    .channel("admin-products-realtime")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "products",
      },
      () => {
        loadProducts();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  async function checkUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = "/login";
    return;
  }

  const { data: isAdmin, error } = await supabase.rpc("is_admin");

  if (error || !isAdmin) {
    await supabase.auth.signOut();
    window.location.href = "/login";
    return;
  }

  loadProducts();
}

async function loadProducts() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id");

    if (error) {
      alert("ERROR: " + error.message);
      console.error(error);
      return;
    }

    setProducts(data || []);
  } catch (e) {
    alert("CATCH ERROR");
    console.error(e);
  }
}

async function toggleAvailability(
  id: number,
  currentAvailable: boolean
) {
  setUpdatingId(id);

  const { error } = await supabase
    .from("products")
    .update({
      available: !currentAvailable,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("حصل خطأ أثناء تغيير حالة المنتج");
    setUpdatingId(null);
    return;
  }

  setProducts((currentProducts) =>
    currentProducts.map((product) =>
      product.id === id
        ? {
            ...product,
            available: !currentAvailable,
          }
        : product
    )
  );

  setUpdatingId(null);
}

  async function toggleFeatured(
  id: number,
  currentFeatured: boolean
) {
  setUpdatingFeaturedId(id);

  const { error } = await supabase
    .from("products")
    .update({
      featured: !currentFeatured,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("حصل خطأ أثناء تغيير حالة المنتج المميز");
    setUpdatingFeaturedId(null);
    return;
  }

  setProducts((currentProducts) =>
    currentProducts.map((product) =>
      product.id === id
        ? {
            ...product,
            featured: !currentFeatured,
          }
        : product
    )
  );

  setUpdatingFeaturedId(null);
}

  async function deleteProduct(id: number) {
  const confirmed = window.confirm(
    "هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء."
  );

  if (!confirmed) {
    return;
  }

  setDeletingId(id);

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("DELETE PRODUCT ERROR");
    console.error("message:", error.message);
    console.error("details:", error.details);
    console.error("hint:", error.hint);
    console.error("code:", error.code);

    alert(`فشل حذف المنتج:\n\n${error.message}`);

    setDeletingId(null);
    return;
  }

  const { data: deletedProduct, error: checkError } = await supabase
    .from("products")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (checkError) {
    console.error("CHECK DELETE ERROR:", checkError);
  }

  if (deletedProduct) {
    console.error(
      "PRODUCT WAS NOT DELETED FROM DATABASE:",
      deletedProduct
    );

    alert("المنتج لم يتم حذفه من قاعدة البيانات.");

    setDeletingId(null);
    return;
  }

  setProducts((currentProducts) =>
    currentProducts.filter((product) => product.id !== id)
  );

  setDeletingId(null);

  alert("تم حذف المنتج بنجاح ✅");
}

    

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-orange-600">
          إدارة المنتجات
        </h1>

        <Link
          href="/admin/products/new"
          className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
        >
          ➕ إضافة منتج
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="w-full text-center text-black">

          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="p-4">الصورة</th>
              <th className="p-4">الاسم</th>
              <th className="p-4">السعر</th>
              <th className="p-4">متاح</th>
              <th className="p-4">⭐ مميز</th>
              <th className="p-4">تعديل</th>
              <th className="p-4">حذف</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b"
              >

                <td className="p-4">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="mx-auto h-16 w-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-gray-200 text-2xl">
                      📦
                    </div>
                  )}
                </td>

                <td className="p-4 font-bold">
                  {product.name}
                </td>

                <td className="p-4">
                  {product.price} جنيه
                </td>

                <td className="p-4">
  <button
    onClick={() =>
      toggleAvailability(product.id, product.available)
    }
    disabled={updatingId === product.id}
    className={`rounded-lg px-4 py-2 font-bold text-white transition ${
      product.available
        ? "bg-green-600 hover:bg-green-700"
        : "bg-gray-500 hover:bg-gray-600"
    } disabled:cursor-not-allowed disabled:bg-gray-400`}
  >
    {updatingId === product.id
      ? "جاري التغيير..."
      : product.available
      ? "✅ متاح"
      : "❌ غير متاح"}
  </button>
</td>

<td className="p-4">
  <button
    onClick={() =>
      toggleFeatured(product.id, product.featured)
    }
    disabled={updatingFeaturedId === product.id}
    className={`rounded-lg px-4 py-2 font-bold text-white transition ${
      product.featured
        ? "bg-yellow-500 hover:bg-yellow-600"
        : "bg-gray-500 hover:bg-gray-600"
    } disabled:cursor-not-allowed disabled:bg-gray-400`}
  >
    {updatingFeaturedId === product.id
      ? "جاري..."
      : product.featured
      ? "⭐ مميز"
      : "☆ عادي"}
  </button>
</td>

                <td className="p-4">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="inline-block rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  >
                    ✏️ تعديل
                  </Link>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => deleteProduct(product.id)}
                    disabled={deletingId === product.id}
                    className="rounded-lg bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {deletingId === product.id ? "جاري الحذف..." : "🗑️ حذف"}
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </main>
  );
}