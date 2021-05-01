import React from 'react';
import {MovieID} from '../../redux/indexIE';
import {movieIDsKeyExtract} from '../../utils/movie';
import {
  CircleLoading,
  Deck,
  RenderCardParams,
  Info,
  Card,
  CardLabel,
} from '../index';

// Durum ve Özellikler
type Props = {
  movieIDs: MovieID[];
  swipeTop: (id: MovieID) => void;
  swipeLeft: (id: MovieID) => void;
  swipeRight: (id: MovieID) => void;
};

// Bileşen
class MDeck extends React.PureComponent<Props> {
  renderCircleLoading = () => <CircleLoading />;

  renderNoMore = () => (
    <Info
      renderIcon={this.renderCircleLoading}
      text="Loading Movies"
      subtext="Please wait"
    />
  );

  renderCard = (
    movieID: MovieID,
    {isTopCard, SwipeThresh}: RenderCardParams,
  ) => (
    <>
      <Card movieID={movieID} swipeThresh={SwipeThresh} />
      {isTopCard && SwipeThresh && <CardLabel swipeThresh={SwipeThresh} />}
    </>
  );

  render() {
    const {movieIDs, swipeLeft, swipeRight, swipeTop} = this.props;

    return (
      <Deck
        data={movieIDs}
        keyExtractor={movieIDsKeyExtract}
        renderCard={this.renderCard}
        renderNoMoreCards={this.renderNoMore}
        onSwipeLeft={swipeLeft}
        onSwipeRight={swipeRight}
        onSwipeTop={swipeTop}
      />
    );
  }
}

export default MDeck;
