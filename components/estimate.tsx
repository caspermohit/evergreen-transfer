"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { PLAN_EVENT, SERVICE_EVENT, type PlanDetail } from "@/lib/events";
import { daysUntil, localDateString } from "@/lib/dates";
import { useDialog } from "@/components/use-dialog";

const services = ["Residential moving", "Commercial moving", "Piano moving", "Moving supplies"];

export function Estimate() {
  const formRef = useRef<HTMLFormElement>(null);
  const [service, setService] = useState(services[0]);
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const dialogRef = useDialog(open, () => setOpen(false));

  useEffect(() => {
    const today = localDateString();
    const date = formRef.current?.elements.namedItem("date");
    if (date instanceof HTMLInputElement) date.min = today;

    const onService = (event: Event) => {
      const next = (event as CustomEvent<string>).detail;
      if (services.includes(next)) setService(next);
    };

    const onPlan = (event: Event) => {
      const detail = (event as CustomEvent<PlanDetail>).detail;
      const form = formRef.current;
      if (!form || !detail) return;
      const dateInput = form.elements.namedItem("date");
      const details = form.elements.namedItem("details");
      if (detail.date && dateInput instanceof HTMLInputElement) {
        dateInput.value = detail.date;
        dateInput.setCustomValidity("");
      }
      if (details instanceof HTMLTextAreaElement && !details.value.includes(detail.summary)) {
        details.value = `${details.value}\n${detail.summary}`.trim().slice(0, 2000);
      }
      if (detail.piano) setService("Piano moving");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("estimate")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      const name = form.elements.namedItem("name");
      if (name instanceof HTMLInputElement) name.focus({ preventScroll: true });
    };

    window.addEventListener(SERVICE_EVENT, onService);
    window.addEventListener(PLAN_EVENT, onPlan);
    return () => {
      window.removeEventListener(SERVICE_EVENT, onService);
      window.removeEventListener(PLAN_EVENT, onPlan);
    };
  }, []);

  function validateDate(input: HTMLInputElement) {
    const today = input.min || localDateString();
    const remaining = input.value ? daysUntil(input.value, today) : null;
    input.setCustomValidity(remaining !== null && remaining < 0 ? "Choose today or a future date." : "");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const text = (name: string) => String(data.get(name) ?? "").trim();
    const next = `Hello Evergreen Transfer,

I would like to arrange a free in-home estimate.

Name: ${text("name")}
Email: ${text("email")}
Phone: ${text("phone")}
Preferred moving date: ${data.get("date")}
Moving from: ${text("from")}
Moving to: ${text("to")}
Service: ${data.get("service")}

Additional details:
${text("details") || "None provided"}

Please contact me to discuss availability and an estimate. Thank you.`;
    setRequest(next);
    setCopyStatus("");
    setOpen(true);
  }

  const mailto = `mailto:office@evergreentransfer.ca?subject=${encodeURIComponent("Free in-home moving estimate request")}&body=${encodeURIComponent(request)}`;

  return (
    <section className="estimate section" id="estimate">
      <div className="estimate-copy">
        <span className="eyebrow">LET’S GET YOU THERE</span>
        <h2>
          Your next chapter
          <br />
          <em>starts here.</em>
        </h2>
        <p>
          Tell us a little about your move.
          <br />
          We’ll help you prepare a request for a free in-home estimate.
        </p>
        <a className="contact-big" href="tel:+15195791800">
          519-579-1800 ↗
        </a>
        <a href="mailto:office@evergreentransfer.ca">office@evergreentransfer.ca</a>
        <p className="address">
          82 Lucerne Dr.
          <br />
          Kitchener, Ontario · N2E 1B3
        </p>
      </div>
      <form id="estimate-form" ref={formRef} onSubmit={onSubmit}>
        <div className="form-top">
          <h3>Plan your move</h3>
          <span>FREE IN-HOME ESTIMATE</span>
        </div>
        <div className="form-grid">
          <label>
            Your name
            <input name="name" autoComplete="name" required maxLength={100} placeholder="First and last name" />
          </label>
          <label>
            Email address
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={200}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Phone number
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              maxLength={30}
              placeholder="Your contact number"
            />
          </label>
          <label>
            Preferred moving date
            <input name="date" type="date" required onInput={(event) => validateDate(event.currentTarget)} />
          </label>
          <label>
            Moving from
            <input name="from" required maxLength={150} placeholder="City or town" />
          </label>
          <label>
            Moving to
            <input name="to" required maxLength={150} placeholder="City or town in Ontario" />
          </label>
          <label className="full">
            What can we help with?
            <select name="service" value={service} onChange={(event) => setService(event.target.value)}>
              {services.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="full">
            Anything we should know? <span className="optional">(optional)</span>
            <textarea
              name="details"
              maxLength={2000}
              rows={3}
              placeholder="Home size, building access or special items…"
            />
          </label>
        </div>
        <label className="consent">
          <input type="checkbox" required />
          <span>I agree to include these details in an email to Evergreen Transfer.</span>
        </label>
        <button className="button" type="submit">
          Review my request <span>↗</span>
        </button>
        <p className="form-note">
          You’ll review your details before opening your email app. Nothing is submitted or stored by
          this website.
        </p>
      </form>
      <dialog ref={dialogRef} id="review-dialog">
        <button className="dialog-close" type="button" aria-label="Close review" onClick={() => setOpen(false)}>
          ×
        </button>
        <span className="eyebrow">ONE LAST LOOK</span>
        <h2>
          Ready to say <em>hello?</em>
        </h2>
        <p>
          Review your request below. Opening your email app prepares a draft; you must send it
          yourself. This does not reserve a moving date.
        </p>
        <pre id="request-summary">{request}</pre>
        <a id="email-request" className="button" href={mailto}>
          Open my email app <span>↗</span>
        </a>
        <button
          id="copy-request"
          className="text-link"
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(request);
              setCopyStatus("Copied. Paste this into an email to office@evergreentransfer.ca.");
            } catch {
              setCopyStatus("Copy is unavailable in this browser. Select and copy the request text above.");
            }
          }}
        >
          Copy request
        </button>
        <p id="copy-status" role="status">
          {copyStatus}
        </p>
      </dialog>
    </section>
  );
}
