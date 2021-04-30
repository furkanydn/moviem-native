import React from 'react';
import {InteractionManager} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import {connect} from 'react-redux';
//
import {withDelayLoading, Detail, Wrapper} from '../../components';
import {
  MovieID,
  RootState,
  isGuestUserSelect,
  fetchMovieDetailedRequest,
  fetchMovieAccountStateRequest,
  fetchMovieRecommendationsRequest,
  getMovieSelectByID,
} from '../../redux/indexIE';

// Durum ve Özellikler
export interface DetailsScreenNavParams {
  movieID: MovieID;
}

type NavigationProps = NavigationStackScreenProps<DetailsScreenNavParams>;

type PropsWithOutRedux = NavigationProps;

const makeStateProps = (state: RootState, props: PropsWithOutRedux) => {
  const movieID = props.navigation.getParam('movieID');
  const movieSelect = getMovieSelectByID(movieID);

  return (state: RootState) => ({
    movieID,
    movie: movieSelect(state),
    isGuest: isGuestUserSelect(state),
  });
};

type MapStateProps = ReturnType<typeof makeStateProps>;

const MapDispatchProps = {
  fetchMovieDetailedRequest,
  fetchMovieAccountStateRequest,
  fetchMovieRecommendationsRequest,
};

type ReduxProps = ReturnType<MapStateProps> & typeof MapDispatchProps;

type Props = ReduxProps & PropsWithOutRedux;

// Bileşen
class Details extends React.PureComponent<Props> {
  static navigationOptions = (): NavigationStackOptions => ({
    title: '',
  });

  fetchData = () => {
    const {
      movie,
      movieID,
      isGuest,
      fetchMovieDetailedRequest,
      fetchMovieAccountStateRequest,
      fetchMovieRecommendationsRequest,
    } = this.props;

    !movie.movieDetailed && fetchMovieDetailedRequest({movieID});
    !movie.recommendations && fetchMovieRecommendationsRequest({movieID});
    !isGuest && fetchMovieAccountStateRequest({movieID});
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.fetchData();
    });
  }

  render() {
    const {movie} = this.props;

    return (
      <Wrapper>
        <Detail movie={movie} />
      </Wrapper>
    );
  }
}

export default connect(
  makeStateProps,
  MapDispatchProps,
)(withDelayLoading(Details));
