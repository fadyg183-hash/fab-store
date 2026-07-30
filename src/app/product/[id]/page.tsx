import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AddToCartButton from "@/components/AddToCartButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", Number(id))
    .maybeSingle();

  if (error) {
    console.error("PRODUCT DETAILS ERROR:", error);
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white px-6 py-16 text-black dark:bg-gray-950 dark:text-white">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">

        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          className="rounded-3xl object-cover"
        />

        <div>
          <h1 className="text-5xl font-bold text-black dark:text-white">
            {product.name}
          </h1>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            {product.description}
          </p>

          <p className="mt-8 text-3xl font-bold text-black dark:text-white">
            {product.price} جنيه
          </p>

          {product.available ? (
            <p className="mt-6 inline-block rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
              ✅ متوفر
            </p>
          ) : (
            <p className="mt-6 inline-block rounded-full bg-red-100 px-4 py-2 font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-300">
              ❌ غير متوفر
            </p>
          )}

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>

      </div>
    </main>
  );
}