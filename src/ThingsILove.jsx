import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";

// MacBook lid image
import macbookLid from "./assets/macbook_lid.png";

// Sticker images (swap or add your own in src/assets/stickers/)
import stickerCoffee from "./assets/stickers/coffee.png";
import stickerCode   from "./assets/stickers/code.png";
import stickerRocket from "./assets/stickers/rocket.png";
import stickerCat    from "./assets/stickers/cat.png";
import stickerHeart  from "./assets/stickers/heart.png";
import stickerCool   from "./assets/stickers/cool.png";
import stickerMusic  from "./assets/stickers/music.png";

/* ─── Stickers ─────────────────────────────────────────────────
   Each sticker = a thing from my life. Drag any sticker anywhere
   in the section — on the laptop, off the laptop, doesn't matter.
   It stays where you drop it. Click any sticker to read its story.

   Initial (x, y) is in % of the playground area. Stickers start
   scattered around the laptop silhouette (laptop sits roughly at
   x:25%–75%, y:36%–64%).

   To add a CMU sticker (or any other):
   1. Drop the PNG into src/assets/stickers/ (e.g. cmu.png)
   2. Add an import at the top
   3. Add a new entry to STICKERS below
*/
const STICKERS = [
  {
    id: "code",
    src: stickerCode,
    label: "Code",
    caption: "Building things is how I think.",
    x: 4,  y: 4,  rot: -22,
  },
  {
    id: "coffee",
    src: stickerCoffee,
    label: "Coffee",
    caption: "Three cups before noon. Don't judge.",
    x: 78, y: 2,  rot: 16,
  },
  {
    id: "rocket",
    src: stickerRocket,
    label: "Ship It",
    caption: "Ship fast, fix faster.",
    x: 38, y: 14, rot: -8,
  },
  {
    id: "music",
    src: stickerMusic,
    label: "Music",
    caption: "Lo-fi on loop while I work.",
    x: -2, y: 44, rot: 28,
  },
  {
    id: "cat",
    src: stickerCat,
    label: "Cat",
    caption: "My rubber duck has whiskers.",
    x: 90, y: 38, rot: -19,
  },
  {
    id: "heart",
    src: stickerHeart,
    label: "Heart",
    caption: "Family first, always.",
    x: 8,  y: 82, rot: 14,
  },
  {
    id: "cool",
    src: stickerCool,
    label: "Skechers",
    caption: "Skechers is my favorite shoe brand.",
    x: 84, y: 86, rot: -24,
  },
  // Example: add CMU once you drop cmu.png into src/assets/stickers/
  // {
  //   id: "cmu",
  //   src: stickerCmu,
  //   label: "CMU",
  //   caption: "Where I did my Grad school.",
  //   x: 50, y: 92, rot: 6,
  // },
];

/* ─── Remove white background via flood-fill from image edges ─── */
function removeWhiteBg(src, threshold = 230) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = id.data;
      const w = canvas.width;
      const h = canvas.height;

      const isBg = (i) => d[i] >= threshold && d[i+1] >= threshold && d[i+2] >= threshold;
      const visited = new Uint8Array(w * h);
      const stack = [];

      for (let x = 0; x < w; x++) {
        if (isBg(x * 4)) { stack.push(x); visited[x] = 1; }
        const b = (h-1)*w+x;
        if (isBg(b * 4)) { stack.push(b); visited[b] = 1; }
      }
      for (let y = 1; y < h - 1; y++) {
        const l = y*w;
        if (isBg(l * 4)) { stack.push(l); visited[l] = 1; }
        const r = y*w + w-1;
        if (isBg(r * 4)) { stack.push(r); visited[r] = 1; }
      }
      while (stack.length > 0) {
        const pos = stack.pop();
        const px = pos % w;
        const py = (pos - px) / w;
        if (px > 0)   { const n=pos-1; if (!visited[n] && isBg(n*4)) { visited[n]=1; stack.push(n); } }
        if (px < w-1) { const n=pos+1; if (!visited[n] && isBg(n*4)) { visited[n]=1; stack.push(n); } }
        if (py > 0)   { const n=pos-w; if (!visited[n] && isBg(n*4)) { visited[n]=1; stack.push(n); } }
        if (py < h-1) { const n=pos+w; if (!visited[n] && isBg(n*4)) { visited[n]=1; stack.push(n); } }
      }
      for (let i = 0; i < w * h; i++) {
        if (visited[i]) d[i * 4 + 3] = 0;
      }
      ctx.putImageData(id, 0, 0);
      canvas.toBlob((blob) => resolve(blob ? URL.createObjectURL(blob) : src), "image/png");
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

