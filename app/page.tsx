import MiningBotDashboard from "@/components/MiningBotDashboard";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <MiningBotDashboard />
      <footer className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
        AstraMine AI © {new Date().getFullYear()} • تم البناء بواسطة محرّك الذكاء التنبؤي للتعدين.
      </footer>
    </main>
  );
}
