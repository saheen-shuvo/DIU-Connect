"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import SearchBox from "../../components/bus/SearchBox.jsx";
import RouteCard from "../../components/bus/RouteCard.jsx";
import EmptyState from "../../components/bus/EmptyState.jsx";
import DaySelector, { getTodayType } from "../../components/bus/DaySelector.jsx";

const POPULAR_LOCATIONS = [
  { slug: "mirpur", label: "Mirpur" },
  { slug: "uttara", label: "Uttara" },
  { slug: "dhanmondi", label: "Dhanmondi" },
  { slug: "savar", label: "Savar" },
  { slug: "tongi", label: "Tongi" },
  { slug: "ecb", label: "ECB" },
  { slug: "narayanganj", label: "Narayanganj" },
  { slug: "rampura", label: "Rampura" },
];

export default function BusScheduleClient({ schedule }) {
  const [query, setQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState(getTodayType());

  // Only show routes that have service on the selected day
  const activeRoutes = useMemo(() => {
    return schedule.routes.filter((r) => {
      const day = r.schedule?.[selectedDay];
      return day && (day.toDIU.length > 0 || day.fromDIU.length > 0);
    });
  }, [schedule.routes, selectedDay]);

  const filtered = useMemo(() => {
    if (!query.trim()) return activeRoutes;
    const q = query.toLowerCase();
    return activeRoutes.filter((r) =>
      r.stops.some((s) => s.toLowerCase().includes(q))
    );
  }, [query, activeRoutes]);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Bus Schedule</h1>
          <p className="text-sm text-muted-foreground">
            Find your bus to and from Daffodil Smart City
          </p>
          {schedule.scheduleType && (
            <span className="mt-1 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
              📅 {schedule.scheduleType}
            </span>
          )}
        </div>

        <DaySelector selected={selectedDay} onChange={setSelectedDay} />

        <SearchBox
          routes={activeRoutes}
          query={query}
          onQueryChange={setQuery}
        />

        {/* Popular location links */}
        {!query && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Browse by Location
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {POPULAR_LOCATIONS.map(({ slug, label }) => (
                <Link
                  key={slug}
                  href={`/diu-bus-schedule/${slug}`}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-card px-4 py-3 text-sm font-medium shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  {label} → DIU
                </Link>
              ))}
            </div>
          </div>
        )}

        {query && filtered.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <div className="space-y-4">
            {filtered.map((route) => (
              <RouteCard
                key={route.routeNo}
                route={route}
                highlightQuery={query}
                selectedDay={selectedDay}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}