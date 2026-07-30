"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function NewProductPage() {
const router = useRouter();

const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [image, setImage] = useState("");
const [available, setAvailable] = useState(true);

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

useEffect(() => {
checkUser();
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

}

async function handleSubmit(e: React.FormEvent) {
e.preventDefault();

setError("");

if (!name.trim()) {
  setError("اكتب اسم المنتج");
  return;
}

if (!price || Number(price) <= 0) {
  setError("اكتب سعر صحيح");
  return;
}

setLoading(true);

const { error } = await supabase.from("products").insert([
  {
    name: name.trim(),
    description: description.trim(),
    price: Number(price),
    image: image.trim(),
    available,
    featured: false,
  },
]);

if (error) {
  console.error("PRODUCT INSERT ERROR");
  console.error("message:", error.message);
  console.error("details:", error.details);
  console.error("hint:", error.hint);
  console.error("code:", error.code);

  setError(
    error.message ||
      error.details ||
      error.hint ||
      "حصل خطأ أثناء حفظ المنتج"
  );

  setLoading(false);
  return;
}

router.push("/admin/products");

}

return ( <main className="min-h-screen bg-gray-100 p-10"> <div className="mx-auto max-w-3xl">


    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-4xl font-bold text-orange-600">
        إضافة منتج جديد
      </h1>

      <Link
        href="/admin/products"
        className="rounded-xl bg-black px-5 py-3 font-bold text-white hover:bg-gray-800"
      >
        ← العودة للمنتجات
      </Link>
    </div>

    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-8 shadow"
    >

      <div className="mb-6">
        <label className="mb-2 block font-bold text-black">
          اسم المنتج
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مثال: ساعة FAB"
          className="w-full rounded-xl border border-gray-300 p-4 text-black outline-none focus:border-orange-500"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-bold text-black">
          وصف المنتج
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="اكتب وصف المنتج..."
          rows={5}
          className="w-full rounded-xl border border-gray-300 p-4 text-black outline-none focus:border-orange-500"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-bold text-black">
          السعر
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="مثال: 800"
          className="w-full rounded-xl border border-gray-300 p-4 text-black outline-none focus:border-orange-500"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-bold text-black">
          رابط الصورة
        </label>

        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-xl border border-gray-300 p-4 text-black outline-none focus:border-orange-500"
        />
      </div>

      <div className="mb-8 flex items-center gap-3">
        <input
          type="checkbox"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
          className="h-5 w-5 accent-orange-600"
        />

        <label className="font-bold text-black">
          المنتج متاح للبيع
        </label>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-100 p-4 font-bold text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-orange-600 px-6 py-4 text-lg font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading ? "جاري حفظ المنتج..." : "💾 حفظ المنتج"}
      </button>

    </form>
  </div>
</main>
);
}