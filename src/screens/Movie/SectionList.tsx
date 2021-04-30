import React from 'react';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import {connect} from 'react-redux';
//
import {withDelayLoading, List, Wrapper} from '../../components';
import {
  RootState,
  SectionKeys,
  getSectionSelectByKey,
  sectionData,
  fetchSectionNextPageRequest,
  refreshSectionRequest,
} from '../../redux/indexIE';

// Durum ve Özellikler
export interface SectionListNavigationParams {
  sectionKey: SectionKeys;
}

type NavigationProps = NavigationStackScreenProps<SectionListNavigationParams>;

type PropsWithOutRedux = NavigationProps;

const MakeMapStateProps = (state: RootState, props: PropsWithOutRedux) => {
  const sectionKey = props.navigation.getParam('sectionKey');
  const sectionSelect = getSectionSelectByKey(sectionKey);

  return (state: RootState) => ({
    sectionKey,
    section: sectionSelect(state),
  });
};

type MapStateProps = ReturnType<typeof MakeMapStateProps>;

const MapDispatchProps = {
  refreshSectionRequest,
  fetchSectionNextPageRequest,
};

type ReduxProps = ReturnType<MapStateProps> & typeof MapDispatchProps;

type Props = ReduxProps & PropsWithOutRedux;

// Bileşen
class SectionList extends React.Component<Props> {
  static navigationOption = ({
    navigation,
  }: NavigationProps): NavigationStackOptions => ({
    title: sectionData[navigation.getParam('sectionKey')].title,
  });

  componentDidMount() {
    const {refreshSectionRequest, sectionKey} = this.props;
    refreshSectionRequest(sectionKey);
  }

  onRefresh = () => {
    const {sectionKey, refreshSectionRequest} = this.props;
    refreshSectionRequest(sectionKey);
  };

  onEndReached = () => {
    const {sectionKey, fetchSectionNextPageRequest} = this.props;
    fetchSectionNextPageRequest(sectionKey);
  };

  render() {
    const {section} = this.props;
    const {movieIDs, refreshing, paginationPending} = section;

    return (
      <Wrapper>
        <List
          movieIDs={movieIDs}
          showFullScreen={refreshing && movieIDs.length === 0}
          refreshing={refreshing}
          isPagePending={paginationPending}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
        />
      </Wrapper>
    );
  }
}

export default connect(
  MakeMapStateProps,
  MapDispatchProps,
)(withDelayLoading(SectionList));
