import React from 'react';
import {ViewStyle} from 'react-native';
import {MovieAPIDetailed} from '../../api/type';
import {THEME} from '../../utils/theme';
import {TextView} from '../index';

// Durum ve Kalıp
type Props = {
  detailMovie: MovieAPIDetailed;
  style: ViewStyle;
};

// Bileşen
class Genres extends React.PureComponent<Props> {
  generateText = (genres: MovieAPIDetailed['genres']) =>
    genres
      .map(genre => genre.name)
      .splice(0, 4)
      .reduce((actually, current) => `${actually} · ${current}`);

  render() {
    const {detailMovie, style} = this.props;
    const {genres} = detailMovie;

    return (
      genres && (
        <TextView style={[style, {color: THEME.COLORS.lighter}]}>
          {this.generateText(genres)}
        </TextView>
      )
    );
  }
}

export default Genres;
