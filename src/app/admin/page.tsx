"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Order = {
  id: string;
  order_number: number;
  customer_name: string;
  phone: string;
  total_price: number;
  status: string;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

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

    await loadDashboard();
  }

  async function loadDashboard() {
    setLoading(true);

    const { data: ordersData, error: ordersError } = await supabase
      .from("orders")
      .select(
        "id, order_number, customer_name, phone, total_price, status"
      )
      .order("order_number", { ascending: false });

    if (ordersError) {
      console.error("ORDERS ERROR:", ordersError);
    } else {
      setOrders(ordersData || []);
    }

    const { count, error: productsError } = await supabase
      .from("products")
      .select("id", { count: "exact", head: true });

    if (productsError) {
      console.error("PRODUCTS COUNT ERROR:", productsError);
    } else {
      setProductsCount(count || 0);
    }

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const newOrdersCount = orders.filter(
    (order) => order.status === "جديد"
  ).length;

  const totalSales = orders
  .filter((order) => order.status === "مكتمل")
  .reduce(
    (total, order) => total + Number(order.total_price || 0),
    0
  );

  const recentOrders = orders.slice(0, 5);

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-10">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-orange-600">
            لوحة تحكم FAB Store
          </h1>

          <p className="mt-2 text-gray-600">
            مرحبًا بك في لوحة إدارة المتجر
          </p>
        </div>

        <button
          onClick={logout}
          className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
        >
          تسجيل الخروج
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Orders */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 text-4xl">📦</div>

          <p className="text-sm font-semibold text-gray-500">
            إجمالي الطلبات
          </p>

          <p className="mt-2 text-3xl font-extrabold text-black">
            {loading ? "..." : orders.length}
          </p>
        </div>

        {/* New Orders */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 text-4xl">🆕</div>

          <p className="text-sm font-semibold text-gray-500">
            الطلبات الجديدة
          </p>

          <p className="mt-2 text-3xl font-extrabold text-orange-600">
            {loading ? "..." : newOrdersCount}
          </p>
        </div>

        {/* Products */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 text-4xl">🛒</div>

          <p className="text-sm font-semibold text-gray-500">
            إجمالي المنتجات
          </p>

          <p className="mt-2 text-3xl font-extrabold text-black">
            {loading ? "..." : productsCount}
          </p>
        </div>

        {/* Sales */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 text-4xl">💰</div>

          <p className="text-sm font-semibold text-gray-500">
            إجمالي المبيعات
          </p>

          <p className="mt-2 text-3xl font-extrabold text-green-600">
            {loading ? "..." : `${totalSales} جنيه`}
          </p>
        </div>
      </div>

      {/* Management Buttons */}
      <div className="mb-10 grid gap-5 md:grid-cols-2">
        <Link
          href="/admin/orders"
          className="rounded-2xl bg-black p-7 text-center text-xl font-bold text-white transition hover:-translate-y-1 hover:bg-gray-800 hover:shadow-lg"
        >
          📦
          <span className="mt-2 block">
            إدارة الطلبات
          </span>

          <span className="mt-2 block text-sm font-normal text-gray-300">
            مشاهدة الطلبات وتغيير حالتها
          </span>
        </Link>

        <Link
          href="/admin/products"
          className="rounded-2xl bg-orange-600 p-7 text-center text-xl font-bold text-white transition hover:-translate-y-1 hover:bg-orange-700 hover:shadow-lg"
        >
          🛒
          <span className="mt-2 block">
            إدارة المنتجات
          </span>

          <span className="mt-2 block text-sm font-normal text-orange-100">
            إضافة وتعديل وحذف المنتجات
          </span>
        </Link>
      </div>

      {/* Recent Orders */}
      <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-black">
              آخر الطلبات
            </h2>

            <p className="mt-1 text-gray-500">
              أحدث 5 طلبات في المتجر
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="font-bold text-orange-600 hover:underline"
          >
            عرض كل الطلبات ←
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-black">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="p-4">رقم الطلب</th>
                <th className="p-4">العميل</th>
                <th className="p-4">الهاتف</th>
                <th className="p-4">الإجمالي</th>
                <th className="p-4">الحالة</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-gray-500"
                  >
                    جاري تحميل البيانات...
                  </td>
                </tr>
              ) : recentOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-gray-500"
                  >
                    لا توجد طلبات حتى الآن
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b text-center transition hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-bold text-orange-600 hover:underline"
                      >
                        #{order.order_number}
                      </Link>
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
                      <span
  className={`rounded-full px-3 py-1 text-sm font-bold ${
    order.status === "جديد"
      ? "bg-orange-100 text-orange-700"
      : order.status === "جاري التجهيز"
      ? "bg-blue-100 text-blue-700"
      : order.status === "تم الشحن"
      ? "bg-purple-100 text-purple-700"
      : order.status === "مكتمل"
      ? "bg-green-100 text-green-700"
      : order.status === "ملغي"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-700"
  }`}
>
  {order.status}
</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}