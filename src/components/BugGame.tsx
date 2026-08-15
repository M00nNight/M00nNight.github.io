import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Reveal, SectionHead } from "./Reveal";

const GAME_SECONDS = 30;

type Phase = "idle" | "running" | "over";
type Bug = { id: number; x: number; y: number; born: number; squashed: boolean };
type LogLine = {
  id: number;
  tone: "cmd" | "ok" | "err" | "warn" | "dim" | "info";
  text: string;
};

const FLAVOR = [
  "info  compiling components…",
  "✔ chunk 7/24 bundled",
  "info  tree-shaking unused exports",
  "✔ types checked — 0 errors (so far)",
  "info  hot reload ready in 142ms",
  "✔ assets optimized",
  "info  linting… no-unused-vars: off (brave)",
  "✔ sourcemaps written",
];

const ESCAPES = [
  "undefined is not a function",
  "Cannot read properties of null",
  "Hydration failed on <Bug />",
  "Maximum call stack size exceeded",
  "418 I'm a teapot (unexpected)",
];

const INTRO: Omit<LogLine, "id">[] = [
  { tone: "dim", text: "fix-the-bug v1.0.0 — recruiter edition" },
  { tone: "info", text: "🐛 bugs will spawn inside the build for ~2s each." },
  { tone: "info", text: "click/tap to squash them before they ship to prod." },
  { tone: "cmd", text: "$ npm run squash-bugs   # when ready" },
];

let lineId = 0;

