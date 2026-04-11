import { motion } from "framer-motion";

const AWARDS = [
  {
    title: "Harvard President's Innovation Challenge",
    placement: "Semi-Finalist",
    org: "Harvard University",
    year: "2026",
    description: "Selected as a semi-finalist at a prestigious competition recognizing bold entrepreneurial ideas with real-world impact.",
    tags: ["Entrepreneurship", "Innovation"],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
    ),
    yearPos: "bottom-right",
    rot: "-rotate-2",
    offset: "",
  },
  {
    title: "Google HAI DEF Challenge",
    placement: "Winner",
    org: "MIT Grand Hack '25",
    year: "2025",
    description: "Won the Google HAI DEF Challenge at MIT Grand Hack, a healthcare-focused hackathon building solutions for real-world health problems.",
    tags: ["Healthcare AI", "Hackathon"],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/>
        <path d="M4 22h16"/><path d="M10 22V2h4v20"/>
        <path d="M8 9h8"/><path d="M8 13h8"/>
      </svg>
    ),
    yearPos: "bottom-right",
    rot: "rotate-3",
    offset: "md:translate-y-12",
  },
  {
    title: "Kellogg Design Challenge",
    placement: "2nd Place",
    org: "Northwestern University",
    year: "2023",
    description: "Won $6,000 at the largest MBA design case competition globally. Partnered with Nissan to reimagine transportation systems for mobility, sustainability, and accessibility.",
    tags: ["Product Design", "Mobility"],
    link: "https://www.cmu.edu/metro21/news/news-articles/news-articles-2023/2023-april/kelloggs-design-challenge.html",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    yearPos: "bottom-right",
    rot: "-rotate-1",
    offset: "",
  },
  {
    title: "Intel RealSense App Challenge",
    placement: "Top 50",
    org: "Intel",
    year: "2015",
    description: "Selected in the top 50 globally for building innovative applications using Intel's depth-sensing camera technology.",
    tags: ["Computer Vision", "Depth Sensing"],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
        <path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>
      </svg>
    ),
    yearPos: "bottom-right",
    rot: "rotate-2",
    offset: "md:translate-y-12",
  },
];

const yearPositions = {
  "bottom-right": "bottom-4 right-4",
  "top-left": "top-4 left-4",
  "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "bottom-left": "bottom-4 left-4",
};

function AwardStamp({ award, index }) {
  const Wrapper = award.link ? motion.a : motion.div;
  const linkProps = award.link
    ? { href: award.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className={`stamp-container group relative p-8 md:p-10 bg-[#1c1b1d] transition-all duration-500
                  ${award.rot} ${award.offset}`}
      style={{ transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 80, damping: 16, delay: 0.12 * index }}
    >
      {/* Dashed border overlay — goes solid red on hover via CSS */}
      <div className="absolute inset-0 border border-dashed border-[#474747] group-hover:border-[#ef4444]
                      group-hover:border-solid transition-colors duration-300 pointer-events-none" />

      {/* Large watermark year */}
      <span className={`absolute ${yearPositions[award.yearPos]} pointer-events-none select-none
                        text-8xl md:text-9xl font-black text-white/[0.04]`}
            style={{ fontFamily: '"Manrope", sans-serif' }}>
        '{award.year.slice(-2)}
      </span>

      <div className="relative z-10">
        {/* Placement label with icon */}
        <div className="flex items-center gap-2 mb-7 text-[#ef4444]"
             style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          {award.icon}
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
            {award.placement}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight tracking-tight"
            style={{ fontFamily: '"Manrope", sans-serif' }}>
          {award.title}
          {award.link && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="inline-block ml-2 text-[#474747] group-hover:text-[#ef4444] transition-colors">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          )}
        </h3>

        {/* Org */}
        <p className="text-xs text-[#919191] mb-5"
           style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          {award.org} &middot; {award.year}
        </p>

        {/* Description */}
        <p className="text-sm text-[#c6c6c6] leading-relaxed mb-6 max-w-xs">
          {award.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {award.tags.map((tag) => (
            <span key={tag}
                  className="text-[10px] px-2 py-1 border border-dashed border-[#919191] text-[#919191]
                             uppercase tracking-wider"
                  style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export default function Awards() {
  return (
    <section className="relative w-full py-28 md:py-36 px-8 md:px-16 bg-[#131315] overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.header
          className="mb-20 relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Pixel grid accent */}
          <div className="absolute -top-12 -left-12 w-32 h-32 pointer-events-none opacity-10"
               style={{
                 backgroundImage: "linear-gradient(to right, #474747 1px, transparent 1px), linear-gradient(to bottom, #474747 1px, transparent 1px)",
                 backgroundSize: "24px 24px",
               }} />

          <p className="text-sm tracking-[0.2em] uppercase text-[#ef4444] mb-4"
             style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            / recognition
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-white uppercase leading-none"
              style={{ fontFamily: '"Manrope", sans-serif' }}>
            Things I've <span style={{ color: "#27272a" }}>Won</span>
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px w-24 bg-[#474747]" />
            <p className="text-xs uppercase tracking-widest text-[#c6c6c6]"
               style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Technical and Creative Excellence
            </p>
          </div>
        </motion.header>

        {/* Stamps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
          {AWARDS.map((award, i) => (
            <AwardStamp key={award.title} award={award} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
