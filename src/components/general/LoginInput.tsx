// Sabit Bileşenleri İçeri Aktarma
import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
// Yazılan Bileşenleri İçeri Aktarma
import {THEME} from '../../utils/theme';
import {TextView} from '../index';
import {getFontStyle} from '../../utils/font';
import {StyleSheets} from '../../StyleSheets';

// Durumlar ve Kalıplar
type OwnProps = {
  label: string;
  style?: ViewStyle;
  errorText?: string;
};

type Props = OwnProps & TextInputProps;

const initState = {
  focused: false,
};

type State = typeof initState;

// Bileşenler
class LoginInput extends React.PureComponent<Props, State> {
  state = initState;

  onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const {onFocus} = this.props;
    this.setState({focused: true});
    onFocus && onFocus(e);
  };

  onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const {onBlur} = this.props;
    this.setState({focused: false});
    onBlur && onBlur(e);
  };

  render() {
    const {errorText, label, style, ...props} = this.props;
    const {focused} = this.state;
    const isError = Boolean(errorText?.length);
    const containerStyle = [
      styles.inputContainer,
      focused && styles.inputFocused,
      isError && styles.inputErrored,
    ];

    return (
      <View style={[styles.container, style]}>
        {label && <TextView style={styles.label}>{label}</TextView>}
        <View style={containerStyle}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            selectionColor={THEME.COLORS.textInputSelect}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            {...props}
            style={styles.input}
          />
        </View>
        <TextView style={styles.subLabel} numberOfLines={2} type="paragraphTwo">
          {errorText}
        </TextView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: THEME.spacing.m,
    marginHorizontal: THEME.spacing.m,
    alignSelf: 'stretch',
  },
  inputContainer: {
    backgroundColor: THEME.COLORS.focys,
    borderWidth: 1,
    borderRadius: 5,
  },
  inputFocused: {
    backgroundColor: THEME.COLORS.focys,
  },
  inputErrored: {
    borderColor: THEME.COLORS.danger,
  },
  input: {
    ...getFontStyle(),
    ...THEME.Typography.headingSix,
    ...StyleSheets.textPadding,
    color: THEME.COLORS.lightest,
    marginHorizontal: THEME.spacing.s,
  },
  label: {
    ...getFontStyle({weight: 'Bold'}),
    marginBottom: THEME.spacing.s,
  },
  subLabel: {
    height: 40,
    margin: THEME.spacing.xs,
  },
});

export default LoginInput;
