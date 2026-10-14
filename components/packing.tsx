"use client";

import { useState } from "react";

const items = [
  ["Keep it room by room", "Pack each room separately and label boxes for their destination."],
  ["Small boxes for heavy things", "Books in small boxes. Light, bulky items in larger ones."],
  ["Protect the fragile favourites", "Wrap glass and cushion delicate items generously."],
  ["Make an “open first” box", "Keep everyday essentials easy to reach on arrival."],
  ["Empty drawers and seal boxes", "Pack drawer contents separately and tape every box closed."],
];

export function Packing() {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const ready = checked.filter(Boolean).length;

  return (
    <section className="packing section" id="packing">
      <div>
        <span className="eyebrow">A LITTLE PREPARATION GOES A LONG WAY</span>
        <h2>
          Pack smart.
          <br />
          <em>Move easy.</em>
        </h2>
        <p>Your moving-day head start. Tick off the essentials as you go.</p>
        <p className="progress-text" id="check-progress" aria-live="polite">
          {ready} of {items.length} essentials ready
        </p>
        <div className="progress-track">
          <div id="check-bar" style={{ width: `${(ready / items.length) * 100}%` }} />
        </div>
        <button
          className="text-link reset"
          id="reset-checklist"
          type="button"
          onClick={() => setChecked(items.map(() => false))}
        >
          Reset checklist ↺
        </button>
      </div>
      <div className="checklist">
        {items.map(([title, detail], index) => (
          <label key={title}>
            <input
              type="checkbox"
              checked={checked[index]}
              onChange={(event) =>
                setChecked((current) =>
                  current.map((value, itemIndex) => (itemIndex === index ? event.target.checked : value)),
                )
              }
            />
            <span>
              <strong>{title}</strong>
              {detail}
            </span>
          </label>
        ))}
        <a
          href="https://www.evergreentransfer.ca/packing-tips.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          Read the complete packing guide ↗
        </a>
      </div>
    </section>
  );
}
