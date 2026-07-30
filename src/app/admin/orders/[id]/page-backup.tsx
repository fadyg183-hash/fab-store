"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function OrderDetailsPage() {
  const { id } = useParams();

  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    loadOrder();
  }, []);

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
    return (
      <main className="min-h-screen bg-gray-100 p-10 text-black">
        <h1 className="text-2xl font-bold">جاري تحميل الطلب...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="mb-8 text-4xl font-bold text-orange-600">
        تفاصيل الطلب #{order.order_number}
      </h1>

      <div className="rounded-xl bg-white p-6 shadow space-y-4 text-black">

        <p><strong>اسم العميل:</strong> {order.customer_name}</p>

        <p><strong>رقم الهاتف:</strong> {order.phone}</p>

        <p><strong>العنوان:</strong> {order.address}</p>

        <p><strong>إجمالي الطلب:</strong> {order.total_price} جنيه</p>

        <p><strong>الحالة:</strong> {order.status}</p>

<hr className="my-6" />

<h2 className="text-2xl font-bold text-black mb-4">
  المنتجات
</h2>

<div className="overflow-x-auto">
  <table className="w-full text-black border">
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
        <tr key={item.id} className="border-b text-center">
          <td className="p-3">{item.product_name}</td>
          <td className="p-3">{item.quantity}</td>
          <td className="p-3">{item.price} جنيه</td>
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