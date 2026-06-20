import { motion } from "framer-motion";
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
// Add/remove companies here. `logo` is an imported PNG (rendered as a uniform
// white monochrome mark); omit it to fall back to a styled text wordmark.
const COMPANIES = [
  { name: "Y Combinator", logo: yCombinator },
  { name: "Google", logo: google },
  { name: "Intel", logo: intel },
  { name: "Nissan", logo: nissan },
  { name: "Tata Power", logo: tataPower },
  { name: "Carnegie Mellon", logo: carnegieMellon },
  { name: "City of Pittsburgh", logo: cityOfPittsburgh },
  { name: "Pittsburgh Airport", logo: pittsburghAirport },
];
// ────────────────────────────────────────────────────────────────────────────

function Logo({ company }) {
  if (company.logo) {
    return (
      <img
        src={company.logo}
        alt={company.name}
        className="h-7 md:h-9 w-auto object-contain opacity-50 transition-all duration-300
                   hover:opacity-100 [filter:brightness(0)_invert(1)]"
      />
    );
  }
  return (
    <span
      className="text-2xl md:text-3xl font-bold tracking-tight text-[#919191]
                 hover:text-white transition-colors duration-300 whitespace-nowrap"
      style={{ fontFamily: '"Manrope", sans-serif' }}
    >
      {company.name}
    </span>
  );
}

function Track({ ariaHidden }) {
  return (
    <div className="marquee__track" aria-hidden={ariaHidden}>
      {COMPANIES.map((company, i) => (
        <Logo key={`${company.name}-${i}`} company={company} />
      ))}
    </div>
  );
}

export default function Companies() {
  return (
    <section className="relative w-full py-28 md:py-36 bg-[#131315] overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.header
          className="mb-16 relative"
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
        </motion.header>
      </div>

      {/* Full-bleed infinite marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="marquee"
      >
        {/* Duplicate track for a seamless loop */}
        <Track ariaHidden={false} />
        <Track ariaHidden={true} />
      </motion.div>
    </section>
  );
}
