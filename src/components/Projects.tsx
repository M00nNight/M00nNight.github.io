import { projects } from "../data";
import { Reveal, SectionHead } from "./Reveal";

const statusTone: Record<string, string> = {
  green: "text-green",
  aqua: "text-aqua",
};

function WindowDots() {
  return (
    <span className="flex items-center gap-1.5" aria-hidden="true">
      <span className="w-2 h-2 rounded-full bg-red/60" />
      <span className="w-2 h-2 rounded-full bg-yellow/60" />
      <span className="w-2 h-2 rounded-full bg-green/60" />
    </span>
  );
}

export default function Projects() {
  const [corinna, notes] = projects;

  return (
    <section id="projects" className="pt-20 md:pt-28 scroll-mt-20" aria-label="Projects">
      <SectionHead
        index="02"
        file="projects.json"
        title="shipped && maintained"
        comment="two builds, zero abandoned forks"
      />

      <div className="space-y-5">
        {/* ── Corinna AI — feature panel ── */}
        <Reveal
          as="article"
          className="group rounded-md border border-bg2 bg-bg0 overflow-hidden transition-all duration-300 hover:border-yellow-dim/60 hover:shadow-[0_18px_50px_-20px_rgba(215,153,33,0.25)] hover:-translate-y-1"
        >
          <div className="flex items-center gap-3 px-4 h-9 bg-bg0h border-b border-bg2">
            <WindowDots />
            <p className="font-mono text-[11px] text-faint truncate">{corinna.file}</p>
            <p className={`ml-auto font-mono text-[10px] ${statusTone[corinna.status.color]}`}>
              ● {corinna.status.text}
            </p>
          </div>
          <div className="grid lg:grid-cols-[1.5fr_1fr]">
            <div className="p-5 sm:p-7">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-mono text-2xl sm:text-3xl font-bold text-fg group-hover:text-yellow transition-colors">
                  {corinna.name}
                </h3>
                <p className="font-mono text-[11px] text-purple border border-purple/30 bg-purple/10 rounded-full px-2 py-0.5">
                  AI · customer support
                </p>
              </div>
              <p className="mt-1.5 font-mono text-[13px] text-aqua">{corinna.tagline}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-dim">{corinna.description}</p>
              <ul className="mt-4 space-y-1.5">
                {corinna.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-dim">
                    <span className="text-aqua-dim shrink-0 select-none">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {corinna.stack.map((s) => (
                  <li
                    key={s}
                    className="font-mono text-[11px] text-yellow-dim border border-yellow-dim/30 bg-yellow/5 rounded-sm px-2 py-0.5 transition-colors group-hover:border-yellow-dim/50"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            {/* metrics mini-terminal */}
            <div className="border-t lg:border-t-0 lg:border-l border-bg2 bg-bg0h/70 p-5 sm:p-6 flex flex-col justify-center">
              <p className="font-mono text-xs text-faint mb-3">
                <span className="text-aqua">➜</span> <span className="text-yellow">corinna</span>{" "}
                $ measure --impact
              </p>
              <p className="font-mono text-5xl sm:text-6xl font-extrabold text-yellow tracking-tight">
                -40%
              </p>
              <p className="mt-1 text-sm text-dim">{corinna.metric.label}</p>
              <div className="mt-5 space-y-1.5 font-mono text-[12px]">
                <p className="flex justify-between gap-3 text-faint">
                  <span>response</span>
                  <span className="text-green">live ✓</span>
                </p>
                <p className="flex justify-between gap-3 text-faint">
                  <span>auth</span>
                  <span className="text-green">secure ✓</span>
                </p>
                <p className="flex justify-between gap-3 text-faint">
                  <span>api</span>
                  <span className="text-aqua">chatgpt</span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── notes-cli ── */}
        <Reveal
          as="article"
          delay={120}
          className="group rounded-md border border-bg2 bg-bg0 overflow-hidden transition-all duration-300 hover:border-aqua-dim/60 hover:shadow-[0_18px_50px_-20px_rgba(104,157,106,0.25)] hover:-translate-y-1"
        >
          <div className="flex items-center gap-3 px-4 h-9 bg-bg0h border-b border-bg2">
            <WindowDots />
            <p className="font-mono text-[11px] text-faint truncate">{notes.file}</p>
            <p className={`ml-auto font-mono text-[10px] ${statusTone[notes.status.color]}`}>
              ● {notes.status.text}
            </p>
          </div>
          <div className="grid lg:grid-cols-[1.5fr_1fr]">
            <div className="p-5 sm:p-7">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-mono text-2xl sm:text-3xl font-bold text-fg group-hover:text-aqua transition-colors">
                  {notes.name}
                </h3>
                <p className="font-mono text-[11px] text-aqua border border-aqua-dim/40 bg-aqua/10 rounded-full px-2 py-0.5">
                  CLI · Node.js
                </p>
              </div>
              <p className="mt-1.5 font-mono text-[13px] text-aqua">{notes.tagline}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-dim">{notes.description}</p>
              <ul className="mt-4 space-y-1.5">
                {notes.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-dim">
                    <span className="text-green-dim shrink-0 select-none">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {notes.stack.map((s) => (
                  <li
                    key={s}
                    className="font-mono text-[11px] text-aqua-dim border border-aqua-dim/30 bg-aqua/5 rounded-sm px-2 py-0.5 transition-colors group-hover:border-aqua-dim/60"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            {/* usage snippet */}
            <div className="border-t lg:border-t-0 lg:border-l border-bg2 bg-bg0h/70 p-5 sm:p-6 flex flex-col justify-center">
              <p className="font-mono text-xs text-faint mb-3">
                <span className="text-aqua">➜</span> <span className="text-yellow">~</span> $
                notes --help
              </p>
              <pre className="font-mono text-[12px] leading-6 text-dim whitespace-pre-wrap">
                <span className="text-faint">$</span> notes add{" "}
                <span className="text-green">"ship portfolio"</span>
                {"\n"}
                <span className="text-green">✔ saved → ~/notes/ship-portfolio.md</span>
                {"\n"}
                <span className="text-faint">$</span> notes ls --today
                {"\n"}
                <span className="text-yellow">  1 note · 0 lost · exit 0</span>
              </pre>
              <p className="mt-4 font-mono text-[12px] text-faint">
                metric: <span className="text-aqua font-bold">{notes.metric.value}</span>{" "}
                — {notes.metric.label}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
