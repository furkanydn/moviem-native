import React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {connect} from 'react-redux';

//
import {getMovieSelectByID, MovieID, RootState} from '../../redux/indexIE';
import {THEME} from '../../utils/theme';
import {CardImage, InShadow, ScoreYear, SwipeThresh, TextView} from '../index';

// Durum ve Özellikler
type OwnProps = {movieID: MovieID; swipeThresh?: SwipeThresh};

const MakeMapStateProps = (state: RootState, props: OwnProps) => {
  const {movieID} = props;
  const movieSelect = getMovieSelectByID(movieID);

  return (state: RootState) => ({movieID, movie: movieSelect(state)});
};

const MapDispatchProps = {};

type ReduxProps = ReturnType<ReturnType<typeof MakeMapStateProps>> &
  typeof MapDispatchProps;

type Props = OwnProps & ReduxProps;

const initState = {expanded: false};

type State = typeof initState;

// Bileşen
class Card extends React.PureComponent<Props, State> {
  state = initState;
  isAnimate = false;
  visibleAnimateValue = new Animated.Value(0);

  showDetail = () => {
    const {expanded} = this.state;
    this.setState({expanded: !expanded});

    Animated.timing(this.visibleAnimateValue, {
      useNativeDriver: true,
      toValue: 1,
      duration: 100,
    }).start(() => {
      this.isAnimate = false;
    });
  };

  hideDetail = () => {
    const {expanded} = this.state;

    Animated.timing(this.visibleAnimateValue, {
      useNativeDriver: true,
      toValue: 0,
      duration: 100,
    }).start(() => {
      this.setState({expanded: !expanded}, () => {
        this.isAnimate = false;
      });
    });
  };

  cardPress = () => {
    if (this.isAnimate) {
      return;
    }
    const {expanded} = this.state;

    this.isAnimate = true;
    expanded ? this.hideDetail() : this.showDetail();
  };

  getDetailDimmerStyle = () => {
    const opacity = this.visibleAnimateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.8],
    });

    return {opacity};
  };

  renderDetail = () => {
    const {movie} = this.props;
    const {title, overview, vote_average, year} = movie;

    return (
      <Animated.View
        style={[styles.containerDetail, {opacity: this.visibleAnimateValue}]}>
        <Animated.View
          style={[styles.detailDimmer, this.getDetailDimmerStyle()]}
        />
        <View style={styles.containerDetailContent}>
          <TextView numberOfLines={2} type="headingOne">
            {title}
          </TextView>
          <ScoreYear score={vote_average} year={year} style={styles.score} />
          <TextView numberOfLines={12} type="paragraphOne">
            {overview}
          </TextView>
        </View>
      </Animated.View>
    );
  };

  renderSwipe = () => {
    const {swipeThresh} = this.props;
    const maxThresh = Animated.add(
      Animated.add(swipeThresh.toLeft, swipeThresh.toRight),
      swipeThresh.toTop,
    );
    const opacity = Animated.diffClamp(Animated.divide(maxThresh, 3), 0, 0.4);

    return <Animated.View style={[styles.swipeDimmer, {opacity}]} />;
  };

  render() {
    const {movie, swipeThresh} = this.props;
    const {expanded} = this.state;
    const {poster_path} = movie;

    return (
      <TouchableWithoutFeedback onPress={this.cardPress}>
        <View style={styles.container}>
          <CardImage path={posterPath} style={styles.card} />
          <InShadow position="top" startOpacity={0.5} size={80} />
          <InShadow position="bottom" startOpacity={0.5} size={100} />
          {expanded && this.renderDetail()}
          {swipeThresh && this.renderSwipe()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  card: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: THEME.COLORS.dark,
  },
  swipeDimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: THEME.COLORS.darker,
  },
  containerDetail: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
  },
  detailDimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: THEME.COLORS.darkest,
  },
  containerDetailContent: {
    padding: THEME.spacing.m,
  },
  score: {
    marginBottom: THEME.spacing.xs,
  },
});

export default connect(MakeMapStateProps, MapDispatchProps)(Card);
