"use client";

import { useEffect, useRef, useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header>
      <a className="brand company-brand" href="#main" aria-label="Evergreen Transfer home">
        <img
          src="/assets/original-brand.jpg"
          width={374}
          height={100}
          alt="Evergreen Transfer Moving Services Ltd."
        />
        <span className="logo-tagline">Moving families since 1981</span>
      </a>
      <nav id="navigation" aria-label="Main navigation" className={open ? "open" : undefined}>
        <a href="#services" onClick={() => setOpen(false)}>
          Our services
        </a>
        <a href="#care" onClick={() => setOpen(false)}>
          Why Evergreen
        </a>
        <a href="#planner" onClick={() => setOpen(false)}>
          Move planner
        </a>
        <a href="#faq" onClick={() => setOpen(false)}>
          FAQs
        </a>
      </nav>
      <a className="button small" href="#estimate">
        Get a free estimate <span>↗</span>
      </a>
      <button
        ref={menuRef}
        id="menu"
        className="menu"
        type="button"
        aria-expanded={open}
        aria-controls="navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        ☰
      </button>
    </header>
  );
}
