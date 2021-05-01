import React from 'react';
import {NavigationEvents} from 'react-navigation';
import {connect} from 'react-redux';
import {
  RootState,
  exploreLoadRequest,
  exploreSwiped,
  exploreMovieLoadPosterSelect,
} from '../../redux/indexIE';
import {Deck} from '../index';

// Durum ve Özellikler
const MapStateProps = (state: RootState) => ({
  movieIDs: exploreMovieLoadPosterSelect(state),
});

const MapDispatchProps = {exploreSwiped, exploreLoadRequest};

type ReduxProps = ReturnType<typeof MapStateProps> & typeof MapDispatchProps;
type Props = ReduxProps;

// Bileşen
class EMovieDeck extends React.PureComponent<Props> {
  componentDidMount() {
    const {exploreLoadRequest} = this.props;
    exploreLoadRequest();
  }

  didFocus = () => {
    const {exploreLoadRequest} = this.props;
    exploreLoadRequest();
  };

  swipeTop = () => {
    const {exploreSwiped} = this.props;
    exploreSwiped('top');
  };

  swipeLeft = () => {
    const {exploreSwiped} = this.props;
    exploreSwiped('left');
  };

  swipeRight = () => {
    const {exploreSwiped} = this.props;
    exploreSwiped('right');
  };

  render() {
    const {movieIDs} = this.props;
    return <></>;
  }
}
