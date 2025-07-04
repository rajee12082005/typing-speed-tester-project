import React from "react";

const Stats = ({ input, quote, time, finished }) => {
  const getWPM = () => {
    const words = input.trim().split(/\s+/).length;
    return time > 0 ? Math.round((words / time) * 60) : 0;
  };

  const getAccuracy = () => {
    let correct = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === quote[i]) correct++;
    }
    return quote.length > 0 ? Math.round((correct / quote.length) * 100) : 0;
  };

  return (
    <div className="stats">
      <p>⏱ Time: {time}s</p>
      <p>⚡ WPM: {finished ? getWPM() : 0}</p>
      <p>🎯 Accuracy: {finished ? getAccuracy() : 0}%</p>
    </div>
  );
};

export default Stats;
