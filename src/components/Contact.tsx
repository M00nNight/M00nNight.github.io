import { useRef, useState } from "react";
import { profile } from "../data";
import { Reveal, SectionHead } from "./Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = profile.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    if (copyTimer.current) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="pt-20 md:pt-28 scroll-mt-20" aria-label="Contact">
      <SectionHead
        index="05"
        file="contact.sh"
        title="open a channel"
        comment="response time: < 24h · no cold-email firewall"
      />

      <Reveal className="rounded-md border border-bg2 bg-bg0 overflow-hidden">
        <div className="flex items-center gap-2.5 px-4 h-9 bg-bg0h border-b border-bg2">
          <span className="w-2.5 h-2.5 rounded-full bg-red/70" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow/70" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-green/70" aria-hidden="true" />
          <p className="ml-1.5 font-mono text-[11px] text-faint">zsh — 80×24</p>
        </div>

        <div className="p-5 sm:p-8">
          <p className="font-mono text-xs sm:text-sm text-faint">
            <span className="text-aqua">➜</span> <span className="text-yellow">~</span>{" "}
            <span className="text-dim">$ echo $BEST_WAY_TO_REACH_ME</span>
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-xl sm:text-3xl md:text-4xl font-bold text-yellow underline decoration-bg3 decoration-2 underline-offset-8 hover:decoration-yellow transition-colors break-all"
            >
              {profile.email}
            </a>
            <button
              onClick={copyEmail}
              className={`font-mono text-xs px-3 py-2 rounded-sm border transition-all ${
                copied
                  ? "border-green-dim text-green bg-green/10"
                  : "border-bg3 bg-bg1 text-dim hover:border-yellow-dim hover:text-yellow"
              }`}
              aria-live="polite"
            >
              {copied ? "✓ copied to clipboard" : "$ copy"}
            </button>
          </div>

          {/* channel list */}
          <ul className="mt-7 space-y-2.5 font-mono text-sm">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="group flex flex-wrap items-baseline gap-x-2 text-dim hover:text-fg transition-colors"
              >
                <span className="text-green-dim group-hover:text-green">$</span> mail --send
                <span className="text-faint">--to zamil --subject "let's build"</span>
                <span className="opacity-0 group-hover:opacity-100 text-yellow transition-opacity">↗</span>
              </a>
            </li>
            <li>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-wrap items-baseline gap-x-2 text-dim hover:text-fg transition-colors"
              >
                <span className="text-green-dim group-hover:text-green">$</span> open{" "}
                <span className="text-blue">{profile.linkedin}</span>
                <span className="text-faint">--network</span>
                <span className="opacity-0 group-hover:opacity-100 text-yellow transition-opacity">↗</span>
              </a>
            </li>
            <li>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-wrap items-baseline gap-x-2 text-dim hover:text-fg transition-colors"
              >
                <span className="text-green-dim group-hover:text-green">$</span> git clone{" "}
                <span className="text-blue">github.com/{profile.github}</span>
                <span className="opacity-0 group-hover:opacity-100 text-yellow transition-opacity">↗</span>
              </a>
            </li>
          </ul>

          {/* availability banner */}
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-sm border border-green-dim/40 bg-green/5 px-4 py-3">
            <span className="w-2 h-2 rounded-full bg-green lamp-on shrink-0" aria-hidden="true" />
            <p className="font-mono text-[13px] text-green">
              status: <span className="font-bold">open to work</span>
            </p>
            <p className="text-[13px] text-dim">
              Lead Frontend roles · {profile.openness.toLowerCase()} · base: {profile.location}
            </p>
          </div>

          <p className="mt-4 font-mono text-[11px] text-faint">
            {"// especially keen on clean energy & sustainability teams — let's make fast software that does good."}
          </p>
        </div>
      </Reveal>

      {/* footer */}
      <footer className="mt-14 pb-2 border-t border-bg2 pt-5 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-faint">
        <p>
          <span className="text-bg3">/*</span> © 2026 {profile.name} — designed &amp; built like a
          codebase <span className="text-bg3">*/</span>
        </p>
        <p className="flex items-center gap-3">
          <span className="text-green">exit code 0</span>
          <button
            onClick={() => window.scrollTo({ top: 0 })}
            className="text-dim hover:text-yellow transition-colors"
          >
            cd ~ <span aria-hidden="true">↑</span>
            <span className="sr-only">back to top</span>
          </button>
        </p>
      </footer>
    </section>
  );
}
