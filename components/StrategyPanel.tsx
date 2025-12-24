import {
  AVAILABLE_COINS,
  CoinKey,
  MiningParameters,
  StrategyInsight,
  getCoinProfile
} from "@/lib/miningEngine";

interface Props {
  params: MiningParameters;
  insight: StrategyInsight;
}

const formatMoney = (value: number) =>
  `$${value.toLocaleString("en", {
    minimumFractionDigits: value >= 100 ? 0 : 2,
    maximumFractionDigits: value >= 100 ? 0 : 2
  })}`;

const insightBadgeColor = (label: string) => {
  switch (label) {
    case "هجومي":
      return "bg-rose-500/10 text-rose-300 border border-rose-500/40";
    case "محافظ":
      return "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40";
    default:
      return "bg-sky-500/10 text-sky-300 border border-sky-500/40";
  }
};

const riskBadgeColor = (risk: StrategyInsight["riskLevel"]) => {
  switch (risk) {
    case "مرتفع":
      return "bg-rose-500/10 text-rose-200 border border-rose-500/50";
    case "متوسط":
      return "bg-amber-500/10 text-amber-200 border border-amber-500/50";
    default:
      return "bg-emerald-500/10 text-emerald-200 border border-emerald-500/50";
  }
};

const coinLabel = (coin: CoinKey) =>
  AVAILABLE_COINS.find((c) => c.id === coin)?.name ?? coin;

export default function StrategyPanel({ params, insight }: Props) {
  const coin = getCoinProfile(params.coin);
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 text-right">
        <div>
          <h2 className="font-display text-2xl text-white">
            أوامر الذكاء الاصطناعي المبنية على المخاطر
          </h2>
          <p className="text-sm text-slate-400">
            تقييم استباقي لمخاطر الشبكة، عائد الطاقة، وسلوك السعر خلال ٣ أسابيع.
          </p>
        </div>
        <div className="flex gap-2">
          <span
            className={`rounded-full px-4 py-1 text-sm font-semibold ${insightBadgeColor(insight.efficiencyLabel)}`}
          >
            نمط العائد: {insight.efficiencyLabel}
          </span>
          <span
            className={`rounded-full px-4 py-1 text-sm font-semibold ${riskBadgeColor(insight.riskLevel)}`}
          >
            مستوى المخاطر: {insight.riskLevel}
          </span>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <InsightCard
          label="فعالية رأس المال"
          value={`${insight.capitalEfficiency}%`}
          hint="نسبة العائد الصافي مقابل التكلفة المتغيرة"
        />
        <InsightCard
          label="عدد أيام نقطة التعادل"
          value={`${insight.breakevenDays}`}
          hint="المتوسط المتوقع للوصول إلى استرداد رأس المال"
        />
        <InsightCard
          label="توقع سعر العملة"
          value={formatMoney(coin.price)}
          hint="مؤشر السعر الحالي مع معايير التقلب"
        />
        <InsightCard
          label="استراتيجية إعادة استثمار"
          value={`${Math.round(params.reinvestmentRate * 100)}٪`}
          hint="الوزن الحالي لرأس المال المعاد ضخه في الأجهزة والسيولة"
        />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
          <h3 className="mb-2 font-semibold text-slate-100">معاملاتك الحالية</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>العملة المختارة: {coinLabel(params.coin)}</li>
            <li>الهاش ريت: {params.hashRate} TH/s</li>
            <li>التكلفة الكهربائية: ${params.electricityCost}/kWh</li>
            <li>الطاقة المستهلكة: {params.powerConsumption} kW</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 lg:col-span-2">
          <h3 className="mb-3 font-semibold text-slate-100">أوامر البوت لتحسين النتائج</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            {insight.suggestedTuning.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary-light" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function InsightCard({
  label,
  value,
  hint
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
      <h3 className="text-sm text-slate-400">{label}</h3>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      <p className="mt-2 text-xs text-slate-500">{hint}</p>
    </div>
  );
}
