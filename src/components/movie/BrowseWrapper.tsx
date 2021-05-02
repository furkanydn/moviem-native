import React from 'react';
import {BackHandler, PanResponder, View} from 'react-native';
import {connect} from 'react-redux';
import {StyleSheets} from '../../StyleSheets';
import {Alert, SearchI} from '../../icons/index';
import {
  RootState,
  searchMoviePageRequest,
  searchMovieRequest,
  searchTextChange,
  searchLoadingSelect,
  searchPagePendingSelect,
  searchRequestPendingSelect,
  searchRequestSlowSelect,
  searchTextEmptySelect,
  searchMovieIDSelect,
  searchTextSelect,
} from '../../redux/indexIE';
import {Info, List, Search} from '../index';

// Durum ve Özelikler
const MapStateProps = (state: RootState) => ({
  movieIDs: searchMovieIDSelect(state),
  searchText: searchTextSelect(state),
  searchEmpty: searchTextEmptySelect(state),
  searchLoading: searchLoadingSelect(state),
  searchRequest: searchRequestPendingSelect(state),
  searchPagePending: searchPagePendingSelect(state),
  searchRequestSlow: searchRequestSlowSelect(state),
});

const MapDispatchProps = {
  searchTextChange,
  searchMovieRequest,
  searchMoviePageRequest,
};

type ReduxProps = ReturnType<typeof MapStateProps> & typeof MapDispatchProps;
type Props = ReduxProps;

const initState = {
  searchFocused: false,
};

type State = typeof initState;

// Bileşen
class BrowseWrapper extends React.PureComponent<Props, State> {
  state = initState;
  searchRef = React.createRef<Search>();
  panRespond = this.keyboardResponder();

  keyboardResponder() {
    const onResponder = () => {
      this.searchRef?.current?.blurFunc();
      return false;
    };

    return PanResponder.create({
      onStartShouldSetPanResponder: onResponder,
      onStartShouldSetPanResponderCapture: onResponder,
    });
  }

  get renderSearchContent() {
    return this.state.searchFocused || !this.props.searchEmpty;
  }

  hardwareBackClick = () => {
    if (this.state.searchFocused) {
      this.searchRef?.current?.backClick();
      return true;
    }
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.hardwareBackClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.hardwareBackClick,
    );
  }

  searchIFocus = () => this.setState({searchFocused: true});
  searchIBlur = () => this.setState({searchFocused: false});

  renderSearchHint = () => (
    <Info
      renderIcon={SearchI}
      text="Search for movies"
      subtext="Millions of movies, Explore now."
    />
  );

  renderSearchMovies = () => {
    const {
      movieIDs,
      searchLoading,
      searchPagePending,
      searchRequest,
      searchRequestSlow,
      searchMovieRequest,
      searchMoviePageRequest,
    } = this.props;

    const showFullLoading =
      (searchLoading && movieIDs.length === 0) || searchRequestSlow;

    return (
      <List
        movieIDs={movieIDs}
        showFullScreen={showFullLoading}
        refreshing={searchRequest}
        isPagePending={searchPagePending}
        onRefresh={searchMovieRequest}
        onEndReached={searchMoviePageRequest}
        renderEmptyIcon={Alert}
        emptyText="Oops."
        emptySubtext="There are no movies that matched your query."
        refreshControl={undefined} // Arama alanında oto yenileme açık olduğu için engellenmesi gerekiyor.
      />
    );
  };

  renderSearchContext = () => {
    const {searchEmpty} = this.props;

    return (
      <View {...this.panRespond.panHandlers} style={StyleSheets.flexContainer}>
        {searchEmpty ? this.renderSearchHint() : this.renderSearchMovies()}
      </View>
    );
  };

  render() {
    const {children, searchText, searchTextChange} = this.props;

    return (
      <>
        <Search
          value={searchText}
          changeText={searchTextChange}
          ref={this.searchRef}
          onFocus={this.searchIFocus}
          onBlur={this.searchIBlur}
        />
        {this.renderSearchContent ? this.renderSearchContext() : children}
      </>
    );
  }
}

export default connect(MapStateProps, MapDispatchProps)(BrowseWrapper);
