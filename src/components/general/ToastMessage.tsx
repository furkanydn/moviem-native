import React, {RefObject} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

import {StyleSheets} from '../../StyleSheets';
import {THEME} from '../../utils/theme';
import {TextView} from '../index';

// Konteyner Sınıfının Hazırlanması
class ToastMessage extends React.Component {
  static ref: RefObject<ToastView> = React.createRef();

  static showMessage = (message: string) => {
    ToastMessage.ref?.current?.showMessage(message);
  };

  static closeMessage = () => {
    ToastMessage.ref?.current?.closeMessage();
  };

  render() {
    return <ToastView ref={ToastMessage.ref} />;
  }
}

// Özellikler ve Durum Bileşenleri
const initState = {
  message: '',
  visible: false,
  closing: false,
};

type State = typeof initState;

// // Kullanılacak Ana Bileşen
const displayTime = 2000;
class ToastView extends React.Component<{}, State> {
  state = initState;
  animatedTime = new Animated.Value(0);
  timerID?: NodeJS.Timeout;

  showMessage(message: string) {
    this.animatedTime.stopAnimation(() => {
      this.setState({visible: true, message});
      this.resetTimer();

      Animated.timing(this.animatedTime, {
        duration: 200,
        toValue: 1,
        useNativeDriver: true,
      }).start(() => {
        this.timerID = setTimeout(() => {
          this.closeMessage();
        }, displayTime);
      });
    });
  }

  closeMessage() {
    this.resetTimer();
    Animated.timing(this.animatedTime, {
      duration: 1000,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      this.setState({visible: false});
    });
  }

  resetTimer = () => this.timerID && clearTimeout(this.timerID);

  getAnimatedStyle = (): any => {
    const opacity = this.animatedTime.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const translateY = this.animatedTime.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 0],
    });

    return {transform: [{translateY}], opacity};
  };

  render() {
    const {message, visible} = this.state;
    return visible ? (
      <Animated.View
        pointerEvents="none"
        style={[styles.container, this.getAnimatedStyle()]}>
        <View style={styles.toastContainer}>
          <TextView type="paragraphOne" style={styles.toastMessage}>
            {message}
          </TextView>
        </View>
      </Animated.View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '%80',
    bottom: 80,
    alignSelf: 'center',
  },
  toastContainer: {
    backgroundColor: THEME.COLORS.black,
    borderRadius: THEME.spacing.m,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheets.defaultShadow,
  },
  toastMessage: {
    textAlign: 'center',
    marginHorizontal: THEME.spacing.l,
    marginVertical: THEME.spacing.l,
  },
});

export default ToastMessage;
