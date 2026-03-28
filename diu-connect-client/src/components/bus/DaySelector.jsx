"use client";

import { Calendar } from "lucide-react";

const DAYS = [
  { value: "weekdays", label: "Sat-Thu", short: "Sat–Thu" },
  { value: "friday", label: "Friday", short: "Fri" },
];

export function getTodayType() {
  const day = new Date().getDay(); // 0=Sun ... 6=Sat
  //   console.log(day)
  if (day === 5) return "friday";
  return "weekdays";
}

export default function DaySelector({ selected, onChange }) {
  const today = getTodayType();
  //   console.log(today); //"saturday"

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
      {DAYS.map(({ value, label, short }) => {
        const isSelected = selected === value;
        const isToday = value === today;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`relative whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
              isSelected
                ? "bg-[#0c53a1] text-white shadow-sm"
                : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
            type="button"
          >
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{short}</span>
            {isToday && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
