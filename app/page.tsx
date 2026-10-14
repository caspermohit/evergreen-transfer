import { Estimate } from "@/components/estimate";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Journey } from "@/components/journey";
import { Packing } from "@/components/packing";
import { Planner } from "@/components/planner";
import { Services } from "@/components/services";
import { SiteMotion } from "@/components/site-motion";

const careLine =
  "Moving is more than a change of address. It’s a new beginning. And it deserves people who care.";

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="topline">
        <span>Locally owned. Thoughtfully moving Ontario since 1981.</span>
        <a href="tel:+15195791800">
          Let’s talk <span className="phone">519-579-1800</span> ↗
        </a>
      </div>
      <Header />
      <SiteMotion />
      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="line" /> A FRESH START, IN GOOD HANDS
            </div>
            <h1>
              Your next chapter.
              <br />
              <em>Moved with care.</em>
            </h1>
            <div className="hero-bottom">
              <p>
                From the first box to the last goodbye.
                <br />
                We make moving feel a little more like home.
              </p>
              <div className="hero-actions">
                <a className="button" href="#estimate">
                  Plan your move <span>↗</span>
                </a>
                <a className="text-link" href="#services">
                  Explore our services <span>↓</span>
                </a>
              </div>
            </div>
          </div>
          <div className="hero-media">
            <img
              src="/assets/home.jpg"
              alt="A welcoming modern home surrounded by trees"
              fetchPriority="high"
              width={1800}
              height={1200}
            />
            <div className="image-shade" />
            <div className="media-note">
              <span>ROOTED IN WATERLOO REGION</span>
              <p>
                Wherever life takes you,
                <br />
                we’ll help you get there.
              </p>
            </div>
            <a href="#care" className="round-link" aria-label="Discover Evergreen">
              ↓
            </a>
            <span className="photo-caption">A new place. A familiar feeling.</span>
          </div>
        </section>
        <section className="proof" aria-label="Evergreen at a glance">
          <div>
            <strong>1981</strong>
            <span>Our story began</span>
          </div>
          <div>
            <strong>40+ years</strong>
            <span>Of moving experience</span>
          </div>
          <div>
            <strong>95%+</strong>
            <span>Repeat customers & referrals</span>
          </div>
          <div>
            <strong>Ontario</strong>
            <span>Local roots. Province-wide moves.</span>
          </div>
        </section>
        <Services />
        <section className="care section" id="care">
          <div className="care-photo reveal">
            <img
              src="/assets/evergreen-truck.jpg"
              alt="The Evergreen Transfer moving truck beneath leafy trees"
              loading="lazy"
              width={362}
              height={271}
            />
            <span>INDEPENDENTLY OWNED & OPERATED</span>
          </div>
          <div className="care-copy">
            <span className="eyebrow">NEIGHBOURS MOVING NEIGHBOURS</span>
            <h2>
              Big on experience.
              <br />
              <em>Personal by nature.</em>
            </h2>
            <p className="word-reveal">
              {careLine.split(" ").map((word, index) => (
                <span key={`${word}-${index}`}>{word} </span>
              ))}
            </p>
            <p>
              Since 1981, Evergreen Transfer has helped families in Waterloo Region and across Ontario
              settle into their next chapter. Over 95% of our business comes from returning customers
              and referrals.
            </p>
            <div className="care-details">
              <span>↗ Fully insured moves</span>
              <span>↗ Free in-home estimates</span>
              <span>↗ Local, independent ownership</span>
            </div>
          </div>
        </section>
        <div className="ribbon" aria-hidden="true">
          <div>
            HOME IS THE NEXT CHAPTER <span>✳</span> WE’LL HELP YOU GET THERE <span>✳</span> HOME IS THE
            NEXT CHAPTER <span>✳</span> WE’LL HELP YOU GET THERE <span>✳</span>
          </div>
        </div>
        <Journey />
        <section className="process section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A CLEAR PATH TO MOVING DAY</span>
              <h2>
                Let’s make this
                <br />
                <em>feel simple.</em>
              </h2>
            </div>
            <a className="text-link" href="#estimate">
              Start with a conversation ↗
            </a>
          </div>
          <div className="steps">
            <article className="reveal">
              <span>01</span>
              <h3>Tell us your plans.</h3>
              <p>Share your moving date, destination and the things you need a hand with.</p>
            </article>
            <article className="reveal">
              <span>02</span>
              <h3>Meet us at home.</h3>
              <p>We’ll assess your move in person and provide a free estimate based on what you need.</p>
            </article>
            <article className="reveal">
              <span>03</span>
              <h3>Settle into what’s next.</h3>
              <p>From careful handling to the final unload, we help get your belongings to their new home.</p>
            </article>
          </div>
        </section>
        <Planner />
        <Packing />
        <Faq />
        <Estimate />
      </main>
      <Footer />
    </>
  );
}
