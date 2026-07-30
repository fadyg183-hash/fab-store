"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function OrderDetailsPage() {
const { id } = useParams();
const router = useRouter();
const [trackingNumber, setTrackingNumber] = useState("");
const [shippingCompany, setShippingCompany] = useState("");
const [saving, setSaving] = useState(false);
const [order, setOrder] = useState<any>(null);
const [items, setItems] = useState<any[]>([]);

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
  router.push("/login");
  return;
}

const { data: isAdmin, error } = await supabase.rpc("is_admin");

if (error || !isAdmin) {
  await supabase.auth.signOut();
  router.push("/login");
  return;
}

loadOrder();

}

async function saveShipping() {
  setSaving(true);

  const { error } = await supabase
    .from("orders")
    .update({
      tracking_number: trackingNumber,
      shipping_company: shippingCompany,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("حدث خطأ أثناء حفظ بيانات الشحنة");
    setSaving(false);
    return;
  }

  alert("تم حفظ بيانات الشحنة ✅");

  await loadOrder();

  setSaving(false);
}

async function loadOrder() {
const { data, error } = await supabase
.from("orders")
.select("*")
.eq("id", id)
.single();

if (error) {
  console.error(error);
  return;
}

setOrder(data);
setTrackingNumber(data.tracking_number || "");
setShippingCompany(data.shipping_company || "");

const { data: itemsData, error: itemsError } = await supabase
  .from("order_items")
  .select("*")
  .eq("order_id", id);

console.log("CURRENT ORDER ID:", id);
console.log("ORDER ITEMS RESULT:", itemsData);
console.log("ORDER ITEMS ERROR:", itemsError);

if (itemsError) {
  console.error(itemsError);
} else {
  setItems(itemsData || []);
}

}

if (!order) {
return ( <main className="min-h-screen bg-gray-100 p-10 text-black"> <h1 className="text-2xl font-bold">جاري تحميل الطلب...</h1> </main>
);
}

return ( <main className="min-h-screen bg-gray-100 p-10"> <h1 className="mb-8 text-4xl font-bold text-orange-600">
تفاصيل الطلب #{order.order_number} </h1>

  <div className="space-y-4 rounded-xl bg-white p-6 text-black shadow">

    <p>
      <strong>اسم العميل:</strong> {order.customer_name}
    </p>

    <p>
      <strong>رقم الهاتف:</strong> {order.phone}
    </p>

    <p>
      <strong>العنوان:</strong> {order.address}
    </p>

    <p>
      <strong>إجمالي الطلب:</strong> {order.total_price} جنيه
    </p>

    <p>
      <strong>الحالة:</strong> {order.status}
    </p>

    {(order.status === "تم الشحن" || order.status === "مكتمل") && (
    <div className="mt-6 rounded-xl border p-5">

  <h2 className="mb-4 text-xl font-bold">
    بيانات الشحنة
  </h2>

  <input
    type="text"
    placeholder="شركة الشحن"
    value={shippingCompany}
    onChange={(e) => setShippingCompany(e.target.value)}
    className="mb-3 w-full rounded-lg border p-3"
  />

  <input
    type="text"
    placeholder="رقم الشحنة"
    value={trackingNumber}
    onChange={(e) => setTrackingNumber(e.target.value)}
    className="mb-4 w-full rounded-lg border p-3"
  />

  <button
    onClick={saveShipping}
    disabled={saving}
    className="rounded-lg bg-orange-600 px-5 py-3 font-bold text-white"
  >
    {saving ? "جاري الحفظ..." : "💾 حفظ بيانات الشحنة"}
  </button>

</div>

)}

    <hr className="my-6" />

    <h2 className="mb-4 text-2xl font-bold text-black">
      المنتجات
    </h2>

    <div className="overflow-x-auto">
      <table className="w-full border text-black">
        <thead className="bg-orange-600 text-white">
          <tr>
            <th className="p-3">المنتج</th>
            <th className="p-3">الكمية</th>
            <th className="p-3">السعر</th>
            <th className="p-3">الإجمالي</th>
          </tr>
        </thead>

        <tbody className="text-black">
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-b text-center"
            >
              <td className="p-3">
                {item.product_name}
              </td>

              <td className="p-3">
                {item.quantity}
              </td>

              <td className="p-3">
                {item.price} جنيه
              </td>

              <td className="p-3">
                {item.price * item.quantity} جنيه
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>

</main>
);
}
