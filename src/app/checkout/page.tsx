"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
const { cart, clearCart } = useCart();
const router = useRouter();

const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState<"error" | "success" | "">("");

const [customer, setCustomer] = useState({
name: "",
phone: "",
address: "",
notes: "",
});

const totalPrice = cart.reduce(
(total, item) => total + item.price * item.quantity,
0
);

async function handleSubmit() {
if (!customer.name.trim()) {
setMessage("⚠️ من فضلك اكتب الاسم الكامل");
setMessageType("error");
return;
}

if (!customer.phone.trim()) {
  setMessage("⚠️ من فضلك اكتب رقم الهاتف");
  setMessageType("error");
  return;
}

if (!customer.address.trim()) {
  setMessage("⚠️ من فضلك اكتب العنوان");
  setMessageType("error");
  return;
}

if (!/^\d+$/.test(customer.phone)) {
  setMessage("⚠️ رقم الهاتف يجب أن يحتوي على أرقام فقط");
  setMessageType("error");
  return;
}

setLoading(true);
setMessage("");

try {
  const { data: order, error } = await supabase.rpc("create_order", {
  p_customer_name: customer.name.trim(),
  p_phone: customer.phone,
  p_address: customer.address.trim(),
  p_notes: customer.notes.trim(),
  p_items: cart.map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
  })),
});

if (error) {
  throw error;
}

if (!order) {
  throw new Error("لم يتم إنشاء الطلب");
}

clearCart();

setMessage("✅ تم إرسال طلبك بنجاح! شكرًا لطلبك من FAB.");
setMessageType("success");

router.push("/order-success");
} catch (err: any) {
  console.log("FULL ERROR:", JSON.stringify(err, null, 2));
  console.log("ERROR OBJECT:", err);
  console.log("ERROR MESSAGE:", err?.message);
  console.log("ERROR DETAILS:", err?.details);
  console.log("ERROR HINT:", err?.hint);
  console.log("ERROR CODE:", err?.code);

  setMessage(
    err?.message ??
      err?.error_description ??
      "❌ حدث خطأ أثناء حفظ الطلب"
  );

  setMessageType("error");
} finally {
  setLoading(false);
}

}

return ( <main className="mx-auto min-h-screen max-w-6xl px-6 py-12"> <h1 className="mb-10 text-4xl font-bold text-orange-600">
إتمام الطلب 🛒 </h1>

  <div className="grid gap-10 md:grid-cols-2">
    <section className="rounded-3xl border border-gray-200 bg-white p-6 text-black shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white">
      <h2 className="mb-6 text-2xl font-bold">
        بيانات العميل
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="الاسم الكامل *"
          value={customer.name}
          onChange={(e) =>
            setCustomer({
              ...customer,
              name: e.target.value,
            })
          }
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder:text-gray-500 outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
        />

        <input
          type="tel"
          inputMode="numeric"
          placeholder="رقم الهاتف *"
          value={customer.phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");

            setCustomer({
              ...customer,
              phone: value,
            });
          }}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder:text-gray-500 outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
        />

        <textarea
          rows={4}
          placeholder="العنوان *"
          value={customer.address}
          onChange={(e) =>
            setCustomer({
              ...customer,
              address: e.target.value,
            })
          }
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder:text-gray-500 outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
        />

        <textarea
          rows={3}
          placeholder="ملاحظات (اختياري)"
          value={customer.notes}
          onChange={(e) =>
            setCustomer({
              ...customer,
              notes: e.target.value,
            })
          }
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder:text-gray-500 outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
        />
      </div>
    </section>

    <section className="rounded-3xl border border-gray-200 bg-gray-100 p-8 text-black shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white">
      <h2 className="mb-6 text-2xl font-bold">
        ملخص الطلب
      </h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b pb-3"
          >
            <span>
              {item.name} × {item.quantity}
            </span>

            <span className="font-bold">
              {item.price * item.quantity} جنيه
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 text-2xl font-bold">
        الإجمالي: {totalPrice} جنيه
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-black py-4 text-lg font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "جارٍ إرسال الطلب..." : "تأكيد الطلب"}
      </button>

      {message && (
        <div
          className={`mt-5 rounded-xl p-4 text-center font-bold ${
            messageType === "success"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {message}
        </div>
      )}
    </section>
  </div>
</main>
);
}
