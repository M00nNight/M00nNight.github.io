import { useEffect, useState } from "react";
import { ActivityBar, MobileNav, StatusBar, TitleBar } from "./components/Chrome";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import BugGame from "./components/BugGame";
import Contact from "./components/Contact";

const SECTION_IDS = ["top", "about", "skills", "projects", "experience", "game", "contact"];

export default function App() {
  const [active, setActive] = useState("top");
  const [stats, setStats] = useState({ squashed: 0, missed: 0 });

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-sm focus:bg-yellow focus:px-3 focus:py-1.5 focus:font-mono focus:text-xs focus:font-bold focus:text-bg0h"
      >
        skip to content
      </a>

      <TitleBar />
      <ActivityBar active={active} />
      <MobileNav active={active} />

      <main className="pt-10 lg:pt-10 pb-14 lg:pl-14">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <BugGame onStats={setStats} />
          <Contact />
        </div>
      </main>

      <StatusBar active={active} squashed={stats.squashed} missed={stats.missed} />
    </div>
  );
}
