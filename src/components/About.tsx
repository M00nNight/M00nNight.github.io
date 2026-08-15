import { profile, skillGroups, type SkillGroup } from "../data";
import { Reveal, SectionHead } from "./Reveal";

const accentDot: Record<string, string> = {
  aqua: "bg-aqua",
  green: "bg-green",
  orange: "bg-orange",
  yellow: "bg-yellow",
  purple: "bg-purple",
};
const accentHover: Record<string, string> = {
  aqua: "hover:border-aqua-dim hover:text-aqua",
  green: "hover:border-green-dim hover:text-green",
  orange: "hover:border-orange-dim hover:text-orange",
  yellow: "hover:border-yellow-dim hover:text-yellow",
  purple: "hover:border-purple/60 hover:text-purple",
};
const accentText: Record<string, string> = {
  aqua: "text-aqua",
  green: "text-green",
  orange: "text-orange",
  yellow: "text-yellow",
  purple: "text-purple",
};

function SkillPanel({ group, delay }: { group: SkillGroup; delay: number }) {
  return (
    <Reveal
      delay={delay}
      className={`rounded-md border border-bg2 bg-bg0 p-4 sm:p-5 hover:border-bg3 transition-colors ${
        group.wide ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <p className="font-mono text-xs text-faint">
          <span className={accentText[group.accent]}>$</span> cat skills/
          <span className="text-dim">{group.file}</span>
        </p>
        <span className="font-mono text-[10px] text-faint border border-bg2 bg-bg1 rounded-full px-2 py-0.5">
          {group.skills.length} pkgs
        </span>
      </div>
      <h3 className={`font-mono text-sm font-bold mb-3 ${accentText[group.accent]}`}>
        {group.title}
      </h3>
      <ul className="flex flex-wrap gap-1.5">
        {group.skills.map((s) => (
          <li key={s}>
            <span
              className={`inline-flex items-center gap-1.5 rounded-sm border border-bg3 bg-bg1 px-2.5 py-1 font-mono text-[12px] text-dim transition-all duration-150 hover:-translate-y-0.5 cursor-default ${accentHover[group.accent]}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${accentDot[group.accent]}`} />
              {s}
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function About() {
  return (
    <section id="about" className="pt-20 md:pt-28 scroll-mt-20" aria-label="About Zamil Khan">
      <SectionHead index="01" file="about.md" title="whoami" comment="markdown preview · rendered with care" />

      <div className="grid lg:grid-cols-[1.55fr_1fr] gap-5">
        {/* prose */}
        <Reveal className="rounded-md border border-bg2 bg-bg0 p-5 sm:p-7">
          <p className="font-mono text-xs text-faint mb-4">
            <span className="text-yellow-dim">#</span> README
          </p>
          <p className="text-[15px] sm:text-base leading-relaxed text-dim">
            I'm <strong className="text-fg font-semibold">Zamil Khan</strong>, a{" "}
            <strong className="text-fg font-semibold">{profile.role}</strong> specializing in{" "}
            <mark className="bg-transparent text-yellow font-semibold">React</mark>,{" "}
            <mark className="bg-transparent text-yellow font-semibold">TypeScript</mark>, and{" "}
            <mark className="bg-transparent text-yellow font-semibold">Tailwind CSS</mark>. I build
            scalable, user-friendly applications — and I care about the whole lifecycle: mentoring
            junior devs, driving frontend architecture, hiring, and code reviews.
          </p>
          <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-dim">
            I'm passionate about{" "}
            <mark className="bg-transparent text-aqua font-medium">performance</mark>,{" "}
            <mark className="bg-transparent text-aqua font-medium">accessibility</mark>, and{" "}
            <mark className="bg-transparent text-green font-medium">
              clean energy &amp; sustainability-focused products
            </mark>{" "}
            — software should be fast for users and kind to the planet.
          </p>
          <div className="mt-6 grid sm:grid-cols-3 gap-px bg-bg2 rounded-sm overflow-hidden border border-bg2">
            {[
              ["mentor()", "guide junior devs to ship with confidence"],
              ["architect()", "drive frontend structure that scales"],
              ["review()", "hiring loops & honest code reviews"],
            ].map(([fn, desc]) => (
              <div key={fn} className="bg-bg1/80 px-3.5 py-3 hover:bg-bg1 transition-colors">
                <p className="font-mono text-xs text-orange">{fn}</p>
                <p className="mt-1 text-xs text-faint leading-snug">{desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* status panel */}
        <Reveal delay={120} className="rounded-md border border-bg2 bg-bg0 overflow-hidden h-fit">
          <div className="px-4 py-2.5 border-b border-bg2 bg-bg0h flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green lamp-on" aria-hidden="true" />
            <p className="font-mono text-xs text-dim">status — live</p>
          </div>
          <dl className="p-4 sm:p-5 space-y-3 font-mono text-[13px]">
            {[
              ["location", profile.location, "text-blue"],
              ["open_to", "relocation (EU) · remote", "text-green"],
              ["exploring", "React Native", "text-yellow"],
              ["focus", "perf · a11y · clean energy", "text-aqua"],
              ["languages", "EN · HI · UR", "text-purple"],
            ].map(([k, v, tone]) => (
              <div key={k as string} className="flex items-baseline gap-2">
                <dt className="text-faint shrink-0 w-24">{k}:</dt>
                <dd className={`${tone} break-words`}>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="px-4 sm:px-5 pb-4 sm:pb-5">
            <p className="font-mono text-[11px] text-faint mb-1.5">
              learning_progress <span className="text-yellow">React Native</span>
            </p>
            <div className="h-1.5 rounded-full bg-bg2 overflow-hidden">
              <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-green-dim to-yellow" />
            </div>
          </div>
        </Reveal>
      </div>

      {/* skills */}
      <div id="skills" className="pt-14 md:pt-16 scroll-mt-24">
        <Reveal className="mb-6">
          <p className="font-mono text-xs md:text-sm text-yellow-dim">
            <span className="text-faint">//</span> 01.1 · tree skills/
          </p>
          <h3 className="mt-2 font-mono text-2xl md:text-3xl font-bold text-fg">
            dependencies<span className="text-yellow">.</span>
            <span className="text-faint text-lg font-normal">installed &amp; battle-tested</span>
          </h3>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-4">
          {skillGroups.map((g, i) => (
            <SkillPanel key={g.id} group={g} delay={(i % 2) * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
