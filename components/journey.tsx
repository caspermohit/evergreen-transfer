import { journeySvg } from "@/components/journey-svg";

const captions = [
  {
    label: "THE PLAN",
    title: "A clear beginning.",
    text: "An in-home estimate. A conversation about what matters.",
  },
  {
    label: "THE MOVE",
    title: "Care, every mile.",
    text: "Your belongings, thoughtfully handled across Ontario.",
  },
  {
    label: "THE ARRIVAL",
    title: "A new place to belong.",
    text: "The last box unloaded. Your next chapter begins.",
  },
];

export function Journey() {
  return (
    <section className="journey" id="journey" aria-label="Your moving journey">
      <div className="journey-stage">
        <div className="journey-heading">
          <span className="eyebrow">FROM HERE TO YOUR NEXT CHAPTER</span>
          <h2>
            We move the things.
            <br />
            <em>You make the memories.</em>
          </h2>
          <p>
            Scroll to follow the journey <span>↓</span>
          </p>
        </div>
        <div className="journey-art" dangerouslySetInnerHTML={{ __html: journeySvg }} />
        <div className="journey-captions">
          {captions.map((caption, index) => (
            <div className={index === 0 ? "journey-caption is-current" : "journey-caption"} key={caption.label}>
              <span>{caption.label}</span>
              <h3>{caption.title}</h3>
              <p>{caption.text}</p>
            </div>
          ))}
        </div>
        <div className="journey-track">
          <span />
        </div>
      </div>
    </section>
  );
}
