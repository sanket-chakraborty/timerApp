import  { useEffect, useState } from 'react';
import style from './Timer.module.css';
import { formatTime, calculateTime } from '../utils/auxiliaryFunctions';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [editState, setEditState] = useState({ field: null, value: '' });

  useEffect(() => {
    let clock;
    if (isRunning) {
      clock = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(clock);
  }, [isRunning]);

  const formattedTime = formatTime(time);

  const handleEditField = (field) => {
    if (editState.field === field) {
      const newTime = {
        ...formattedTime,
        [field]: editState.value.padStart(2, '0')
      };
      const calculatedTime = calculateTime(newTime.hours, newTime.minutes, newTime.seconds);
      setTime(calculatedTime);
      setEditState({ field: null, value: '' });
    } else {
      setIsRunning(false);
      setEditState({ field, value: formattedTime[field].replace(/^0+/, '') });
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setEditState((prevState) => ({ ...prevState, value }));
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  const TimerComponent = () => {
    return (
      <div className={style.timerApp}>
        <div className={style.timerDisplay}>
          <div className={style.timerCircle}>
            <div className={style.timerTime}>
              {editState.field === 'hours' ? (
                <input
                  className={style.timeInput}
                  type="text"
                  value={editState.value}
                  onChange={handleInputChange}
                  onBlur={() => handleEditField('hours')}
                  autoFocus
                />
              ) : (
                <span className={style.timeUnit} onClick={() => handleEditField('hours')}>{formattedTime.hours}</span>
              )}
              :
              {editState.field === 'minutes' ? (
                <input
                  className={style.timeInput}
                  type="text"
                  value={editState.value}
                  onChange={handleInputChange}
                  onBlur={() => handleEditField('minutes')}
                  autoFocus
                />
              ) : (
                <span className={style.timeUnit} onClick={() => handleEditField('minutes')}>{formattedTime.minutes}</span>
              )}
              :
              {editState.field === 'seconds' ? (
                <input
                  className={style.timeInput}
                  type="text"
                  value={editState.value}
                  onChange={handleInputChange}
                  onBlur={() => handleEditField('seconds')}
                  autoFocus
                />
              ) : (
                <span className={style.timeUnit} onClick={() => handleEditField('seconds')}>{formattedTime.seconds}</span>
              )}
            </div>
          </div>
        </div>
        <div className={style.actionButtons}>
          <button className={style.actionButton} onClick={toggleTimer}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button className={style.actionButton} onClick={resetTimer}>Reset</button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <TimerComponent />
    </div>
  );
};

export default Timer;