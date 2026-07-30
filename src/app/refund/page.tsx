export default function RefundPage() {
  return (
    <main className="bg-white px-6 py-16 text-black dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-4xl">

        {/* العنوان */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold md:text-5xl">
            سياسة الاسترجاع والاستبدال
          </h1>

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            آخر تحديث: يوليو 2026
          </p>
        </div>

        {/* مقدمة */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            مقدمة
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            في FAB نهتم بتقديم منتجات بجودة عالية وتجربة شراء واضحة.
            توضح هذه الصفحة الحالات التي يمكن فيها طلب الاسترجاع أو
            الاستبدال والإجراءات المطلوبة.
          </p>
        </section>

        {/* المنتجات العادية */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            المنتجات العادية
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            يمكن التواصل معنا بخصوص طلب الاسترجاع أو الاستبدال في حالة
            وجود مشكلة في المنتج، ويجب التواصل معنا في أقرب وقت ممكن
            من استلام الطلب.
          </p>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            يجب أن يكون المنتج في حالته الأصلية قدر الإمكان، وألا يكون
            قد تعرض لاستخدام أو تلف ناتج عن العميل.
          </p>
        </section>

        {/* المنتجات التالفة */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            المنتجات التالفة أو غير الصحيحة
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            إذا وصل المنتج تالفًا أو وصل منتج مختلف عن المنتج المطلوب،
            يرجى التواصل معنا وإرسال صور أو تفاصيل توضح المشكلة حتى
            نتمكن من مراجعة الحالة واتخاذ الإجراء المناسب.
          </p>
        </section>

        {/* المنتجات المخصصة */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            المنتجات المصممة حسب الطلب
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            المنتجات التي يتم تصميمها أو تصنيعها خصيصًا بناءً على طلب
            العميل قد لا تكون قابلة للاسترجاع أو الاستبدال بسبب طبيعتها
            المخصصة.
          </p>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            في حالة وجود عيب في التصنيع أو اختلاف واضح عن التصميم الذي
            تم الاتفاق عليه، يرجى التواصل معنا لمراجعة الحالة.
          </p>
        </section>

        {/* مدة التواصل */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            متى يجب التواصل معنا؟
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            يرجى التواصل معنا في أقرب وقت ممكن بعد استلام الطلب وشرح
            المشكلة بوضوح، مع إرفاق صور عند الحاجة.
          </p>
        </section>

        {/* الشحن */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            تكلفة الشحن
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            تختلف مسؤولية تكلفة الشحن حسب سبب الاسترجاع أو الاستبدال.
            إذا كانت المشكلة ناتجة عن خطأ في تنفيذ الطلب أو عيب في
            المنتج، يتم مراجعة الحالة وتحديد الإجراء المناسب.
          </p>
        </section>

        {/* قبول الطلب */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            مراجعة طلب الاسترجاع أو الاستبدال
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            جميع طلبات الاسترجاع والاستبدال تخضع للمراجعة. قد نطلب
            معلومات أو صورًا إضافية للتأكد من المشكلة قبل الموافقة
            على الطلب.
          </p>
        </section>

        {/* الإلغاء */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            إلغاء الطلب
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            إذا كنت ترغب في إلغاء طلبك، يرجى التواصل معنا في أسرع وقت
            ممكن. تعتمد إمكانية الإلغاء على حالة الطلب وما إذا كان قد
            بدأ تجهيزه أو تصنيعه.
          </p>
        </section>

        {/* التواصل */}
        <section className="mt-10 rounded-2xl bg-gray-100 p-8 dark:bg-gray-900">
          <h2 className="text-2xl font-bold">
            لديك طلب استرجاع أو استبدال؟
          </h2>

          <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">
            تواصل معنا واشرح المشكلة، وسنقوم بمراجعة طلبك ومساعدتك في
            معرفة الخطوات المناسبة.
          </p>

          <div className="mt-6 flex flex-col gap-4">

            <a
              href="https://wa.me/201201824010"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-800 hover:underline dark:text-white"
            >
              📱 التواصل عبر WhatsApp
            </a>

            <a
              href="mailto:amirgeorge1211@gmail.com"
              className="font-semibold text-gray-800 hover:underline dark:text-white"
            >
              📧 amirgeorge1211@gmail.com
            </a>

          </div>
        </section>

      </div>
    </main>
  );
}