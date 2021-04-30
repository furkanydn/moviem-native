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
  generateText = (genres: MovieAPIDetailed['genre']) =>
    genres
      .map(genre => genre.name)
      .splice(0, 4)
      .reduce((actually, current) => `${actually} · ${current}`);

  render() {
    const {detailMovie, style} = this.props;
    const {genre} = detailMovie;

    return (
      genre && (
        <TextView style={[style, {color: THEME.COLORS.lighter}]}>
          {this.generateText(genre)}
        </TextView>
      )
    );
  }
}

export default Genres;
