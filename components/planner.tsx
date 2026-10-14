"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { PLAN_EVENT, type PlanDetail } from "@/lib/events";
import { daysUntil, localDateString } from "@/lib/dates";
import {
  homeSizeLabels,
  planSummary,
  plannerItems,
  plannerTip,
  type HomeSize,
  type PlanStage,
} from "@/lib/planner";

const tabs: { id: PlanStage; tabId: string; label: string }[] = [
  { id: "early", tabId: "tab-early", label: "Before the move" },
  { id: "week", tabId: "tab-week", label: "The final week" },
  { id: "day", tabId: "tab-day", label: "Moving day" },
];

const sizes = Object.keys(homeSizeLabels) as HomeSize[];

export function Planner() {
  const [planDate, setPlanDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [homeSize, setHomeSize] = useState<HomeSize>("two");
  const [stairs, setStairs] = useState(false);
  const [piano, setPiano] = useState(false);
  const [stage, setStage] = useState<PlanStage>("early");
  const dateRef = useRef<HTMLInputElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    setMinDate(localDateString());
  }, []);

  const remaining = planDate && minDate ? daysUntil(planDate, minDate) : null;

  useEffect(() => {
    const input = dateRef.current;
    if (!input) return;
    input.setCustomValidity(remaining !== null && remaining < 0 ? "Choose today or a future date." : "");
  }, [remaining]);

  const items = plannerItems(stage, homeSize, stairs, piano);
  const activeTab = tabs.find((tab) => tab.id === stage) ?? tabs[0];
  const countdown =
    remaining === null
      ? "Your date, your plan."
      : remaining < 0
        ? "Choose a future date."
        : remaining === 0
          ? "Today is your moving day."
          : `${remaining} ${remaining === 1 ? "day" : "days"} to your next chapter.`;
  const countdownNote =
    remaining === null
      ? "Choose a date to see your countdown."
      : "Planning date only. Availability must be confirmed with Evergreen.";

  function planDetail(): PlanDetail {
    return {
      date: planDate,
      piano,
      summary: `Moving plan: ${homeSizeLabels[homeSize]}. ${stairs ? "Stairs or elevator access. " : ""}${piano ? "Piano or special items. " : ""}`,
    };
  }

  function downloadPlan() {
    if (dateRef.current && !dateRef.current.reportValidity()) return;
    const file = new Blob([planSummary({ date: planDate, homeSize, stairs, piano })], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "evergreen-moving-checklist.txt";
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function usePlan() {
    if (dateRef.current && !dateRef.current.reportValidity()) return;
    window.dispatchEvent(new CustomEvent<PlanDetail>(PLAN_EVENT, { detail: planDetail() }));
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | undefined;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setStage(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="planner section" id="planner">
      <div className="section-heading">
        <div>
          <span className="eyebrow">MAKE ROOM FOR WHAT’S NEXT</span>
          <h2>
            Your move.
            <br />
            <em>A little more organised.</em>
          </h2>
        </div>
        <p>
          A practical plan you can take with you. Choose your date and home size to create your
          moving checklist.
        </p>
      </div>
      <div className="planner-layout">
        <div className="planner-controls">
          <h3>Build your moving plan</h3>
          <label htmlFor="plan-date">When are you hoping to move?</label>
          <input
            ref={dateRef}
            id="plan-date"
            type="date"
            min={minDate || undefined}
            value={planDate}
            onChange={(event) => setPlanDate(event.target.value)}
          />
          <label htmlFor="home-size">How much are you moving?</label>
          <select
            id="home-size"
            value={homeSize}
            onChange={(event) => setHomeSize(event.target.value as HomeSize)}
          >
            {sizes.map((size) => (
              <option value={size} key={size}>
                {homeSizeLabels[size]}
              </option>
            ))}
          </select>
          <fieldset>
            <legend>Anything to plan around?</legend>
            <label>
              <input
                type="checkbox"
                id="plan-stairs"
                checked={stairs}
                onChange={(event) => setStairs(event.target.checked)}
              />{" "}
              Stairs or an elevator
            </label>
            <label>
              <input
                type="checkbox"
                id="plan-piano"
                checked={piano}
                onChange={(event) => setPiano(event.target.checked)}
              />{" "}
              A piano or special items
            </label>
          </fieldset>
          <div className="countdown" aria-live="polite">
            <strong id="days-to-move">{countdown}</strong>
            <span id="days-note">{countdownNote}</span>
          </div>
          <button className="button" id="download-plan" type="button" onClick={downloadPlan}>
            Download my checklist <span>↓</span>
          </button>
          <button className="text-link" id="use-plan" type="button" onClick={usePlan}>
            Add my plan to an estimate request ↗
          </button>
          <p className="form-note">
            A planning guide, not a booking or a price estimate. No planner details are stored.
          </p>
        </div>
        <div className="planner-result">
          <div className="box-scene" aria-hidden="true">
            <div className="packing-box box-back">
              <span>BEDROOM</span>
            </div>
            <div className="packing-box box-front">
              <span>OPEN FIRST</span>
              <i />
            </div>
            <div className="packing-box box-small">
              <span>FRAGILE</span>
            </div>
            <div className="box-shadow" />
          </div>
          <div className="plan-tabs" role="tablist" aria-label="Moving preparation stages">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                role="tab"
                id={tab.tabId}
                type="button"
                aria-selected={stage === tab.id}
                aria-controls="plan-tasks"
                tabIndex={stage === tab.id ? 0 : -1}
                data-stage={tab.id}
                onClick={() => setStage(tab.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div id="plan-tasks" role="tabpanel" aria-labelledby={activeTab.tabId} tabIndex={0}>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <p className="planner-tip" id="planner-tip">
            {plannerTip(homeSize, piano)}
          </p>
        </div>
      </div>
    </section>
  );
}
