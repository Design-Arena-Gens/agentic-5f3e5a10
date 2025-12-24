"use client";

import { AVAILABLE_COINS, CoinKey, MiningParameters } from "@/lib/miningEngine";

interface Props {
  params: MiningParameters;
  onChange: (next: MiningParameters) => void;
}

const ParameterLabel = ({
  title,
  subtitle
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="flex flex-col text-right">
    <span className="font-medium text-slate-100">{title}</span>
    <span className="text-xs text-slate-400">{subtitle}</span>
  </div>
);

const formatNumber = (value: number, digits = 0) =>
  value.toLocaleString("ar", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  });

type SliderField = keyof Pick<
  MiningParameters,
  "hashRate" | "powerConsumption" | "electricityCost" | "reinvestmentRate"
>;

const sliderConfig: Record<
  SliderField,
  { min: number; max: number; step: number; unit: string; digits?: number }
> = {
  hashRate: { min: 10, max: 250, step: 5, unit: "TH/s" },
  powerConsumption: { min: 0.7, max: 6, step: 0.1, unit: "kW", digits: 1 },
  electricityCost: { min: 0.02, max: 0.3, step: 0.01, unit: "$/kWh", digits: 2 },
  reinvestmentRate: { min: 0, max: 1, step: 0.05, unit: "%", digits: 0 }
};

export default function ParameterControls({ params, onChange }: Props) {
  const handleSlider = (field: SliderField, value: number) => {
    const { digits } = sliderConfig[field];
    const nextValue =
      digits && digits > 0 ? parseFloat(value.toFixed(Math.min(digits, 4))) : value;
    onChange({ ...params, [field]: nextValue });
  };

  const formatDisplay = (field: SliderField, value: number) => {
    if (field === "reinvestmentRate") {
      return `${formatNumber(value * 100)}٪`;
    }
    return `${formatNumber(value, sliderConfig[field].digits)} ${sliderConfig[field].unit}`;
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-right">
          <h2 className="font-display text-2xl text-white">معاملات الذكاء التنبؤي</h2>
          <p className="text-sm text-slate-400">
            اضبط خصائص الأسطول والطاقة ليتكيف المحرك مع استراتيجيتك المفضلة.
          </p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          محرك اختبارات A/B
        </span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {(
          Object.keys(sliderConfig) as SliderField[]
        ).map((field) => (
          <div
            key={field}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-inner shadow-black/40"
          >
            <div className="flex items-center justify-between">
              <ParameterLabel
                title={
                  field === "hashRate"
                    ? "معدل الهاش"
                    : field === "powerConsumption"
                      ? "استهلاك الطاقة"
                      : field === "electricityCost"
                        ? "تكلفة الكهرباء"
                        : "نسبة إعادة الاستثمار"
                }
                subtitle={
                  field === "hashRate"
                    ? "القدرة الكلية على التعدين (TH/s)"
                    : field === "powerConsumption"
                      ? "الطاقة المستهلكة لكل ساعة (kW)"
                      : field === "electricityCost"
                        ? "متوسط التكلفة لكل kWh"
                        : "النسبة التي يعاد استثمارها تلقائيًا"
                }
              />
              <span className="rounded-lg bg-slate-800 px-3 py-1 text-sm text-primary-light">
                {formatDisplay(field, params[field])}
              </span>
            </div>
            <input
              dir="ltr"
              type="range"
              min={sliderConfig[field].min}
              max={sliderConfig[field].max}
              step={sliderConfig[field].step}
              value={params[field]}
              onChange={(event) =>
                handleSlider(field, parseFloat(event.currentTarget.value))
              }
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded bg-slate-800 accent-primary"
            />
          </div>
        ))}
      </div>
      <aside className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400">العملة المستهدفة</span>
          <div className="flex gap-2">
            {AVAILABLE_COINS.map((coin) => {
              const active = params.coin === coin.id;
              return (
                <button
                  key={coin.id}
                  className={`rounded-xl border px-4 py-2 text-sm transition ${
                    active
                      ? "border-primary bg-primary/10 text-primary-light shadow-glow"
                      : "border-slate-700 bg-slate-900 text-slate-300 hover:border-primary/40"
                  }`}
                  onClick={() =>
                    onChange({
                      ...params,
                      coin: coin.id as CoinKey
                    })
                  }
                >
                  <div className="font-medium">{coin.name}</div>
                  <div className="text-[11px] text-slate-400">
                    تقلب {Math.round(coin.volatility * 100)}٪ • ${coin.price}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <button
          className="rounded-xl border border-primary px-5 py-2 text-sm font-semibold text-primary hover:bg-primary/10"
          onClick={() =>
            onChange({
              hashRate: 110,
              powerConsumption: 3.1,
              electricityCost: 0.08,
              reinvestmentRate: 0.42,
              coin: "bitcoin"
            })
          }
        >
          إعادة الضبط إلى توصية الذكاء الاصطناعي
        </button>
      </aside>
    </section>
  );
}
