"use client";

import { useMemo } from "react";
import { Clock } from "lucide-react";

function getNextBusIndex(times = []) {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  for (let i = 0; i < times.length; i++) {
    const [h, m] = (times[i] || "").split(":").map(Number);
    if (Number.isFinite(h) && Number.isFinite(m) && h * 60 + m > nowMinutes) {
      return i;
    }
  }
  return -1;
}

function formatTime12h(t = "") {
  const [h, m] = t.split(":").map(Number);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return t;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = ((h + 11) % 12) + 1; // converts 0->12, 13->1, etc.
  const paddedMinutes = m.toString().padStart(2, "0");
  return `${hour12}:${paddedMinutes} ${period}`;
}

export default function TimeList({ times = [], remarks = [], label, direction }) {
  const nextIdx = useMemo(() => getNextBusIndex(times), [times]);
  const allPassed = nextIdx === -1;

  return (
    <div className="flex-1 min-w-0">
      <h4
        className={`mb-2 text-xs font-semibold uppercase tracking-wide ${
          direction === "to" ? "text-[#0c53a1]" : "text-[#3ab252]"
        }`}
      >
        {label}
      </h4>
      <div className="space-y-1.5">
        {times.map((t, i) => {
          const isNext = i === nextIdx;
          const statusClass =
            isNext
              ? "bg-primary/10 font-semibold text-primary border border-gray-300"
              : i < nextIdx || allPassed
              ? "text-muted-foreground line-through opacity-60"
              : "text-foreground";

          return (
            <div
              key={`${direction}-${i}-${t}`}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${statusClass}`}
            >
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span>{formatTime12h(t)}</span>
              {isNext && (
                <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                  NEXT
                </span>
              )}
              {remarks[i] && (
                <span className="ml-auto text-[10px] text-muted-foreground italic">
                  {remarks[i]}
                </span>
              )}
            </div>
          );
        })}
        {allPassed && (
          <p className="mt-1 text-xs text-destructive font-medium text-red-500">No more buses today</p>
        )}
      </div>
    </div>
  );
}