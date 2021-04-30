import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
//
import {Movie} from '../../redux/indexIE';
import {THEME} from '../../utils/theme';
import {
  TextView,
  Backdrop,
  DetailButton,
  Genres,
  getMoviePreHeight,
  ScoreYear,
  HorizontalFlatList,
} from '../index';

// Yerel Değişken
const previewAddProps = {withRateBadge: true};

// Durum ve Özellikler
type Props = {
  movie: Movie;
};

// Bileşen
class Detail extends React.PureComponent<Props> {
  renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <TextView type="headingTwo">No Movies Found</TextView>
    </View>
  );

  renderMovie = () => {
    const {movie} = this.props;
    const {recommendations} = movie;
    const isRecommendEmpty = recommendations && recommendations.length === 0;

    return isRecommendEmpty ? (
      this.renderEmpty()
    ) : (
      <HorizontalFlatList
        movieIDs={recommendations || []}
        previewAddProps={previewAddProps}
      />
    );
  };

  render() {
    const {movie} = this.props;
    const {
      title,
      overview,
      movieDetailed,
      backdropPath,
      voteAverage,
      year,
    } = movie;

    return (
      <View>
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          style={styles.scroll}
          showsVerticalScrollIndicator={false}>
          <Backdrop title={title} backdropPath={backdropPath} />
          <View style={styles.marginHor}>
            <ScoreYear
              score={voteAverage}
              year={year}
              style={styles.marginBot}
            />
            <DetailButton movie={movie} detailMovie={movieDetailed} />
            <TextView style={styles.marginBot} type="buttonHeader">
              Overview
            </TextView>
            <TextView style={styles.overview}>{overview}</TextView>
            <TextView style={styles.recommendHeader} type="buttonHeader">
              You might like
            </TextView>
          </View>
          {this.renderMovie()}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    width: '100%',
    height: getMoviePreHeight(),
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginBot: {
    marginBottom: THEME.spacing.xs,
  },
  marginHor: {
    marginHorizontal: THEME.spacing.m,
  },
  recommendHeader: {
    marginTop: THEME.spacing.l,
    marginBottom: THEME.spacing.s,
  },
  scroll: {},
  scrollContent: {
    paddingBottom: THEME.spacing.m,
  },
  overview: {
    color: THEME.COLORS.lighter,
  },
});

export default Detail;
