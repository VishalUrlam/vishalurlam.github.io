import { motion } from "framer-motion";
import "./Companies.css";

// Drop real logos in src/assets/company-assets/ and import them here, e.g.:
// import yc from "./assets/company-assets/ycombinator.svg";

// ── Edit me ───────────────────────────────────────────────────────────────
// Add/remove companies here. To use a real logo, set `logo` to an imported
// image (e.g. import acme from "./assets/company-assets/acme.svg") — it renders
// instead of the text wordmark. Otherwise the styled name is shown.
const COMPANIES = [
  { name: "Y Combinator" }, // swap to { name: "Y Combinator", logo: yc } once added
  { name: "Harvard" },
  { name: "MIT" },
  { name: "Google" },
  { name: "Intel" },
  { name: "Nissan" },
  { name: "Northwestern" },
  { name: "Foveal Vision" },
];
// ────────────────────────────────────────────────────────────────────────────

function Logo({ company }) {
  if (company.logo) {
    return (
      <img
        src={company.logo}
        alt={company.name}
        className="h-8 md:h-10 w-auto object-contain opacity-50 grayscale
                   hover:opacity-100 hover:grayscale-0 transition-all duration-300"
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
          {/* Pixel grid accent */}
          <div
            className="absolute -top-12 -left-12 w-32 h-32 pointer-events-none opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, #474747 1px, transparent 1px), linear-gradient(to bottom, #474747 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

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
            Where I've <span style={{ color: "#27272a" }}>Worked</span>
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
