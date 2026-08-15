import type { CSSProperties, ReactNode } from "react";
import { heroTabs, metrics, profile, resumeMarkdown } from "../data";

const scrollToId = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ block: "start" });

function downloadResume() {
  const blob = new Blob([resumeMarkdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Zamil_Khan_Resume.md";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function CodeLine({ i, children }: { i: number; children?: ReactNode }) {
  return (
    <div
      className="code-line flex hover:bg-bg1/60 transition-colors pr-4"
      style={{ "--d": i } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="w-10 sm:w-12 shrink-0 select-none pr-3 sm:pr-4 text-right text-bg3 border-r border-bg2"
      >
        {i}
      </span>
      <span className="pl-3 sm:pl-4 whitespace-pre">{children ?? " "}</span>
    </div>
  );
}

const minimapBars = [
  ["35%", "bg-orange/70"],
  ["55%", "bg-blue/60"],
  ["45%", "bg-green/60"],
  ["60%", "bg-faint/40"],
  ["30%", "bg-yellow/60"],
  ["50%", "bg-blue/60"],
  ["40%", "bg-green/60"],
  ["62%", "bg-faint/40"],
  ["28%", "bg-purple/60"],
  ["48%", "bg-blue/60"],
  ["38%", "bg-green/60"],
  ["52%", "bg-faint/40"],
  ["33%", "bg-orange/70"],
  ["44%", "bg-yellow/60"],
] as const;

export default function Hero() {
  return (
    <section id="top" className="pt-8 md:pt-14 scroll-mt-24" aria-label="Intro">
      {/* prompt breadcrumb above the window */}
      <p className="mb-3 font-mono text-xs sm:text-sm text-faint">
        <span className="text-aqua">guest@recruit</span>
        <span className="text-faint">:</span>
        <span className="text-blue">~</span>
        <span className="text-faint">$</span>{" "}
        <span className="text-dim">cat zamil.ts</span>
        <span className="caret" aria-hidden="true" />
      </p>

      {/* ── editor window ── */}
      <div className="rounded-md border border-bg2 bg-bg0 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* window chrome */}
        <div className="flex items-center gap-2 px-3 sm:px-4 h-9 bg-bg0h border-b border-bg2">
          <span className="w-2.5 h-2.5 rounded-full bg-red/70" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow/70" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-green/70" aria-hidden="true" />
          <p className="ml-2 font-mono text-[11px] text-faint truncate">
            zamil-khan — ~/portfolio
          </p>
          <p className="ml-auto font-mono text-[10px] text-faint hidden sm:block">
            ⚡ tsx · lf
          </p>
        </div>

        {/* tab bar — doubles as navigation */}
        <div
          role="tablist"
          aria-label="Portfolio files"
          className="flex items-end gap-0 overflow-x-auto bg-bg0h border-b border-bg2 px-1"
        >
          {heroTabs.map((tab) => (
            <button
              key={tab.label}
              role="tab"
              aria-selected={tab.active ?? false}
              onClick={() => scrollToId(tab.target)}
              className={`relative shrink-0 px-3 sm:px-4 py-2 font-mono text-xs transition-colors ${
                tab.active
                  ? "bg-bg0 text-fg"
                  : "text-faint hover:text-dim hover:bg-bg1/60"
              }`}
            >
              <span className="mr-1.5 inline-block w-1.5 h-1.5 rounded-full align-middle bg-faint/50" />
              {tab.label}
              {tab.active && (
                <span className="absolute inset-x-0 top-0 h-[2px] bg-yellow" />
              )}
            </button>
          ))}
        </div>

        {/* code pane + minimap */}
        <div className="flex">
          <div className="flex-1 overflow-x-auto py-4 font-mono text-[12.5px] sm:text-sm leading-6">
            <CodeLine i={1}>
              <span className="tk-c">
                {"// zamil.ts — human-readable profile"}
              </span>
            </CodeLine>
            <CodeLine i={2} />
            <CodeLine i={3}>
              <span className="tk-k">const</span> <span className="tk-v">zamil</span>
              <span className="tk-p">:</span> <span className="tk-t">LeadFrontendDev</span>{" "}
              <span className="tk-k">=</span> {"{"}
            </CodeLine>
            <CodeLine i={4}>
              <span className="in1" />
              <span className="tk-p">name</span>
              <span className="tk-p">:</span> <span className="tk-s">"Zamil Khan"</span>,
            </CodeLine>
            <CodeLine i={5}>
              <span className="in1" />
              <span className="tk-p">role</span>
              <span className="tk-p">:</span>{" "}
              <span className="tk-s">"Lead Frontend Developer"</span>,
            </CodeLine>
            <CodeLine i={6}>
              <span className="in1" />
              <span className="tk-p">base</span>
              <span className="tk-p">:</span>{" "}
              <span className="tk-s">"Gurgaon, Haryana, India"</span>,
            </CodeLine>
            <CodeLine i={7}>
              <span className="in1" />
              <span className="tk-p">openTo</span>
              <span className="tk-p">:</span> [<span className="tk-s">"EU relocation"</span>,{" "}
              <span className="tk-s">"remote"</span>],
            </CodeLine>
            <CodeLine i={8}>
              <span className="in1" />
              <span className="tk-p">stack</span>
              <span className="tk-p">:</span> [<span className="tk-s">"React"</span>,{" "}
              <span className="tk-s">"TypeScript"</span>, <span className="tk-s">"Next.js"</span>,{" "}
              <span className="tk-s">"Tailwind"</span>],
            </CodeLine>
            <CodeLine i={9}>
              <span className="in1" />
              <span className="tk-p">exploring</span>
              <span className="tk-p">:</span> <span className="tk-s">"React Native"</span>,
            </CodeLine>
            <CodeLine i={10}>
              <span className="in1" />
              <span className="tk-p">values</span>
              <span className="tk-p">:</span> [<span className="tk-s">"performance"</span>,{" "}
              <span className="tk-s">"accessibility"</span>,{" "}
              <span className="tk-s">"clean energy"</span>],
            </CodeLine>
            <CodeLine i={11}>
              <span className="in1" />
              <span className="tk-p">mentoring</span>
              <span className="tk-p">:</span> <span className="tk-b">true</span>,
            </CodeLine>
            <CodeLine i={12}>
              <span className="in1" />
              <span className="tk-p">hireable</span>
              <span className="tk-p">:</span> <span className="tk-b">true</span>,
            </CodeLine>
            <CodeLine i={13}>
              {"}"} <span className="tk-k">as const</span>;
            </CodeLine>
            <CodeLine i={14} />
            <CodeLine i={15}>
              <span className="tk-k">export default</span>{" "}
              <span className="tk-v">zamil</span>;{" "}
              <span className="tk-c">{"// ✓ compiles on first try"}</span>
              <span className="caret" aria-hidden="true" />
            </CodeLine>
          </div>

          {/* decorative minimap */}
          <div
            aria-hidden="true"
            className="hidden xl:block w-16 shrink-0 border-l border-bg2 bg-bg0h/60 p-2 space-y-1.5"
          >
            {minimapBars.map(([w, c], idx) => (
              <span key={idx} className={`block h-1 rounded-sm ${c}`} style={{ width: w }} />
            ))}
            <span className="block mt-3 h-8 w-full rounded-sm border border-yellow/40 bg-yellow/10" />
          </div>
        </div>

        {/* terminal strip with command CTAs */}
        <div className="border-t border-bg2 bg-bg0h px-3 sm:px-4 py-3 flex flex-wrap items-center gap-2">
          <span className="font-mono text-sm text-faint mr-1 hidden sm:inline">
            <span className="text-aqua">➜</span> <span className="text-yellow">~</span>{" "}
            <span className="text-dim">$</span>
          </span>
          <button
            onClick={() => scrollToId("projects")}
            className="group font-mono text-xs sm:text-sm px-3 py-2 rounded-sm border border-bg3 bg-bg1 text-dim transition-all hover:border-yellow-dim hover:text-yellow hover:-translate-y-0.5"
          >
            <span className="text-green-dim group-hover:text-green">$</span> view-projects{" "}
            <span className="text-faint">--prod</span>
          </button>
          <button
            onClick={downloadResume}
            className="group font-mono text-xs sm:text-sm px-3 py-2 rounded-sm border border-bg3 bg-bg1 text-dim transition-all hover:border-aqua-dim hover:text-aqua hover:-translate-y-0.5"
          >
            <span className="text-green-dim group-hover:text-green">$</span> curl -o resume{" "}
            <span className="text-faint">zamil.md</span>
          </button>
          <button
            onClick={() => scrollToId("contact")}
            className="group font-mono text-xs sm:text-sm px-3 py-2 rounded-sm border border-bg3 bg-bg1 text-dim transition-all hover:border-orange-dim hover:text-orange hover:-translate-y-0.5"
          >
            <span className="text-green-dim group-hover:text-green">$</span> ./contact-me{" "}
            <span className="text-faint">--now</span>
          </button>
        </div>
      </div>

      {/* metrics readout strip */}
      <div className="mt-5 rounded-md border border-bg2 bg-bg0/70 grid grid-cols-2 md:grid-cols-4 overflow-hidden">
        {metrics.map((m, idx) => (
          <div
            key={m.label}
            className={`px-4 py-3.5 group hover:bg-bg1/70 transition-colors border-bg2 ${
              idx % 2 === 1 ? "border-l" : ""
            } ${idx >= 2 ? "max-md:border-t" : ""} ${idx > 0 ? "md:border-l" : ""}`}
          >
            <p className={`font-mono text-2xl font-bold ${m.tone} group-hover:translate-x-0.5 transition-transform`}>
              {m.value}
            </p>
            <p className="mt-0.5 text-[11px] sm:text-xs text-faint leading-snug">{m.label}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center font-mono text-[11px] text-faint">
        {"// "}
        {profile.role.toLowerCase()} · {profile.location} ·{" "}
        <span className="text-green-dim">{profile.openness.toLowerCase()}</span>
      </p>
    </section>
  );
}
