// Sabit Bileşenleri İçeri Aktarma
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

// Yazılan Bileşenleri İçeri Aktarma
import {REGISTRATION_URL} from '../../api/urlKEY';
import {
  TextView,
  TextButton,
  PriButton,
  SecButton,
  Spinner,
  withDelayLoading,
  ImgOpacityCycle,
  Wrapper,
} from '../../components';
import ImageMain from '../../ImageMain';
import {createGuestSessionRequest} from '../../redux/auth/action';
import {createGuestSessionPendingSelect} from '../../redux/auth/selector';
import {RootState} from '../../redux/type';
import {routeName} from '../../routes/routeName';
import {safeURLOpen} from '../../utils/network';
import {THEME} from '../../utils/theme';

// Durum ve Kalıplar
const mapStateToProps = (state: RootState) => ({
  createGuestSessionPending: createGuestSessionPendingSelect(state),
});

const mapDispatchToProps = {createGuestSessionRequest};

type ReduxProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

type Props = NavigationStackScreenProps<{}> & ReduxProps;

// Bileşenler
class Welcome extends React.Component<Props> {
  static navOption = {header: null};

  onLoginClick = () => {
    this.props.navigation.navigate(routeName.AuthLogin);
  };
  onSignUpClick = () => {
    safeURLOpen(REGISTRATION_URL);
  };
  onGuestClick = () => {
    const {createGuestSessionRequest} = this.props;
    createGuestSessionRequest();
  };

  render() {
    const {createGuestSessionPending} = this.props;

    return (
      <Wrapper>
        <ImgOpacityCycle
          images={ImageMain.welcomeLAB}
          style={styles.opacityCycle}
        />
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <FastImage
              style={styles.logo}
              source={ImageMain.logo}
              resizeMode="contain"
            />
            <TextView style={styles.wText} type="headingOne">
              Welcome to Moviem
            </TextView>
            <TextView style={styles.wCaption} type="headingFive">
              Powered by the Movie DB
            </TextView>
          </View>
          <View style={styles.botContainer}>
            <TextButton
              text="Continue as Guest"
              style={styles.gButton}
              color={THEME.COLORS.lighter}
              onPress={this.onGuestClick}
            />
            <PriButton
              stretch
              text="Log IN"
              style={styles.button}
              onPress={this.onLoginClick}
            />
            <SecButton
              stretch
              text="Sign UP"
              style={styles.button}
              onPress={this.onSignUpClick}
            />
          </View>
        </View>
        <Spinner visible={createGuestSessionPending} />
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-between'},
  topContainer: {marginTop: 48},
  botContainer: {marginBottom: 32},
  opacityCycle: {...StyleSheet.absoluteFillObject},
  logo: {
    height: 96,
    marginTop: THEME.spacing.xxl,
    marginBottom: THEME.spacing.xxl,
  },
  wText: {textAlign: 'center'},
  wCaption: {textAlign: 'center', color: THEME.COLORS.lighter},
  gButton: {height: THEME.spacing.xl},
  gColor: {color: THEME.COLORS.lighter},
  button: {marginBottom: THEME.spacing.s},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withDelayLoading(Welcome));
