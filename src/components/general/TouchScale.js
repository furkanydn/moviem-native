import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  ViewStyla,
} from 'react-native';
import {throttle} from 'throttle-debounce';

// Proplar ve State'ler
const defaultProps = {
  throttleTime: 800,
  activeOpacity: 0.6,
  initScale: 1,
  scaleFactor: 0.9,
};
const initState = {
  isHovered: false,
};

// Bileşenin yazılması
class TouchScale extends React.PureComponent<Props, State> {
  static defaultProps = defaultProps;
  state = initState;
  buttonAnimateValue = new Animated.Value(this.props.initState);
}
