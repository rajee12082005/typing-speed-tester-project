import React, { useEffect, useState } from 'react';
import './App.css';
import sentenceList from './sentences';
import { calculateAccuracy } from './utils';

function App() {
  const [sentence, setSentence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    loadNewSentence();
  }, []);

  const loadNewSentence = () => {
    const random = Math.floor(Math.random() * sentenceList.length);
    setSentence(sentenceList[random]);
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setWpm(null);
    setAccuracy(null);
    setIsFinished(false);
  };

  const handleChange = (e) => {
    if (!startTime) setStartTime(Date.now());
    setUserInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && userInput.trim().length > 0) {
      const end = Date.now();
      setEndTime(end);
      const timeTaken = (end - startTime) / 1000 / 60; // minutes
      const wordsTyped = userInput.trim().split(/\s+/).length;
      const calculatedWPM = Math.round(wordsTyped / timeTaken);
      const calculatedAccuracy = calculateAccuracy(sentence.trim(), userInput.trim());
      setWpm(calculatedWPM);
      setAccuracy(calculatedAccuracy);
      setIsFinished(true);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h2>⌨️ Typing Speed Tester</h2>

        {/* Live highlighting */}
        <div className="highlighted-sentence">
          {sentence.split('').map((char, index) => {
            let className = '';
            if (index < userInput.length) {
              className = char === userInput[index] ? 'correct' : 'incorrect';
            } else {
              className = 'remaining';
            }
            return (
              <span key={index} className={className}>
                {char}
              </span>
            );
          })}
        </div>

        <textarea
          rows="3"
          value={userInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isFinished}
          placeholder="Start typing here..."
        />
        {isFinished && (
          <div className="stats">
            <p>⏱ Time: {Math.round((endTime - startTime) / 1000)}s</p>
            <p>⚡ WPM: {wpm}</p>
            <p>🎯 Accuracy: {accuracy}%</p>
            <button onClick={loadNewSentence}>🔁 Try Another Sentence</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
