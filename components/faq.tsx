"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I get an estimate?",
    answer:
      "Evergreen offers free in-home estimates. A representative assesses your furniture, boxes, distance, building access, labour and equipment needs to quote your move. Start with the request below or call the office.",
  },
  {
    question: "How early should I book?",
    answer:
      "Book as soon as you know your moving date, particularly when your schedule is fixed. Contact Evergreen to discuss availability.",
  },
  {
    question: "Do you move outside Waterloo Region?",
    answer: "Yes. Evergreen Transfer handles moves anywhere within Ontario.",
  },
  {
    question: "Are moves insured?",
    answer:
      "Evergreen lists fully insured moves among its services. Discuss insurance coverage and any special items with the team when arranging your estimate.",
  },
  {
    question: "Can you help with packing supplies?",
    answer:
      "Boxes, tape, labels and unprinted newsprint are available. Ask the team about current prices, wardrobe boxes and local delivery arrangements.",
  },
];

export function Faq() {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const visible = faqs.map(
    (faq) => !normalized || `${faq.question} ${faq.answer}`.toLowerCase().includes(normalized),
  );
  const found = visible.filter(Boolean).length;
  const status = normalized
    ? `${found} ${found === 1 ? "answer" : "answers"} found.${found === 0 ? " Try another word or call 519-579-1800." : ""}`
    : "";

  return (
    <section className="faq section" id="faq">
      <div>
        <span className="eyebrow">GOOD QUESTIONS. CLEAR ANSWERS.</span>
        <h2>
          Before your
          <br />
          <em>next move.</em>
        </h2>
        <p>Something else on your mind?</p>
        <a className="text-link" href="tel:+15195791800">
          Call 519-579-1800 ↗
        </a>
      </div>
      <div className="faq-list">
        <label className="faq-search" htmlFor="faq-search">
          Find an answer
          <input
            id="faq-search"
            type="search"
            placeholder="Try “insurance”, “Ontario” or “boxes”…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <p id="faq-results" role="status" className="faq-results">
          {status}
        </p>
        {faqs.map((faq, index) => (
          <details key={faq.question} hidden={!visible[index]} {...(index === 0 ? { open: true } : {})}>
            <summary>
              {faq.question}
              <span>+</span>
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
