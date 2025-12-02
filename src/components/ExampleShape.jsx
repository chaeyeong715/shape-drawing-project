import React from "react";

export default function ExampleShape({ shapeType }) {
  const container = {
    width: 200,
    height: 200,
    border: "2px solid #ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff"
  };

  return (
    <div>
      <h3>예시</h3>
      <div style={container}>
        {shapeType === "triangle" && (
          <div style={{
            width: 0,
            height: 0,
            borderTop: "0 solid transparent",
            borderRight: "100px solid black",
            borderBottom: "100px solid transparent",
          }} />
        )}
        {shapeType === "square" && (
          <div style={{ width: 100, height: 100, border: "4px solid black" }} />
        )}
        {shapeType === "circle" && (
          <div style={{ width: 100, height: 100, borderRadius: "50%", border: "4px solid black" }} />
        )}
      </div>
    </div>
  );
}
