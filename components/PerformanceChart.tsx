import type { ProjectionPoint } from "@/lib/miningEngine";

interface Props {
  projection: ProjectionPoint[];
}

const formatCurrency = (value: number) =>
  value.toLocaleString("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 100 ? 0 : 2
  });

export default function PerformanceChart({ projection }: Props) {
  const maxProfit = Math.max(...projection.map((point) => point.profit));
  const minProfit = Math.min(...projection.map((point) => point.profit));
  const range = Math.max(maxProfit - minProfit, 1);

  const normalize = (value: number) =>
    100 - ((value - minProfit) / range) * 100 + 5;

  const profitPath = projection
    .map((point, index) => {
      const x = (index / (projection.length - 1)) * 100;
      const y = normalize(point.profit);
      return `${index === 0 ? "M" : "L"} ${x},${y}`;
    })
    .join(" ");

  const areaPath =
    profitPath +
    ` L 100,105 L 0,105 Z`;

  return (
    <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/60 p-8 backdrop-blur">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-white">منحنى العائد المتوقع</h2>
          <p className="text-sm text-slate-400">
            تحليل يومي لمدة ٢١ يوماً يوازن بين تقلب السوق وتكلفة الطاقة.
          </p>
        </div>
        <div className="rounded-xl bg-slate-800/80 px-4 py-2 text-right text-xs text-slate-300">
          <div>
            أقصى ربح: <span className="text-primary-light">{formatCurrency(maxProfit)}</span>
          </div>
          <div>
            أدنى ربح: <span className="text-rose-300">{formatCurrency(minProfit)}</span>
          </div>
        </div>
      </header>
      <div className="relative">
        <svg
          viewBox="0 0 100 110"
          preserveAspectRatio="none"
          className="h-64 w-full"
        >
          <defs>
            <linearGradient id="profitGradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(55, 183, 184, 0.8)" />
              <stop offset="100%" stopColor="rgba(55, 183, 184, 0)" />
            </linearGradient>
            <linearGradient id="lineStroke" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#37B7B8" />
              <stop offset="100%" stopColor="#68D6D6" />
            </linearGradient>
          </defs>
          <path
            d={areaPath}
            fill="url(#profitGradient)"
            stroke="none"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={profitPath}
            fill="none"
            stroke="url(#lineStroke)"
            strokeWidth={1.4}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex justify-between px-4 text-[11px] text-slate-500">
          {projection.map((point) => (
            <span key={point.day}>اليوم {point.day}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
