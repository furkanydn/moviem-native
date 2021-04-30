import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
//
import {getSmallImageUrl} from '../../api/urlKEY';
import {MovieID, RootState, getMovieSelectByID} from '../../redux/indexIE';
import {routeName} from '../../routes/routeName';
import {DetailsScreenNavParams} from '../../screens/Movie/Details';
import {THEME} from '../../utils/theme';
import {TextView, TouchableHighView, ScoreYear} from '../index';

// Durum ve Özellikler
type OwnProps = {
  movieID: MovieID;
};

const MapStateProps = (state: RootState, props: OwnProps) => ({
  movie: getMovieSelectByID(props.movieID)(state),
});

const MapDispatchProps = {};

type ReduxProps = ReturnType<typeof MapStateProps> & typeof MapDispatchProps;

type Props = OwnProps & ReduxProps & NavigationInjectedProps;

// Bileşen
class InlinePreview extends React.Component<Props> {
  shouldComponentUpdate() {
    // Performans optimizasyonu için güncelleme yapılmayacaktır.
    return false;
  }

  InlinePreviewPress = () => {
    const {navigation, movieID} = this.props;
    const params: DetailsScreenNavParams = {movieID};

    navigation.navigate(routeName.MovieDetailsScreen, params);
  };

  render() {
    const {movie} = this.props;
    const {title, year, voteAverage, posterPath} = movie;

    return (
      <TouchableHighView
        contentStyle={styles.container}
        scaleFactor={0.98}
        onPress={this.InlinePreviewPress}>
        <FastImage
          style={styles.poster}
          source={{uri: getSmallImageUrl(posterPath)}}
        />
        <View style={styles.textWrap}>
          <TextView type="buttonHeader" numberOfLines={1} style={styles.title}>
            {title}
          </TextView>
          <ScoreYear score={voteAverage} year={year} />
        </View>
      </TouchableHighView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 96,
    paddingVertical: THEME.spacing.xs,
  },
  poster: {
    height: '100%',
    aspectRatio: THEME.specification.posterRatio,
    marginHorizontal: THEME.spacing.s,
    backgroundColor: THEME.COLORS.dark,
    borderRadius: 2,
  },
  textWrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    width: '95%',
  },
});

export default connect(MapStateProps, MapDispatchProps, undefined, {
  shouldHandleStateChanges: false,
})(withNavigation(InlinePreview));
