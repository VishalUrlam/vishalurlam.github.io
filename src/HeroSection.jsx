import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const LETTERS = {
  V: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  I: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  S: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  A: [
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  L: [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  U: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  R: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 3],
  ],
};

const STAGGER_RATE = 0.040;
const sizeClasses = "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6";

const Block = ({ type, delayIndex }) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  if (type === 0) {
    return <div className={sizeClasses} />;
  }

  let targetBg = "#d4d4d8";
  let targetRadius = "2px";
  let targetShadow = "none";
  let hoverGlow = "0 0 20px #d4d4d8";

  if (type === 2) {
    targetBg = "#ffffff";
    targetShadow = "0 0 15px rgba(255,255,255,0.8)";
    hoverGlow = "0 0 25px rgba(255,255,255,1)";
  } else if (type === 3) {
    targetBg = "#ef4444";
    targetRadius = "50%";
    targetShadow = "none";
    hoverGlow = "0 0 25px rgba(239,68,68,1)";
  }

  const delayTime = delayIndex * STAGGER_RATE;

  // After entrance animation completes, lock to static final values
  // so hover-out doesn't replay keyframes from scale:0
  const entranceAnimation = {
    opacity: 1,
    scale: [0, 1.3, 1, 1],
    backgroundColor: ["#ef4444", "#ef4444", targetBg, targetBg],
    borderRadius: ["50%", "50%", targetRadius, targetRadius],
    boxShadow: [
      "0 0 15px rgba(239, 68, 68, 1)",
      "0 0 15px rgba(239, 68, 68, 1)",
      targetShadow,
      targetShadow
    ]
  };

  const restingState = {
    opacity: 1,
    scale: 1,
    backgroundColor: targetBg,
    borderRadius: targetRadius,
    boxShadow: targetShadow
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={hasAnimated ? restingState : entranceAnimation}
      transition={hasAnimated ? { duration: 0 } : {
        opacity: { duration: 0.01, delay: delayTime },
        default: {
          duration: STAGGER_RATE * 2,
          times: [0, 0.49, 0.5, 1],
          delay: delayTime,
          ease: "linear"
        }
      }}
      onAnimationComplete={() => {
        if (!hasAnimated) setHasAnimated(true);
      }}
      whileHover={{
        scale: 1.3,
        backgroundColor: "#ffffff",
        boxShadow: "0 0 25px rgba(255,255,255,1)",
        zIndex: 50,
        transition: { type: "spring", stiffness: 400, damping: 10 },
      }}
      className={`${sizeClasses} relative`}
      style={{ backgroundColor: hasAnimated ? targetBg : undefined }}
    />
  );
};

const LetterGrid = ({ letterData, uniqueId }) => {
  return (
    <div className="grid grid-cols-5 gap-0.5 sm:gap-1 md:gap-1.5">
      {letterData.map((row, rIdx) =>
        row.map((cell, cIdx) => (
          <Block 
            key={`${uniqueId}-${rIdx}-${cIdx}`} 
            type={cell.val} 
            delayIndex={cell.delayIndex} 
          />
        ))
      )}
    </div>
  );
};

const LETTER_PATHS = {
  V: [
    [0,0], [1,0], [2,0], [3,0], [4,0], [5,1], [6,2], [5,3], [4,4], [3,4], [2,4], [1,4], [0,4]
  ],
  I: [
    [0,0], [0,1], [0,2], [0,3], [0,4],
    [1,2], [2,2], [3,2], [4,2], [5,2],
    [6,0], [6,1], [6,2], [6,3], [6,4]
  ],
  S: [
    [0,4], [0,3], [0,2], [0,1],
    [1,0], [2,0],
    [3,1], [3,2], [3,3],
    [4,4], [5,4],
    [6,3], [6,2], [6,1], [6,0]
  ],
  H: [
    [0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0],
    [3,1], [3,2], [3,3],
    [0,4], [1,4], [2,4], [3,4], [4,4], [5,4], [6,4]
  ],
  A: [
    [6,0], [5,0], [4,0], [3,0], [2,0], [1,1], [0,2],
    [1,3], [2,4], [3,4], [4,4], [5,4], [6,4],
    [3,1], [3,2], [3,3]
  ],
  L: [
    [0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0],
    [6,1], [6,2], [6,3], [6,4]
  ],
  U: [
    [0,0], [1,0], [2,0], [3,0], [4,0], [5,0],
    [6,1], [6,2], [6,3],
    [5,4], [4,4], [3,4], [2,4], [1,4], [0,4]
  ],
  R: [
    [6,0], [5,0], [4,0], [3,0], [2,0], [1,0], [0,0],
    [0,1], [0,2], [0,3], [1,4], [2,4], [3,3], [3,2], [3,1],
    [4,2], [5,3], [6,4]
  ],
  M: [
    [6,0], [5,0], [4,0], [3,0], [2,0], [1,0], [0,0],
    [1,1], [2,2], [1,3], [0,4],
    [1,4], [2,4], [3,4], [4,4], [5,4], [6,4]
  ]
};

const calculateGridData = (word, startIndex = 0) => {
  let currentIndex = startIndex;
  const wordData = word.map(char => {
    const matrix = LETTERS[char];
    const path = LETTER_PATHS[char];
    
    let delayMatrix = Array.from({ length: 7 }, () => Array(5).fill(-1));
    
    if (path) {
      path.forEach(([rIdx, cIdx]) => {
        delayMatrix[rIdx][cIdx] = currentIndex;
        currentIndex++;
      });
    }

    const letterData = matrix.map((row, rIdx) => 
      row.map((val, cIdx) => {
        return { val, delayIndex: delayMatrix[rIdx][cIdx] !== -1 ? delayMatrix[rIdx][cIdx] : 0 };
      })
    );

    return letterData;
  });
  return { wordData, nextIndex: currentIndex };
};

export default function HeroSection() {
  const { firstRowData, secondRowData } = useMemo(() => {
    const { wordData: first, nextIndex } = calculateGridData(["V", "I", "S", "H", "A", "L"], 0);
    const { wordData: second } = calculateGridData(["U", "R", "L", "A", "M"], nextIndex);
    return { firstRowData: first, secondRowData: second };
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-950 overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 flex flex-col gap-10 sm:gap-14 md:gap-20 items-start overflow-visible">
        <div className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {firstRowData.map((letterData, index) => (
            <LetterGrid
              key={`first-${index}`}
              letterData={letterData}
              uniqueId={`first-${index}`}
            />
          ))}
        </div>
        
        <div className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {secondRowData.map((letterData, index) => (
            <LetterGrid
              key={`last-${index}`}
              letterData={letterData}
              uniqueId={`last-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
