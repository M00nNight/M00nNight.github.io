import { useEffect, useState } from "react";
import { navItems } from "../data";

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ block: "start" });
};

/* ── inline icons (stroke = currentColor) ─────────────── */
const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Icons: Record<string, JSX.Element> = {
  user: (
    <svg viewBox="0 0 24 24" width="20" height="20" {...iconProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
    </svg>
  ),
  braces: (
    <svg viewBox="0 0 24 24" width="20" height="20" {...iconProps}>
      <path d="M8 3H7a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h1" />
      <path d="M16 3h1a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-1" />
    </svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" width="20" height="20" {...iconProps}>
      <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
      <path d="M3 8l9 5 9-5" />
      <path d="M12 13v9" />
    </svg>
  ),
  commit: (
    <svg viewBox="0 0 24 24" width="20" height="20" {...iconProps}>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M2.5 12h6M15.5 12h6" />
    </svg>
  ),
  bug: (
    <svg viewBox="0 0 24 24" width="20" height="20" {...iconProps}>
      <path d="M8.5 3L10 5.5M15.5 3L14 5.5" />
      <rect x="7.5" y="6.5" width="9" height="13" rx="4.5" />
      <path d="M7.5 11H3.5M7.5 15.5H4.5M20.5 11h-4M19.5 15.5h-3M12 6.5v13" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="20" height="20" {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7.5l9 6 9-6" />
    </svg>
  ),
  branch: (
    <svg viewBox="0 0 24 24" width="13" height="13" {...iconProps}>
      <circle cx="6" cy="5" r="2.2" />
      <circle cx="6" cy="19" r="2.2" />
      <circle cx="18" cy="8" r="2.2" />
      <path d="M6 7.5v9M18 10.5c0 3-4 3.5-7 3.5H8.5" />
    </svg>
  ),
};

const iconFor: Record<string, string> = {
  about: "user",
  skills: "braces",
  projects: "box",
  experience: "commit",
  game: "bug",
  contact: "mail",
};

/* ── Title bar ────────────────────────────────────────── */
export function TitleBar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-10 border-b border-bg2 bg-bg0h flex items-center px-3 sm:px-4 gap-3">
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className="w-3 h-3 rounded-full bg-red/80 hover:bg-red transition-colors" />
        <span className="w-3 h-3 rounded-full bg-yellow/80 hover:bg-yellow transition-colors" />
        <span className="w-3 h-3 rounded-full bg-green/80 hover:bg-green transition-colors" />
      </div>
      <p className="absolute left-1/2 -translate-x-1/2 font-mono text-[11px] sm:text-xs text-faint truncate max-w-[55vw] text-center">
        zamil-khan — portfolio —{" "}
        <span className="text-dim hidden sm:inline">Visual Studio Code</span>
        <span className="sm:hidden">VS Code</span>
      </p>
      <p className="ml-auto hidden md:flex items-center gap-1.5 font-mono text-[11px] text-dim">
        <span className="text-aqua-dim">{Icons.branch}</span> main*
        <span className="text-faint">·</span>
        <span className="text-green">✓ synced</span>
      </p>
      <p className="ml-auto md:ml-0 flex items-center gap-1.5 font-mono text-[11px] text-dim md:hidden">
        <span className="text-aqua-dim">{Icons.branch}</span> main*
      </p>
    </header>
  );
}

/* ── Activity bar (desktop nav) ───────────────────────── */
export function ActivityBar({ active }: { active: string }) {
  return (
    <nav
      aria-label="Section navigation"
      className="hidden lg:flex fixed left-0 inset-y-0 z-40 w-14 flex-col items-center pt-16 pb-12 gap-1.5 border-r border-bg2 bg-bg0h/95"
    >
      {navItems.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollToId(item.id)}
            aria-label={`Go to ${item.file}`}
            aria-current={isActive ? "true" : undefined}
            className={`group relative w-11 h-11 grid place-items-center rounded-md transition-colors ${
              isActive
                ? "text-yellow"
                : "text-faint hover:text-fg hover:bg-bg1"
            }`}
          >
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r bg-yellow" />
            )}
            {Icons[iconFor[item.id]]}
            <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm border border-bg3 bg-bg2 px-2 py-1 font-mono text-[11px] text-fg opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 z-50">
              {item.file}
            </span>
          </button>
        );
      })}
      <span className="mt-auto font-mono text-[10px] text-bg3 select-none [writing-mode:vertical-rl]">
        v2.0.26
      </span>
    </nav>
  );
}

/* ── Mobile nav strip ─────────────────────────────────── */
export function MobileNav({ active }: { active: string }) {
  return (
    <nav
      aria-label="Section navigation"
      className="lg:hidden sticky top-10 z-40 border-b border-bg2 bg-bg0h/95 backdrop-blur-sm overflow-x-auto"
    >
      <div className="flex items-center gap-1 px-3 py-2 w-max">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToId(item.id)}
              aria-current={isActive ? "true" : undefined}
              className={`whitespace-nowrap rounded-sm border px-2.5 py-1 font-mono text-xs transition-colors ${
                isActive
                  ? "border-bg3 bg-bg1 text-yellow"
                  : "border-transparent text-faint hover:text-fg hover:bg-bg1"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ── Status bar ───────────────────────────────────────── */
const fileFor: Record<string, string> = {
  top: "zamil.ts",
  ...Object.fromEntries(navItems.map((n) => [n.id, n.file])),
};

export function StatusBar({
  active,
  squashed,
  missed,
}: {
  active: string;
  squashed: number;
  missed: number;
}) {
  const [now, setNow] = useState("");
  const [ln, setLn] = useState(1);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setLn(Math.floor(window.scrollY / 6) + 1),
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearInterval(id);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <footer className="fixed bottom-0 inset-x-0 z-50 h-7 border-t border-bg2 bg-bg1 flex items-center justify-between gap-3 px-3 font-mono text-[11px] text-dim">
      <div className="flex items-center gap-3 min-w-0">
        <span className="flex items-center gap-1 text-blue">
          {Icons.branch} main*
        </span>
        <span className={`hidden sm:inline ${squashed > 0 ? "text-green" : "text-faint"}`}>
          ✓ {squashed}
        </span>
        <span className={`hidden sm:inline ${missed > 0 ? "text-red" : "text-faint"}`}>
          ⚠ {missed}
        </span>
        <span className="truncate text-faint hidden md:inline">
          portfolio / {fileFor[active] ?? "zamil.ts"}
        </span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden sm:inline text-faint">IST {now}</span>
        <span className="hidden md:inline text-faint">Ln {ln}, Col 1</span>
        <span className="text-faint">UTF-8</span>
        <span className="text-green">✓ prettier</span>
      </div>
    </footer>
  );
}
