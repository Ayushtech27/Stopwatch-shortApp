import React, { useState, useRef, useEffect } from "react";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  function start() {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);

      console.log("ref", intervalRef);
    }
  }

  // when unmounts it will clear the interval
  // good practise
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  function stop() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }

  function reset() {
    setTime(0);
    setLaps([]);
  }

  function recordLap() {
    if (isRunning) {
      setLaps((laps) => [...laps, time]);
    }
  }

  return (
    <div>
      <h1>{time}</h1>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
      <button onClick={recordLap}>Record Lap</button>
      <ul>
        {laps.map((lap, index) => (
          <li key={lap}>{lap}</li>
        ))}
      </ul>
    </div>
  );
}

export default Stopwatch;
