"use client";

import { useMemo, useState } from "react";
import HeroSection from "./HeroSection";
import ParameterControls from "./ParameterControls";
import PerformanceChart from "./PerformanceChart";
import StrategyPanel from "./StrategyPanel";
import {
  MiningParameters,
  computeProjection,
  deriveInsights
} from "@/lib/miningEngine";

const DEFAULT_PARAMS: MiningParameters = {
  hashRate: 120,
  powerConsumption: 3.4,
  electricityCost: 0.09,
  reinvestmentRate: 0.48,
  coin: "bitcoin"
};

export default function MiningBotDashboard() {
  const [params, setParams] = useState<MiningParameters>(DEFAULT_PARAMS);
  const projection = useMemo(() => computeProjection(params), [params]);
  const insight = useMemo(() => deriveInsights(params, projection), [params, projection]);

  return (
    <div className="space-y-8">
      <HeroSection />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <ParameterControls params={params} onChange={setParams} />
        <div className="space-y-8">
          <LivePulse projection={projection} />
          <StrategyPanel params={params} insight={insight} />
        </div>
      </div>
      <PerformanceChart projection={projection} />
    </div>
  );
}

function LivePulse({
  projection
}: {
  projection: ReturnType<typeof computeProjection>;
}) {
  const recent = projection.slice(0, 7);
  const avgProfit =
    recent.reduce((acc, point) => acc + point.profit, 0) / recent.length;
  const traction = avgProfit > 500 ? "صعودي" : avgProfit > 0 ? "إيجابي" : "محايد";
  const pulseColor =
    traction === "صعودي" ? "bg-emerald-500" : traction === "إيجابي" ? "bg-sky-400" : "bg-amber-400";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary/40 via-primary-light/40 to-primary/20" />
      <header className="mb-4 flex items-center justify-between text-right">
        <div>
          <h2 className="font-display text-xl text-white">مؤشر نبض شبكة التعدين</h2>
          <p className="text-xs text-slate-400">
            تقييم قصير المدى يعتمد على تدفق الأرباح اليومية وتقلب الشبكة.
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-slate-300">
          <span className={`h-2.5 w-2.5 animate-pulse rounded-full ${pulseColor}`} />
          حالة السوق: {traction}
        </span>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        <PulseMetric
          label="متوسط الربح الأسبوعي"
          value={`$${avgProfit.toFixed(2)}`}
          hint="متوسط صافي الربح لآخر ٧ أيام"
        />
        <PulseMetric
          label="ثقة البوت"
          value={`${Math.min(95, Math.max(42, Math.round(avgProfit / 12)))}٪`}
          hint="مستوى ثقة النموذج في هذه المعطيات"
        />
      </div>
    </section>
  );
}

function PulseMetric({
  label,
  value,
  hint
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-2 text-xl font-semibold text-slate-100">{value}</div>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
    </div>
  );
}
