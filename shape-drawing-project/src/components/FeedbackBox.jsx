import React from "react";

export default function FeedbackBox({ message }) {
  return (
    <div style={{ marginTop: 20, padding: 12, border: "1px solid #888", background: "#fafafa" }}>
      <strong>결과: </strong> {message}
    </div>
  );
}
