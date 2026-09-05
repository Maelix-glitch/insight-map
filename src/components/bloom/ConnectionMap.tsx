import { useMemo, useState } from "react";
import { Info, Moon, Smile, Sprout, BarChart3, Droplet, Zap, ChevronDown } from "lucide-react";

type NodeDef = {
  id: string;
  label: string;
  color: string;
  icon: typeof Moon;
  angle: number;
  strength: number;
  note?: { text: string; side: "left" | "right"; dy: number };
};

/* Everything lives in one square coordinate space so SVG paths and
   the DOM nodes are guaranteed to line up pixel for pixel. */
const SIZE = 340;
const C = SIZE / 2;
const R = 124;

const NODES: NodeDef[] = [
  {
    id: "mood",
    label: "Mood",
    color: "var(--mood)",
    icon: Smile,
    angle: -90,
    strength: 0.82,
    note: { text: "Better sleep often leads to a brighter mood.", side: "right", dy: -128 },
  },
  {
    id: "habits",
    label: "Habits",
    color: "var(--habits)",
    icon: Sprout,
    angle: -30,
    strength: 0.66,
    note: { text: "Consistent habits → higher energy.", side: "right", dy: -34 },
  },
  {
    id: "cycle",
    label: "Cycle",
    color: "var(--cycle)",
    icon: Droplet,
    angle: 30,
    strength: 0.48,
    note: { text: "Tracking your cycle helps you plan better.", side: "right", dy: 58 },
  },
  {
    id: "energy",
    label: "Energy",
    color: "var(--energy)",
    icon: Zap,
    angle: 90,
    strength: 0.74,
    note: { text: "More consistency → better results.", side: "left", dy: 104 },
  },
  {
    id: "study",
    label: "Study",
    color: "var(--study)",
    icon: BarChart3,
    angle: 150,
    strength: 0.58,
    note: { text: "Higher energy improves focus.", side: "left", dy: 22 },
  },
  {
    id: "sleep",
    label: "Sleep",
    color: "var(--sleep)",
    icon: Moon,
    angle: -150,
    strength: 0.9,
    note: { text: "More sleep → higher focus.", side: "left", dy: -70 },
  },
];

/* extra relationships drawn as gentle arcs between two outer nodes */
const CROSS: [string, string][] = [
  ["sleep", "mood"],
  ["habits", "energy"],
  ["energy", "study"],
  ["cycle", "mood"],
];

function pos(angle: number, radius = R) {
  const rad = (angle * Math.PI) / 180;
  return { x: C + Math.cos(rad) * radius, y: C + Math.sin(rad) * radius };
}

/* spoke: starts at the edge of the "You" hub, ends at the edge of the node
   bubble, with a slight bow so nothing looks like a stray straight line */
function spoke(angle: number) {
  const start = pos(angle, 44);
  const end = pos(angle, R - 26);
  const mid = pos(angle - 7, (44 + R - 26) / 2);
  return `M ${start.x} ${start.y} Q ${mid.x} ${mid.y} ${end.x} ${end.y}`;
}

function arcBetween(a: number, b: number) {
  let delta = b - a;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  const p1 = pos(a, R - 26);
  const p2 = pos(b, R - 26);
  const mid = pos(a + delta / 2, R - 26 - Math.abs(delta) * 0.42);
  return `M ${p1.x} ${p1.y} Q ${mid.x} ${mid.y} ${p2.x} ${p2.y}`;
}

