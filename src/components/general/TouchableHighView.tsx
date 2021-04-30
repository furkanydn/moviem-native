import React from 'react';
import {GestureResponderEvent, StyleSheet, View, ViewStyle} from 'react-native';
import {WithDefaultProps} from '../../utils/type';
import TouchableScale, {TouchableScaleProps} from './TouchableScale';
import {THEME} from '../../utils/theme';

// Durumlar ve Özellikler
const defProps = {
  highlightColor: THEME.COLORS.transparentBlackThree,
};

const initState = {
  backgroundColor: undefined as undefined | string,
};

type OwnProps = {
  style?: ViewStyle;
  contentStyle?: ViewStyle;
} & typeof defProps;

type Props = OwnProps & TouchableScaleProps;

type State = typeof initState;

export type TouchableHighViewProps = WithDefaultProps<Props, typeof defProps>;

// Bileşen

class TouchableHighView extends React.PureComponent<Props, State> {
  static defProps = defProps;
  state = initState;

  pressIn = (event: GestureResponderEvent) => {
    const {onPressIn, highlightColor} = this.props;
    this.setState({backgroundColor: highlightColor});
    onPressIn && onPressIn(event);
  };

  pressOut = (event: GestureResponderEvent) => {
    const {onPressOut} = this.props;
    this.setState({backgroundColor: undefined});
    onPressOut && onPressOut(event);
  };

  render() {
    const {children, style, contentStyle, ...props} = this.props;

    return (
      <View
        style={StyleSheet.flatten([
          style,
          {backgroundColor: this.state.backgroundColor},
        ])}>
        <TouchableScale
          style={contentStyle}
          onPressIn={this.pressIn}
          onPressOut={this.pressOut}
          {...props}>
          {children}
        </TouchableScale>
      </View>
    );
  }
}

export default TouchableHighView;
