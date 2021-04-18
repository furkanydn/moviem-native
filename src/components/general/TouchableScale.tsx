import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  ViewStyle,
} from 'react-native';
import {throttle} from 'throttle-debounce';
import {WithDefaultProps} from '../../utils/type';

// Özellik ve Durum Bileşenleri

const defaultProps = {
  throttleTime: 750,
  activeOpacity: 0.6,
  initScale: 1,
  scaleFactor: 0.95,
};
const initState = {hovered: false};

type OwnProps = {style?: ViewStyle} & typeof defaultProps;
type Props = OwnProps & TouchableWithoutFeedbackProps;
type State = typeof initState;

export type TouchableScaleProps = WithDefaultProps<Props, typeof defaultProps>;

// Kullanılacak Ana Bileşen
class TouchableScale extends React.PureComponent<Props, State> {
  static defaultProps = defaultProps;
  state = initState;
  buttonAnimated = new Animated.Value(this.props.initScale);
  scaleToValue = this.props.initScale * this.props.scaleFactor;

  // https://reactnative.dev/docs/pressable
  onPressIn = (event: GestureResponderEvent) => {
    const {onPressIn} = this.props;
    this.setState({hovered: true});
    this.buttonAnimated.setValue(this.scaleToValue);
    onPressIn && onPressIn(event);
  };
  onPressOut = (event: GestureResponderEvent) => {
    const {initScale, onPressOut} = this.props;
    this.setState({hovered: false});
    this.buttonAnimated.setValue(initScale);
    onPressOut && onPressOut(event);
  };
  onPress = (event: GestureResponderEvent) => {
    const {onPress} = this.props;
    if (onPress) {
      onPress(event);
    }
  };

  throttleOnPress = throttle(this.props.throttleTime, true, this.onPress);

  getAnimated = () => {
    const {activeOpacity, initScale} = this.props;
    const opacity = this.buttonAnimated.interpolate({
      inputRange: [this.scaleToValue, initScale],
      outputRange: [activeOpacity, 1],
    });

    return {transform: [{scale: this.buttonAnimated}], opacity};
  };

  render() {
    const {children, style, ...props} = this.props;
    return (
      <TouchableWithoutFeedback
        {...props}
        onPress={this.throttleOnPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <Animated.View style={[style, this.getAnimated()]}>
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default TouchableScale;
