"use client";

import { useState } from "react";
import { useDialog } from "@/components/use-dialog";

export function Footer() {
  const [open, setOpen] = useState(false);
  const dialogRef = useDialog(open, () => setOpen(false));

  return (
    <>
      <footer>
        <div className="footer-top">
          <a href="#main" className="brand company-brand" aria-label="Evergreen Transfer home">
            <img
              src="/assets/original-brand.jpg"
              width={374}
              height={100}
              alt="Evergreen Transfer Moving Services Ltd."
            />
            <span className="logo-tagline">Moving families since 1981</span>
          </a>
          <p>
            Moving families.
            <br />
            Making new beginnings.
          </p>
          <div>
            <a href="#services">Services</a>
            <a href="#packing">Packing guide</a>
            <a href="#faq">FAQs</a>
          </div>
          <div>
            <a href="#estimate">Free estimate</a>
            <button id="privacy-button" type="button" onClick={() => setOpen(true)}>
              Privacy & this preview
            </button>
            <a href="https://www.evergreentransfer.ca/" target="_blank" rel="noopener noreferrer">
              Original website ↗
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © <span id="year" suppressHydrationWarning>{new Date().getFullYear()}</span> Evergreen Transfer ·
            Redesign concept
          </span>
          <span>Rooted in Waterloo Region. Moving across Ontario.</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
      <dialog ref={dialogRef} id="privacy-dialog">
        <button className="dialog-close" type="button" aria-label="Close privacy information" onClick={() => setOpen(false)}>
          ×
        </button>
        <h2>
          Your details.
          <br />
          <em>Your choice.</em>
        </h2>
        <p>
          This is a private redesign concept, not Evergreen’s booking system. Your form entries stay
          on this page until you choose to open your email app or copy them. They are not saved by
          the site.
        </p>
        <p>
          No analytics or advertising trackers are included. Fonts are served with this website.
          Hosting may keep operational access logs. The packing checklist lasts only for this visit.
        </p>
        <p>
          After you send an email, Evergreen’s handling of it is governed by its own policies. The
          original contact page states that consumer information is not shared, traded or sold to
          third parties.
        </p>
        <a
          className="text-link"
          href="https://www.evergreentransfer.ca/contact.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Evergreen’s contact page ↗
        </a>
      </dialog>
    </>
  );
}
