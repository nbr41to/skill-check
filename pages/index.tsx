import clsx from 'clsx';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

type Problem = {
  screenX: number;
  screenY: number;
  arg: number;
};

/* 270 / 1.2s * 3/4 */
const createProblem = () => {
  // if (typeof window === 'undefined') return;
  /* 画面の位置 */
  const screenX = Math.floor(Math.random() * (window.innerWidth - 300));
  const screenY = Math.floor(Math.random() * (window.innerHeight - 300));

  /* ボタンを押すタイミングの位置（100） */
  const arg = Math.floor(Math.random() * 200);
  +30;

  return {
    screenX,
    screenY,
    arg,
  };
};

const Home: NextPage = () => {
  const [startedBy, setStartedBy] = useState<'yet' | 'normal' | 'hard'>('yet');
  const [state, setState] = useState<'ready' | 'start' | 'stop'>('ready');
  const [nextProblem, setNextProblem] = useState<Problem>({
    screenX: 0,
    screenY: 0,
    arg: 0,
  });
  const [time, setTime] = useState<Date>();
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ great: 0, good: 0, failed: 0 });

  const startBy = (mode: 'normal' | 'hard') => {
    setScore({ great: 0, good: 0, failed: 0 });
    setStartedBy(mode);
    const screen = document.getElementById('screen');
    if (screen) {
      screen.focus();
    }
  };

  useEffect(() => {
    if (startedBy === 'yet') return;
    if (state !== 'ready') return;
    const problem = createProblem();
    setNextProblem(problem);
    // const timeTo = Math.random() * 30 * 1000 + 10000; // 10~30秒
    const timeTo = Math.random() * 3 * 1000 + 1000; // 1~3秒

    setTimeout(() => {
      start();
    }, timeTo);
  }, [startedBy, state]);

  let timer: NodeJS.Timeout;

  const start = () => {
    setState('start');
    const now = new Date();
    setTime(now);

    clearTimeout(timer);
    timer = setTimeout(() => {
      setState('ready');
      setResult('');
    }, 1200);
  };

  const stop = () => {
    setState('stop');
    const now = new Date();
    const scoreTime = Number(now) - Number(time) - 1200 / 4;
    setTime(now);

    clearTimeout(timer);
    setTimeout(() => {
      setState('ready');
      setResult('');
    }, 1800);

    const k = (1200 * 3) / 4 / 270; // 1度あたりのミリ秒数
    const greatZone = k * nextProblem.arg;
    console.log('scoreTime', scoreTime);
    console.log('greatZone', greatZone);

    if (greatZone <= scoreTime && scoreTime < greatZone + k * 10) {
      setResult('GREAT✨');
      setScore((prev) => ({
        ...prev,
        great: prev.great + 1,
      }));
    } else if (
      greatZone + k * 10 <= scoreTime &&
      scoreTime < greatZone + k * 30
    ) {
      setResult('GOOD👍');
      setScore((prev) => ({
        ...prev,
        good: prev.good + 1,
      }));
    } else {
      setResult('FAILED☠️');
      setScore((prev) => ({
        ...prev,
        failed: prev.failed + 1,
      }));
    }
  };

  return (
    <div
      className='fixed bg-gray-900 w-screen h-screen outline-none'
      id='screen'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setStartedBy('yet');
          setState('ready');
        } else {
          if (state == 'start') {
            stop();
            return;
          }
        }
      }}
      onClick={() => {
        if (state == 'start') {
          stop();
          return;
        }
      }}
    >
      {/* start button */}
      {startedBy === 'yet' ? (
        <div className='h-full flex flex-col justify-center items-center text-gray-200'>
          {Object.values(score).some((value) => value > 0) && (
            <div className='p-4 text-center'>
              <h2>PREVENT SCORE({score.great + score.good + score.failed})</h2>
              <p>GREAT: {score.great}</p>
              <p>GOOD: {score.good}</p>
              <p>FAILED: {score.failed}</p>
            </div>
          )}
          <h1 className='text-gray-200 text-4xl font-bold '>SKILL CHECKER</h1>
          <div className='mt-10 flex justify-center gap-4'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-xl font-bold py-3 px-6 rounded-lg'
              onClick={() => startBy('normal')}
            >
              normal
            </button>
            <button
              className='bg-red-500 hover:bg-red-700 text-xl font-bold py-3 px-6 rounded-lg'
              onClick={() => startBy('hard')}
            >
              hard
            </button>
          </div>
          <p className='mt-6'>Stop it by pressing the key or clicking.</p>
        </div>
      ) : (
        <div className='text-gray-200 p-4'>
          {/* score */}
          <h2>SCORE({score.great + score.good + score.failed})</h2>
          <p>GREAT: {score.great}</p>
          <p>GOOD: {score.good}</p>
          <p>FAILED: {score.failed}</p>
          <p>({startedBy.toUpperCase()} MODE)</p>
        </div>
      )}

      {/* skill checker */}
      {state !== 'ready' && (
        <div
          className='w-40 h-40 relative flex justify-center items-center'
          style={
            startedBy === 'hard'
              ? {
                  top: nextProblem.screenY + 'px',
                  left: nextProblem.screenX + 'px',
                }
              : {
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }
          }
        >
          {/* 針 */}
          <div
            className={clsx(
              'relative z-50 w-36 h-36 flex justify-center items-center',
              'spin',
              state === 'stop' && 'stop',
            )}
          >
            <div className='w-16' />
            <div className='w-16 h-[3px] rounded-[50%] bg-red-600' />
          </div>

          {/* target gauge */}
          <div
            className={clsx(
              'absolute top-1/2 left-1/2 w-28 h-28',
              '-translate-x-1/2 -translate-y-1/2',
            )}
          >
            <div className='absolute z-40 w-[108px] h-[108px] m-0.5 rounded-full border border-gray-200' />
            <div className='absolute z-40 top-1.5 left-1.5 w-[100px] h-[100px] rounded-full bg-gray-900'></div>

            <div
              className='absolute z-30 w-full h-full'
              style={{
                transform: `rotate(${nextProblem.arg + 40}deg)`,
              }}
            >
              <div className='w-1/2 h-1/2 bg-gray-200 rounded-tr-full ml-auto' />
            </div>
            <div
              className='absolute z-30 w-full h-full'
              style={{
                transform: `rotate(${nextProblem.arg + 10}deg)`,
              }}
            >
              <div className='w-1/2 h-1/2 bg-emerald-400 rounded-tr-full ml-auto' />
            </div>
            <div
              className='absolute z-30 -top-1 -left-1  w-[106%] h-[106%]'
              style={{
                transform: `rotate(${nextProblem.arg}deg)`,
              }}
            >
              <div className='w-1/2 h-1/2 bg-gray-900 rounded-tr-full ml-auto' />
            </div>
          </div>
          {/* result */}
          <div className='absolute -bottom-2 text-gray-200'>{result}</div>
        </div>
      )}
    </div>
  );
};

export default Home;