export default function BugGame({
  onStats,
}: {
  onStats: (s: { squashed: number; missed: number }) => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [lines, setLines] = useState<LogLine[]>(
    INTRO.map((l) => ({ ...l, id: ++lineId })),
  );
  const [flashKey, setFlashKey] = useState(0);

  const bugsRef = useRef<Bug[]>([]);
  const scoreRef = useRef(0);
  const missedRef = useRef(0);
  const idRef = useRef(0);
  const timeoutsRef = useRef<number[]>([]);
  const spawnRef = useRef<number | null>(null);
  const tickRef = useRef<number | null>(null);
  const flavorRef = useRef<number | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>("idle");
  phaseRef.current = phase;

  const sync = () => setBugs([...bugsRef.current]);

  const pushLine = (tone: LogLine["tone"], text: string) =>
    setLines((p) => [...p.slice(-40), { id: ++lineId, tone, text }]);

  const addTimeout = (fn: () => void, ms: number) => {
    const t = window.setTimeout(fn, ms);
    timeoutsRef.current.push(t);
  };

  const clearAll = () => {
    timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    timeoutsRef.current = [];
    if (spawnRef.current) window.clearInterval(spawnRef.current);
    if (tickRef.current) window.clearInterval(tickRef.current);
    if (flavorRef.current) window.clearInterval(flavorRef.current);
    spawnRef.current = tickRef.current = flavorRef.current = null;
  };

  useEffect(() => () => clearAll(), []);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  /* retry with "r" when game over */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phaseRef.current === "over" && (e.key === "r" || e.key === "R")) {
        start();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spawnBug = () => {
    if (phaseRef.current !== "running") return;
    const bug: Bug = {
      id: ++idRef.current,
      x: 8 + Math.random() * 84,
      y: 16 + Math.random() * 68,
      born: performance.now(),
      squashed: false,
    };
    bugsRef.current.push(bug);
    sync();
    addTimeout(() => {
      const live = bugsRef.current.find((b) => b.id === bug.id && !b.squashed);
      if (!live) return;
      bugsRef.current = bugsRef.current.filter((b) => b.id !== bug.id);
      sync();
      missedRef.current += 1;
      setMissed(missedRef.current);
      setFlashKey((f) => f + 1);
      onStats({ squashed: scoreRef.current, missed: missedRef.current });
      pushLine(
        "err",
        `error  bug #${bug.id} escaped → ${ESCAPES[Math.floor(Math.random() * ESCAPES.length)]}`,
      );
    }, 1600 + Math.random() * 600);
  };

  const squash = (bugId: number) => {
    if (phaseRef.current !== "running") return;
    const bug = bugsRef.current.find((b) => b.id === bugId && !b.squashed);
    if (!bug) return;
    bug.squashed = true;
    sync();
    scoreRef.current += 1;
    setScore(scoreRef.current);
    onStats({ squashed: scoreRef.current, missed: missedRef.current });
    const ms = Math.max(1, Math.round(performance.now() - bug.born));
    pushLine("ok", `✔ bug #${bug.id} squashed in ${ms}ms (+1)`);
    addTimeout(() => {
      bugsRef.current = bugsRef.current.filter((b) => b.id !== bugId);
      sync();
    }, 320);
  };

  const endGame = () => {
    clearAll();
    bugsRef.current = [];
    sync();
    setPhase("over");
    const s = scoreRef.current;
    const m = missedRef.current;
    pushLine("dim", "── build finished in 30.0s ──");
    if (s > 0 && m === 0) pushLine("ok", `exit 0 — perfect build. ${s} squashed, none escaped.`);
    else if (s >= 8) pushLine("ok", `exit 0 — ${s} squashed, ${m} escaped. CI is green.`);
    else if (s >= 1) pushLine("warn", `exit 0 — ${s} squashed, ${m} escaped. warnings present.`);
    else pushLine("err", `exit 1 — 0 squashed, ${m} escaped. bugs ship to prod.`);
  };

  const start = () => {
    clearAll();
    scoreRef.current = 0;
    missedRef.current = 0;
    idRef.current = 0;
    bugsRef.current = [];
    setScore(0);
    setMissed(0);
    setBugs([]);
    setTimeLeft(GAME_SECONDS);
    setPhase("running");
    onStats({ squashed: 0, missed: 0 });
    setLines((p) => [
      ...p.slice(-30),
      { id: ++lineId, tone: "cmd", text: "$ npm run squash-bugs" },
      { id: ++lineId, tone: "dim", text: "ci  starting production build… squash on sight." },
    ]);
    spawnBug();
    spawnRef.current = window.setInterval(spawnBug, 750);
    const endAt = performance.now() + GAME_SECONDS * 1000;
    tickRef.current = window.setInterval(() => {
      const left = Math.max(0, (endAt - performance.now()) / 1000);
      setTimeLeft(left);
      if (left <= 0) endGame();
    }, 100);
    flavorRef.current = window.setInterval(() => {
      if (Math.random() < 0.65)
        pushLine("info", FLAVOR[Math.floor(Math.random() * FLAVOR.length)]);
    }, 1700);
  };

  const result = (() => {
    const s = score;
    const m = missed;
    if (phase !== "over") return null;
    if (s >= 15 && m <= 1)
      return {
        emoji: "🎉",
        tone: "text-green",
        msg: `Build passing! ${s} bugs squashed — production is safe. Ship those reflexes.`,
      };
    if (s >= 8)
      return {
        emoji: "✅",
        tone: "text-green",
        msg: `Green build — ${s} squashed, ${m} escaped. CI approves.`,
      };
    if (s >= 1)
      return {
        emoji: "⚠️",
        tone: "text-yellow",
        msg: `Passing with warnings — ${s} squashed, ${m} escaped. Deploy on Friday at your own risk.`,
      };
    return {
      emoji: "❌",
      tone: "text-red",
      msg: `BUILD FAILED — 0 squashed, ${m} escaped. The bugs ship to prod tonight.`,
    };
  })();

  const lamp =
    phase === "running"
      ? { cls: "bg-green lamp-on", label: "building…" }
      : phase === "over"
        ? result && result.tone === "text-red"
          ? { cls: "bg-red", label: "failed" }
          : { cls: "bg-green", label: result ? "done" : "standby" }
        : { cls: "bg-faint", label: "standby" };

  const toneCls: Record<LogLine["tone"], string> = {
    cmd: "text-fg",
    ok: "text-green",
    err: "text-red",
    warn: "text-yellow",
    dim: "text-faint",
    info: "text-dim",
  };

  return (
    <section id="game" className="pt-20 md:pt-28 scroll-mt-20" aria-label="Fix the Bug mini-game">
      <SectionHead
        index="04"
        file="game.sh"
        title="fun_zone: fix the bug"
        comment="recruiter mini-game · no installs, no reloads, just reflexes"
      />

      <Reveal className="rounded-md border border-bg2 bg-bg0 overflow-hidden shadow-[0_24px_70px_-30px_rgba(0,0,0,0.8)]">
        {/* window header */}
        <div className="flex items-center gap-2.5 px-4 h-9 bg-bg0h border-b border-bg2">
          <span className="w-2.5 h-2.5 rounded-full bg-red/70" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow/70" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-green/70" aria-hidden="true" />
          <p className="ml-1.5 font-mono text-[11px] text-faint">ci — production build</p>
          <p className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-dim">
            <span className={`w-2 h-2 rounded-full ${lamp.cls}`} aria-hidden="true" />
            {lamp.label}
          </p>
        </div>

        {/* HUD */}
        <div className="flex items-center gap-3 sm:gap-4 px-4 py-2.5 border-b border-bg2 bg-bg1/60 font-mono text-xs sm:text-sm">
          <p className="text-green whitespace-nowrap" aria-live="polite">
            squashed: <span className="font-bold text-base sm:text-lg">{score}</span>
          </p>
          <div className="flex-1 h-1.5 rounded-full bg-bg2 overflow-hidden" aria-hidden="true">
            <div
              className={`timer-fill h-full rounded-full ${
                timeLeft <= 10 ? "bg-red" : "bg-yellow"
              }`}
              style={{ width: `${(timeLeft / GAME_SECONDS) * 100}%` } as CSSProperties}
            />
          </div>
          <p className="text-dim whitespace-nowrap tabular-nums">
            t-{timeLeft.toFixed(1)}s
          </p>
          <p className={`whitespace-nowrap ${missed > 0 ? "text-red" : "text-faint"}`}>
            errors: <span className="font-bold text-base sm:text-lg">{missed}</span>
          </p>
        </div>

        {/* game screen */}
        <div className="relative h-72 sm:h-80 bg-bg0h scanlines overflow-hidden select-none">
          {/* red flash overlay on escaped bugs */}
          {flashKey > 0 && phase === "running" && (
            <div
              key={flashKey}
              aria-hidden="true"
              className="miss-flash pointer-events-none absolute inset-0 z-20"
            />
          )}
          {/* bugs */}
          {bugs.map((b) => (
            <button
              key={b.id}
              aria-label={`Squash bug ${b.id}`}
              onPointerDown={() => squash(b.id)}
              onClick={() => squash(b.id)}
              className="bug-btn p-2"
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
            >
              <span className={`bug-glyph ${b.squashed ? "bug-squashed" : ""}`} aria-hidden="true">
                🐛
              </span>
            </button>
          ))}
          {/* squash +1 floaters */}
          {bugs
            .filter((b) => b.squashed)
            .map((b) => (
              <span
                key={`p-${b.id}`}
                className="float-plus text-sm font-bold"
                style={{ left: `${b.x}%`, top: `${b.y}%` }}
                aria-hidden="true"
              >
                +1
              </span>
            ))}

          {/* overlays: idle & game-over */}
          {phase !== "running" && (
            <div className="absolute inset-0 z-10 bg-bg0h/90 flex items-center justify-center p-5">
              <div className="text-center max-w-md">
                {phase === "idle" ? (
                  <>
                    <p className="text-4xl mb-3" aria-hidden="true">🐛</p>
                    <h3 className="font-mono text-xl sm:text-2xl font-bold text-fg">
                      fix-the-bug <span className="text-faint font-normal">v1.0.0</span>
                    </h3>
                    <p className="mt-3 text-sm text-dim leading-relaxed">
                      Bugs are escaping into the production build. Squash them before CI goes red —
                      you have <span className="text-yellow font-semibold">30 seconds</span>. Each
                      bug lives ~2s. Miss, and it ships.
                    </p>
                    <button
                      onClick={start}
                      className="mt-5 inline-flex items-center gap-2 font-mono text-sm font-bold px-5 py-2.5 rounded-sm bg-yellow text-bg0h hover:bg-yellow-dim hover:-translate-y-0.5 transition-all shadow-[0_8px_25px_-8px_rgba(250,189,47,0.6)]"
                    >
                      ▶ npm run squash-bugs
                    </button>
                  </>
                ) : (
                  result && (
                    <>
                      <p className="text-4xl mb-3" aria-hidden="true">{result.emoji}</p>
                      <h3 className={`font-mono text-lg sm:text-xl font-bold ${result.tone}`}>
                        {result.msg}
                      </h3>
                      <p className="mt-2 font-mono text-xs text-faint">
                        final: {score} squashed · {missed} escaped · 30.0s
                      </p>
                      <button
                        onClick={start}
                        className="mt-5 inline-flex items-center gap-2 font-mono text-sm font-bold px-5 py-2.5 rounded-sm bg-yellow text-bg0h hover:bg-yellow-dim hover:-translate-y-0.5 transition-all shadow-[0_8px_25px_-8px_rgba(250,189,47,0.6)]"
                      >
                        ↻ npm run retry
                      </button>
                      <p className="mt-2.5 font-mono text-[11px] text-faint">
                        or press <kbd className="px-1.5 py-0.5 rounded-sm border border-bg3 bg-bg2 text-dim">R</kbd>
                      </p>
                    </>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* build log */}
        <div className="border-t border-bg2 bg-bg0h">
          <div className="flex items-center justify-between px-4 py-1.5 border-b border-bg2/70">
            <p className="font-mono text-[10px] text-faint uppercase tracking-wider">
              output — build.log
            </p>
            <p className="font-mono text-[10px] text-faint hidden sm:block">
              $ click the 🐛 before it ships
            </p>
          </div>
          <div
            ref={logRef}
            className="h-32 overflow-y-auto px-4 py-2 font-mono text-[11px] sm:text-xs leading-5"
            aria-live="polite"
            aria-label="Build log"
          >
            {lines.map((l) => (
              <p key={l.id} className={toneCls[l.tone]}>
                {l.text}
              </p>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <p className="mt-4 font-mono text-[11px] text-faint text-center">
          {"// tip: the best frontend engineers squash bugs before users ever see them. prove it."}
        </p>
      </Reveal>
    </section>
  );
}
