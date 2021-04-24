import React from 'react';
import {
  ActivityIndicator,
  Modal,
  ModalProps,
  StyleSheet,
  View,
} from 'react-native';
import {THEME} from '../../utils/theme';
import {FixDefaults} from '../../utils/type';

// Durum Sabitleri
const defProps = {onRequestClose: (() => {}) as ModalProps['onRequestClose']};

type Props = {visible: boolean} & typeof defProps;

// Bileşenler
const Spinner: FixDefaults<React.FC<Props>, typeof defProps> = ({
  onRequestClose,
  visible,
}) => (
  <Modal transparent={true} onRequestClose={onRequestClose} visible={visible}>
    <View style={styles.container}>
      <ActivityIndicator
        color={THEME.COLORS.lightest}
        size={THEME.specification.activityIndicatorSize}
      />
    </View>
  </Modal>
);

Spinner.defaultProps = defProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Spinner;
