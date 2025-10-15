import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

const ListExtender: React.FC<
  Partial<{ height: number; children: ReactNode }>
> = ({ height = 14, children = null }) => {
  const styles = getStyles(height);
  return <View style={styles.container}>{children}</View>;
};

const getStyles = (height: number) =>
  StyleSheet.create({
    container: {
      minHeight: height,
    },
  });

export default ListExtender;
