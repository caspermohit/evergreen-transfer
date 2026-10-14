import { ServiceLink } from "@/components/service-link";

export function Services() {
  return (
    <section className="services section" id="services">
      <div className="section-heading">
        <div>
          <span className="eyebrow">EVERY MOVE IS PERSONAL</span>
          <h2>
            A little less stress.
            <br />A lot more <em>care.</em>
          </h2>
        </div>
        <p>
          A home, a business, or something close to your heart. We help you move what matters, with
          the experience to do it right.
        </p>
      </div>
      <div className="service-grid">
        <article className="service active">
          <span className="service-number">01 / AT HOME</span>
          <div className="service-visual house-icon">
            <svg viewBox="0 0 180 130" aria-hidden="true">
              <path d="M26 65 90 13l64 52M43 53v61h94V53M79 114V76h24v38M53 70h14v16H53m62-16h14v16h-14" />
            </svg>
          </div>
          <h3>Residential moving</h3>
          <p>Across town or across Ontario. A thoughtful move for your home and everything in it.</p>
          <ServiceLink service="Residential moving">
            Let’s move you home <span>↗</span>
          </ServiceLink>
        </article>
        <article className="service">
          <span className="service-number">02 / AT WORK</span>
          <div className="service-visual">
            <svg viewBox="0 0 180 130" aria-hidden="true">
              <path d="M52 114V19h76v95M36 114h108M65 37h13m25 0h13M65 55h13m25 0h13M65 73h13m25 0h13M81 114V91h18v23" />
            </svg>
          </div>
          <h3>Commercial moving</h3>
          <p>A new space for your next big idea. Practical help moving your business forward.</p>
          <ServiceLink service="Commercial moving">
            Make your next move <span>↗</span>
          </ServiceLink>
        </article>
        <article className="service">
          <span className="service-number">03 / HANDLE WITH CARE</span>
          <div className="service-visual">
            <svg viewBox="0 0 180 130" aria-hidden="true">
              <path d="M43 80V29h72q33 0 33 25v26H43Zm5 0v14h97V80M53 94v22m81-22v22M59 80v14m12-14v14m12-14v14m12-14v14m12-14v14m12-14v14m12-14v14" />
            </svg>
          </div>
          <h3>Piano moving</h3>
          <p>
            Some things mean more. Experienced handling for an instrument that belongs in your next
            chapter.
          </p>
          <ServiceLink service="Piano moving">
            Talk about your piano <span>↗</span>
          </ServiceLink>
        </article>
      </div>
      <div className="supplies">
        <span className="box-icon">▧</span>
        <p>
          <strong>Good moves start with good packing.</strong> Boxes, tape, labels and newsprint are
          available.
        </p>
        <a className="text-link" href="#packing">
          Get packing-ready ↗
        </a>
      </div>
    </section>
  );
}
