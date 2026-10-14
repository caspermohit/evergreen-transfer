"use client";

import { useEffect, useState } from "react";

export function SiteMotion() {
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [desktop, setDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 900px)");
    setMotionEnabled(!reduced.matches);
    setDesktop(wide.matches);
    const onReduced = () => setMotionEnabled(!reduced.matches);
    const onWide = () => setDesktop(wide.matches);
    reduced.addEventListener("change", onReduced);
    wide.addEventListener("change", onWide);
    return () => {
      reduced.removeEventListener("change", onReduced);
      wide.removeEventListener("change", onWide);
    };
  }, []);

  useEffect(() => {
    const bar = document.getElementById("reading-bar");
    const onScroll = () => {
      if (!bar) return;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${height > 0 ? (window.scrollY / height) * 100 : 0}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (desktop === null) return;

    let revert: (() => void) | undefined;
    let cancelled = false;
    document.body.classList.toggle("motion-paused", !motionEnabled);

    const setup = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const captions = Array.from(document.querySelectorAll<HTMLElement>(".journey-caption"));
      if (!motionEnabled) {
        captions.forEach((caption) => caption.classList.add("is-current"));
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        return;
      }

      captions.forEach((caption, index) => caption.classList.toggle("is-current", index === 0));

      const ctx = gsap.context(() => {
        gsap.from(".hero .eyebrow, .hero h1, .hero-bottom", {
          y: 24,
          opacity: 0,
          duration: 1,
          stagger: 0.13,
          ease: "power3.out",
        });
        gsap.from(".hero-media", {
          y: 30,
          opacity: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "power3.out",
        });
        gsap.to(".hero-media img", {
          scale: 1.1,
          ease: "none",
          scrollTrigger: { trigger: ".hero-media", start: "top center", end: "bottom top", scrub: 1 },
        });
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
          gsap.from(el, {
            y: 35,
            opacity: 0,
            duration: 1,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }),
        );
        gsap.fromTo(
          ".care-photo img",
          { scale: 0.9 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: ".care-photo", start: "top 85%", end: "top 25%", scrub: 1 },
          },
        );
        const words = document.querySelector(".word-reveal");
        if (words) {
          gsap.fromTo(
            words.children,
            { opacity: 0.25 },
            {
              opacity: 1,
              stagger: 0.08,
              ease: "none",
              scrollTrigger: { trigger: words, start: "top 85%", end: "top 35%", scrub: 1 },
            },
          );
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".journey",
            start: desktop ? "top 106px" : "top 60%",
            end: desktop ? "+=1300" : "bottom 20%",
            pin: desktop ? ".journey-stage" : false,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              const active = Math.min(2, Math.floor(self.progress * 3));
              captions.forEach((caption, index) => caption.classList.toggle("is-current", index === active));
            },
          },
        });
        timeline
          .fromTo(".moving-truck", { x: 150 }, { x: 680, ease: "none", duration: 1 }, 0)
          .fromTo(".journey-track>span", { scaleX: 0.03 }, { scaleX: 1, ease: "none", duration: 1 }, 0)
          .fromTo(".arrival-boxes", { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.18 }, 0.82)
          .to(".cloud-one", { x: 60, ease: "none", duration: 1 }, 0)
          .to(".cloud-two", { x: -70, ease: "none", duration: 1 }, 0);
        gsap.from(".box-front", {
          y: 75,
          rotation: 12,
          opacity: 0,
          scrollTrigger: { trigger: ".box-scene", start: "top 90%", end: "top 40%", scrub: 1 },
        });
        gsap.from(".box-back", {
          x: -60,
          y: 25,
          rotation: -10,
          opacity: 0,
          scrollTrigger: { trigger: ".box-scene", start: "top 90%", end: "top 40%", scrub: 1 },
        });
        gsap.from(".box-small", {
          x: 65,
          y: 30,
          rotation: 18,
          opacity: 0,
          scrollTrigger: { trigger: ".box-scene", start: "top 90%", end: "top 40%", scrub: 1 },
        });
        gsap.utils.toArray<HTMLElement>(".service").forEach((card, index) =>
          gsap.from(card, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.12,
            scrollTrigger: { trigger: ".service-grid", start: "top 85%" },
          }),
        );
      });

      revert = () => ctx.revert();
      const refresh = () => ScrollTrigger.refresh();
      if (document.readyState === "complete") refresh();
      else window.addEventListener("load", refresh, { once: true });
    };

    void setup();

    return () => {
      cancelled = true;
      revert?.();
      document.body.classList.remove("motion-paused");
    };
  }, [desktop, motionEnabled]);

  return (
    <>
      <div className="reading-progress" aria-hidden="true">
        <span id="reading-bar" />
      </div>
      <button
        className="motion-toggle"
        id="motion-toggle"
        type="button"
        aria-pressed={!motionEnabled}
        onClick={() => setMotionEnabled((value) => !value)}
      >
        {motionEnabled ? "Pause animations" : "Play animations"}
      </button>
    </>
  );
}
