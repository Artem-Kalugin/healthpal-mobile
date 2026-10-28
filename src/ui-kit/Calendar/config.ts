import { colors } from '#config/colors';

export const normalizeDefaultStyles = {
  'stylesheet.calendar.main': {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
      backgroundColor: colors.grayscale['50'],
    },
    dayContainer: {},
    emptyDayContainer: {
      flex: 1,
    },
    monthView: {
      backgroundColor: colors.grayscale['50'],
    },
    week: {
      marginVertical: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },
};
