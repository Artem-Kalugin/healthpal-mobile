import React, { ReactNode, useEffect, useState } from 'react';

import BackgroundTimer from 'react-native-background-timer';

import { Duration } from 'luxon';

type TimerContext = {
  value: string;
  valueRaw: number;
  start: (duration?: number) => void;
  stop: () => void;
};

export const OTPTimer = React.createContext<TimerContext>({
  value: '00:00',
  valueRaw: 0,
  start: () => {
    throw new Error('OTPTimerProvider not mounted');
  },
  stop: () => {
    throw new Error('OTPTimerProvider not mounted');
  },
});

const OTP_TIMER_DURATION = 60;

export const OTPTimerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [timer, setTimer] = useState(0);

  const startTimer = (duration = OTP_TIMER_DURATION) => {
    BackgroundTimer.stopBackgroundTimer();

    setTimer(duration);

    BackgroundTimer.runBackgroundTimer(() => {
      setTimer(old => old - 1);
    }, 1000);
  };

  const stopTimer = () => {
    setTimer(0);
    BackgroundTimer.stopBackgroundTimer();
  };

  useEffect(() => {
    if (timer < 1) {
      stopTimer();
    }
  }, [timer]);

  return (
    <OTPTimer.Provider
      value={{
        valueRaw: timer,
        value: `${Duration.fromObject({ seconds: Math.max(timer, 0) }).toFormat('mm:ss')}`,
        start: startTimer,
        stop: stopTimer,
      }}
    >
      {children}
    </OTPTimer.Provider>
  );
};
