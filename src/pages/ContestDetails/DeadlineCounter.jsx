import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const calculateTimeRemaining = (deadline) => {
  const now = new Date().getTime();
  const deadlineDate = new Date(deadline).getTime();
  const difference = deadlineDate - now;
  const secondsDifference = Math.ceil(difference / 1000);
  return secondsDifference;
};

const convertTime = (seconds) => {
  const days = Math.floor(seconds / (24 * 3600));
  const remainingSeconds = seconds % (24 * 3600);
  const hours = Math.floor(remainingSeconds / 3600);
  const remainingMinutes = remainingSeconds % 3600;
  const minutes = Math.floor(remainingMinutes / 60);
  const remainingSecondsFinal = Math.ceil(remainingMinutes % 60);

  return {
    days,
    hours,
    minutes,
    seconds: remainingSecondsFinal,
  };
};

const DeadlineCounter = ({ deadline }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(
    calculateTimeRemaining(deadline)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { days, hours, minutes, seconds } = convertTime(remainingSeconds);

  return (
    <div className="grid grid-flow-col justify-center gap-5 md:gap-8 text-center auto-cols-max">
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          {remainingSeconds <= 0 ? (
            <span style={{ "--value": 0 }}></span>
          ) : (
            <span style={{ "--value": days }}></span>
          )}
        </span>
        Days
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          {remainingSeconds <= 0 ? (
            <span style={{ "--value": 0 }}></span>
          ) : (
            <span style={{ "--value": hours }}></span>
          )}
        </span>
        Hours
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          {remainingSeconds <= 0 ? (
            <span style={{ "--value": 0 }}></span>
          ) : (
            <span style={{ "--value": minutes }}></span>
          )}
        </span>
        Min
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          {remainingSeconds <= 0 ? (
            <span style={{ "--value": 0 }}></span>
          ) : (
            <span style={{ "--value": seconds }}></span>
          )}
        </span>
        Sec
      </div>
    </div>
  );
};

DeadlineCounter.propTypes = {
  deadline: PropTypes.string,
};

export default DeadlineCounter;
