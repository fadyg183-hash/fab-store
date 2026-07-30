import Hero from "@/components/Hero";
import Products from "@/components/Products";
import WhyFab from "@/components/WhyFab";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <main>
      <Hero />

      <Products />

      <FeaturedProducts />

      <WhyFab />

      {/* من نحن */}
      <section
        id="about"
        className="bg-gray-100 px-6 py-24 text-center dark:bg-gray-900"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="text-5xl font-extrabold text-black dark:text-white">
            من نحن
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            FAB هي علامة متخصصة في الطباعة والتصنيع حسب الطلب،
            بنحوّل أفكارك إلى منتجات حقيقية بجودة عالية.
          </p>
        </div>
      </section>

      {/* تواصل معنا */}
      <section
        id="contact"
        className="bg-white px-6 py-24 text-center dark:bg-gray-950"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="text-5xl font-extrabold text-black dark:text-white">
            تواصل معنا
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            تواصل معنا بسهولة من خلال أي وسيلة تناسبك
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            {/* WhatsApp */}
            <a
              href="https://wa.me/201201824010"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border bg-gray-50 p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="text-4xl">📱</div>

              <h3 className="mt-4 text-xl font-bold text-black dark:text-white">
                WhatsApp
              </h3>
            </a>

            {/* Phone */}
            <a
              href="tel:+201201824010"
              className="rounded-2xl border bg-gray-50 p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="text-4xl">📞</div>

              <h3 className="mt-4 text-xl font-bold text-black dark:text-white">
                رقم الهاتف
              </h3>
            </a>

            {/* Email */}
            <a
              href="mailto:amirgeorge1211@gmail.com"
              className="rounded-2xl border bg-gray-50 p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="text-4xl">📧</div>

              <h3 className="mt-4 text-xl font-bold text-black dark:text-white">
                Email
              </h3>
            </a>

          </div>
        </div>
      </section>
    </main>
  );
}