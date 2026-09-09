const heroRows: { task: string; who: string; status: "done" | "pending" }[] = [
  { task: "Daily SMS count vs. log count", who: "A. Owusu", status: "done" },
  { task: "Batch job — nightly reconciliation", who: "—", status: "pending" },
  { task: "API gateway health check", who: "K. Mensah", status: "done" },
  { task: "Failed transaction queue review", who: "—", status: "pending" },
  { task: "Backup verification — prod DB", who: "A. Owusu", status: "done" },
];

const btnBase =
  "inline-flex items-center justify-center gap-2 px-[20px] py-[10px] rounded-[6px] text-sm font-medium border cursor-pointer transition-all duration-150";
const btnPrimary = `${btnBase} bg-[#2451D6] text-white border-[#2451D6] shadow-[0_1px_2px_rgba(36,81,214,0.15),0_6px_16px_-4px_rgba(36,81,214,0.45)] hover:bg-[#1B3EAE] hover:shadow-[0_1px_2px_rgba(36,81,214,0.2),0_10px_22px_-4px_rgba(36,81,214,0.55)] hover:-translate-y-[1px] active:translate-y-0 active:shadow-[0_1px_2px_rgba(36,81,214,0.2)]`;

function Pill({ status }: { status: "done" | "pending" }) {
  const base = "text-[11px] px-[9px] py-[3px] rounded-full border whitespace-nowrap";
  const cls =
    status === "done"
      ? `${base} text-[#2451D6] border-[#2451D640] bg-[#2451D614]`
      : `${base} text-[#B4761E] border-[#e8a94a40] bg-[#e8a94a14]`;
  return <span className={cls}>{status}</span>;
}

function StatusDot({ status }: { status: "done" | "pending" }) {
  return (
    <span
      className={`w-2 h-2 rounded-full ${status === "done" ? "bg-[#2451D6]" : "bg-[#E8A94A]"}`}
    />
  );
}

export default function HomePage() {
  return (
    <div className="font-display bg-white text-[#0E1316] leading-relaxed relative min-h-screen">

      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="max-w-295 mx-auto px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5 font-semibold text-base tracking-tight text-[#0E1316]">
            <span className="w-2.25 h-2.25 rounded-full bg-[#2451D6] shadow-[0_0_0_3px_#2451D633]" />
            Tracker
          </div>
          <nav className="flex items-center gap-9 text-sm text-[#5C6B70]">
            <a className={btnPrimary} href="/login">Sign in</a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative z-10 px-8 py-24 md:py-28">
          <div className="max-w-295 mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 text-[#2451D6] text-[13px] font-medium mb-5">
                <span className="w-4 h-px bg-[#2451D6]" />
                APPLICATIONS SUPPORT · ACTIVITY TRACKING
              </div>
              <h1 className="text-4xl md:text-[52px] leading-[1.08] font-semibold tracking-tight max-w-140 text-[#0E1316]">
                Every activity, every update — in{" "}
                <span className="text-[#2451D6]">one place</span>.
              </h1>
              <p className="mt-5 text-[17px] text-[#5C6B70] max-w-115 leading-relaxed">
                Npontu activity tracker replaces the scattered spreadsheets and chat threads support teams use to
                track daily checks. Log an activity, mark it done or pending, and hand it off clean
                — with who, what, and when always on record.
              </p>
              <div className="mt-9 flex gap-3.5 items-center flex-wrap">
                <a className={btnPrimary} href="/login">Sign in to your team</a>
              </div>

            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-[10px] overflow-hidden shadow-[0_1px_2px_rgba(15,23,26,0.04),0_20px_40px_-16px_rgba(15,23,26,0.18)]">
              <div className="h-0.75 bg-linear-to-r from-[#2451D6] to-[#7CA3F0]" />
              <div className="flex items-center justify-between px-4.5 py-3.5 border-b border-[#E2E8F0] text-[12.5px] text-[#5C6B70]">
                <span className="text-[#0E1316] font-medium text-[13px]">Today's activity log</span>
                <span className="flex items-center gap-1.5 text-[#2451D6]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2451D6] animate-pulse" />
                  live
                </span>
              </div>
              {heroRows.map((r) => (
                <div
                  key={r.task}
                  className="grid grid-cols-[20px_1fr_auto_auto] gap-3.5 items-center px-4.5 py-3.5 border-b border-[#E2E8F0] last:border-b-0 text-[13px] transition-colors duration-150 hover:bg-[#F8FAFC]"
                >
                  <StatusDot status={r.status} />
                  <span className="text-[#0E1316]">{r.task}</span>
                  <span className="text-[#8B9AA0] text-xs whitespace-nowrap">{r.who}</span>
                  <Pill status={r.status} />
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}