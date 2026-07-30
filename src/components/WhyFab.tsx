export default function WhyFab() {
  const features = [
    {
      icon: "🖨️",
      title: "طباعة بجودة عالية",
      description:
        "نستخدم تقنيات طباعة ثلاثية الأبعاد للحصول على تفاصيل دقيقة وجودة ممتازة.",
    },
    {
      icon: "🎨",
      title: "تصميم حسب فكرتك",
      description:
        "لديك فكرة؟ نحولها إلى منتج حقيقي بتصميم يناسب احتياجاتك.",
    },
    {
      icon: "⚡",
      title: "تنفيذ احترافي",
      description:
        "نهتم بكل تفاصيل الطلب من التصميم حتى المنتج النهائي.",
    },
    {
      icon: "⭐",
      title: "منتجات مميزة",
      description:
        "مجموعة من المنتجات والتصميمات الفريدة التي تناسب ذوقك.",
    },
  ];

  return (
    <section className="bg-white px-6 py-24 dark:bg-gray-950">

      <div className="mx-auto max-w-7xl">

        <div className="mb-14 text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Why FAB
          </p>

          <h2 className="mt-3 text-4xl font-black text-black dark:text-white md:text-5xl">
            لماذا تختار FAB؟
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600 dark:text-gray-300">
            لأننا نهتم بتحويل أفكارك إلى منتجات حقيقية بجودة وتصميم مميز.
          </p>

        </div>


        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-200 bg-gray-50 p-8 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >

              <div className="text-5xl">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-xl font-bold text-black dark:text-white">
                {feature.title}
              </h3>

              <p className="mt-3 text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}