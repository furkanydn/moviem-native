import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';
import {StyleSheets} from '../../StyleSheets';
import {THEME} from '../../utils/theme';
import {getFontStyle} from '../../utils/font';
import {TextView, TouchableScale} from '../index';
import {Back, Close, SearchDark} from '../../icons/index';

// Durum ve Özellikler
type OwnProps = {
  value: string;
  changeText: (text: string) => void;
};
// ES5 Özelliği
type Props = OwnProps & Pick<TextInputProps, 'onBlur' | 'onFocus'>;

const initState = {
  focused: false,
};

type State = typeof initState;

// Bileşen
class Search extends React.PureComponent<Props, State> {
  state = initState;
  textRef = React.createRef<TextInput>();

  blurFunc = () => this.textRef?.current?.blur();
  focusFunc = () => this.textRef?.current?.focus();

  onBlure = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const {onBlur} = this.props;
    this.setState({focused: false});

    onBlur && onBlur(event);
  };

  onFocuse = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const {onFocus} = this.props;
    this.setState({focused: true});
    onFocus && onFocus(event);
  };

  clearText = () => {
    const {changeText} = this.props;
    changeText('');
  };

  labelClick = () => {
    this.focusFunc();
  };

  backClick = () => {
    this.blurFunc();
    this.clearText();
  };

  closeClick = () => {
    this.focusFunc();
    this.clearText();
  };

  render() {
    const {value, changeText} = this.props;
    const {focused} = this.state;
    const valueEmpty = value.length === 0;
    const showSearch = !focused && valueEmpty;

    return (
      <View style={styles.container}>
        <View style={styles.containerArea}>
          <TouchableScale onPress={this.backClick} style={styles.touchArea}>
            {Back(!showSearch)}
          </TouchableScale>
          <TextInput
            ref={this.textRef}
            value={value}
            onChangeText={changeText}
            onBlur={this.blurFunc}
            onFocus={this.focusFunc}
            autoCorrect={false}
            style={styles.text}
            selectionColor={THEME.COLORS.textInputSelect}
          />
          <TouchableScale onPress={this.closeClick} style={styles.touchArea}>
            {Close(!valueEmpty)}
          </TouchableScale>
        </View>
        {showSearch && (
          <TouchableScale
            onPress={this.labelClick}
            style={styles.label}
            scaleFactor={0.98}>
            <View style={styles.labelWrap}>
              {SearchDark()}
              <TextView style={styles.labelText} type="buttonHeader">
                Search for Movies
              </TextView>
            </View>
          </TouchableScale>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {width: '100%', marginVertical: THEME.spacing.s},
  containerArea: {
    flexDirection: 'row',
    borderRadius: THEME.spacing.xs,
    marginHorizontal: THEME.spacing.m,
    backgroundColor: THEME.COLORS.lightest,
  },
  touchArea: {
    paddingHorizontal: THEME.spacing.s,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    color: THEME.COLORS.darkest,
    ...StyleSheets.textPadding,
    ...THEME.Typography.paragraphOne,
    ...getFontStyle(),
  },
  label: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {color: THEME.COLORS.darkest, ...getFontStyle({weight: 'Bold'})},
});

export default Search;
