import React from 'react';

export default function DelayBlock({
  delayHours,
  delayMinutes,
  suspendJobForTime,
  delayDisabled,
  delayDropdownOpened,
  toggleDelayDropdown,
  setHours,
  setMinutes,
}) {
  const increaseHours = () => {
    if (delayHours !== 23) {
      setHours((prev) => prev + 1);
    } else {
      setHours(0);
    }
  };

  const decreaseHours = () => {
    if (delayHours !== 0) {
      setHours((prev) => prev - 1);
    } else {
      setHours(23);
    }
  };

  const increaseMinutes = () => {
    if (delayMinutes !== 59) {
      setMinutes((prev) => prev + 1);
    } else {
      setMinutes(0);
    }
  };

  const decreaseMinutes = () => {
    if (delayMinutes !== 0) {
      setMinutes((prev) => prev - 1);
    } else {
      setMinutes(59);
    }
  };

  const parseNumberToTime = (number) => {
    if (number < 10) {
      return '0' + number;
    } else {
      return number;
    }
  };

  const resetDelayTime = () => {
    setHours(0);
    setMinutes(0);
  };

  return (
    <div className="box">
      <div className="box-title">
        <strong>Відкласти</strong>
      </div>

      <div className="box-content">
        <div className="input-block">
          <button
            disabled={delayDisabled}
            onClick={toggleDelayDropdown}
            className="arr arr-down"
          ></button>
          <input
            type="text"
            className="input input-time"
            placeholder="Час"
            disabled
            value={`${parseNumberToTime(delayHours)} : ${parseNumberToTime(
              delayMinutes
            )}`}
          />
          {delayDropdownOpened && (
            <div className="timer-box">
              <div className="timer-inputs">
                <div className="timer-input">
                  <button onClick={increaseHours} className="increase"></button>
                  <input
                    type="number"
                    className="nums"
                    disabled
                    value={parseNumberToTime(delayHours)}
                  />
                  <button onClick={decreaseHours} className="decrease"></button>
                </div>
                <span>:</span>
                <div className="timer-input">
                  <button onClick={increaseMinutes} className="increase"></button>
                  <input
                    type="number"
                    className="nums"
                    disabled
                    value={parseNumberToTime(delayMinutes)}
                  />
                  <button onClick={decreaseMinutes} className="decrease"></button>
                </div>
              </div>

              <div className="timer-buttons">
                <button onClick={suspendJobForTime} type="button" className="button">
                  Підтвердити
                </button>
                <button
                  onClick={resetDelayTime}
                  type="submit"
                  className="button reset"
                >
                  Очистити
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
