import { motion } from "framer-motion";

const PAPERS = [
  {
    title: "Design and Implementation of Resonance based Wireless Power Transfer System",
    venue: "IEEE 2020 International Conference on Futuristic Technologies in Control Systems & Renewable Energy (ICFCR)",
    year: "2020",
    authors: "V. Urlam et al.",
    description: "A 15 W wireless power transfer system designed and implemented for demonstration. The system delivers up to 10 W output with 68.389% efficiency using Series-Series compensation, with efficiency inversely proportional to coil airgap.",
    link: "https://ieeexplore.ieee.org/document/9298414",
  },
];

export default function Publications() {
  const paper = PAPERS[0];

  return (
    <section className="relative w-full py-28 md:py-36 px-6 bg-[#09090b] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-sm tracking-[0.2em] uppercase text-[#ef4444] mb-4"
             style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            / research
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-[-0.04em] uppercase leading-none"
              style={{ fontFamily: '"Manrope", sans-serif' }}>
            Things I've <span style={{ color: "#27272a" }}>Published</span>
          </h2>
        </motion.div>

        {/* Featured paper */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Left accent bar */}
          <div className="flex gap-6 md:gap-10">
            <div className="w-1 shrink-0 rounded-full bg-gradient-to-b from-red-500 via-red-500/40 to-transparent" />

            <div>
              {/* Year badge */}
              <span className="inline-block text-[0.65rem] font-bold tracking-[0.2em] uppercase
                              text-zinc-950 bg-zinc-500 px-2.5 py-1 rounded-sm mb-5"
                    style={{ fontFamily: '"SF Mono", "Fira Code", "Consolas", monospace' }}>
                IEEE {paper.year}
              </span>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-zinc-100 tracking-tight leading-snug mb-4 max-w-2xl">
                {paper.title}
              </h3>

              {/* Authors + Venue */}
              <p className="text-sm text-zinc-500 mb-1">{paper.authors}</p>
              <p className="text-xs text-zinc-600 leading-relaxed max-w-xl mb-6"
                 style={{ fontStyle: "italic" }}>
                {paper.venue}
              </p>

              {/* Abstract / description */}
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl mb-8">
                {paper.description}
              </p>

              {/* Read link */}
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400
                           hover:text-zinc-100 transition-colors duration-200 group/link"
              >
                Read on IEEE Xplore
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                     className="transition-transform duration-200 group-hover/link:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
