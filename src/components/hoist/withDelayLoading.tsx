import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

// Durum ve Kalıplar
const initState = {
  showComponent: false,
};

type State = typeof initState;

// Bileşenler
export const withDelayLoading = <OriginalProps extends object>(
  WrapComponent: React.ComponentType<OriginalProps>,
) => {
  class hoist extends React.Component<OriginalProps, State> {
    state = initState;

    componentDidMount() {
      requestAnimationFrame(() => this.setState({showComponent: true}));
    }
    render() {
      const {showComponent} = this.state;

      return showComponent && <WrapComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(hoist, WrapComponent);
};
