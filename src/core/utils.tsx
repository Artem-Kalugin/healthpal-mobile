export const pluralize = (
  number: number,
  wordForOne: string,
  wordForTwo: string,
  wordForFive: string,
) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return wordForFive;
  }
  n %= 10;
  if (n === 1) {
    return wordForOne;
  }
  if (n >= 2 && n <= 4) {
    return wordForTwo;
  }
  return wordForFive;
};

//syntax sugar for (await reactSync());
export const reactSync = () => delay(0);

export const delay = (time = 100) => {
  const _delay = new Promise(resolve => {
    setTimeout(() => {
      resolve('');
    }, time);
  });

  return _delay;
};
