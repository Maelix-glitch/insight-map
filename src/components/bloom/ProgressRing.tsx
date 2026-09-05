export function ProgressRing({
  value,
  size = 168,
  caption,
}: {
  value: number;
  size?: number;
  caption?: string;
}) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <div
        className="animate-halo absolute inset-2 rounded-full"
        style={{ background: "var(--gradient-glow)" }}
      />
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-secondary"
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.13 255)" />
            <stop offset="60%" stopColor="oklch(0.78 0.14 320)" />
            <stop offset="100%" stopColor="oklch(0.9 0.08 340)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke="url(#ringGrad)"
          strokeDasharray={c}
          strokeDashoffset={c - (c * value) / 100}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-3xl leading-none">{value}%</p>
        {caption ? (
          <p className="mt-1 text-[10px] text-muted-foreground">{caption}</p>
        ) : null}
      </div>
    </div>
  );
}
