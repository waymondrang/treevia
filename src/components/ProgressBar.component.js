import "./ProgressBar.css";
import { useEffect, useState } from "react";

/**
 *
 * @param {*} param0 questionWaitTime is in milliseconds
 * @returns
 */
export default function ProgressBar({ questionWaitTime }) {
  const [progress, setProgress] = useState(0);

  // TODO: Use requestAnimationFrame instead of setInterval
  useEffect(() => {
    let increment = 10 / questionWaitTime;
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        return prevProgress + increment;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="progress-bar">
      <span
        className="progress-bar-progress"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
