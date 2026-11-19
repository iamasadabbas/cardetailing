"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { ServiceOptionValue } from "@/data/inquiry";
import { useInquiry } from "@/components/InquiryProvider";

type Props = {
  service: ServiceOptionValue;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">;

/**
 * Anchor to the inquiry form that preselects a service. Without JS it
 * still works as a plain "#contact" link.
 */
export function InquiryLink({ service, children, ...rest }: Props) {
  const { requestService } = useInquiry();
  return (
    <a
      href="#contact"
      onClick={(e) => {
        e.preventDefault();
        requestService(service);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
