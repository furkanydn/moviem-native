import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {HexToRGB} from '../../utils/color';

// Özellikler
type ShadowPosition = 'top' | 'bottom' | 'left' | 'right';
type xyValue = {x: number; y: number};

interface ShadowData {
  style: ViewStyle;
  shadowStart: xyValue;
  shadowEnd: xyValue;
  sizeStyle: ViewStyle;
}

// Durumlar ve Kalıplar
const defaultProp = {
  position: 'top' as ShadowPosition,
  size: 80,
  startOpacity: 0.6,
  endOpacity: 0,
};

type Props = {
  HexColor?: string;
  style?: ViewStyle;
} & typeof defaultProp;

// Bileşenlerin Tanımlanması
class InShadow extends React.PureComponent<Props> {
  static defaultProp = defaultProp;

  shadowDataMap: Record<ShadowPosition, ShadowData> = {
    top: {
      style: styles.top,
      shadowStart: {x: 0.5, y: 0},
      shadowEnd: {x: 0.5, y: 1},
      sizeStyle: {height: this.props.size},
    },
    bottom: {
      style: styles.bottom,
      shadowStart: {x: 0.5, y: 1},
      shadowEnd: {x: 0.5, y: 0},
      sizeStyle: {height: this.props.size},
    },
    left: {
      style: styles.left,
      shadowStart: {x: 0, y: 0.5},
      shadowEnd: {x: 1, y: 0.5},
      sizeStyle: {width: this.props.size},
    },
    right: {
      style: styles.right,
      shadowStart: {x: 1, y: 0.5},
      shadowEnd: {x: 0, y: 0.5},
      sizeStyle: {width: this.props.size},
    },
  };

  getShadowColor = () => {
    const {startOpacity, endOpacity, HexColor} = this.props;
    const RGBColor = HexToRGB(HexColor) || {r: 0, g: 0, b: 0};
    const Colors = [
      `rgba(${RGBColor.r},${RGBColor.g},${RGBColor.b},${startOpacity}`,
      `rgba(${RGBColor.r},${RGBColor.g},${RGBColor.b},${endOpacity}`,
    ];

    return Colors;
  };

  render() {
    const {position, style, ...props} = this.props;
    const color = this.getShadowColor();
    const shadowData = this.shadowDataMap[position];
    const shadowStyle = StyleSheet.flatten([
      styles.absoluteFill,
      shadowData.style,
      shadowData.sizeStyle,
      style,
    ]);

    return (
      <LinearGradient
        colors={color}
        style={shadowStyle}
        start={shadowData.shadowStart}
        end={shadowData.shadowEnd}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  absoluteFill: {...StyleSheet.absoluteFillObject},
  top: {bottom: undefined},
  bottom: {top: undefined},
  left: {right: undefined},
  right: {left: undefined},
});

export default InShadow;
