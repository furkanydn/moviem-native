import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
//
import {MovieAPIDetailed} from '../../api/type';
import {getIMDB_Url} from '../../api/urlKEY';
import {Favorite, Watchlist, MovieI} from '../../icons';
import {changeMovieStatusRequest, Movie} from '../../redux/indexIE';
import {THEME} from '../../utils/theme';
import {safeURLOpen} from '../../utils/network';
import AuthLock from '../general/AuthLock';
import {ImageButton} from '../index';

// Durum ve Özellikler
const mapStateProps = () => ({});

const mapDispatchProps = {
  changeMovieStatusRequest,
};

type OwnProps = {
  movie: Movie;
  detailMovie: MovieAPIDetailed | undefined;
};

type ReduxProps = ReturnType<typeof mapStateProps> & typeof mapDispatchProps;

type Props = ReduxProps & OwnProps;

// Bileşen
class DetailButton extends React.PureComponent<Props> {
  favoriteClick = () => {
    const {movie, changeMovieStatusRequest} = this.props;
    const {id, isInFavorite} = movie;
    changeMovieStatusRequest({
      movieID: id,
      status: !isInFavorite,
      statusType: 'favorite',
    });
  };

  watchlistClick = () => {
    const {movie, changeMovieStatusRequest} = this.props;
    const {id, isInWatchList} = movie;
    changeMovieStatusRequest({
      movieID: id,
      status: !isInWatchList,
      statusType: 'watchlist',
    });
  };

  ImdbClick = () => {
    const {detailMovie} = this.props;
    if (detailMovie && detailMovie.imdb_id) {
      safeURLOpen(getIMDB_Url(detailMovie.imdb_id));
    }
  };

  render() {
    const {movie, detailMovie} = this.props;
    const {
      isInFavorite,
      isFavoritePending,
      isInWatchList,
      isWatchListPending,
    } = movie;
    const imdblinkON = detailMovie && detailMovie.imdb_id;

    return (
      <View style={styles.container}>
        <AuthLock>
          <ImageButton
            style={styles.button}
            disabled={isWatchListPending}
            icon={Watchlist({isInWatchList})}
            onPress={this.watchlistClick}
            text="Save"
          />
          <ImageButton
            style={styles.button}
            disabled={isFavoritePending}
            icon={Favorite({isInFavorite})}
            onPress={this.favoriteClick}
            text="Favorite"
          />
        </AuthLock>
        <ImageButton
          style={styles.button}
          disabled={!imdblinkON}
          icon={MovieI({disabled: !imdblinkON})}
          onPress={this.ImdbClick}
          text="Open Imdb"
        />
      </View>
    );
  }
}

// Stillendirme
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: THEME.COLORS.background,
    marginVertical: THEME.spacing.s,
  },
  button: {
    width: '25%',
    height: 78,
    marginVertical: THEME.spacing.xs,
  },
});

export default connect(mapStateProps, mapDispatchProps)(DetailButton);
