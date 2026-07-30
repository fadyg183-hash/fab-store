"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function EditProductPage() {
const { id } = useParams();
const router = useRouter();

const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [image, setImage] = useState("");
const [available, setAvailable] = useState(true);

const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [error, setError] = useState("");

useEffect(() => {
if (id) {
checkUser();
}
}, [id]);

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

loadProduct();

}

async function loadProduct() {
const { data, error } = await supabase
.from("products")
.select("*")
.eq("id", id)
.single();

if (error) {
  console.error(error);
  setError("لم يتم العثور على المنتج");
  setLoading(false);
  return;
}

setName(data.name || "");
setDescription(data.description || "");
setPrice(data.price?.toString() || "");
setImage(data.image || "");
setAvailable(data.available ?? true);

setLoading(false);

}

async function handleSubmit(e: React.FormEvent) {
e.preventDefault();

setError("");

if (!name.trim()) {
  setError("من فضلك اكتب اسم المنتج");
  return;
}

if (!price || Number(price) <= 0) {
  setError("من فضلك اكتب سعر صحيح");
  return;
}

if (!image.trim()) {
  setError("من فضلك أضف رابط صورة المنتج");
  return;
}

setSaving(true);

const { data, error } = await supabase
  .from("products")
  .update({
    name: name.trim(),
    description: description.trim(),
    price: Number(price),
    image: image.trim(),
    available,
  })
  .eq("id", id)
  .select()
  .single();

if (error) {
  console.error("PRODUCT UPDATE ERROR");
  console.error("message:", error.message);
  console.error("details:", error.details);
  console.error("hint:", error.hint);
  console.error("code:", error.code);

  setError(error.message || "حصل خطأ أثناء تعديل المنتج");
  setSaving(false);
  return;
}

console.log("PRODUCT UPDATED SUCCESSFULLY:", data);

router.push("/admin/products");

}

if (loading) {
return ( <main className="min-h-screen bg-gray-100 p-10"> <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-center shadow"> <p className="text-xl font-bold text-black">
جاري تحميل بيانات المنتج... </p> </div> </main>
);
}

return ( <main className="min-h-screen bg-gray-100 p-10"> <div className="mx-auto max-w-3xl">

```
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-4xl font-bold text-orange-600">
        تعديل المنتج
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
          className="w-full rounded-xl border border-gray-300 p-4 text-black outline-none focus:border-orange-500"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-bold text-black">
          رابط صورة المنتج
        </label>

        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-xl border border-gray-300 p-4 text-black outline-none focus:border-orange-500"
        />
      </div>

      {image && (
        <div className="mb-6">
          <p className="mb-2 font-bold text-black">
            معاينة الصورة
          </p>

          <img
            src={image}
            alt={name}
            className="h-32 w-32 rounded-xl object-cover"
          />
        </div>
      )}

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
        disabled={saving}
        className="w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {saving ? "جاري حفظ التعديلات..." : "💾 حفظ التعديلات"}
      </button>

    </form>
  </div>
</main>
);
}
