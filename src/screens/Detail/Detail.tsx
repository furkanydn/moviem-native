import React from 'react';
import {InteractionManager} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import {connect} from 'react-redux';
// Yerel İmportlar
import {withDelayLoading, Detail, Wrapper} from '../../components/index';
import {
  isGuestUserSelect,
  fetchMovieDetailedRequest,
  fetchMovieAccountStateRequest,
  fetchMovieRecommendationsRequest,
  getMovieSelectByID,
  MovieID,
  RootState,
} from '../../redux/indexIE';

// Durum ve Özellikler
export interface DetailScreenNavigationParams {
  movieID: MovieID;
}

type NavProps = NavigationStackScreenProps<DetailScreenNavigationParams>;

type PropsWithOutRedux = NavProps;

const MakeMapStateProps = (state: RootState, props: PropsWithOutRedux) => {
  const movieID = props.navigation.getParam('movieID');
  const movieSelect = getMovieSelectByID(movieID);

  return (state: RootState) => ({
    movieID,
    movie: movieSelect(state),
    guestUser: isGuestUserSelect(state),
  });
};

const MapDispatchProps = {
  fetchMovieDetailedRequest,
  fetchMovieAccountStateRequest,
  fetchMovieRecommendationsRequest,
};

type MapStateProps = ReturnType<typeof MakeMapStateProps>;

type ReduxProps = ReturnType<MapStateProps> & typeof MapDispatchProps;

type Props = ReduxProps & PropsWithOutRedux;

// Bileşen
class Detail extends React.PureComponent<Props> {
  static navOption = (): NavigationStackOptions => ({
    title: '',
  });

  fetchData = () => {
    const {
      movie,
      movieID,
      guestUser,
      fetchMovieDetailedRequest,
      fetchMovieAccountStateRequest,
      fetchMovieRecommendationsRequest,
    } = this.props;

    !movie.movieDetailed && fetchMovieDetailedRequest({movieID});
    !guestUser && fetchMovieAccountStateRequest({movieID});
    !movie.recommendations && fetchMovieRecommendationsRequest({movieID});
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
  MakeMapStateProps,
  MapDispatchProps,
)(withDelayLoading(Detail));
