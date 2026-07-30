"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      // تسجيل الدخول
      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        setMessage("❌ البريد الإلكتروني أو كلمة المرور غير صحيحة");
        return;
      }

      // التحقق إن المستخدم Admin فعلًا
      const { data: isAdmin, error: adminError } =
        await supabase.rpc("is_admin");

      if (adminError) {
        console.error("IS ADMIN ERROR:", adminError);

        await supabase.auth.signOut();

        setMessage("❌ حدث خطأ أثناء التحقق من صلاحيات الحساب");
        return;
      }

      // المستخدم مسجل دخول لكنه ليس Admin
      if (!isAdmin) {
        await supabase.auth.signOut();

        setMessage("❌ هذا الحساب ليس لديه صلاحية دخول الأدمن");
        return;
      }

      // Admin بالفعل
      router.push("/admin");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      await supabase.auth.signOut();

      setMessage("❌ حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow"
      >
        <h1 className="mb-8 text-center text-3xl font-bold text-orange-600">
          تسجيل دخول الأدمن
        </h1>

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3 text-black"
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded-lg border p-3 text-black"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-orange-600 p-3 font-bold text-white"
        >
          {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
        </button>

        {message && (
          <p className="mt-4 text-center text-red-600">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}