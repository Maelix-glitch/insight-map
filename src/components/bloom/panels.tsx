import {
  ArrowRight,
  ArrowUpRight,
  Moon,
  Smile,
  Sprout,
  BarChart3,
  Droplet,
  Zap,
  ThumbsUp,
  BookOpen,
} from "lucide-react";
import { ProgressRing } from "./ProgressRing";

const TRACKERS = [
  { label: "Habits", value: "2 / 5", icon: Sprout, color: "var(--habits)", pct: 40 },
  { label: "Mood", value: "6 / 10", icon: Moon, color: "var(--gold)", pct: 60 },
  { label: "Sleep", value: "—", icon: Moon, color: "var(--sleep)", pct: 0 },
  { label: "Study", value: "1.5 / 4h", icon: BarChart3, color: "var(--study)", pct: 38 },
  { label: "Cycle", value: "Day 12", icon: Droplet, color: "var(--cycle)", pct: 43 },
  { label: "Energy", value: "5 / 10", icon: Zap, color: "var(--energy)", pct: 50 },
];

const FOCUS = [
  { n: 1, title: "Daily challenge", sub: "Write for 10 minutes", icon: ThumbsUp },
  { n: 2, title: "Study block", sub: "Stay focused", icon: BarChart3 },
  { n: 3, title: "Evening journal", sub: "Reflect on your day", icon: Moon },
];

const FLOW = [
  { time: "09:00", title: "Daily challenge", sub: "Write for 10 minutes", done: true },
  { time: "14:00", title: "Study block", sub: "Focus time", done: true },
  { time: "18:00", title: "Movement", sub: "Get outside or stretch", done: false },
  { time: "21:00", title: "Evening journal", sub: "Reflect on your day", done: false },
];

const INSIGHTS = [
  {
    icon: Moon,
    color: "var(--sleep)",
    title: "You tend to have a better mood on days you sleep 7h+.",
    sub: "Your average mood is 27% higher when you get enough sleep.",
  },
  {
    icon: BarChart3,
    color: "var(--study)",
    title: "You're more consistent in the evenings.",
    sub: "65% of your completed habits happen after 6 PM.",
  },
  {
    icon: Zap,
    color: "var(--energy)",
    title: "Your energy dips around 3 PM.",
    sub: "A short walk or break usually helps on days like today.",
  },
];

const ACTIVITY = [
  { icon: Smile, color: "var(--mood)", title: "Logged mood", sub: "2 hours ago" },
  { icon: BarChart3, color: "var(--study)", title: "Completed study block", sub: "5 hours ago" },
  { icon: Sprout, color: "var(--habits)", title: "Added a new habit", sub: "Yesterday" },
  { icon: Droplet, color: "var(--cycle)", title: "Logged cycle data", sub: "Yesterday" },
];

export function ProgressPanel() {
  return (
    <section className="panel flex flex-col gap-4 p-5">
      <h2 className="font-display text-xl">Today's progress</h2>
      <div className="mx-auto">
        <ProgressRing value={62} caption="of your daily goals" />
      </div>
      <div className="mt-auto flex items-end justify-between gap-3">
        <p className="font-display text-lg leading-snug text-muted-foreground">
          You're doing well. Keep going.
        </p>
        <button className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-secondary/60 transition-colors hover:border-primary/60">
          <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  );
}

