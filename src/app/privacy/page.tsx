export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-black dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            FAB
          </p>

          <h1 className="text-4xl font-black md:text-5xl">
            سياسة الخصوصية
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            آخر تحديث: يوليو 2026
          </p>
        </div>

        <div className="space-y-10 leading-8 text-gray-700 dark:text-gray-300">

          {/* Intro */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              مقدمة
            </h2>

            <p>
              نحن في FAB نحترم خصوصية عملائنا ونلتزم بالحفاظ على
              المعلومات التي يتم تقديمها لنا أثناء استخدام الموقع أو
              إجراء الطلبات.
            </p>
          </section>

          {/* Information */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              المعلومات التي نقوم بجمعها
            </h2>

            <p>
              عند إجراء طلب من خلال FAB، قد نحتاج إلى بعض البيانات
              اللازمة لتنفيذ الطلب والتواصل معك، مثل:
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2">
              <li>اسم العميل.</li>
              <li>رقم الهاتف.</li>
              <li>عنوان التوصيل.</li>
              <li>تفاصيل المنتجات المطلوبة.</li>
              <li>أي معلومات أخرى ترسلها لنا أثناء التواصل.</li>
            </ul>
          </section>

          {/* Usage */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              كيفية استخدام المعلومات
            </h2>

            <p>
              نستخدم المعلومات التي يتم تقديمها لنا بهدف تنفيذ
              الطلبات والتواصل مع العملاء وتحسين تجربة استخدام
              الموقع والخدمات التي يقدمها FAB.
            </p>
          </section>

          {/* Orders */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              الطلبات
            </h2>

            <p>
              يتم الاحتفاظ ببيانات الطلبات بالقدر اللازم لإدارة
              الطلب ومتابعة حالته وتقديم خدمة أفضل للعملاء.
            </p>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              حماية البيانات
            </h2>

            <p>
              نتخذ إجراءات مناسبة للمساعدة في حماية بيانات العملاء
              من الوصول غير المصرح به أو الاستخدام غير المناسب.
              ومع ذلك، لا يمكن ضمان أمان أي نظام إلكتروني بنسبة
              100%.
            </p>
          </section>

          {/* Third Parties */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              مشاركة المعلومات
            </h2>

            <p>
              لا نقوم ببيع بيانات العملاء أو تأجيرها لأطراف أخرى.
              وقد تتم مشاركة المعلومات فقط عندما يكون ذلك ضروريًا
              لتنفيذ الطلب أو تقديم الخدمة المطلوبة.
            </p>
          </section>

          {/* WhatsApp */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              التواصل عبر WhatsApp
            </h2>

            <p>
              قد يتم التواصل مع العملاء عبر WhatsApp بخصوص الطلبات
              أو الطلبات المخصصة. يخضع استخدام WhatsApp لسياسة
              الخصوصية وشروط الخدمة الخاصة به.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              ملفات تعريف الارتباط والتخزين المحلي
            </h2>

            <p>
              قد يستخدم الموقع تقنيات مثل التخزين المحلي في
              المتصفح للمساعدة في حفظ بعض إعدادات المستخدم أو
              محتويات السلة وتحسين تجربة الاستخدام.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              حقوقك
            </h2>

            <p>
              يمكنك التواصل معنا للاستفسار عن البيانات المرتبطة
              بطلبك أو طلب تصحيح المعلومات غير الصحيحة، عندما يكون
              ذلك ممكنًا.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              تحديث سياسة الخصوصية
            </h2>

            <p>
              قد نقوم بتحديث سياسة الخصوصية من وقت لآخر بما يتناسب
              مع تطور الموقع والخدمات التي نقدمها. سيتم نشر أي
              تغييرات على هذه الصفحة.
            </p>
          </section>

          {/* Contact */}
          <section className="rounded-3xl bg-gray-100 p-6 dark:bg-gray-900">
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              لديك سؤال؟
            </h2>

            <p>
              إذا كان لديك أي استفسار بخصوص سياسة الخصوصية أو
              بياناتك، يمكنك التواصل معنا.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href="https://wa.me/201201824010"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-black underline dark:text-white"
              >
                📱 التواصل عبر WhatsApp
              </a>

              <a
                href="mailto:amirgeorge1211@gmail.com"
                className="font-semibold text-black underline dark:text-white"
              >
                📧 amirgeorge1211@gmail.com
              </a>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}