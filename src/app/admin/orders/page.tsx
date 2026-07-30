"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function OrdersPage() {

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const statuses = [
    "جديد",
    "جاري التجهيز",
    "تم الشحن",
    "مكتمل",
    "ملغي",
  ];

  useEffect(() => {
     checkUser();
  }, []);

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

  loadOrders();
}

  async function loadOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setOrders(data || []);
    setLoading(false);
  }

  async function updateStatus(
    id: number,
    status: string
  ) {
  console.log("UPDATE STATUS CALLED", id, status);

  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select();

  console.log("UPDATE DATA:", data);
  console.log("UPDATE ERROR:", error);

  if (error) {
    console.error(error);
    return;
  }

  setOrders((prev) =>
    prev.map((order) =>
      order.id === id
        ? { ...order, status }
        : order
    )
  );
}

function getStatusStyle(status: string) {
  switch (status) {
    case "جديد":
      return "bg-blue-100 text-blue-700";

    case "جاري التجهيز":
      return "bg-yellow-100 text-yellow-700";

    case "تم الشحن":
      return "bg-purple-100 text-purple-700";

    case "مكتمل":
      return "bg-green-100 text-green-700";

    case "ملغي":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-10 text-black">
        <h1 className="text-2xl font-bold">
          جاري تحميل الطلبات...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10 text-black">

      <h1 className="text-3xl font-bold text-orange-600">
        الطلبات 🛒
      </h1>

      <div className="hidden overflow-x-auto rounded-xl bg-white shadow md:block">

        <table className="w-full border">

          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="p-4">رقم الطلب</th>
              <th className="p-4">العميل</th>
              <th className="p-4">الهاتف</th>
              <th className="p-4">الإجمالي</th>
              <th className="p-4">الحالة</th>
              <th className="p-4">التفاصيل</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b text-center"
              >

                <td className="p-4">
                  #{order.order_number}
                </td>

                <td className="p-4">
                  {order.customer_name}
                </td>

                <td className="p-4">
                  {order.phone}
                </td>

                <td className="p-4 font-bold">
                  {order.total_price} جنيه
                </td>

                <td className="p-4">
                 <div
  className={`mt-4 mb-4 rounded-xl py-2 text-center font-bold ${getStatusStyle(
    order.status
  )}`}
>
  {order.status}
</div>

<select
  value={order.status}
  onChange={(e) =>
    updateStatus(order.id, e.target.value)
  }
  className="w-full rounded-xl border-2 border-gray-200 p-3 text-lg font-semibold transition focus:border-orange-500 focus:outline-none"
>
                 {statuses.map((status) => (
                    <option key={status} value={status}>
                     {status}
                    </option>
                   ))}
                 </select>
               </td>

                <td className="p-4">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="rounded-lg bg-black px-4 py-2 text-white"
                  >
                    عرض
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

<div className="space-y-4 md:hidden">
  {orders.map((order) => (
    <div
      key={order.id}
      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <h2 className="mb-5 flex items-center gap-2 text-2xl font-extrabold text-orange-600">
       📦 الطلب #{order.order_number}
      </h2>

      <div className="space-y-3 text-lg">

  <p>
    👤 <span className="font-bold">العميل:</span>{" "}
    {order.customer_name}
  </p>

  <p>
    📞 <span className="font-bold">الهاتف:</span>{" "}
    {order.phone}
  </p>

  <p className="font-bold text-green-600">
    💰 {order.total_price} جنيه
  </p>

</div>

      <select
        value={order.status}
        onChange={(e) =>
          updateStatus(order.id, e.target.value)
        }
        className="mt-4 w-full rounded-lg border p-3"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <Link
        href={`/admin/orders/${order.id}`}
        className="mt-5 block w-full rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 py-4 text-center text-lg font-bold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
      >
        عرض التفاصيل
      </Link>
    </div>
  ))}
</div>

</main>

  );
}