import React from "react";

const containerStyle = {
  padding: "20px",
};

const barStyle = {
  backgroundColor: "#00798c",
  color: "white",
  padding: "10px 20px",
  borderRadius: "20px",
  fontWeight: "bold",
  display: "inline-block",
};

const shapesWrapperStyle = {
  marginTop: "80px",
  display: "flex",
  justifyContent: "center",
  gap: "120px",
};

export default function MemoryQuestion() {
  return (
    <div style={containerStyle}>
      <div style={barStyle}>다음 2개의 도형과 색깔을 잘 기억하세요.</div>

      <div style={shapesWrapperStyle}>
        {/* 빨간 원 */}
        <svg width="180" height="180">
          <circle
            cx="90"
            cy="90"
            r="70"
            fill="none"
            stroke="#d62728"
            strokeWidth="10"
          />
        </svg>

        {/* 주황 삼각형 */}
        <svg width="200" height="180">
          <polygon
            points="20,160 180,160 100,20"
            fill="none"
            stroke="#f4a742"
            strokeWidth="10"
          />
        </svg>
      </div>
    </div>
  );
}
