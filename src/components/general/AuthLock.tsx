import React from 'react';
import {connect} from 'react-redux';
import {isGuestUserSelect, userSelect} from '../../redux/auth/selector';
import {RootState} from '../../redux/type';

// Durum ve Özellikler
const mapStateToProp = (state: RootState) => ({
  user: userSelect(state),
  isGuestUser: isGuestUserSelect(state),
});

const mapDispatchToProp = {};

type ReduxProps = ReturnType<typeof mapStateToProp> & typeof mapDispatchToProp;
type OwnProps = {children: React.ReactNode; placeholder?: React.ReactNode};
type Props = OwnProps & ReduxProps;

// Bileşen
class AuthLock extends React.PureComponent<Props> {
  render() {
    const {user, isGuestUser, placeholder = null, children = null} = this.props;
    const showLock = !user || isGuestUser;
    return showLock ? placeholder : children;
  }
}

export default connect(mapStateToProp, mapDispatchToProp)(AuthLock);
