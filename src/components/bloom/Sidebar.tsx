import { CalendarCheck, GitBranch, Droplet, Smile, Gift, LifeBuoy } from "lucide-react";
import botanical from "@/assets/sidebar-botanical.jpg";

const NAV = [
  { label: "Today", icon: CalendarCheck },
  { label: "Trackers", icon: GitBranch },
  { label: "Cycle", icon: Droplet },
  { label: "Mood", icon: Smile },
  { label: "Rewards", icon: Gift },
  { label: "Coach", icon: LifeBuoy },
];

export function BloomMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M3 20C3 11.7 7 4 12 4s9 7.7 9 16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Sidebar() {
  return (
    <aside className="relative hidden w-[212px] shrink-0 flex-col justify-between overflow-hidden border-r border-border bg-card/40 py-6 lg:flex">
      <img
        src={botanical}
        alt=""
        loading="lazy"
        width={600}
        height={1200}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] w-full object-cover opacity-45"
      />
      <div className="relative">
        <div className="flex items-center gap-2 px-6 text-foreground">
          <BloomMark />
          <span className="font-display text-2xl tracking-wide">Bloom</span>
        </div>
        <nav className="mt-8 space-y-1 px-3">
          {NAV.map((item, i) => {
            const Icon = item.icon;
            const active = i === 0;
            return (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "border border-border bg-secondary/70 text-foreground"
                    : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                }`}
              >
                <Icon className={`size-4 ${active ? "text-primary" : ""}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <p className="relative px-6 font-display text-lg italic leading-snug text-muted-foreground">
        <span className="mb-3 block h-px w-8 bg-border" />
        A calmer you, a brighter tomorrow.
      </p>
    </aside>
  );
}
