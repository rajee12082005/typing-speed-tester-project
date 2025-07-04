import React, { useEffect } from "react";

const TypingBox = ({
  quote,
  input,
  setInput,
  started,
  setStarted,
  time,
  setTime,
  setFinished,
  finished
}) => {
  useEffect(() => {
    let timer;
    if (started && !finished) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [started, finished]);

  const handleChange = (e) => {
    const val = e.target.value;

    // End test when user presses Enter
    if (val.endsWith("\n")) {
      setFinished(true);
      return;
    }

    setInput(val);
    if (!started && val.length === 1) {
      setStarted(true);
    }
  };

  const getHighlightedText = () => {
    return quote.split("").map((char, i) => {
      let className = "";
      if (i < input.length) {
        className = input[i] === char ? "correct" : "wrong";
      }
      return (
        <span key={i} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="typing-box">
      <p className="quote">{getHighlightedText()}</p>
      <textarea
        value={input}
        onChange={handleChange}
        placeholder="Start typing here..."
        rows="4"
        disabled={finished}
      />
    </div>
  );
};

export default TypingBox;
