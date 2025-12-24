export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-10 shadow-glow">
      <div className="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-20 -top-16 h-48 w-48 rounded-full bg-primary-light/20 blur-3xl" />
      <div className="relative space-y-6 text-right">
        <span className="inline-flex items-center rounded-full border border-primary/50 bg-primary/10 px-4 py-1 text-sm font-medium text-primary-light">
          ذكاء اصطناعي تكيفي للتعدين السحابي
        </span>
        <h1 className="font-display text-4xl font-semibold leading-[1.2] text-white sm:text-5xl">
          بوت تعدين ذكي يوزن المخاطر ويعيد ضبط الأداء خلال ثوانٍ
        </h1>
        <p className="max-w-2xl text-lg text-slate-300">
          AstraMine AI يفهم ديناميكيات الشبكات، تكاليف الطاقة، ومرونة رأس المال. قم بتحليل
          سيناريوهات التعدين بالاعتماد على محرك تنبؤي مدعوم بالتعلم الآلي ونماذج التقلب.
        </p>
        <div className="flex items-center justify-end gap-4">
          <button className="rounded-xl bg-primary px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-primary-light">
            تفعيل البوت الآن
          </button>
          <button className="rounded-xl border border-slate-700 px-6 py-3 text-base font-semibold text-slate-200 transition hover:border-primary hover:text-primary">
            راقب لوحة التحكم الحية
          </button>
        </div>
      </div>
    </section>
  );
}
