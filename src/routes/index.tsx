import { createFileRoute } from "@tanstack/react-router";
import { Search, Bell, CalendarCheck, GitBranch, Droplet, Smile, Gift, LifeBuoy } from "lucide-react";

import { Sidebar, BloomMark } from "@/components/bloom/Sidebar";
import { ConnectionMap } from "@/components/bloom/ConnectionMap";
import {
  ProgressPanel,
  FocusPanel,
  TrackersPanel,
  FlowPanel,
  InsightsPanel,
  ActivityPanel,
} from "@/components/bloom/panels";
import windowDusk from "@/assets/window-dusk.jpg";
import leafDark from "@/assets/leaf-dark.jpg";

const TITLE = "Bloom — A more intentional day, everywhere";
const DESCRIPTION =
  "Bloom is a calm daily companion: track mood, sleep, habits, study, cycle and energy, and see how they connect in one living map.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const MOBILE_NAV = [
  { label: "Today", icon: CalendarCheck },
  { label: "Trackers", icon: GitBranch },
  { label: "Cycle", icon: Droplet },
  { label: "Mood", icon: Smile },
  { label: "Rewards", icon: Gift },
  { label: "Coach", icon: LifeBuoy },
];

function Index() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="min-w-0 flex-1 px-4 pb-24 pt-5 sm:px-7 lg:pb-8">
        {/* top bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 lg:hidden">
            <BloomMark />
            <span className="font-display text-xl">Bloom</span>
          </div>
          <p className="hidden text-xs text-muted-foreground lg:block">Sat, September 5</p>
          <div className="flex items-center gap-2">
            <button className="grid size-9 place-items-center rounded-full border border-border bg-secondary/50 text-muted-foreground transition-colors hover:text-foreground">
              <Search className="size-4" />
            </button>
            <button className="relative grid size-9 place-items-center rounded-full border border-border bg-secondary/50 text-muted-foreground transition-colors hover:text-foreground">
              <Bell className="size-4" />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-cycle" />
            </button>
            <span className="grid size-9 place-items-center rounded-full border border-primary/40 bg-accent/60 text-xs">
              M
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground lg:hidden">Sat, September 5</p>

        {/* hero */}
        <header className="animate-rise mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <h1 className="font-display text-4xl leading-tight sm:text-5xl">
              Good morning, <em className="text-gradient not-italic italic">Maelix.</em>
            </h1>
            <p className="mt-1 font-display text-2xl text-muted-foreground sm:text-3xl">
              Three things left to shape your day.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="chip">
                <Smile className="size-4 text-habits" /> Calmer mind
              </span>
              <span className="chip">
                <Droplet className="size-4 text-sleep" /> Better habits
              </span>
              <span className="chip">
                <Gift className="size-4 text-cycle" /> A more intentional you
              </span>
            </div>
          </div>

          <figure className="relative hidden overflow-hidden rounded-2xl border border-border lg:block">
            <img
              src={windowDusk}
              alt="A journal open on a desk beside a window at dusk"
              width={928}
              height={720}
              className="h-full w-full object-cover"
            />
            <figcaption className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-background/90 via-background/20 to-background/70 p-4">
              <span className="font-display text-sm italic leading-snug text-muted-foreground">
                Discipline today, freedom tomorrow.
                <span className="mt-2 block h-px w-8 bg-border" />
              </span>
              <span className="font-display text-2xl leading-snug">
                Same person. A more intentional day.
              </span>
            </figcaption>
          </figure>
        </header>

        {/* main grid */}
        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-[240px_minmax(0,1fr)]">
              <ProgressPanel />
              <ConnectionMap />
            </div>
            <TrackersPanel />
            <div className="grid gap-5 md:grid-cols-2">
              <FlowPanel />
              <InsightsPanel />
            </div>
          </div>

          <div className="grid gap-5 lg:content-start">
            <FocusPanel />
            <figure className="relative overflow-hidden rounded-2xl border border-border">
              <img
                src={leafDark}
                alt="A single green leaf lit against darkness"
                loading="lazy"
                width={992}
                height={672}
                className="h-44 w-full object-cover"
              />
              <figcaption className="absolute inset-0 flex items-start bg-gradient-to-r from-background/95 via-background/60 to-transparent p-4 font-display text-xl leading-snug">
                Small steps every day lead to big changes.
              </figcaption>
            </figure>
            <ActivityPanel />
          </div>
        </div>

        <footer className="mt-10 hidden items-center justify-center gap-6 text-[11px] tracking-[0.3em] text-muted-foreground lg:flex">
          <span className="font-display text-base tracking-[0.5em]">BLOOM</span>
          <span className="h-px w-16 bg-border" />
          <span>A MORE INTENTIONAL DAY, EVERYWHERE</span>
        </footer>
      </main>

      {/* mobile nav */}
      <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-around border-t border-border bg-card/90 px-2 py-2 backdrop-blur-xl lg:hidden">
        {MOBILE_NAV.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-[10px] ${
                i === 0 ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="size-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
