import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const Tag = as as unknown as "div";
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ "--rd": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

export function SectionHead({
  index,
  file,
  title,
  comment,
}: {
  index: string;
  file: string;
  title: string;
  comment?: string;
}) {
  return (
    <Reveal className="mb-8 md:mb-10">
      <p className="font-mono text-xs md:text-sm text-yellow-dim">
        <span className="text-faint">//</span> {index} · {file}
      </p>
      <h2 className="mt-2 font-mono text-3xl md:text-4xl font-bold tracking-tight text-fg">
        {title}
        <span className="text-yellow">_</span>
      </h2>
      {comment && (
        <p className="mt-2 font-mono text-sm text-faint"># {comment}</p>
      )}
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-yellow-dim to-transparent" />
    </Reveal>
  );
}
