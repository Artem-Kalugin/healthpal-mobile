/* eslint-disable @typescript-eslint/no-require-imports */
import { setUpTests } from 'react-native-reanimated';

setUpTests();
jest.mock('react-native-svg', () => require('react-native-reanimated/mock'));
