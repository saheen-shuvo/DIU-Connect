"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, X, ChevronDown } from "lucide-react";

const POPULAR_STOPS = ["Mirpur", "Uttara", "Dhanmondi", "ECB", "Pallabi", "Savar"];

export default function SearchBox({ routes, query, onQueryChange }) {
  const [focused, setFocused] = useState(false);
  const [showPopular, setShowPopular] = useState(false);
  const wrapperRef = useRef(null);

  const allStops = useMemo(() => {
    const set = new Set();
    routes.forEach((r) => r.stops.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [routes]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allStops.filter((s) => s.toLowerCase().includes(q)).slice(0, 8);
  }, [query, allStops]);

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setFocused(false);
        setShowPopular(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto space-y-2">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search pickup point (e.g., Mirpur, Uttara, ECB)"
          className="w-full rounded-xl border border-gray-200 bg-card py-3 pl-10 pr-10 text-sm shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Autocomplete dropdown */}
      {focused && suggestions.length > 0 && (
        <ul className="absolute z-20 bg-white mt-0 w-full rounded-xl border border-gray-200  shadow-lg overflow-hidden">
          {suggestions.map((s) => (
            <li key={s}>
              <button
                type="button"
                className="w-full px-4 py-2.5 text-left text-sm hover:bg-secondary transition-colors"
                onMouseDown={() => {
                  onQueryChange(s);
                  setFocused(false);
                }}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Popular stops */}
      <div>
        <button
          type="button"
          onClick={() => setShowPopular(!showPopular)}
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronDown
            className={`h-3 w-3 transition-transform ${showPopular ? "rotate-180" : ""}`}
          />
          Popular Stops
        </button>
        {showPopular && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {POPULAR_STOPS.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => onQueryChange(s)}
                className="rounded-full bg-blue-200 px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-blue-300 hover:text-primary-foreground transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}