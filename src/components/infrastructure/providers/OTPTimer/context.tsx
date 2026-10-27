import React, { useContext } from 'react';

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

export const useTimer = () => useContext(OTPTimer);
