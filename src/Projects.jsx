import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    title: "AI-Powered Knee Health Brace",
    description: "Engineered a wearable brace to detect joint degeneration using acoustic sensing. Integrated MEMS microphone with Adafruit Playground MCU for real-time motion-based audio capture. Preprocessed signals using Python/NumPy, extracted embeddings with Google's HeAR model, and implemented vector similarity search (Iris DB) to classify degeneration severity. Final predictions generated via Gemma LLM to assess surgical risk.",
    tech: ["Python", "NumPy", "Google HeAR", "Gemma LLM", "Iris DB", "Adafruit MCU"],
  },
  {
    title: "Digital Twin for City of Pittsburgh",
    description: "Architected a city-wide IoT Digital Twin for real-time monitoring of utilities and traffic systems. Identified optimal sensor placements and designed interoperable edge architecture using MQTT, BLE, and Wi-Fi mesh. Developed a strategic deployment roadmap prioritizing resilience, latency optimization, and scalable node integration. Authored municipal IoT adoption guide emphasizing open standards and long-term sustainability.",
    tech: ["IoT", "MQTT", "BLE", "Wi-Fi Mesh", "Digital Twin"],
  },
  {
    title: "IoT-Integrated Travel Wearable",
    description: "Developed an MVP for a travel anxiety-reducing wearable using Wiliot IoT Pixel (Bluetooth-powered, battery-free tags). Defined product roadmap and technical architecture for continuous proximity and motion sensing. Led usability testing, translated insights into feature prioritization, and mapped a scalable deployment plan for airport environments. Projected 15% reduction in traveler stress based on behavioral metrics and stakeholder validation.",
    tech: ["Wiliot IoT Pixel", "Bluetooth", "Product Strategy", "Usability Testing"],
  },
  {
    title: "Notion Replica & Project Management Tool",
    description: "Built a lightweight, fully functional project management tool natively within Google Sheets, designed to mimic Notion's database capabilities. Bridged the gap between tracking and action with a Slack automation that pings the relevant team member whenever a new bug is logged and assigned a priority, keeping the workflow agile and ensuring critical issues are addressed immediately without manual communication.",
    tech: ["Google Sheets", "Slack API", "Automation", "Project Management"],
  },
  {
    title: "Teleoperate a Robot Using Smartphone Camera",
    description: "Built an entire system that utilizes a phone's camera to control a LeRobot in real time. Used 3D pose estimation to translate human actions into robot motions, enabling intuitive teleoperation without specialized hardware.",
    tech: ["3D Pose Estimation", "LeRobot", "Computer Vision", "Real-Time Control"],
  },
];

function ProjectRow({ project, index }) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="group border-b border-white/[0.06] cursor-pointer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.08 * index }}
      onClick={() => setOpen((p) => !p)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-baseline gap-6 md:gap-10 py-6 md:py-8">
        {/* Big number */}
        <span
          className="text-3xl md:text-5xl font-black tabular-nums leading-none
                     text-zinc-800 group-hover:text-zinc-500 transition-colors duration-300"
          style={{ fontFamily: '"SF Mono", "Fira Code", "Consolas", monospace', minWidth: "2.5ch" }}
        >
          {num}
        </span>

        {/* Title + expand */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-2xl font-bold text-zinc-300 group-hover:text-zinc-50
                         transition-colors duration-300 tracking-tight leading-snug">
            {project.title}
          </h3>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <p className="text-sm text-zinc-500 leading-relaxed mt-3 max-w-2xl">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[0.7rem] text-zinc-600 tracking-wide"
                          style={{ fontFamily: '"SF Mono", "Fira Code", "Consolas", monospace' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Arrow indicator */}
        <motion.span
          className="text-zinc-700 group-hover:text-zinc-400 transition-colors text-xl shrink-0"
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          &rsaquo;
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section className="relative w-full py-28 md:py-36 px-6 bg-[#09090b] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title - left aligned, no gradient */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-sm tracking-[0.2em] uppercase text-[#ef4444] mb-4"
             style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            / work
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-[-0.04em] uppercase leading-none"
              style={{ fontFamily: '"Manrope", sans-serif' }}>
            Things I've <span style={{ color: "#27272a" }}>Built</span>
          </h2>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-white/[0.08] mb-2" />

        {/* Project rows */}
        {PROJECTS.map((project, i) => (
          <ProjectRow key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
