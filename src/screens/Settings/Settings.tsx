import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {connect} from 'react-redux';
//
import {
  BButton,
  TextView,
  withDelayLoading,
  Wrapper,
} from '../../components/index';
import {
  RootState,
  createLogOutRequest,
  usernameSelect,
} from '../../redux/indexIE';
import {THEME} from '../../utils/theme';

// Durum ve Özellikler
const MapStateProps = (state: RootState) => ({
  username: usernameSelect(state),
});

const MapDispatchProps = {
  createLogOutRequest,
};

type ReduxProps = ReturnType<typeof MapStateProps> & typeof MapDispatchProps;

type Props = NavigationStackScreenProps & ReduxProps;

// Bileşen
class Settings extends React.PureComponent<Props> {
  signOutClick = () => {
    const {createLogOutRequest} = this.props;
    createLogOutRequest();
  };

  render() {
    const {username} = this.props;

    return (
      <Wrapper>
        <ScrollView>
          <TextView style={styles.sectiot} type="headingTwo">
            Account
          </TextView>
          <BButton
            text="Sign Out"
            subtext={`You are logged in as ${username}`}
            color={THEME.COLORS.danger}
            onPress={this.signOutClick}
          />
        </ScrollView>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  sectiot: {
    marginLeft: THEME.spacing.l,
    marginVertical: THEME.spacing.s,
  },
});

export default connect(
  MapStateProps,
  MapDispatchProps,
)(withDelayLoading(Settings));
