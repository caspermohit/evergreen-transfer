"use client";

import type { ReactNode } from "react";
import { SERVICE_EVENT } from "@/lib/events";

export function ServiceLink({ service, children }: { service: string; children: ReactNode }) {
  return (
    <a
      href="#estimate"
      onClick={() => {
        window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: service }));
      }}
    >
      {children}
    </a>
  );
}
