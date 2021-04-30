import uuid from 'uuid';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
//
import {getSmallImageUrl} from '../../api/urlKEY';
import {MovieID, RootState, getMovieSelectByID} from '../../redux/indexIE';
import {routeName} from '../../routes/routeName';
import {THEME} from '../../utils/theme';
import {DetailsScreenNavParams} from '../../screens/Movie/Details';
import {goodMovieRate} from '../../utils/movie';
import {TextView, TouchableScale} from '../index';

// Yerel
const {width} = Dimensions.get('window');
const preWidth = width * 0.27;
export const getMoviePreHeight = () =>
  preWidth / THEME.specification.posterRatio;

// Durumlar ve Özellikler
type OwnProps = {
  movieID?: MovieID;
  highPriority?: boolean;
  withRateBadge?: boolean;
};

type PropsWithoutRedux = OwnProps & NavigationInjectedProps;

const makeStateProps = (state: RootState, props: PropsWithoutRedux) => {
  const {movieID} = props;
  const movieSelect = getMovieSelectByID(movieID);

  return (state: RootState) => ({
    movieID,
    movie: movieSelect(state),
  });
};

type MapStateProps = ReturnType<typeof makeStateProps>;

const MapDispacthProps = {};

type ReduxProps = ReturnType<MapStateProps> & typeof MapDispacthProps;

type Props = PropsWithoutRedux & ReduxProps;

export type PreviewProps = OwnProps;

// Bileşen
class Preview extends React.PureComponent<Props> {
  press = () => {
    const {movieID, navigation} = this.props;
    if (!movieID) {
      return;
    }

    const params: DetailsScreenNavParams = {movieID};
    navigation.navigate({
      routeName: routeName.MovieDetailsScreen,
      params,
      key: `${movieID}_${uuid.v4()}`,
    });
  };

  renderRating = () => {
    const {movie} = this.props;
    const {voteAverage} = movie;
    const bColor = goodMovieRate(voteAverage)
      ? THEME.COLORS.success
      : THEME.COLORS.light;

    return (
      <View style={[styles.rating, {backgroundColor: bColor}]}>
        <TextView type="paragraphTwo">
          {voteAverage ? voteAverage.toFixed(1) : 'NaN'}
        </TextView>
      </View>
    );
  };

  renderPreview() {
    const {movie, highPriority, withRateBadge} = this.props;
    if (!movie) {
      return;
    }

    const priority = highPriority
      ? FastImage.priority.high
      : FastImage.priority.normal;

    return (
      <>
        <FastImage
          style={styles.image}
          source={{uri: getSmallImageUrl(movie.posterPath), priority}}
        />
        {withRateBadge && this.renderRating()}
      </>
    );
  }

  renderEmpty = () => <View style={styles.image} />;

  render() {
    const {movieID} = this.props;

    return (
      <TouchableScale
        disabled={!movieID}
        scaleFactor={0.95}
        style={styles.container}
        onPress={this.press}>
        {movieID ? this.renderPreview() : this.renderEmpty()}
      </TouchableScale>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: THEME.spacing.s,
  },
  image: {
    aspectRatio: THEME.specification.posterRatio,
    width: preWidth,
    borderRadius: THEME.spacing.s,
    backgroundColor: THEME.COLORS.transparentBlackOne,
  },
  rating: {
    position: 'absolute',
    left: -6,
    top: '15%',
    borderRadius: THEME.spacing.xs,
    paddingVertical: 2,
    paddingHorizontal: THEME.spacing.s,
  },
});


export default withNavigation(
  connect(makeStateProps, MapDispacthProps, undefined, {
    shouldHandleStateChanges: false,
  })(Preview),
);
