"use client";

import { SearchX } from "lucide-react";

export default function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <SearchX className="h-12 w-12 text-muted-foreground/50 mb-4" />
      <h3 className="text-lg font-semibold text-foreground">No routes found</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-xs">
        No bus routes match{" "}
        <span className="font-medium text-foreground">&quot;{query}&quot;</span>. Try a different stop name.
      </p>
    </div>
  );
}