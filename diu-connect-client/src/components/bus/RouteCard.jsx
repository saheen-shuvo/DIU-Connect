"use client";

import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import TimeList from "./TimeList";

function highlightMatch(text, query) {
  if (!query?.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-blue-200 text-primary font-semibold rounded px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function getScheduleForDay(route, day) {
  if (route.schedule?.[day]) return route.schedule[day];
  // backward compatibility with flat shape
  return {
    toDIU: route.toDIU || [],
    fromDIU: route.fromDIU || [],
    remarks: route.remarks || [],
  };
}

export default function RouteCard({ route, highlightQuery, selectedDay }) {
  const [expanded, setExpanded] = useState(false);
  const daySchedule = getScheduleForDay(route, selectedDay);
  const noService =
    (daySchedule.toDIU?.length || 0) === 0 &&
    (daySchedule.fromDIU?.length || 0) === 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-card shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-300 bg-gray-100 px-4 py-3">
        <div>
          <span className="mr-2 inline-block rounded-lg bg-[#0c53a1] text-white px-2 py-0.5 text-xs font-bold text-primary-foreground">
            {route.routeNo}
          </span>
          <span className="font-semibold text-sm">{route.routeName}</span>
        </div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <MapPin className="h-3 w-3" />
          Stops
          <ChevronDown
            className={`h-3 w-3 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Expanded stops */}
      {expanded && (
        <div className="border-b border-gray-300 bg-secondary px-4 py-2">
          <ol className="space-y-1">
            {route.stops.map((stop, i) => (
              <li key={i} className="flex items-center gap-2 text-xs">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                  {i + 1}
                </span>
                <span>{highlightMatch(stop, highlightQuery)}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Times */}
      {noService ? (
        <div className="p-4 text-center text-sm text-muted-foreground text-red-500">
          🚫 No service on this day
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-4 sm:flex-row">
          <TimeList
            times={daySchedule.toDIU || []}
            remarks={daySchedule.remarks || []}
            label="→ To DIU (DSC)"
            direction="to"
          />
          <div className="hidden sm:block w-px bg-border" />
          <div className="block sm:hidden h-px bg-border" />
          <TimeList
            times={daySchedule.fromDIU || []}
            remarks={daySchedule.remarks || []}
            label="← From DIU (DSC)"
            direction="from"
          />
        </div>
      )}
    </div>
  );
}