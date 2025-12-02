import React from "react";

const gridStyle = {
  marginTop: "40px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  rowGap: "40px",
  columnGap: "60px",
  justifyItems: "center",
};

const itemStyle = (selected) => ({
  cursor: "pointer",
  padding: "8px",
  borderRadius: "8px",
  border: selected ? "3px solid #00798c" : "3px solid transparent",
});

function Shape({ type, color }) {
  if (type === "circle") {
    return (
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="8"
        />
      </svg>
    );
  }

  return (
    <svg width="120" height="120">
      <polygon
        points="15,105 105,105 60,15"
        fill="none"
        stroke={color}
        strokeWidth="8"
      />
    </svg>
  );
}

export default function MemoryOptions({ options, selectedIds, onToggle }) {
  return (
    <div style={gridStyle}>
      {options.map((shape) => (
        <div
          key={shape.id}
          style={itemStyle(selectedIds.includes(shape.id))}
          onClick={() => onToggle(shape.id)}
        >
          <Shape type={shape.type} color={shape.color} />
        </div>
      ))}
    </div>
  );
}
