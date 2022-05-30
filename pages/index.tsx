import clsx from 'clsx';
import type { NextPage } from 'next';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

// 1200ms
const createCheckZone = () => {
  const greatZone = 700;
};
const greatZone = 600;

const Home: NextPage = () => {
  const [isStart, setIsStart] = useState(false);
  const [time, setTime] = useState<Date>();
  const [result, setResult] = useState('');

  const start = () => {
    setIsStart(true);
    const now = new Date();
    setTime(now);
    const container = document.getElementById('container');
    if (container) {
      container.focus();
    }
  };

  const stop = () => {
    const now = new Date();
    const score = Number(now) - Number(time);
    console.log(Number(now) - Number(time));
    setTime(now);
    setIsStart(false);
    if (greatZone <= score && score < greatZone + 100) {
      setResult('GREAT!!');
    } else if (greatZone + 100 <= score && score < greatZone + 300) {
      setResult('GOOD!!');
    } else {
      setResult('BOOOOM');
    }
  };

  return (
    <>
      <div
        id='container'
        tabIndex={0}
        className={styles.container}
        onKeyDown={(e) => {
          console.log(e.key);
          if (e.key === ' ') {
            if (isStart) {
              stop();
            } else {
              start();
            }
          }
        }}
      >
        {isStart && (
          <div className={styles.circle}>
            <div className={clsx(styles.needle, isStart && styles.rotate)}>
              <div className={styles.white}></div>
              <div className={styles.red}></div>
            </div>
            <div className={styles.targetCircle}>
              <div className={styles.target}></div>
            </div>
          </div>
        )}
      </div>
      <button onClick={start}>START</button>
      <span>{result}</span>
      <div className={clsx(styles.menu, isStart && styles.visible)}>MENU</div>
    </>
  );
};

export default Home;
