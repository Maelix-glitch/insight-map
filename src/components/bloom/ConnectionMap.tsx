import { useState } from "react";
import { Info, Moon, Smile, Sprout, BarChart3, Droplet, Zap, ChevronDown } from "lucide-react";

type Node = {
  id: string;
  label: string;
  color: string;
  icon: typeof Moon;
  angle: number;
  note?: { text: string; side: "left" | "right"; dy: number };
};

const R = 118;

const NODES: Node[] = [
  {
    id: "mood",
    label: "Mood",
    color: "var(--mood)",
    icon: Smile,
    angle: -90,
    note: { text: "Better sleep often leads to a brighter mood.", side: "right", dy: -34 },
  },
  {
    id: "habits",
    label: "Habits",
    color: "var(--habits)",
    icon: Sprout,
    angle: -30,
    note: { text: "Consistent habits → higher energy.", side: "right", dy: 18 },
  },
  {
    id: "cycle",
    label: "Cycle",
    color: "var(--cycle)",
    icon: Droplet,
    angle: 30,
    note: { text: "Tracking your cycle helps you plan better.", side: "right", dy: 74 },
  },
  {
    id: "energy",
    label: "Energy",
    color: "var(--energy)",
    icon: Zap,
    angle: 90,
    note: { text: "More consistency → better results.", side: "left", dy: 120 },
  },
  {
    id: "study",
    label: "Study",
    color: "var(--study)",
    icon: BarChart3,
    angle: 150,
    note: { text: "Higher energy improves focus.", side: "left", dy: 60 },
  },
  {
    id: "sleep",
    label: "Sleep",
    color: "var(--sleep)",
    icon: Moon,
    angle: -150,
    note: { text: "More sleep → higher focus.", side: "left", dy: 0 },
  },
];

function pos(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: Math.cos(rad) * R, y: Math.sin(rad) * R };
}

export function ConnectionMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="panel relative overflow-hidden p-5">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-xl">
          Your connection map
          <Info className="size-3.5 text-muted-foreground" />
        </h2>
        <button className="chip text-xs">
          Today <ChevronDown className="size-3.5" />
        </button>
      </header>

      <div className="relative mx-auto mt-4 h-[340px] w-full max-w-[440px]">
        {/* links */}
        <svg viewBox="-160 -160 320 320" className="absolute inset-0 size-full overflow-visible">
          <g stroke="currentColor" className="text-primary/35" fill="none">
            {NODES.map((n) => {
              const p = pos(n.angle);
              const dim = active && active !== n.id;
              return (
                <line
                  key={n.id}
                  x1={0}
                  y1={0}
                  x2={p.x}
                  y2={p.y}
                  strokeWidth={active === n.id ? 1.6 : 0.9}
                  opacity={dim ? 0.15 : 1}
                />
              );
            })}
            {NODES.map((n, i) => {
              const a = pos(n.angle);
              const b = pos(NODES[(i + 1) % NODES.length]?.angle ?? 0);
              return (
                <line
                  key={`ring-${n.id}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  strokeWidth={0.6}
                  strokeDasharray="3 7"
                  opacity={active ? 0.2 : 0.5}
                  style={{ animation: "bloom-dash 14s linear infinite" }}
                />
              );
            })}
          </g>
        </svg>

        {/* center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="animate-halo absolute -inset-8 rounded-full"
            style={{ background: "var(--gradient-glow)" }}
          />
          <div className="relative grid size-[86px] place-items-center rounded-full border border-primary/40 bg-card/80 font-display text-lg tracking-wide text-foreground">
            You
          </div>
        </div>

        {/* nodes */}
        {NODES.map((n) => {
          const p = pos(n.angle);
          const Icon = n.icon;
          const dim = active && active !== n.id;
          return (
            <button
              key={n.id}
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive(null)}
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 transition-all duration-300"
              style={{
                transform: `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px)) scale(${active === n.id ? 1.1 : 1})`,
                opacity: dim ? 0.45 : 1,
              }}
            >
              <span
                className="node-glow animate-float grid size-11 place-items-center rounded-full border bg-card/90"
                style={{ color: n.color, borderColor: "currentColor" }}
              >
                <Icon className="size-[18px]" />
              </span>
              <span className="text-[11px] text-muted-foreground">{n.label}</span>
            </button>
          );
        })}

        {/* notes */}
        {NODES.filter((n) => n.note).map((n) => (
          <p
            key={`note-${n.id}`}
            className="absolute hidden max-w-[132px] rounded-lg border border-border bg-secondary/60 px-2.5 py-1.5 text-[10.5px] leading-snug text-muted-foreground transition-opacity duration-300 lg:block"
            style={{
              top: `calc(50% + ${n.note!.dy}px)`,
              [n.note!.side === "left" ? "left" : "right"]: "-8px",
              opacity: active && active !== n.id ? 0.3 : 1,
            }}
          >
            {n.note!.text}
          </p>
        ))}
      </div>
    </section>
  );
}
