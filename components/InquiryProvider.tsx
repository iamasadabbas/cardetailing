"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { ServiceOptionValue } from "@/data/inquiry";

type InquiryContextValue = {
  service: ServiceOptionValue | "";
  setService: (value: ServiceOptionValue | "") => void;
  /** Preselect a service and move the visitor to the inquiry form. */
  requestService: (value: ServiceOptionValue) => void;
  /** Increments whenever a CTA preselects a service (used for a visual cue). */
  requestId: number;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [service, setService] = useState<ServiceOptionValue | "">("");
  const [requestId, setRequestId] = useState(0);

  const requestService = useCallback((value: ServiceOptionValue) => {
    setService(value);
    setRequestId((n) => n + 1);
    const target = document.getElementById("contact");
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", "#contact");
    // Move focus to the form heading for keyboard and screen-reader users
    window.setTimeout(
      () => document.getElementById("inquiry-form-title")?.focus({ preventScroll: true }),
      reduce ? 0 : 700
    );
  }, []);

  const value = useMemo(() => ({ service, setService, requestService, requestId }), [service, requestService, requestId]);

  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>;
}

export function useInquiry() {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiry must be used within InquiryProvider");
  return ctx;
}
