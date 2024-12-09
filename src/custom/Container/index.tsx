import { FC, PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { SystemBars } from 'react-native-bars';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

export const Container: FC<PropsWithChildren<{ hasHeader?: boolean; isTab?: boolean; backgroundColor?: string }>> = ({
  hasHeader = false,
  isTab = false,
  children,
  backgroundColor,
}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
      position: 'relative',
    },
  });

  let edges: Edge[] = [];

  if (hasHeader) {
    edges = ['left', 'right', 'top'];
    if (isTab) {
      edges = ['left', 'right'];
    }
  } else {
    edges = ['left', 'right', 'bottom'];
  }

  return (
    <SafeAreaView style={styles.container} edges={edges}>
      <SystemBars animated barStyle="dark-content" />
      {children}
    </SafeAreaView>
  );
};