export function FocusPanel() {
  return (
    <section className="panel p-5">
      <header className="flex items-center justify-between">
        <h2 className="font-display text-xl">Today's focus</h2>
        <button className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          Edit
        </button>
      </header>
      <ul className="mt-4 space-y-3">
        {FOCUS.map((f) => {
          const Icon = f.icon;
          return (
            <li key={f.n} className="flex items-center gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-md border border-border bg-secondary/60 text-[11px] text-muted-foreground">
                {f.n}
              </span>
              <Icon className="size-4 text-primary" />
              <span className="min-w-0">
                <span className="block truncate text-sm">{f.title}</span>
                <span className="block truncate text-xs text-muted-foreground">{f.sub}</span>
              </span>
              <span className="ml-auto size-4 rounded-full border border-border" />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function TrackersPanel() {
  return (
    <section className="panel p-5">
      <header className="flex items-center justify-between">
        <h2 className="font-display text-xl">Trackers at a glance</h2>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          View all <ArrowUpRight className="size-3.5" />
        </button>
      </header>
      <ul className="mt-5 grid grid-cols-3 gap-y-6 sm:grid-cols-6">
        {TRACKERS.map((t) => {
          const Icon = t.icon;
          const r = 22;
          const c = 2 * Math.PI * r;
          return (
            <li key={t.label} className="group flex flex-col items-center gap-1.5">
              <span className="relative grid size-[52px] place-items-center transition-transform duration-300 group-hover:scale-105">
                <svg width="52" height="52" className="absolute -rotate-90">
                  <circle cx="26" cy="26" r={r} fill="none" strokeWidth="3" className="stroke-secondary" />
                  <circle
                    cx="26"
                    cy="26"
                    r={r}
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke={t.color}
                    strokeDasharray={c}
                    strokeDashoffset={c - (c * t.pct) / 100}
                  />
                </svg>
                <Icon className="size-4" style={{ color: t.color }} />
              </span>
              <span className="text-[11px]">{t.label}</span>
              <span className="text-[10px] text-muted-foreground">{t.value}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function FlowPanel() {
  return (
    <section className="panel p-5">
      <h2 className="font-display text-xl">Today's flow</h2>
      <ol className="relative mt-4 space-y-5 pl-1">
        {FLOW.map((f, i) => (
          <li key={f.time} className="relative flex gap-4">
            <span className="w-11 pt-0.5 text-[11px] text-muted-foreground">{f.time}</span>
            <span className="relative flex flex-col items-center">
              <span
                className={`size-3 rounded-full border ${
                  f.done ? "border-primary bg-primary" : "border-border bg-transparent"
                }`}
              />
              {i < FLOW.length - 1 ? (
                <span className="mt-1 w-px flex-1 border-l border-dashed border-border" />
              ) : null}
            </span>
            <span className="pb-1">
              <span className="block text-sm">{f.title}</span>
              <span className="block text-xs text-muted-foreground">{f.sub}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function InsightsPanel() {
  return (
    <section className="panel p-5">
      <h2 className="font-display text-xl">Insights for you</h2>
      <ul className="mt-4 space-y-3">
        {INSIGHTS.map((ins) => {
          const Icon = ins.icon;
          return (
            <li
              key={ins.title}
              className="flex gap-3 rounded-xl border border-border bg-secondary/40 p-3 transition-colors hover:border-primary/40"
            >
              <span
                className="node-glow grid size-9 shrink-0 place-items-center rounded-lg border bg-card/70"
                style={{ color: ins.color, borderColor: "currentColor" }}
              >
                <Icon className="size-4" />
              </span>
              <span>
                <span className="block text-[13px] leading-snug">{ins.title}</span>
                <span className="mt-1 block text-[11px] leading-snug text-muted-foreground">
                  {ins.sub}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function ActivityPanel() {
  return (
    <section className="panel p-5">
      <header className="flex items-center justify-between">
        <h2 className="font-display text-xl">Recent activity</h2>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          See all <ArrowUpRight className="size-3.5" />
        </button>
      </header>
      <ul className="mt-4 space-y-4">
        {ACTIVITY.map((a) => {
          const Icon = a.icon;
          return (
            <li key={a.title} className="flex items-center gap-3">
              <span
                className="grid size-8 shrink-0 place-items-center rounded-lg border bg-card/70"
                style={{ color: a.color, borderColor: "currentColor" }}
              >
                <Icon className="size-4" />
              </span>
              <span>
                <span className="block text-[13px]">{a.title}</span>
                <span className="block text-[11px] text-muted-foreground">{a.sub}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function JournalHint() {
  return (
    <p className="flex items-center gap-2 text-xs text-muted-foreground">
      <BookOpen className="size-3.5" /> Journaling streak: 4 days
    </p>
  );
}