export function ConnectionMap() {
  const [active, setActive] = useState<string | null>(null);

  const spokes = useMemo(
    () => NODES.map((n) => ({ ...n, d: spoke(n.angle) })),
    [],
  );

  const crossPaths = useMemo(
    () =>
      CROSS.map(([from, to]) => {
        const a = NODES.find((n) => n.id === from)!;
        const b = NODES.find((n) => n.id === to)!;
        return { from, to, d: arcBetween(a.angle, b.angle) };
      }),
    [],
  );

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

      <div className="relative mx-auto mt-4 w-full max-w-[560px]">
        {/* square stage: SVG + nodes share these exact coordinates */}
        <div
          className="relative mx-auto"
          style={{ width: SIZE, height: SIZE, maxWidth: "100%" }}
        >
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="absolute inset-0 size-full"
            aria-hidden
          >
            <defs>
              <radialGradient id="cm-hub" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </radialGradient>
              {NODES.map((n) => (
                <linearGradient
                  key={n.id}
                  id={`cm-grad-${n.id}`}
                  gradientUnits="userSpaceOnUse"
                  x1={C}
                  y1={C}
                  x2={pos(n.angle).x}
                  y2={pos(n.angle).y}
                >
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
                  <stop offset="100%" stopColor={n.color} stopOpacity="0.85" />
                </linearGradient>
              ))}
            </defs>

            {/* orbit rings */}
            <g className="text-primary/20" fill="none" stroke="currentColor">
              <circle cx={C} cy={C} r={R - 26} strokeWidth={0.6} strokeDasharray="2 8" />
              <circle cx={C} cy={C} r={R - 62} strokeWidth={0.5} opacity={0.6} />
              <circle
                cx={C}
                cy={C}
                r={R + 14}
                strokeWidth={0.5}
                strokeDasharray="1 12"
                opacity={0.5}
              />
            </g>

            <circle cx={C} cy={C} r={R} fill="url(#cm-hub)" className="text-primary" />

            {/* cross relationships */}
            <g fill="none" stroke="currentColor" className="text-primary/45">
              {crossPaths.map((c) => {
                const on = !active || active === c.from || active === c.to;
                return (
                  <path
                    key={`${c.from}-${c.to}`}
                    d={c.d}
                    strokeWidth={on ? 0.9 : 0.6}
                    strokeDasharray="4 8"
                    opacity={on ? 0.7 : 0.12}
                    style={{ animation: "bloom-dash 18s linear infinite" }}
                  />
                );
              })}
            </g>

            {/* spokes */}
            <g fill="none" strokeLinecap="round" className="text-primary">
              {spokes.map((n) => {
                const dim = active !== null && active !== n.id;
                return (
                  <g key={n.id} opacity={dim ? 0.18 : 1}>
                    <path
                      d={n.d}
                      stroke={`url(#cm-grad-${n.id})`}
                      strokeWidth={active === n.id ? 3 : 1.2 + n.strength * 1.4}
                      style={{ transition: "stroke-width 300ms" }}
                    />
                    {/* travelling pulse */}
                    <circle r={active === n.id ? 2.6 : 1.8} fill={n.color}>
                      <animateMotion
                        dur={`${4.6 - n.strength * 1.6}s`}
                        repeatCount="indefinite"
                        path={n.d}
                        keyPoints="0;1"
                        keyTimes="0;1"
                        calcMode="linear"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;1;1;0"
                        dur={`${4.6 - n.strength * 1.6}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* center hub */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: C, top: C }}
          >
            <div
              className="animate-halo absolute -inset-8 rounded-full"
              style={{ background: "var(--gradient-glow)" }}
            />
            <div className="relative grid size-[80px] place-items-center rounded-full border border-primary/40 bg-card/80 font-display text-lg tracking-wide text-foreground">
              You
            </div>
          </div>

          {/* nodes */}
          {NODES.map((n) => {
            const p = pos(n.angle);
            const Icon = n.icon;
            const dim = active !== null && active !== n.id;
            return (
              <button
                key={n.id}
                onMouseEnter={() => setActive(n.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(n.id)}
                onBlur={() => setActive(null)}
                className="absolute flex flex-col items-center gap-1.5 transition-opacity duration-300"
                style={{
                  left: p.x,
                  top: p.y,
                  transform: `translate(-50%, -50%) scale(${active === n.id ? 1.12 : 1})`,
                  transition: "transform 300ms, opacity 300ms",
                  opacity: dim ? 0.4 : 1,
                }}
              >
                <span
                  className="node-glow animate-float grid size-11 place-items-center rounded-full border bg-card/90"
                  style={{ color: n.color, borderColor: "currentColor" }}
                >
                  <Icon className="size-[18px]" />
                </span>
                <span className="whitespace-nowrap text-[11px] text-muted-foreground">
                  {n.label}
                </span>
                <span
                  className="text-[10px] tabular-nums"
                  style={{ color: n.color, opacity: active === n.id ? 1 : 0.55 }}
                >
                  {Math.round(n.strength * 100)}%
                </span>
              </button>
            );
          })}
        </div>

        {/* notes anchored to the panel edges, vertically offset from centre */}
        {NODES.filter((n) => n.note).map((n) => (
          <p
            key={`note-${n.id}`}
            className="absolute hidden max-w-[124px] rounded-lg border border-border bg-secondary/60 px-2.5 py-1.5 text-[10.5px] leading-snug text-muted-foreground transition-opacity duration-300 xl:block"
            style={{
              top: `calc(50% + ${n.note!.dy}px)`,
              [n.note!.side === "left" ? "left" : "right"]: "-18px",
              opacity: active && active !== n.id ? 0.25 : 1,
            }}
          >
            {n.note!.text}
          </p>
        ))}
      </div>
    </section>
  );
}