function useProcessedImages(stickers) {
  const [urls, setUrls] = useState({});
  useEffect(() => {
    Promise.all(
      stickers.map(async (s) => ({ id: s.id, url: await removeWhiteBg(s.src, 230) }))
    ).then((results) => {
      const map = {};
      results.forEach(({ id, url }) => { map[id] = url; });
      setUrls(map);
    });
  }, []);
  return urls;
}

/* ─── A draggable sticker with hover-to-reveal story ─── */
const Sticker = ({
  sticker, index, processedSrc, playgroundRef,
  onMove, onRotate,
}) => {
  const elRef = useRef(null);
  const handleRef = useRef(null);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const rotMV = useMotionValue(sticker.rot);
  const draggedRef = useRef(false);
  const [hovered, setHovered] = useState(false);

  // Initial spring-in for the rotation. Runs once on mount.
  useEffect(() => {
    rotMV.set(sticker.rot - 30);
    const controls = animate(rotMV, sticker.rot, {
      type: "spring",
      stiffness: 220,
      damping: 18,
      delay: 0.1 * index,
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync the motion value back to the persisted sticker.rot when something
  // *other* than the gesture changed it (e.g. Reset Stickers). The gesture
  // already pre-sets the same value, so this is a no-op there.
  useEffect(() => {
    if (Math.abs(rotMV.get() - sticker.rot) > 0.01) {
      rotMV.set(sticker.rot);
    }
  }, [sticker.rot, rotMV]);

  // Drag-to-rotate using the handle that appears under an active sticker.
  // Rotation = angle from sticker center to cursor, minus 90° so the
  // handle (anchored at the bottom of the rotating group) stays under
  // the pointer.
  //
  // Framer-motion's drag attaches a native pointerdown listener to the
  // parent .motion.div, which fires DURING the bubble phase before React
  // dispatches our synthetic handler. So we have to attach our own NATIVE
  // listener directly to the handle button — that fires in the target
  // phase, lets us stopPropagation() before the parent ever sees the
  // event, and keeps framer from kidnapping the gesture as a sticker drag.
  useEffect(() => {
    const el = handleRef.current;
    if (!el) return;

    const onDown = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!elRef.current) return;

      const onMove = (ev) => {
        if (!elRef.current) return;
        const rect = elRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = (Math.atan2(ev.clientY - cy, ev.clientX - cx) * 180) / Math.PI;
        const newRot = angle - 90;
        // Drive the visual instantly via the motion value...
        rotMV.set(newRot);
        // ...and persist for state/reset/serialize.
        onRotate(sticker.id, newRot);
      };
      const onUp = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
      };
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    };

    el.addEventListener("pointerdown", onDown);
    return () => el.removeEventListener("pointerdown", onDown);
    // Re-run when the handle mounts (isActive flips on/off) or when the
    // rotate callback identity changes.
  }, [hovered, sticker.id, onRotate, rotMV]);

  const handleDragStart = () => {
    draggedRef.current = true;
    setHovered(false);
  };

  const handleDragEnd = () => {
    if (!playgroundRef.current || !elRef.current) return;

    // Compute the sticker's new top-left position as a % of the playground.
    // We use the actual rendered rect so this matches what the user sees.
    const stickerRect = elRef.current.getBoundingClientRect();
    const pgRect = playgroundRef.current.getBoundingClientRect();
    const newX = ((stickerRect.left - pgRect.left) / pgRect.width) * 100;
    const newY = ((stickerRect.top  - pgRect.top)  / pgRect.height) * 100;

    // Reset drag offset to 0; the new left/top will take over.
    dragX.set(0);
    dragY.set(0);
    onMove(sticker.id, newX, newY);

    // Reset the dragged flag on next tick so the synthetic onClick that
    // fires after a real drag is suppressed.
    setTimeout(() => { draggedRef.current = false; }, 0);
  };

  return (
    <motion.div
      ref={elRef}
      className="story-sticker"
      style={{
        left: `${sticker.x}%`,
        top:  `${sticker.y}%`,
        x: dragX,
        y: dragY,
        zIndex: hovered ? 100 : undefined,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.1 * index,
      }}
      drag
      dragMomentum={false}
      dragElastic={0}
      whileHover={{ scale: 1.15, zIndex: 100 }}
      whileTap={{ scale: 1.05, zIndex: 100 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Image + handle live inside one rotating group so they spin
          together in real time. The bubble lives OUTSIDE this group so
          its text stays upright and still. */}
      <motion.div className="sticker-rotating-group" style={{ rotate: rotMV }}>
        <img
          className="sticker-img"
          src={processedSrc || sticker.src}
          alt={sticker.label}
          draggable={false}
        />

        <AnimatePresence>
          {hovered && (
            <motion.button
              key="rotate"
              ref={handleRef}
              type="button"
              className="sticker-rotate-handle"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              aria-label={`Rotate ${sticker.label}`}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
                   stroke="currentColor" strokeWidth="2.2"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 3-6.7" />
                <polyline points="3 4 3 10 9 10" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            key="bubble"
            className="sticker-bubble"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 360, damping: 22 }}
          >
            <span className="sticker-bubble-label">{sticker.label}</span>
            <span className="sticker-bubble-text">{sticker.caption}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Main Component ─── */
export default function ThingsILove() {
  const [stickers, setStickers] = useState(STICKERS);
  const playgroundRef = useRef(null);
  const stickerUrls = useProcessedImages(STICKERS);

  const handleMove = useCallback((id, x, y) => {
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, x, y } : s))
    );
  }, []);

  const handleRotate = useCallback((id, rot) => {
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, rot } : s))
    );
  }, []);


  return (
    <section className="things-section" id="things-i-love">
      <div
        className="things-grid-bg"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />
      <div className="ambient-glow glow-left" />
      <div className="ambient-glow glow-right" />

      <motion.div
        className="things-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.875rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ef4444', marginBottom: '1rem' }}>
          / personal
        </p>
        <h2 className="things-title">
          Things That I{" "}
          <span className="title-love-gradient">
            Love
            <svg className="love-scribble" viewBox="0 0 200 12" fill="none">
              <motion.path
                d="M2 8C30 3 60 2 100 5C140 8 170 4 198 6"
                stroke="url(#scribble-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="scribble-grad" x1="0" y1="0" x2="200" y2="0">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h2>
      </motion.div>

      <motion.div
        className="macbook-playground"
        ref={playgroundRef}
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* The MacBook backdrop */}
        <div className="macbook-lid-wrapper">
          <img
            src={macbookLid}
            alt="Silver MacBook Pro"
            className="macbook-lid-img"
            draggable={false}
          />
        </div>

        {/* Stickers — all live in the playground coord space and stay
            wherever the user drops them, on or off the laptop. */}
        {stickers.map((sticker, i) => (
          <Sticker
            key={sticker.id}
            sticker={sticker}
            index={i}
            processedSrc={stickerUrls[sticker.id]}
            playgroundRef={playgroundRef}
            onMove={handleMove}
            onRotate={handleRotate}
          />
        ))}

      </motion.div>
    </section>
  );
}
