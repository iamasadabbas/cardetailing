"use client";

/** Renders the visitor's current year (the static build year is only the fallback). */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
