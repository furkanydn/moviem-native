// Sabit Bileşenleri İçeri Aktarma
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {connect} from 'react-redux';

// Yazılan Bileşenleri İçeri Aktarma
import {
  Spinner,
  PriButton,
  TextButton,
  LoginInput,
  Wrapper,
} from '../../components';
import {createAuthSessionRequest} from '../../redux/auth/action';
import {
  createAuthSessionPendingSelect,
  createAuthSessionErrorSelect,
  userSelect,
} from '../../redux/auth/selector';
import {RootState} from '../../redux/type';
import {THEME} from '../../utils/theme';
import {safeURLOpen} from '../../utils/network';
import {validateUserName, validatePassword} from '../../utils/validator';
import {RESET_PASSWORD_URL} from '../../api/urlKEY';

// Durumlar ve Kalıplar
const initState = {
  username: '',
  usernameValidateError: '',
  password: '',
  passwordValidateError: '',
};
type State = typeof initState;

const mapStateToProps = (state: RootState) => ({
  user: userSelect(state),
  createAuthSessionPending: createAuthSessionPendingSelect(state),
  createAuthSessionError: createAuthSessionErrorSelect(state),
});

const mapDispatchProps = {
  createAuthSessionRequest,
};

type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchProps;

type Props = NavigationStackScreenProps & ReduxProps;

// Bileşenler
class Login extends React.Component<Props, State> {
  state = initState;

  static navigateOption = {
    title: 'Log In',
  };

  onUserNameChange = (text: string) => {
    this.setState({username: text, usernameValidateError: ''});
  };

  onPasswordChange = (text: string) => {
    this.setState({password: text, passwordValidateError: ''});
  };

  onForgotClick = () => {
    safeURLOpen(RESET_PASSWORD_URL);
  };

  validateInput = () => {
    const {username, password} = this.state;
    const validateUserNameResponse = validateUserName(username);
    const validatePasswordResponse = validatePassword(password);

    if (validateUserNameResponse.isValid && validatePasswordResponse.isValid) {
      return true;
    }

    this.setState({
      usernameValidateError: validateUserNameResponse.errorMessage,
      passwordValidateError: validatePasswordResponse.errorMessage,
    });

    return false;
  };

  onLoginClick = () => {
    if (this.validateInput()) {
      const {username, password} = this.state;
      // eslint-disable-next-line no-shadow
      const {createAuthSessionRequest} = this.props;
      createAuthSessionRequest({username, password});
    }
  };

  render() {
    const {username, password} = this.state;
    const {createAuthSessionPending, createAuthSessionError} = this.props;

    return (
      <Wrapper>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <LoginInput
            label="Username"
            style={styles.input}
            value={username}
            errorText={createAuthSessionError && ''}
            onChangeText={this.onUserNameChange}
          />
          <LoginInput
            label="Password"
            textContentType="password"
            secureTextEntry={true}
            value={password}
            errorText={createAuthSessionError?.message}
            onChangeText={this.onPasswordChange}
          />
          <PriButton
            stretch
            text="Log In"
            style={styles.buttonLogin}
            onPress={this.onLoginClick}
          />
          <TextButton
            text="Forgot the Password ?"
            style={styles.buttonForgot}
            color={THEME.COLORS.lighter}
            onPress={this.onForgotClick}
          />
        </ScrollView>
        <Spinner visible={createAuthSessionPending} />
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: THEME.spacing.m,
  },
  buttonLogin: {
    marginVertical: THEME.spacing.s,
  },
  buttonForgot: {
    paddingVertical: THEME.spacing.s,
    paddingHorizontal: THEME.spacing.m,
  },
});

export default connect(mapStateToProps, mapDispatchProps)(Login);
