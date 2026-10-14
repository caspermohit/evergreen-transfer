export type HomeSize = "studio" | "one" | "two" | "three" | "four";
export type PlanStage = "early" | "week" | "day";

const stages: Record<PlanStage, string[]> = {
  early: [
    "Arrange your free in-home estimate and discuss your moving date.",
    "Sort your belongings and decide what to keep, donate or recycle.",
    "Gather boxes, tape and labels. Pack non-essential items room by room.",
  ],
  week: [
    "Label each box for its destination room. Keep heavy items in small boxes.",
    "Prepare an “open first” box with everyday essentials.",
    "Confirm access, parking and moving-day arrangements with the team.",
  ],
  day: [
    "Keep keys, medications, documents and valuables with you.",
    "Empty drawers, seal boxes and keep walkways clear.",
    "Walk through both homes and check each room before saying goodbye.",
  ],
};

export const homeSizeLabels: Record<HomeSize, string> = {
  studio: "Studio or a few items",
  one: "One-bedroom home",
  two: "Two-bedroom home",
  three: "Three-bedroom home",
  four: "Four-bedroom home or larger",
};

export function plannerItems(
  stage: PlanStage,
  homeSize: HomeSize,
  stairs: boolean,
  piano: boolean,
) {
  const items = [...stages[stage]];
  if (stairs && stage === "early") {
    items.push("Confirm elevator reservations, stair access and building rules.");
  }
  if (piano && stage === "early") {
    items.push("Tell Evergreen about your piano and any other special handling needs.");
  }
  if ((homeSize === "three" || homeSize === "four") && stage === "week") {
    items.push("Label furniture and boxes by room to simplify unloading.");
  }
  return items;
}

export function plannerTip(homeSize: HomeSize, piano: boolean) {
  let note =
    "A free in-home assessment is the best way to understand your move. Every home is different.";
  if (homeSize === "studio") {
    note =
      "A smaller move still benefits from a clear inventory. Tell the team about bulky or delicate pieces.";
  }
  if (piano) note += " Piano handling should be discussed before moving day.";
  return note;
}

export function planSummary(options: {
  date: string;
  homeSize: HomeSize;
  stairs: boolean;
  piano: boolean;
}) {
  const lines = (stage: PlanStage) =>
    plannerItems(stage, options.homeSize, options.stairs, options.piano)
      .map((item) => `[ ] ${item}`)
      .join("\n");

  return `EVERGREEN TRANSFER — MY MOVING PLAN

Preferred date: ${options.date || "Not selected"}
Home size: ${homeSizeLabels[options.homeSize]}
Access: ${options.stairs ? "Stairs or elevator to discuss" : "No special access selected"}
Special items: ${options.piano ? "Piano or special items to discuss" : "None selected"}

BEFORE THE MOVE
${lines("early")}

THE FINAL WEEK
${lines("week")}

MOVING DAY
${lines("day")}

Contact: 519-579-1800 | office@evergreentransfer.ca
This is a planning checklist, not a confirmed booking or quote.`;
}
