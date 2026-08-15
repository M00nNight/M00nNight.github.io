import { certifications, education, jobs } from "../data";
import { Reveal, SectionHead } from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="pt-20 md:pt-28 scroll-mt-20" aria-label="Experience timeline">
      <SectionHead
        index="03"
        file="career.log"
        title="git log --career"
        comment="3 commits · 0 force-pushes · history preserved"
      />

      {/* git log timeline */}
      <div className="relative pl-6 sm:pl-8">
        <span
          aria-hidden="true"
          className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-bg3"
        />
        <ol className="space-y-8">
          {jobs.map((job, idx) => (
            <Reveal as="li" key={job.hash} delay={idx * 90} className="relative">
              {/* commit node */}
              <span
                aria-hidden="true"
                className={`absolute -left-6 sm:-left-8 top-1.5 w-[15px] h-[15px] sm:w-[23px] sm:h-[23px] grid place-items-center`}
              >
                <span
                  className={`block w-2.5 h-2.5 rotate-45 rounded-[2px] border ${
                    idx === 0
                      ? "bg-yellow border-yellow shadow-[0_0_12px_rgba(250,189,47,0.55)]"
                      : "bg-bg2 border-bg3"
                  }`}
                />
              </span>

              <div className="rounded-md border border-bg2 bg-bg0 hover:border-bg3 hover:bg-bg0/80 transition-colors overflow-hidden">
                {/* commit header */}
                <div className="px-4 sm:px-5 pt-4 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-mono text-[12px] sm:text-[13px]">
                  <span className="text-yellow font-bold">commit {job.hash}</span>
                  <span className="text-green-dim">({job.refs})</span>
                  <span className="ml-auto text-faint text-[11px]">{job.period}</span>
                </div>

                <div className="px-4 sm:px-5 pb-4 pt-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-fg">
                    {job.role} <span className="text-faint font-normal">·</span>{" "}
                    <span className="text-yellow-dim">{job.company}</span>
                  </h3>
                  <p className="mt-1 font-mono text-[11px] sm:text-xs text-faint">
                    Author: Zamil Khan &lt;zamilkhan687@gmail.com&gt;
                    <span className="mx-2 text-bg3">|</span>
                    {job.location}
                  </p>

                  {/* commit message */}
                  <div className="mt-3 rounded-sm border-l-2 border-yellow-dim/70 bg-bg1/60 py-2.5 pr-3 pl-3.5">
                    <p className="font-mono text-[13px] sm:text-sm font-medium text-fg">
                      {job.message}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-2 text-[13px] sm:text-sm text-dim leading-relaxed">
                          <span className="text-aqua-dim select-none shrink-0">▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-3 font-mono text-[11px] text-faint">
                    <span className="text-green-dim">✓</span> {job.files}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* git notes: education + certifications */}
      <Reveal className="mt-10">
        <p className="font-mono text-xs text-faint mb-4">
          <span className="text-yellow-dim">$</span> git notes show career{" "}
          <span className="text-bg3">── education &amp; certifications</span>
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-md border border-bg2 bg-bg0 p-5 hover:border-bg3 transition-colors">
            <p className="font-mono text-xs text-blue mb-2">## education</p>
            <p className="text-[15px] font-semibold text-fg">{education.degree}</p>
            <p className="mt-0.5 text-sm text-dim">{education.school}</p>
            <p className="mt-2 font-mono text-[11px] text-faint">{education.period}</p>
          </div>
          <div className="rounded-md border border-bg2 bg-bg0 p-5 hover:border-bg3 transition-colors">
            <p className="font-mono text-xs text-purple mb-2">## certifications</p>
            <ul className="space-y-2.5">
              {certifications.map((c) => (
                <li key={c.name} className="flex items-baseline justify-between gap-3">
                  <span className="text-sm text-dim">
                    <span className="text-yellow-dim mr-1.5">▸</span>
                    {c.name} <span className="text-faint">— {c.issuer}</span>
                  </span>
                  <span className="font-mono text-[11px] text-faint whitespace-nowrap">{c.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
