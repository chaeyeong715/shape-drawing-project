import React, { useState } from "react";
import MemoryQuestion from "../components/MemoryQuestion";
import MemoryOptions from "../components/MemoryOptions";
import ControlButtons from "../components/ControlButtons";

const ANSWER_IDS = ["circle-red", "triangle-orange"];

const OPTIONS = [
  { id: "triangle-orange", type: "triangle", color: "#f4a742" },
  { id: "circle-black", type: "circle", color: "#222222" },
  { id: "circle-green", type: "circle", color: "#27ae60" },
  { id: "triangle-blue", type: "triangle", color: "#00798c" },
  { id: "circle-red", type: "circle", color: "#d62728" },
  { id: "triangle-purple", type: "triangle", color: "#9b59b6" },
];

export default function MemoryGamePage() {
  const [step, setStep] = useState(1); // 1: 기억하기, 2: 고르기
  const [selectedIds, setSelectedIds] = useState([]);

  const handleNext = () => {
    if (step === 1) setStep(2);
  };

  const handleClear = () => {
    setSelectedIds([]);
  };

  const handleToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const isCorrect =
      selectedIds.length === ANSWER_IDS.length &&
      ANSWER_IDS.every((id) => selectedIds.includes(id));

    if (isCorrect) {
      alert("정답입니다! 👍");
    } else {
      alert("다시 확인해보세요!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {step === 1 && <MemoryQuestion />}

      {step === 2 && (
        <>
          <div
            style={{
              backgroundColor: "#00798c",
              color: "white",
              padding: "10px 20px",
              borderRadius: "20px",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            앞에서 보았던 2가지를 찾아주세요.
          </div>

          <MemoryOptions
            options={OPTIONS}
            selectedIds={selectedIds}
            onToggle={handleToggle}
          />
        </>
      )}

      <ControlButtons
        onClear={step === 2 ? handleClear : undefined}
        onNext={handleNext}
        onSubmit={step === 2 ? handleSubmit : undefined}
      />
    </div>
  );
}
