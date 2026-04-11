import React, { useMemo } from "react";

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
    [1, 0, 0, 0, 1],
  ],
  DOT: [
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [3],
  ],
};

const STAGGER_RATE = 0.01768;
const PER_DOT_DURATION = 0.1;
const WARMUP = 0.5;
const sizeClasses = "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6";

const Block = ({ type, delayIndex }) => {
  if (type === 0) {
    return <div className={sizeClasses} />;
  }

  let targetBg = "#d4d4d8";
  let targetRadius = "2px";
  let targetShadow = "none";

  if (type === 2) {
    targetBg = "#ffffff";
    targetShadow = "0 0 15px rgba(255,255,255,0.8)";
  } else if (type === 3) {
    targetBg = "#ef4444";
    targetRadius = "50%";
  }

  const delayTime = delayIndex * STAGGER_RATE + WARMUP;

  return (
    <div
      className={`${sizeClasses} relative hero-dot`}
      style={{
        "--dot-bg": targetBg,
        "--dot-radius": targetRadius,
        "--dot-shadow": targetShadow,
        "--dot-delay": `${delayTime}s`,
        "--dot-duration": `${PER_DOT_DURATION}s`,
      }}
    />
  );
};

const LetterGrid = ({ letterData, uniqueId }) => {
  const cols = letterData[0]?.length ?? 5;
  return (
    <div
      className="grid gap-0.5 sm:gap-1 md:gap-1.5"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
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
  ],
  DOT: [
    [6,0]
  ]
};

const calculateGridData = (word, startIndex = 0) => {
  let currentIndex = startIndex;
  const wordData = word.map(char => {
    const matrix = LETTERS[char];
    const path = LETTER_PATHS[char];
    
    const cols = matrix[0].length;
    let delayMatrix = Array.from({ length: 7 }, () => Array(cols).fill(-1));
    
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
    const { wordData: second } = calculateGridData(["U", "R", "L", "A", "M", "DOT"], nextIndex);
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
