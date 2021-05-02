import React from 'react';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {
  withDelayLoading,
  Wrapper,
  BrowseS,
  BrowseWrapper,
} from '../../components';

// Tip
type Props = NavigationStackScreenProps<{}>;

// Bileşen
class Browse extends React.Component<Props> {
  render() {
    return (
      <Wrapper>
        <BrowseWrapper>
          <BrowseS />
        </BrowseWrapper>
      </Wrapper>
    );
  }
}

export default withDelayLoading(Browse);
