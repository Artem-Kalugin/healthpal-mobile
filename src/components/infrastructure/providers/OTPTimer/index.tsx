import React, { ReactNode, useEffect, useState } from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { useDispatch, useSelector } from '#store';
import { AppActions } from '#store/slices/app';

import { OTP_TIMER_DURATION } from './config';
import { OTPTimer } from './context';

export { useTimer } from './context';

dayjs.extend(duration);

export const OTPTimerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const endsAt = useSelector(store => store.app.otpTimerEndsAt);
  const [now, setNow] = useState(() => Date.now());

  // remaining time is always derived from the end timestamp, so JS being
  // suspended in the background (or the app being restarted) cannot skew it
  const timer = endsAt ? Math.max(0, Math.ceil((endsAt - now) / 1000)) : 0;

  const startTimer = (_duration = OTP_TIMER_DURATION) => {
    const current = Date.now();

    setNow(current);
    dispatch(AppActions.setOtpTimerEndsAt(current + _duration * 1000));
  };

  const stopTimer = () => {
    dispatch(AppActions.setOtpTimerEndsAt(null));
  };

  useEffect(() => {
    if (!endsAt) {
      return;
    }

    const intervalId = setInterval(() => {
      const current = Date.now();

      setNow(current);

      if (current >= endsAt) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endsAt]);

  return (
    <OTPTimer.Provider
      value={{
        valueRaw: timer,
        value: dayjs.duration(timer, 'seconds').format('mm:ss'),
        start: startTimer,
        stop: stopTimer,
      }}
    >
      {children}
    </OTPTimer.Provider>
  );
};
