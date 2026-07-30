export default function TermsPage() {
  return (
    <main className="bg-white px-6 py-16 text-black dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-4xl">

        {/* العنوان */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold md:text-5xl">
            شروط الاستخدام
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
            مرحبًا بك في FAB. باستخدامك لهذا الموقع أو إجرائك لأي طلب من
            خلاله، فإنك توافق على الالتزام بشروط الاستخدام الموضحة في هذه
            الصفحة.
          </p>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع
            أو إجراء أي طلب من خلاله.
          </p>
        </section>

        {/* استخدام الموقع */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            استخدام الموقع
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            يجب استخدام موقع FAB بطريقة قانونية وعدم استخدامه لأي أغراض
            غير مشروعة أو تضر بالموقع أو المستخدمين الآخرين.
          </p>
        </section>

        {/* الطلبات */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            الطلبات
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            عند إجراء طلب، يجب تقديم بيانات صحيحة وكاملة مثل الاسم ورقم
            الهاتف وعنوان التوصيل وتفاصيل المنتجات المطلوبة.
          </p>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            يحق لـ FAB التواصل مع العميل لتأكيد تفاصيل الطلب قبل تنفيذه.
          </p>
        </section>

        {/* الأسعار */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            الأسعار والدفع
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            الأسعار المعروضة على الموقع هي الأسعار الحالية للمنتجات وقت
            عرضها، وقد يتم تحديثها من وقت لآخر.
          </p>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            قد تختلف تكلفة التوصيل عن سعر المنتج ويتم توضيحها للعميل عند
            الحاجة قبل إتمام الطلب.
          </p>
        </section>

        {/* المنتجات المخصصة */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            الطلبات والتصميمات المخصصة
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            قد توفر FAB خدمات تصميم وطباعة مخصصة بناءً على طلب العميل.
            يجب على العميل تقديم تفاصيل واضحة عن التصميم أو الفكرة المطلوبة.
          </p>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            قد تختلف مدة التنفيذ والتكلفة حسب طبيعة التصميم وحجم وتعقيد
            الطلب.
          </p>
        </section>

        {/* الشحن */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            الشحن والتوصيل
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            يتم تنفيذ وشحن الطلبات وفقًا للبيانات التي يقدمها العميل.
            يجب التأكد من صحة رقم الهاتف وعنوان التوصيل.
          </p>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            قد تتأثر مدة التوصيل بعوامل خارجة عن سيطرة FAB، مثل ظروف
            شركات الشحن أو العوامل الطارئة.
          </p>
        </section>

        {/* الإلغاء والاسترجاع */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            الإلغاء والاسترجاع
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            تخضع عمليات إلغاء الطلبات والاسترجاع والاستبدال لسياسة
            الاسترجاع والاستبدال الخاصة بـ FAB.
          </p>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            قد تختلف إمكانية الإلغاء أو الاسترجاع حسب حالة الطلب وما إذا
            كان المنتج عاديًا أو تم تصنيعه خصيصًا للعميل.
          </p>
        </section>

        {/* مسؤولية العميل */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            مسؤولية العميل
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            العميل مسؤول عن صحة البيانات التي يقدمها عند إنشاء الطلب،
            وخاصة الاسم ورقم الهاتف وعنوان التوصيل.
          </p>
        </section>

        {/* الملكية */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            حقوق الملكية
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            جميع المحتويات الموجودة على موقع FAB، بما في ذلك النصوص
            والصور والتصميمات والعلامة التجارية، لا يجوز استخدامها أو
            نسخها أو إعادة نشرها دون إذن مناسب.
          </p>
        </section>

        {/* التعديلات */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">
            تحديث شروط الاستخدام
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">
            قد نقوم بتحديث شروط الاستخدام من وقت لآخر بما يتناسب مع
            تطور الموقع والخدمات التي نقدمها. سيتم نشر أي تغييرات على
            هذه الصفحة.
          </p>
        </section>

        {/* التواصل */}
        <section className="mt-10 rounded-2xl bg-gray-100 p-8 dark:bg-gray-900">
          <h2 className="text-2xl font-bold">
            لديك سؤال؟
          </h2>

          <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">
            إذا كان لديك أي استفسار بخصوص شروط الاستخدام أو طلبك،
            يمكنك التواصل معنا.
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