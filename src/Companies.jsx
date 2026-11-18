import { useLayoutEffect, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import "./Companies.css";

import yCombinator from "./assets/company-assets/y-combinator.png";
import google from "./assets/company-assets/google.png";
import intel from "./assets/company-assets/intel.png";
import nissan from "./assets/company-assets/nissan.png";
import tataPower from "./assets/company-assets/tata-power.png";
import carnegieMellon from "./assets/company-assets/carnegie-mellon.png";
import cityOfPittsburgh from "./assets/company-assets/city-of-pittsburgh.png";
import pittsburghAirport from "./assets/company-assets/pittsburgh-airport.png";

// ── Edit me ───────────────────────────────────────────────────────────────
// Transparent wordmarks use white; opaque artwork needs grayscale to retain detail.
// Omit `logo` to fall back to a styled text wordmark.
const COMPANIES = [
  { name: "Y Combinator", logo: yCombinator, variant: "grayscale", square: true },
  { name: "Google", logo: google, variant: "white" },
  { name: "Intel", logo: intel, variant: "white" },
  { name: "Nissan", logo: nissan, variant: "white", square: true },
  { name: "Tata Power", logo: tataPower, variant: "white" },
  { name: "Carnegie Mellon", logo: carnegieMellon, variant: "white" },
  { name: "City of Pittsburgh", logo: cityOfPittsburgh, variant: "grayscale", square: true },
  { name: "Pittsburgh Airport", logo: pittsburghAirport, variant: "grayscale" },
];
// ────────────────────────────────────────────────────────────────────────────

function Logo({ company }) {
  if (company.logo) {
    return (
      <img
        src={company.logo}
        alt={company.name}
        className={`company-logo company-logo--${company.variant}${company.square ? " company-logo--square" : ""}`}
      />
    );
  }
  return (
    <span
      className="company-wordmark text-2xl md:text-3xl font-bold tracking-tight text-white"
      style={{ fontFamily: '"Manrope", sans-serif' }}
    >
      {company.name}
    </span>
  );
}

function LogoGroup({ ariaHidden, groupRef }) {
  return (
    <div className="marquee__group" aria-hidden={ariaHidden} ref={groupRef}>
      {COMPANIES.map((company, i) => (
        <Logo key={`${company.name}-${i}`} company={company} />
      ))}
    </div>
  );
}

export default function Companies() {
  const viewportRef = useRef(null);
  const groupRef = useRef(null);
  const [layout, setLayout] = useState({ width: 0, copies: 2 });

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    const observer = new ResizeObserver(() => {
      const width = group.getBoundingClientRect().width;
      if (!width) return;

      const copies = Math.max(2, Math.ceil(viewport.clientWidth / width) + 1);
      setLayout(previous => previous.width === width && previous.copies === copies
        ? previous
        : { width, copies });
    });
    observer.observe(viewport);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="page-section relative w-full overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <Motion.header
          className="section-header relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p
            className="text-sm tracking-[0.2em] uppercase text-[#ef4444] mb-4"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            / trusted by
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-white uppercase leading-none"
            style={{ fontFamily: '"Manrope", sans-serif' }}
          >
            Backed &amp; <span style={{ color: "#27272a" }}>Recognized By</span>
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px w-24 bg-[#474747]" />
            <p
              className="text-xs uppercase tracking-widest text-[#c6c6c6]"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              Companies &amp; Institutions
            </p>
          </div>
        </Motion.header>
      </div>

      {/* Full-bleed infinite marquee */}
      <Motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="marquee"
        ref={viewportRef}
      >
        <div
          className="marquee__track"
          data-ready={layout.width > 0}
          style={{
            "--marquee-distance": `${layout.width}px`,
            "--marquee-duration": `${layout.width / 52}s`,
          }}
        >
          <LogoGroup ariaHidden={false} groupRef={groupRef} />
          {Array.from({ length: layout.copies - 1 }, (_, index) => (
            <LogoGroup key={index} ariaHidden={true} />
          ))}
        </div>
      </Motion.div>
    </section>
  );
}
