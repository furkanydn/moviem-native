import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {MovieEmpty} from '../../icons';
import {MovieID} from '../../redux/indexIE';
import {THEME} from '../../utils/theme';
import {movieIDsKeyExtract} from '../../utils/movie';
import {Footer, Info, InlinePreview} from '../index';

// Durum ve Özellikler
type OwnProps = {
  movieIDs: MovieID[];
  emptyText?: string;
  emptySubtext?: string;
  isPagePending?: boolean;
  showFullScreen?: boolean;
  renderEmptyIcon?: Info['props']['renderIcon'];
};

type Props = OwnProps & Partial<Omit<FlatListProps<MovieID>, 'data'>>;

export type MovieListProps = Props;

// Bileşen
class List extends React.PureComponent<Props> {
  renderEmpty = () => {
    const {
      emptyText = 'No Movies',
      emptySubtext,
      renderEmptyIcon = MovieEmpty,
    } = this.props;

    return (
      <Info
        text={emptyText}
        renderIcon={renderEmptyIcon}
        subtext={emptySubtext}
      />
    );
  };

  renderLoading = () => (
    <ActivityIndicator
      size={THEME.specification.activityIndicatorSize}
      color={THEME.COLORS.lightest}
    />
  );

  renderList = () => (this.props.isPagePending ? <Footer /> : null);

  renderMovie = ({item}: {item: MovieID}) => <InlinePreview movieID={item} />;

  renderMovies = () => {
    const {movieIDs, refreshing, onRefresh, ...props} = this.props;

    return movieIDs.length !== 0 ? (
      <FlatList
        data={movieIDs}
        renderItem={this.renderMovie}
        style={styles.list}
        keyExtractor={movieIDsKeyExtract}
        ListFooterComponent={this.renderList}
        onEndReachedThreshold={0.8}
        refreshControl={
          onRefresh && (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={THEME.COLORS.lightest}
            />
          )
        }
        {...props}
      />
    ) : (
      this.renderEmpty()
    );
  };

  render() {
    const {showFullScreen} = this.props;

    return (
      <View style={styles.container}>
        {showFullScreen ? this.renderLoading() : this.renderMovies()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default List;
