import React from "react";

export default function ControlButtons({ onClear, onNext, onSubmit }) {
  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={onClear}>지우기</button>
      <button onClick={onNext} style={{ marginLeft: 10 }}>다음</button>
      <button onClick={onSubmit} style={{ marginLeft: 10 }}>제출</button>
    </div>
  );
}
